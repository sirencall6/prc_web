function test() {
  var myRet = confirm("本当に画面遷移してもいいですか？");
  if (myRet == true) {
	  
  } else {
	//   「キャンセル」ボタンまたはescで画面遷移ｗキャンセル
    window.alert("キャンセルされました");
    return false;
  }
}
