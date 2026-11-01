'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sample-form');
  const textInput = document.getElementById('text01');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (event) => {
    const http = require("node:http");

    const TARGET_URL = "https://api.sarashina.ai/v1/chat/completions";

    async function readRequestBody(request) {
      let data = "";
      for await (const chunk of request) data += chunk;
      return JSON.parse(data);
    }

    function sendSseData(response, payload) {
      response.write(`data: ${JSON.stringify(payload)}\n\n`);
    }

    const server = http.createServer(async (request, response) => {
      if (request.method !== "POST" || request.url !== "/v1/chat/completions") {
        response.writeHead(404).end("Not found");
        return;
      }

      try {
        const body = await readRequestBody(request);
        delete body.stream_options;
        delete body.logprobs;
        if (Object.hasOwn(body, "max_tokens")) {
          body.max_completion_tokens = body.max_tokens;
          delete body.max_tokens;
        }

        const headers = {
          Authorization: request.headers.authorization || "",
          "Content-Type": "application/json",
        };
        const upstream = await fetch(TARGET_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: request.signal,
        });

        if (!body.stream) {
          const result = Buffer.from(await upstream.arrayBuffer());
          response.writeHead(upstream.status, {
            "Content-Type": upstream.headers.get("content-type") || "application/json",
          });
          response.end(result);
          return;
        }

        response.writeHead(200, {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        try {
          if (!upstream.ok) {
            const errorBody = await upstream.text();
            console.error(`[!] サーバーエラー: ${errorBody}`);
            sendSseData(response, {
              choices: [{ delta: { content: `\n\n[APIエラー: ${upstream.status}]` } }],
              model: "sarashina",
            });
          } else if (upstream.body) {
            const reader = upstream.body.getReader();
            const decoder = new TextDecoder();
            let pending = "";
            let done = false;

            while (!done) {
              const result = await reader.read();
              pending += decoder.decode(result.value, { stream: !result.done });
              const lines = pending.split(/\r?\n/);
              pending = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;
                if (trimmed === "data: [DONE]") {
                  done = true;
                  break;
                }
                response.write(`${trimmed}\n\n`);
              }
              if (result.done) done = true;
            }
            if (pending.trim() && pending.trim() !== "data: [DONE]") {
              response.write(`${pending.trim()}\n\n`);
            }
          }
        } catch (error) {
          console.error(`[*] Sarashina側からの強制切断を検知: ${error}`);
          sendSseData(response, {
            choices: [{ delta: { content: "\n\n**[⚠️ システム警告: Sarashinaサーバーの処理上限（長文コンテキスト超過またはタイムアウト）により、回答が途中で切断されました。参照するコードを減らして再度お試しください。]**" } }],
            model: "sarashina",
          });
        } finally {
          response.write('data: {"id":"proxy","object":"chat.completion.chunk","created":1700000000,"model":"sarashina-mini","choices":[],"usage":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0}}\n\n');
          response.end("data: [DONE]\n\n");
        }
      } catch (error) {
        console.error("[!] リクエスト処理エラー:", error);
        if (!response.headersSent) response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: "Invalid request or upstream failure" }));
      }
    });

    if (require.main === module) {
      console.log("==================================================");
      console.log(" Sarashina 中継サーバー（長文切断・完全保護版）起動");
      console.log("==================================================");
      server.listen(8000, "127.0.0.1");
    }

    module.exports = server;