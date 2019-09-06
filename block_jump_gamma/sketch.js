function clickBox(x,y,box,f) {
  if (x>=box.x&&x<=box.x+box.w&&y>=box.y&&y<=box.y+box.h) {
    f();
  }
}

function player1() {window.location.replace("p1.html");}
function player2() {window.location.replace("p2.html");}
function player3() {window.location.replace("p3.html");}
function player4() {window.location.replace("p4.html");}

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
}

function draw() {
  background(255);
  fill(0);
  text("How Many Players?\n(click a bar)",256,24);
  text("1",play1.x+16,468);
  text("2",play2.x+16,436);
  text("3",play3.x+16,404);
  text("4",play4.x+16,372);
  play1.draw();
  play2.draw();
  fill(255);
  rect(play2.x+2,play2.y+2,28,28);
  fill(255,255,0);
  rect(play3.x,play3.y,32,32);
  fill(0,255,0);
  rect(play3.x,play3.y+32,32,32);
  fill(255,0,0);
  rect(play3.x,play3.y+64,32,32);
  fill(0,0,255);
  rect(play4.x,play4.y,32,32);
  fill(255,255,0);
  rect(play4.x,play4.y+32,32,32);
  fill(0,255,0);
  rect(play4.x,play4.y+64,32,32);
  fill(255,0,0);
  rect(play4.x,play4.y+96,32,32);
}

function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "1px solid black";
  textAlign(CENTER);
  textFont("monospace");
}