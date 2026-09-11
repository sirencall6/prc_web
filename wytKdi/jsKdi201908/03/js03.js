function Add1(){
var suA = (document.getElementById("inA").value);
var suB = (document.getElementById("inB").value);

var inAnswer = parseInt(suA, 10) + parseInt(suB, 10);
document.getElementById("innerHTML").innerHTML=inAnswer;
}