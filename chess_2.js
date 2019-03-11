var d = document.getElementById("d");
for (var i=0;i<document.getElementsByClassName("piece").length;i++) {
    document.getElementsByClassName("piece")[i].addEventListener("mousedown",md);
    document.getElementsByClassName("piece")[i].addEventListener("mouseup",mu);
    document.getElementsByClassName("piece")[i].addEventListener("mouseout",mu);
    document.getElementsByClassName("piece")[i].addEventListener("mousemove",mp);
}
function rc(event) {if (event.button==2) {theta++; document.getElementById("d").style.transform="rotate("+180*theta+"deg)";}}
document.getElementById("t").addEventListener("click",rc);
document.getElementById("d").addEventListener("click",rc);