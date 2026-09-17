'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sample-form');
  const textInput = document.getElementById('text01');

  form.addEventListener('submit', (event) => {
    // 1. 通常のフォーム送信（ページ遷移）を一旦停止
    event.preventDefault();

    const inputValue = textInput.value.trim();

    // 2. 空文字チェック（必要に応じて）
    if (!inputValue) {
      alert('テキストを入力してください。');
      textInput.focus();
      return;
    }

    // 3. 入力内容をダイアログ表示
    alert(`入力内容:\n${inputValue}`);

    // もしダイアログ確認後にそのまま送信（ページ遷移）したい場合は下記を実行
    // form.submit();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sample-form');
  const textInput = document.getElementById('text01');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (event) => {
    // 画面遷移を止めずにダイアログを挟む例
    // ※非同期通信(Fetch/Ajax)ではなく通常送信の場合は、この後ページ遷移します

    // 1. ボタンとテキスト入力欄を即座に入力不可にする
    submitBtn.disabled = true;
    textInput.disabled = true;

    // 視覚的フィードバック（ボタン文言の変更）
    submitBtn.textContent = '送信中...';

    // 2. 例: 2〜3秒後に再度入力を許可したい場合（画面遷移しない処理などの保険）
    /*
    setTimeout(() => {
      submitBtn.disabled = false;
      textInput.disabled = false;
      submitBtn.textContent = '送信する';
    }, 3000);
    */
  });
});