var c = function(d,t,b) {
    d.innerHTML+="<span class=\"domino\" id=\""+t+","+b+"\">"+text.characters.domino.flip.vertical+"</span>";
};
var l = function(tem){
    var temp=[];
    for (var i=0;i<tem;i++){
        temp[i]=[];
    };
    return(temp);
};
var s = function(e){
    if(e.button==2){
        if(e.target.flipped==true){
            e.target.textContent=text.characters.domino.vertical(e.target.t,e.target.b);
            e.target.flipped=false;
        } else {
            e.target.textContent=text.characters.domino.flip.vertical;
            e.target.flipped=true;
        }
        mu(e);
    }
    if(e.button==1){
        if(e.target.direction==1){
            if(e.target.flipped==false){
                e.target.textContent=text.characters.domino.horizontal(e.target.t,e.target.b);
                e.target.direction=2;
            } else if(e.target.flipped==true){
                e.target.textContent=text.characters.domino.flip.horizontal;
                e.target.direction=2;
            }
        } else if (e.target.direction==2) {
            if(e.target.flipped==false){
                e.target.textContent=text.characters.domino.vertical(e.target.b,e.target.t);
                e.target.direction=3;
            } else if(e.target.flipped==true){
                e.target.textContent=text.characters.domino.flip.vertical;
                e.target.direction=3;
            }
        } else if (e.target.direction==3) {
            if(e.target.flipped==false){
                e.target.textContent=text.characters.domino.horizontal(e.target.b,e.target.t);
                e.target.direction=4;
            } else if(e.target.flipped==true){
                e.target.textContent=text.characters.domino.flip.horizontal;
                e.target.direction=4;
            }
        } else if (e.target.direction==4) {
            if(e.target.flipped==false){
                e.target.textContent=text.characters.domino.vertical(e.target.t,e.target.b);
                e.target.direction=1;
            } else if(e.target.flipped==true){
                e.target.textContent=text.characters.domino.flip.vertical;
                e.target.direction=1;
            }
        }
        mu(e);
    }
    if (e.button==0) {
        e.target.style.top=e.target.my+"px";
        e.target.style.left=e.target.mx+"px";
    }
}
var mdID=-1;function md(event){if(mdID==-1){mdID=window.setInterval(s,1,event);event.target.style.zIndex="2"}};function mu(event){if(mdID!=-1){clearInterval(mdID);mdID=-1;event.target.style.zIndex="1";event.target.style.top=Math.floor(event.target.offsetTop/10)*10+"px";event.target.style.left=Math.floor(event.target.offsetLeft/10)*10+"px";}};
function mp(event) {
    event.target.mx=event.clientX-event.target.clientWidth/2+5;
    event.target.my=event.clientY-event.target.clientHeight/2+10;
}