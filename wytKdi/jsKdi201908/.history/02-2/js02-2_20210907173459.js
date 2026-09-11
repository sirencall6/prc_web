function test() {
  var myRet = confirm("本当に画面遷移してもいいですか？");
  if (myRet == true) {
	  continue;
  } else {
    window.alert("キャンセルされました");
    return false;
  }
}
