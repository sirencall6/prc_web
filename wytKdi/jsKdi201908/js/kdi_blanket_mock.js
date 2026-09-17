'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sample-form');
  const textInput = document.getElementById('text01');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', (event) => {
    // 1. 通常送信を一時停止して検証・確認を行う
    event.preventDefault();

    const inputValue = textInput.value.trim();

    // 2. 空文字チェック
    if (!inputValue) {
      alert('テキストを入力してください。');
      textInput.focus();
      return;
    }

    // 3. 確認ダイアログ
    const isConfirmed = confirm(`以下の内容で送信しますか？\n${inputValue}`);
    if (!isConfirmed) {
      return; // キャンセル時は何もしない
    }

    // 4. 二重送信防止のためボタンのみ無効化（inputは無効化しない）
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    // 5. フォームを実際に送信（ページ遷移）
    form.submit();
  });
});