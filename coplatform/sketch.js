var design = {"p1":localStorage.getItem("p1style") || 0,"p2":localStorage.getItem("p2style") || 1,"p3":localStorage.getItem("p3style") || 2,"p4":localStorage.getItem("p4style") || 3};

var nes;
var designs = [];
function preload() {
  nes = loadFont("coplatform-nes.ttf");
  designs[0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAALUlEQVRYR+3QQREAAAABQfqXFsNnFTizzXk99+MAAQIECBAgQIAAAQIECBAgMBo/ACHo7lH9AAAAAElFTkSuQmCC");
  designs[1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAARElEQVRYR+3XsQ0AIAwDMPL/0UViQFzQMjgPJPKWrOFkuH/dAVVVnWOSnG4DCBAgQIAAAQIECBAgQOAfgc5f+HaNv+MNv4FwIWQhR4wAAAAASUVORK5CYII=");
  designs[2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAmUlEQVRYR83Xyw6AMAhE0fL/H42JCV3UIH0wZdya2NPrBqQVP1J8fnMBqqpInIi8Z/MC7PaoEmGB6wC7qcnG/59d4lOABmA3R5dwC9AA0JCwAA0ABZkuQAPIhiwXoAFkQbYL0ABOIccFaAC7kLQCNIBVSHoBGsAsBFaABhBB+vtb06+35PTFJHvqHQ/0ZkweAHIP/Pt2+Xb8AE8BwCE5gBnLAAAAAElFTkSuQmCC");
  designs[3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVRYR+2XUQ6AMAhDx/0PjYkJfrAQ2MZGNfrt0kfbRaRW/FCxfnsAmJlPwhDRrY0HIGS73BCnTQdgALI7IYOFHYABWI1ETzzsAAzAaCRW5tMOwAB4kXiZLzsAA6AjiWae5sAPUO6A9bX8/i2I7gnRW9FtRN7BMoCosH7P60TYgTKAWWF97n0bUdbkXifMDpQB7BK2OoHzZ3Rq8s6JKmHRvQBSiMAwhcLy+AAAAABJRU5ErkJggg==");
  designs[4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2XwQ7AIAhD7f9/NEuW4IHN9DC0O9STCQZeKoJgiBfE8ccEiIh4gwFwn+m2p18D/FeBXXefeUZzwAAyBU4FnrmQmyw0BpApUK+i9oVusEcdMIBcge5+X2t+9U97AXPw1W4AqkD3u1/VleWPyAAyBXYHpn9CA8gUUA2p8un4AklxwDBHd49JAAAAAElFTkSuQmCC");
  designs[5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAxUlEQVRYR+1XQQ6AMAgb/3/0jAc8kDRtE3WiejExrBRYAWPOOccYIyJif7Mn7ZGdixPLCWQkZ0Xm4h1pb0NAJara2RlQgVU7mUDWNm95dYC+M7X0IaDqu68Kaq1Qg1IvV80EyiBsv7cRqI6YY1UFNWLo57EEkO6ZGlBAEM8+QMa2jWcf+AwBdItrLVHnu0wFpxNA04r1Azbl+nRCd3qxrdnFk/cB1oDQMGOlkgn8G5G687l2cglcYHVxsQm8TwXLf05XE9gAYnrIAE0ja+wAAAAASUVORK5CYII=");
  designs[6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtUlEQVRYR+2XSw7AIAgFy/0PTdMFLrB2JGqkid014TM8BVWu4Keq+uUiIhIJGTJ+Ai8HoASR6t5svUKVAtsALLERzgbxce2/KJAGwNZtlhKtOE0F0gCMgpCCqEAagCgIVe7jVV3QGjTRwNTGZQnIcHTykb8cgKPAUWC7AtanBLJsEKUH6K3cTzzyy38aUgU04+kURQW2AcxKTHsi3624tx17154uNmWPeEMaSMsBKAEB/u51fANqqgAQlAH+0gAAAABJRU5ErkJggg==");
}
function clickBox(x,y,box,f) {
  if (x>=box.x&&x<=box.x+box.w&&y>=box.y&&y<=box.y+box.h) {
    f();
  }
}

var logo;
var logo1;
var logo2;
var logo3;
var logo4;

function player1() {localStorage.setItem("playerselect",1);window.location.replace("p1.html");}
function player2() {localStorage.setItem("playerselect",2);window.location.replace("p2.html");}
function player3() {localStorage.setItem("playerselect",3);window.location.replace("p3.html");}
function player4() {localStorage.setItem("playerselect",4);window.location.replace("p4.html");}

function title1() {logo=logo1;}
function title2() {logo=logo2;}
function title3() {logo=logo3;}
function title4() {logo=logo4;}

class Rectangle {
  constructor(x,y,w,h,c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  draw() {
    strokeWeight(0);
    fill(this.c);
    rect(this.x,this.y,this.w,this.h);
  }
}

play1 = new Rectangle(144,480,32,32,0);
play2 = new Rectangle(144+64,448,32,64,0);
play3 = new Rectangle(144+128,416,32,96,0);
play4 = new Rectangle(144+192,384,32,128,0);

function mouseClicked() {
  clickBox(mouseX,mouseY,play1,player1);
  clickBox(mouseX,mouseY,play2,player2);
  clickBox(mouseX,mouseY,play3,player3);
  clickBox(mouseX,mouseY,play4,player4);
  clickBox(mouseX,mouseY,{"x":2,"y":2,"w":80,"h":16},function(){window.location.replace("design.html");});
}

function draw() {
  background(255);
  fill(0);
  textAlign(LEFT);
  text("style",2,18);
  textAlign(CENTER);
  image(logo,128,16,256,64);
  text("How Many Players?\n(click a bar)",256,96);
  text("1",play1.x+16,468);
  text("2",play2.x+16,436);
  text("3",play3.x+16,404);
  text("4",play4.x+16,372);
  clickBox(mouseX,mouseY,play1,title1);
  clickBox(mouseX,mouseY,play2,title2);
  clickBox(mouseX,mouseY,play3,title3);
  clickBox(mouseX,mouseY,play4,title4);
  play1.draw();
  image(designs[design.p1],play1.x,play1.y,32,32);
  play2.draw();
  image(designs[design.p2],play2.x,play2.y,32,32);
  image(designs[design.p1],play2.x,play2.y+32,32,32);
  play3.draw();
  image(designs[design.p3],play3.x,play3.y,32,32);
  image(designs[design.p2],play3.x,play3.y+32,32,32);
  image(designs[design.p1],play3.x,play3.y+64,32,32);
  play4.draw();
  image(designs[design.p4],play4.x,play4.y,32,32);
  image(designs[design.p3],play4.x,play4.y+32,32,32);
  image(designs[design.p2],play4.x,play4.y+64,32,32);
  image(designs[design.p1],play4.x,play4.y+96,32,32);
}

function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "2px solid black";
  textAlign(CENTER);
  textFont("monospace");
  logo1 = loadImage("data:image/png;base64,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");
  logo2 = loadImage("data:image/png;base64,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");
  logo3 = loadImage("data:image/png;base64,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");
  logo4 = loadImage("data:image/png;base64,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");
  if (localStorage.getItem("playerselect")!=null) {
    if (localStorage.getItem("playerselect")==1) {
      logo = logo1
    } else if (localStorage.getItem("playerselect")==2) {
      logo = logo2
    } else if (localStorage.getItem("playerselect")==3) {
      logo = logo3
    } else {
      logo = logo4
    }
  } else {
    logo = logo2;
  }
  textFont(nes);
  textSize(16);
}
console.log(localStorage.getItem("playerselect"));
