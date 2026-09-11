function myDate() {
// function 「myDate」とvar「watch」は同じ名前にしない

var watch = new Date();
var aa = watch.getFullYear() + "年";
var bb = (watch.getMonth() + 1 ) + "月";
var cc = watch.getDate() + "日";
var dd = watch.getHours() + "時";
var ee = watch.getMinutes() + "分";
var ff = watch.getSeconds() + "秒";
var myMsg = "現在の時刻は"+(aa+bb+cc+dd+ee+ff);
document.getElementById("choice").innerHTML = myMsg;
}
setInterval("myDate()", 1000);