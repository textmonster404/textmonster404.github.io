var r = 5; // You may Edit this.
var n;


var balls = [];
var mouseSpeedX = 0;
var mouseSpeedY = 0;
var previousMouseX;
var previousMouseY;
function setup() {
  n = random(40);
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i=0;i<n;i++) {
    balls[i] = {};
    balls[i].speedX = random(16)-8;
    balls[i].speedY = random(16)-8;
    balls[i].x = random(window.innerWidth);
    balls[i].y = random(window.innerHeight);
    balls[i].idle = false;
    balls[i].idleSeconds = 0;
    balls[i].color = color(random(255),random(255),random(255));
  }
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}
function draw() {
  mouseSpeedX = mouseX-previousMouseX;
  mouseSpeedY = mouseY-previousMouseY;
  background(255);
  for (var i=0;i<n;i++) {
    fill(balls[i].color);
    stroke(balls[i].color);
    ellipse(balls[i].x,balls[i].y,2*r,2*r);
    if (!balls[i].idle) {
      if (balls[i].x>=window.innerWidth-r) {
        balls[i].speedX*=-1;
        balls[i].x=window.innerWidth-r-1;
      }
      if (balls[i].y>=window.innerHeight-r) {
        balls[i].speedY*=-0.9;
        balls[i].y=window.innerHeight-r;
        balls[i].speedX*=0.95;
      }
      if (balls[i].x<=r) {
        balls[i].speedX*=-1;
        balls[i].x=r;
      }
      if (balls[i].y<=r) {
        balls[i].speedY*=-1;
        balls[i].y=r;
      }
    }
    balls[i].speedY+=0.2;
    if (sqrt(abs(mouseX-balls[i].x)**2+abs(mouseY-balls[i].y)**2)<=r) {
      balls[i].speedX = mouseSpeedX;
      balls[i].speedY = mouseSpeedY;
      balls[i].x+=balls[i].speedX;
      balls[i].y+=balls[i].speedY;
    }
    balls[i].x+=balls[i].speedX;
    balls[i].y+=balls[i].speedY;
    if (abs(balls[i].speedY)<=0.21) {balls[i].idleSeconds+=10;} else {balls[i].idleSeconds--;}
    if (balls[i].idleSeconds>=2000) {balls[i].idle=true;}
    if (balls[i].y>window.innerHeight+100*r) {balls[i].y=-r*10;balls[i].speedX = random(16)-8;balls[i].speedY = random(10)-2;}
    if (balls[i].idle && balls[i].y>=r && balls[i].y<4*r) {balls[i].idle=false;balls[i].idleSeconds=0;}
  }
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}