var testmode = false; // should be false
var level = 0;        // should be 0

var levels = 5;       // number of levels

function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "1px solid black";
  textAlign(CENTER);
  textFont("monospace");
  dither = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAS0lEQVRYR+3SsQ0AMAgDQbP/0IkQockAmOJpEJWxdCHpqCbeHr0zdDTwz+vWWd7yyIoHLM3bHAYwgAEMYAADGMAABjCAAQxgwG7gApZ3ACCkcd1GAAAAAElFTkSuQmCC");
  collumn = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAApElEQVRYR+2W0Q6AIAhF8/8/ulYbm91UCGTwQG8Z5lG4V9rxfc7BWD/U4DvFz8bxd684nHQHpwUgWATkdo7z1CcQDkC51ILg/OfdUgN/U6EGkOaYFkBVLEElJxAOsNRxJ1sOVJ2CNADa6i8fcLsLygeGshrI0mxEaWQo3TFa8rYiLB+ofmBWXFyXbJYhd826A5QPWKu/+oFtVmxNhbopDZehK8AFLr9wISIiNLMAAAAASUVORK5CYII=");
}

function t2hms(t) {
  var tempT = t;
  var h = 0;
  var m = 0;
  var s = 0;
  while (tempT>0) {
    if (tempT>=3600) {
      h++;
      tempT-=3600;
    } else if (tempT>=60) {
      m++;
      tempT-=60;
    } else {
      s+=tempT;
      tempT-=tempT;
    }
  }
  return h+"h "+m+"m "+floor(s*100+0.5)/100+"s";
}

function draw() {
  
}

var screen = {};
screen.width = 512;
screen.height = 512;
screen.x = 0;
screen.y = 0;
screen.scrollX = 0;
screen.scrollY = 0;
screen.autoScroll = false;

var A = 255; // player 1 spawn
var B = 256; // switch
var W = 257; // win
var T = 10;  // collumn semisolid
var C = 11;  // collumn background
var F = 12;  // fan
var M = 20;  // center a tile horizontally
var V = 21;  // center a tile vertically
// 0 = empty
// 1 = solid block
// 2 = solid switchable
// 3 = nonsolid switchable
// 4 = spike
// 5 = semisolid
// 6 = fall-through semisolid
// 7 = dithering background
// 8 = collumn left
// 9 = collumn right

var level0 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,W,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,3,0,0,0,0,0,0,3,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
var level1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,W,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,F,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,B,M,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0],
  [0,0,0,B,B,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,5,0,M,3,3,M,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,M,B,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var level2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,B],
  [0,0,0,0,0,0,0,0,1,3,1,1,1,1,1,1],
  [1,V,1,0,0,0,0,0,1,0,0,0,0,0,0,W],
  [1,B,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,A,0,0,0,0,1,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,F,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var level3 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,M,W,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0,0,0,4,0,0,0],
  [0,0,0,1,0,1,2,1,1,1,1,1,3,1,1,0,0,0],
  [0,0,0,1,B,1,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,3,1,1,1,3,1,2,1,1,1,0,0,0,0],
  [0,0,0,1,0,0,A,1,0,0,0,0,B,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,F,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0]
]
var level4 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,W,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,A,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,1,0,0,V,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,F,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0]
]

var end = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,0,0,0,0,0,0,3,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,0,0,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var test = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,5,T,5,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,T,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,C,0,0,C,0,0,0,0,0,0],
  [0,0,0,0,0,0,C,0,0,C,0,0,0,0,0,0],
  [5,6,6,5,5,5,5,5,5,5,5,5,5,6,6,5],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,F,2,2,0,8,7,7,9,0,3,3,F,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,8,7,7,9,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,0,A,0,0,0,0,0,0,0,0,0,0,B,0,4],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


var texts = ["Start!","Switch it up!","Into oblivion","Merry go around","Trampoline",""];



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
function collide(r1,r2){
  var dx=(r1.x+r1.w/2)-(r2.x+r2.w/2);
  var dy=(r1.y+r1.h/2)-(r2.y+r2.h/2);
  var width=(r1.w+r2.w)/2;
  var height=(r1.h+r2.h)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
    if(crossWidth>crossHeight){
      collision=(crossWidth>(-crossHeight))?'bottom':'left';
    }else{
      collision=(crossWidth>-(crossHeight))?'right':'top';
    }
  }
  return(collision);
}
var win = {};

var swapped = false;
var blocks = [];
var on = [];
var off = [];
var spikes = [];
var playerStartX = 0;
var playerStartY = 0;
var switches = [];

var p = new Rectangle(playerStartX,playerStartY,32,32,0);
var dp = 0;
var speedY = 0;
var speedX = 0;
var up = false;
var left = false;
var right = false;
var down = false;

var fail1 = false;

averagePlayer = new p5.Vector(0,0);

function game(stage) {
screen.scrollX = 0;
screen.scrollY = 0;
screen.autoScroll = false;
screen.width = stage[0].length*32;
screen.height = stage.length*32;
screen.offset = 0;
screen.x = 0;
screen.y = screen.height;

win.x = -32;
win.y = -32;
win.p1 = false;
swapped = false;



blocks = [];
on = [];
off = [];
spikes = [];
semisolids  = [];
dithering  = [];
colleft  = [];
colright  = [];
colplatform  = [];
switches = [];
col = [];
fans = [];
playerStartX = 0;
playerStartY = 0;
for (var x=0;x<stage[0].length;x++) {
  for (var y=0;y<stage.length;y++) {
    var o = 0;
    var v = 0;
    if (stage[y][x-1]!=null&&stage[y][x-1]==M) {o = -16;}
    if (stage[y][x+1]!=null&&stage[y][x+1]==M) {o = 16;}
    if (stage[y-1]!=null&&stage[y-1][x]==V) {v = -16;}
    if (stage[y+1]!=null&&stage[y+1][x]==V) {v = 16;}
    if (stage[y][x]==1) {
      blocks[blocks.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==2) {
      on[on.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==3) {
      off[off.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==4) {
      spikes[spikes.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==5) {
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x+1]==5||stage[y][x+1]==T) {
        semisolids[semisolids.length-1].ex = true;
      } else {
        semisolids[semisolids.length-1].ex = false;
      }
      if (typeof stage[y+1] == "object") {
        if (stage[y+1][x]==7) {
          semisolids[semisolids.length-1].dith = true;
        } else {
          semisolids[semisolids.length-1].dith = false;
        }
      }
    }
    if (stage[y][x]==6) {
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x]==6) {
        semisolids[semisolids.length-1].fall = true;
      } else {
        semisolids[semisolids.length-1].fall = false;
      }
    }
    if (stage[y][x]==7) {
      dithering[dithering.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
    }
    if (stage[y][x]==8) {
      colleft[colleft.length] = new Rectangle(x*32+4+o,y*32+v,32,28,255);
    }
    if (stage[y][x]==9) {
      colright[colright.length] = new Rectangle(x*32+o,y*32+v,32,28,255);
    }
    if (stage[y][x]==T) {
      colplatform[colplatform.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32+v,32,2,0);
      if (stage[y][x+1]==5||stage[y][x+1]==T) {
        semisolids[semisolids.length-1].ex = true;
      } else {
        semisolids[semisolids.length-1].ex = false;
      }
    }
    
    if (stage[y][x]==C) {
      col[col.length] = new Rectangle(x*32+o,y*32+v,32,32,255);
    }
    if (stage[y][x]==F) {
      fans[fans.length] = new Rectangle(x*32+o,y*32+16+v,32,16,0);
    }
    if (stage[y][x]==A) {
      playerStartX = x*32+o;
      playerStartY = y*32;
    }
    if (stage[y][x]==B) {
      switches[switches.length] = new Rectangle(x*32+o,y*32+v,32,32,0);
    }
    if (stage[y][x]==W) {
      win.x = x*32+o;
      win.y = y*32+v;
    }
  }
}
p = new Rectangle(playerStartX,playerStartY,32,32,0);
dp = 0;
speedY = 0;
speedX = 0;
up = false;
left = false;
right = false;
down = false;

fail1 = false;

averagePlayer = new p5.Vector(playerStartX,playerStartY);

particles = [];

createParticle = function(x,y) {
  particles[particles.length] = new Rectangle(x,y,4,4,0);
  particles[particles.length-1].t = 60;
}


draw = function() {
  if (level<levels) {
    texts[texts.length-1]="End.\nBeaten in "+t2hms(floor(millis()/10)/100)+"\n\n"+(function(t){if(t<20){return "This... isn't possible.\nDid you cheat?"}else if(t<=90){return "Umm..."}else if(t<=300){return "Nice."}else if(t<600){return "You did okay.\nAim for less than five minutes."}else{return "Try to get less than 10 minutes next time."};})(floor(millis()/10)/100);
  }
  if (screen.autoScroll==false) {
    screen.x = 0;
    screen.y = screen.height-512;
    if ((screen.width>512)&&averagePlayer.x>256&&averagePlayer.x<screen.width-256) {
      screen.x = averagePlayer.x-256;
    }
    if (averagePlayer.x>=screen.width-256) {
      screen.x = screen.width-512;
    }
    if ((screen.height>512)&&averagePlayer.y>256&&averagePlayer.y<screen.height-256) {
      screen.y = averagePlayer.y-256;
    }
    if (averagePlayer.y<=256) {
      screen.y = 0;
    }
    translate(-screen.x,-screen.y);
  } else {
    screen.x += screen.scrollX;
    screen.y += screen.scrollY;
    translate(-screen.x, -screen.y);
  }
  background(255);
  fill(0);
  var bound = 48;
  var rate = 1;
  if ((right||left)) {bound = 128; rate = 0.65;}
  if (right&&screen.offset<bound) {screen.offset+=rate;}
  if (right&&screen.offset>bound) {screen.offset-=rate;}
  if (left&&screen.offset<-bound) {screen.offset+=rate;}
  if (left&&screen.offset>-bound) {screen.offset-=rate;}
  averagePlayer.x = p.x+p.w*0.5+screen.offset;
  averagePlayer.y = p.y+p.h*0.5;
  
  for (var i=0;i<switches.length;i++) {
    var obsticle = switches[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      fill(255);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(0);
      if (swapped==true) {
        rect(obsticle.x+8,obsticle.y+8,obsticle.w-16,obsticle.h-16);
      }
    }
    if (collide(p,obsticle)!=="none"&&!obsticle.touching) {
      obsticle.touching = true;
      swapped = !swapped;
      var temp = on;
      on = off;
      off = temp;
    }
    if (collide(p,obsticle)=="none"&&obsticle.touching) {
      obsticle.touching = null;
    }
  }
  for (var i=0;i<off.length;i++) {
    var obsticle = off[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(0);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(255);
      rect(obsticle.x+6,obsticle.y+6,obsticle.w-12,obsticle.h-12);
      fill(0);
    }
  }
  for (var i=0;i<on.length;i++) {
    var obsticle = on[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(0);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
      fill(255);
    }
  }
  for (var i=0;i<blocks.length;i++) {
    var obsticle = blocks[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
    }
  }
  for (var i=0;i<particles.length;i++) {
    var obsticle = particles[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      obsticle.t--;
      obsticle.y-=4;
      if (obsticle.t<=0) {
        particles.splice(i,1);
      }
    }
  }
  //fans
  for (var i=0;i<fans.length;i++) {
    var obsticle = fans[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      if (Math.random()<0.05) {
        createParticle(obsticle.x+Math.floor(Math.random()*28),obsticle.y-4);
      }
    }
  }
  //
  for (var i=0;i<dithering.length;i++) {
    var obsticle = dithering[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      image(dither,obsticle.x,obsticle.y,32,32);
      fill(0);
    }
  }
  for (var i=0;i<colleft.length;i++) {
    var obsticle = colleft[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(dither,obsticle.x,obsticle.y,32,32);
      fill(255);
      rect(obsticle.x,obsticle.y,28,32);
      image(collumn,obsticle.x,obsticle.y,32,32);
      fill(0);
    }
  }
  for (var i=0;i<colright.length;i++) {
    var obsticle = colright[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(dither,obsticle.x-4,obsticle.y,32,32);
      fill(255);
      rect(obsticle.x,obsticle.y,28,32);
      image(collumn,obsticle.x-4,obsticle.y,32,32);
      fill(0);
    }
  }
  
  for (var i=0;i<colplatform.length;i++) {
    var obsticle = colplatform[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(collumn,obsticle.x,obsticle.y,32,32);
    }
  }
  for (var i=0;i<col.length;i++) {
    var obsticle = col[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      image(collumn,obsticle.x,obsticle.y,32,32);
    }
  }
  for (var i=0;i<semisolids.length;i++) {
    var obsticle = semisolids[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      rect(obsticle.x+4,obsticle.y+2,24,2);
      fill(0);
      if (obsticle.ex) {
        rect(obsticle.x+28,obsticle.y+2,8,2);
      }
      if (obsticle.fall==true) {
        fill(255);
        rect(obsticle.x,obsticle.y,4,3);
        rect(obsticle.x,obsticle.y+2,6,3);
        rect(obsticle.x+14,obsticle.y,6,3);
        rect(obsticle.x+12,obsticle.y+2,10,3);
        rect(obsticle.x+30,obsticle.y,2,3);
        fill(0);
      }
      if (obsticle.dith==true) {
        image(dither,obsticle.x,obsticle.y,32,32);
      }
    }
  }
  rect(win.x+4,win.y+4,24,24);
  fill(255);
  rect(win.x+10,win.y+10,12,12);
  fill(0);
  if (collide({"x":win.x+4,"y":win.y+4,"w":24,"h":24},p)!=="none") {
    win.p1 = true;
  }
  for (var i=0;i<spikes.length;i++) {
    var obsticle = spikes[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      fill(0);
      rect(obsticle.x,obsticle.y+28,2.2,4);
      rect(obsticle.x+2,obsticle.y+24,2.2,8);
      rect(obsticle.x+4,obsticle.y+20,2.2,12);
      rect(obsticle.x+6,obsticle.y+16,2.2,16);
      rect(obsticle.x+8,obsticle.y+12,2.2,20);
      rect(obsticle.x+10,obsticle.y+8,2.2,24);
      rect(obsticle.x+12,obsticle.y+4,2.2,28);
      rect(obsticle.x+14,obsticle.y,2.2,32);
      rect(obsticle.x+16,obsticle.y,2.2,32);
      rect(obsticle.x+18,obsticle.y+4,2.2,28);
      rect(obsticle.x+20,obsticle.y+8,2.2,24);
      rect(obsticle.x+22,obsticle.y+12,2.2,20);
      rect(obsticle.x+24,obsticle.y+16,2.2,16);
      rect(obsticle.x+26,obsticle.y+20,2.2,12);
      rect(obsticle.x+28,obsticle.y+24,2.2,8);
      rect(obsticle.x+30,obsticle.y+28,2.2,4);
      
      if (collide({"x":obsticle.x+6,"y":obsticle.y+2,"w":20,"h":28},p)!=="none") {
        fail1 = true;
      }
    }
  }
  
  var inAir = true;
  if (win.p1==false&&fail1==false) {
    speedY+=0.4;
    p.y+=speedY;
    for (var i=0;i<blocks.length;i++) {
      var obsticle = blocks[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      obsticle.draw();
      }
    }
    for (var i=0;i<fans.length;i++) {
      var obsticle = fans[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,{"x":obsticle.x,"y":obsticle.y-240,"w":32,"h":240})!=="none") {
        speedY -= 0.6;
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      obsticle.draw();
      }
    }
    for (i=0;i<on.length;i++) {
      obsticle = on[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p,obsticle)=="top") {
        if (right) {
          speedX += 0.3;
          speedX = speedX*0.90;
        }
        if (left) {
          speedX -= 0.3;
          speedX = speedX*0.90;
        }
        p.y = obsticle.y-p.h;
        if (!left&&!right) {
          speedX = speedX*0.82;
        }
        if (up) {
          speedY=-10;
        } else {
          speedY = 0;
        }
      }
      if (collide(p,obsticle)=="bottom") {
        p.y = obsticle.y+obsticle.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p,obsticle)=="left"&&p.y+p.h>obsticle.y+2) {
        if (p.x<screen.x) {fail1=true;}
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)=="right"&&p.y+p.h>obsticle.y+2) {
        if (p.x+p.w>screen.x+512) {fail1=true;}
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
      }
      if (collide(p,obsticle)!=="none") {
        inAir = false;
      }
      if (up&&(p.y>=screen.height-p.h||collide(p,obsticle)=="bottom")&&collide(p,obsticle)!=="top") {
        speedY=-10;
      }
      }
    }
    for (i=0;i<semisolids.length;i++) {
      obsticle = semisolids[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
        if (collide(p,obsticle)=="top"&&speedY>=0&&p.y<=obsticle.y-24&&(!(down&&obsticle.fall))) {
          if (right) {
            speedX += 0.3;
            speedX = speedX*0.90;
          }
          if (left) {
            speedX -= 0.3;
            speedX = speedX*0.90;
          }
          p.y = obsticle.y-p.h;
          if (!left&&!right) {
            speedX = speedX*0.82;
          }
          if (up) {
            speedY=-10;
          } else {
            speedY = 0;
          }
          inAir = false;
        }
      }
    }
    
    if (inAir) {
      if (right) {
        speedX += 0.1;
      }
      if (left) {
        speedX -= 0.1;
      }
    }
    if (p.x<screen.x) {
      p.x=screen.x;
      speedX = 0;
    }
    if (p.x+p.w>screen.x+512) {
      p.x=screen.x+512-p.w-0.1;
      speedX = 0;
    }
    if (p.y<screen.y) {
      p.y=screen.y;
    }
    if (p.y>screen.y+512-p.h) {
      fail1 = true;
    } else {
      if (right) {
        speedX += 0.1;
      }
      if (left) {
        speedX -= 0.1;
      }
    }
    speedX = constrain(speedX,-4,4);
    p.x+=speedX;
  }
  if (win.p1==false) {
    p.draw();
    dp = p.x;
  }
  if (win.p1==true) {
    //text("Win!",win.x+4,win.y-4);
    level++;
    if (level>=levels) {
      game(end);
    } else {
      game(window["level"+level]);
    }
  }
  if (fail1) {
    game(stage);
  }
  text(texts[level],256,24);
}
}
function keyReleased() {
  if (key=="ArrowRight") {
    right = false;
  }
  if (key=="ArrowLeft") {
    left = false;
  }
  if (key=="ArrowUp") {
    up = false;
  }
  if (key=="ArrowDown") {
    down = false;
  }
}
function keyPressed() {
  if (key=="ArrowRight") {
    right = true;
  }
  if (key=="ArrowLeft") {
    left = true;
  }
  if (key=="ArrowUp") {
    up = true;
  }
  if (key=="ArrowDown") {
    down = true;
  }
  if (key==" ") {
    fail1 = true;
    fail2 = true;
  }
}
function mouseClicked() {
  if (level>=levels) {
    window.location.replace("index.html");
  }
}

if (!testmode) {
  game(window["level"+level]);
} else {
  game(test);
}
