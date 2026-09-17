'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. フォーム送信制御（入力チェック → ダイアログ → 送信）
  // --------------------------------------------------
  const form = document.getElementById('sample-form');
  const textInput = document.getElementById('text01');
  const submitBtn = document.getElementById('submit-btn');

  if (form && textInput && submitBtn) {
    form.addEventListener('submit', (event) => {
      // 一旦通常の即時送信を止めて、前処理を行う
      event.preventDefault();

      const inputValue = textInput.value.trim();

      // 空文字チェック
      if (!inputValue) {
        alert('テキストを入力してください。');
        textInput.focus();
        return;
      }

      // 確認ダイアログ（OKなら true、キャンセルなら false）
      const isConfirmed = confirm(`以下の内容で送信しますか？\n${inputValue}`);
      if (!isConfirmed) {
        return; // キャンセルの場合はここで中断
      }

      // 二重送信防止（※inputは無効化せず、ボタンのみ無効化する）
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      // プログラムから明示的に送信を実行（画面遷移）
      form.submit();
    });
  }

  // --------------------------------------------------
  // 2. 外部リンク遷移確認処理
  // --------------------------------------------------
  const confirmLink = document.getElementById('confirm-link');

  if (confirmLink) {
    confirmLink.addEventListener('click', (event) => {
      const proceed = confirm('外部サイト（Google）へ移動します。よろしいですか？');

      // キャンセル時はページ遷移（デフォルト挙動）を中断
      if (!proceed) {
        event.preventDefault();
      }
    });
  }
});