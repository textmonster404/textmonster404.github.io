var d = document.getElementById("d");
var d_t = l(7);
var forbidden = ["0,1","0,2","0,3","0,4","0,5","0,6","1,2","1,3","1,4","1,5","1,6","2,3","2,4","2,5","2,6","3,4","3,5","3,6","4,5","4,6","5,6"];
for (var t=0;t<7;t++) {
    for (var b=0;b<7;b++) {
        if (forbidden.includes(t+","+b)) {} else {
            c(d,t,b);
            d_t[t][b] = document.getElementById(t+","+b);
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
    document.getElementsByClassName("domino")[i].addEventListener("mousedown",md);
    document.getElementsByClassName("domino")[i].addEventListener("mouseup",mu);
    document.getElementsByClassName("domino")[i].addEventListener("mouseout",mu);
    document.getElementsByClassName("domino")[i].addEventListener("mousemove",mp);
}