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
}

function draw() {
  background(255);
  fill(0);
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
}
console.log(localStorage.getItem("playerselect"));
