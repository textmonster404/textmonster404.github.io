var s = function(e){
    if (e.button==0) {
        e.target.style.top=e.target.my+"px";
        e.target.style.left=e.target.mx+"px";
    } else if (e.button==2) {
        theta++; document.getElementById("d").style.transform="rotate("+180*theta+"deg)";
        mu();
    }
}
var theta = 0;
var mdID=-1;function md(event){if(mdID==-1){mdID=window.setInterval(s,1,event);event.target.style.zIndex="2"}};function mu(event){if(mdID!=-1){clearInterval(mdID);mdID=-1;event.target.style.zIndex="1";event.target.style.top=(Math.floor((event.target.offsetTop+10)/20)*20)+"px";event.target.style.left=(Math.floor((event.target.offsetLeft+10)/20)*20)+"px";}};
function mp(event) {
    if (((theta)%2)==0) {
        event.target.mx=event.clientX-event.target.clientWidth/2+5;
        event.target.my=event.clientY-event.target.clientHeight/2+5;
    } else if (((theta)%2)==1) {
        console.log(161-(event.clientX-event.target.clientWidth/2+5)+20);
        console.log(event.target.offsetLeft);
        event.target.mx=161-(event.clientX-event.target.clientWidth/2+5)+20;
        event.target.my=161-(event.clientY-event.target.clientHeight/2+5)+20;
    }
}