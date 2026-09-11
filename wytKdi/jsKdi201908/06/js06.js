/*
function mouseover(){
  document.getElementById("target").innerText = "マウスポインタが当たっています。";
}
function mouseout(){
  document.getElementById("target").innerText = "ここにマウスポインタを当ててください。";
}
*/


//カーソルを離した場合
function test2() {
	var target2 = document.getElementById("target2");
		// visibleで表示
		target2.style.visibility ="visible";
	}

//カーソルを翳した場合
function test1() {
	var target2 = document.getElementById("target2");
		// hiddenで非表示
		target2.style.visibility ="hidden";
	}