var d = document.getElementById("d");
var d_t = l(7);
var forbidden = ["0,1","0,2","0,3","0,4","0,5","0,6","1,2","1,3","1,4","1,5","1,6","2,3","2,4","2,5","2,6","3,4","3,5","3,6","4,5","4,6","5,6"];

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    md(e);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    mu(e);
  }
}
for (var t=0;t<7;t++) {
    for (var b=0;b<7;b++) {
        if (forbidden.includes(t+","+b)) {} else {
            c(d,t,b);
            d_t[t][b] = document.getElementById(t+","+b);
            dragElement(document.getElementById(t+","+b));
        }
    }
}
for (var i=0;i<100;i++) {
    for (var t=0;t<7;t++) {
        for (var b=0;b<7;b++) {
            if (forbidden.includes(t+","+b)) {} else {
                var temp = document.getElementById(t+","+b).outerHTML;
                var selected = Math.floor(Math.random()*7)+","+Math.floor(Math.random()*7);
                while (forbidden.includes(selected)) {var selected = Math.floor(Math.random()*7)+","+Math.floor(Math.random()*7);}
                document.getElementById(t+","+b).outerHTML = document.getElementById(selected).outerHTML;
                document.getElementById(selected).outerHTML = temp;
            }
        }
    }
}
for (var i=0;i<document.getElementsByClassName("domino").length;i++) {
    document.getElementsByClassName("domino")[i].flipped = true;
    document.getElementsByClassName("domino")[i].direction = 1;
    document.getElementsByClassName("domino")[i].t=document.getElementsByClassName("domino")[i].id.split(",")[0];
    document.getElementsByClassName("domino")[i].b=document.getElementsByClassName("domino")[i].id.split(",")[1];
    document.getElementsByClassName("domino")[i].style.left=(20*(i%7))+"px";
    document.getElementsByClassName("domino")[i].style.top=(40*(Math.floor(i/7)%4)+20)+"px";
    dragElement(document.getElementsByClassName("domino")[i]);
    document.getElementsByClassName("domino")[i].ondblclick=mdc;
}