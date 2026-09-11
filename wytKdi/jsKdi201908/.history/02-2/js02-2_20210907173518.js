function test() {
  var myRet = confirm("本当に画面遷移してもいいですか？");
  if (myRet == true) {
	  
  } else {
    window.alert("キャンセルされました");
    return false;
  }
}
