var testmode = false; // should be false
var level = 0;        // should be 0

var levels = 4;       // number of levels

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
var B = 256; // player 2 spawn
var K = 14;  // player 3 spawn
var W = 257; // win
var S = 258; // switch
var T = 10;  // collumn semisolid
var C = 11;  // collumn background
var I = 12;  // player 3 block
var M = 20;  // center the tile on the right
var D = 30;  // on tile
var E = 31;  // off tile
// 0 = empty
// 1 = solid block
// 2 = player 1 block
// 3 = player 2 block
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
  [0,0,0,I,I,I,0,0,0,0,2,2,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,M,K,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
var level1 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,M,W],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,3,3,0,I,I,0,2,2,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,K,B,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var level2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,W,0,0,0],
  [0,0,0,0,3,3,3,0,0,0,0,I,I,I,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,3,B,3,0,0,0,0,I,K,I,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,5,6,5,0,0,0,0,5,6,5,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,I,I],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,A,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,2,2,2,2,2,0,0,3,3,3,3,3,3,0,0,I,I,I,I,I,I,I],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var level3 = [
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,4,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [3,1,I,I,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [2,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [E,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [S,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [E,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [2,1,0,0,0,0,0,0,0,1,W,0,0,0,0,0,0,0,0],
  [3,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,D,0,0,0,0,0,0,0,D,3,I,0,D,3,0,0,0,0],
  [0,D,0,0,0,0,0,0,0,D,3,I,S,D,3,0,0,2,2],
  [0,D,0,A,0,B,0,K,0,D,3,I,0,D,3,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,D,2,0,0,0,0,0,E,0,0,0,0,0,2,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
  [0,0,0,I,I,I,0,0,0,0,2,2,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,A,0,0,0,0,0,M,K,0,0,0,0,0,B,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var test = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,M,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,3,3,0,0,0,0,0,0,I,I,I,I,I,I,I,0,0,0,0,0,0,2,2,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,S,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,D,D,1,E,E,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,A,0,K,0,B,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


var texts = ["Start!","Leap Frog","Ride to victory","Switch it up     ",""];



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

var blocks = [];
var p1pass = [];
var p2pass = [];
var p3pass = [];
var spikes = [];
var switches = [];
var on = [];
var off = [];
var playerStartX = 0;
var playerStartY = 0;
var playerStartX2 = 0;
var playerStartY2 = 0;
var playerStartX3 = 0;
var playerStartY3 = 0;

var swapped = false;

var p = new Rectangle(playerStartX,playerStartY,32,32,[255, 0, 0]);
var p2 = new Rectangle(playerStartX2,playerStartY2,32,32,[0, 255, 0]);
var p3 = new Rectangle(playerStartX3,playerStartY3,32,32,[255, 255, 0]);

var dp = 0;
var dp2 = 0;
var dp3 = 0;
var speedY = 0;
var speedX = 0;
var speedY2 = 0;
var speedX2 = 0;
var speedY3 = 0;
var speedX3 = 0;
var up = false;
var left = false;
var right = false;
var down = false;
var up2 = false;
var left2 = false;
var right2 = false;
var down2 = false;
var up3 = false;
var left3 = false;
var right3 = false;
var down3 = false;

var fail1 = false;
var fail2 = false;
var fail3 = false;

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
win.p2 = false;
win.p3 = false;

swapped = false;

blocks = [];
p1pass = [];
p2pass = [];
p3pass = [];
spikes = [];
switches = [];
on = [];
off = [];
semisolids  = [];
dithering  = [];
colleft  = [];
colright  = [];
colplatform  = [];
col = [];
playerStartX = 0;
playerStartY = 0;
playerStartX2 = 0;
playerStartY2 = 0;
playerStartX3 = 0;
playerStartY3 = 0;
for (var x=0;x<stage[0].length;x++) {
  for (var y=0;y<stage.length;y++) {
    var o = 0;
    if (stage[y][x-1]==M) {o = -16;}
    if (stage[y][x+1]!=null&&stage[y][x+1]==M) {o = 16;}
    if (stage[y][x]==1) {
      blocks[blocks.length] = new Rectangle(x*32+o,y*32,32,32,0);
    }
    if (stage[y][x]==2) {
      p1pass[p1pass.length] = new Rectangle(x*32+o,y*32,32,32,[255,0,0]);
    }
    if (stage[y][x]==3) {
      p2pass[p2pass.length] = new Rectangle(x*32+o,y*32,32,32,[0,255,0]);
    }
    if (stage[y][x]==I) {
      p3pass[p3pass.length] = new Rectangle(x*32+o,y*32,32,32,[255,255,0]);
    }
    if (stage[y][x]==4) {
      spikes[spikes.length] = new Rectangle(x*32+o,y*32,32,32,0);
    }
    if (stage[y][x]==5) {
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32,32,2,0);
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
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32,32,2,0);
      if (stage[y][x]==6) {
        semisolids[semisolids.length-1].fall = true;
      } else {
        semisolids[semisolids.length-1].fall = false;
      }
    }
    if (stage[y][x]==7) {
      dithering[dithering.length] = new Rectangle(x*32+o,y*32,32,32,255);
    }
    if (stage[y][x]==8) {
      colleft[colleft.length] = new Rectangle(x*32+4+o,y*32,32,28,255);
    }
    if (stage[y][x]==9) {
      colright[colright.length] = new Rectangle(x*32+o,y*32,32,28,255);
    }
    if (stage[y][x]==T) {
      colplatform[colplatform.length] = new Rectangle(x*32+o,y*32,32,32,255);
      semisolids[semisolids.length] = new Rectangle(x*32+o,y*32,32,2,0);
      if (stage[y][x+1]==5||stage[y][x+1]==T) {
        semisolids[semisolids.length-1].ex = true;
      } else {
        semisolids[semisolids.length-1].ex = false;
      }
    }
    
    if (stage[y][x]==C) {
      col[col.length] = new Rectangle(x*32+o,y*32,32,32,255);
    }
    if (stage[y][x]==A) {
      playerStartX = x*32+o;
      playerStartY = y*32;
    }
    if (stage[y][x]==B) {
      playerStartX2 = x*32+o;
      playerStartY2 = y*32;
    }
    if (stage[y][x]==K) {
      playerStartX3 = x*32+o;
      playerStartY3 = y*32;
    }
    if (stage[y][x]==W) {
      win.x = x*32+o;
      win.y = y*32;
    }
    if (stage[y][x]==S) {
      switches[switches.length] = new Rectangle(x*32+o,y*32,32,32,0);
    }
    if (stage[y][x]==D) {
      on[on.length] = new Rectangle(x*32+o,y*32,32,32,0);
    }
    if (stage[y][x]==E) {
      off[off.length] = new Rectangle(x*32+o,y*32,32,32,0);
    }
  }
}
p = new Rectangle(playerStartX,playerStartY,32,32,[255, 0, 0]);
p2 = new Rectangle(playerStartX2,playerStartY2,32,32,[0, 255, 0]);
p3 = new Rectangle(playerStartX3,playerStartY3,32,32,[255, 255, 0]);
dp = 0;
dp2 = 0;
dp3 = 0;
speedY = 0;
speedX = 0;
speedY2 = 0;
speedX2 = 0;
speedY3 = 0;
speedX3 = 0;
up = false;
left = false;
right = false;
down = false;
up2 = false;
left2 = false;
right2 = false;
down2 = false;
up3 = false;
left3 = false;
right3 = false;
down3 = false;

fail1 = false;
fail2 = false;
fail3 = false;

averagePlayer = new p5.Vector((playerStartX+playerStartX2+playerStartX3)*0.33,(playerStartY+playerStartY2+playerStartY3)*0.33);


hasup = true;
hasup2 = true;
hasup3 = true;

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
  if ((right||left)&&(right2||left2)&&(right3||left3)) {bound = 64; rate = 0.4;}
  if (right&&screen.offset<bound) {screen.offset+=rate;}
  if (right&&screen.offset>bound) {screen.offset-=rate;}
  if (left&&screen.offset<-bound) {screen.offset+=rate;}
  if (left&&screen.offset>-bound) {screen.offset-=rate;}
  if (right2&&screen.offset<bound) {screen.offset+=rate;}
  if (right2&&screen.offset>bound) {screen.offset-=rate;}
  if (left2&&screen.offset<-bound) {screen.offset+=rate;}
  if (left2&&screen.offset>-bound) {screen.offset-=rate;}
  if (right3&&screen.offset<bound) {screen.offset+=rate;}
  if (right3&&screen.offset>bound) {screen.offset-=rate;}
  if (left3&&screen.offset<-bound) {screen.offset+=rate;}
  if (left3&&screen.offset>-bound) {screen.offset-=rate;}
  averagePlayer.x = (p.x+p.w*0.5+p2.x+p2.w*0.5+p3.x+p3.w*0.5)/3+screen.offset;
  averagePlayer.y = (p.y+p.h*0.5+p2.y+p2.h*0.5+p3.y+p3.h*0.5)/3;
  
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
    if ((collide(p,obsticle)!=="none"||collide(p2,obsticle)!=="none"||collide(p3,obsticle)!=="none")&&!obsticle.touching) {
      obsticle.touching = true;
      swapped = !swapped;
      var temp = on;
      on = off;
      off = temp;
    }
    if ((collide(p,obsticle)=="none"&&collide(p2,obsticle)=="none"&&collide(p3,obsticle)=="none")&&obsticle.touching) {
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
  for (var i=0;i<p2pass.length;i++) {
    var obsticle = p2pass[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(p2.c);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
    }
  }
  for (var i=0;i<p1pass.length;i++) {
    var obsticle = p1pass[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(p.c);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
    }
  }
  for (var i=0;i<p3pass.length;i++) {
    var obsticle = p3pass[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
      
      fill(255);
      rect(obsticle.x+2,obsticle.y+2,obsticle.w-4,obsticle.h-4);
      fill(p3.c);
      rect(obsticle.x+4,obsticle.y+4,obsticle.w-8,obsticle.h-8);
    }
  }
  for (var i=0;i<blocks.length;i++) {
    var obsticle = blocks[i];
    if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      obsticle.draw();
    }
  }
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
  if (collide({"x":win.x+4,"y":win.y+4,"w":24,"h":24},p2)!=="none") {
    win.p2 = true;
  }
  if (collide({"x":win.x+4,"y":win.y+4,"w":24,"h":24},p3)!=="none") {
    win.p3 = true;
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
      if (collide({"x":obsticle.x+6,"y":obsticle.y+2,"w":20,"h":28},p2)!=="none") {
        fail2 = true;
      }
      if (collide({"x":obsticle.x+6,"y":obsticle.y+2,"w":20,"h":28},p3)!=="none") {
        fail3 = true;
      }
    }
  }
  text(texts[level],256,24);
  var inAir = true;
  if (win.p1==false&&fail1==false) {
    speedY+=0.4;
    p.y+=speedY;
    if (win.p2==false&&fail2==false) {
      obsticle = p2;
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
        p.x += p2.x - dp2;
        inAir = false;
      }
      if (collide(p,obsticle)=="left") {
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
        inAir = false;
      }
      if (collide(p,obsticle)=="right") {
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
        inAir = false;
      }
    }
    if (win.p3==false&&fail3==false) {
      obsticle = p3;
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
        p.x += p3.x - dp3;
        inAir = false;
      }
      if (collide(p,obsticle)=="left") {
        p.x = obsticle.x-p.w;
        if (right) {
          speedX = 0;
        }
        inAir = false;
      }
      if (collide(p,obsticle)=="right") {
        p.x = obsticle.x+obsticle.w;
        if (left) {
          speedX = 0;
        }
        inAir = false;
      }
    }
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
        if (collide(p,p2)=="top") {
          p2.y = p.y+p.h+0.01;
          speedY2 *= -0.25;
        }
        if (collide(p,p3)=="top") {
          p3.y = p.y+p.h+0.01;
          speedY3 *= -0.25;
        }
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
    for (var i=0;i<on.length;i++) {
      var obsticle = on[i];
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
        if (collide(p,p2)=="top") {
          p2.y = p.y+p.h+0.01;
          speedY2 *= -0.25;
        }
        if (collide(p,p3)=="top") {
          p3.y = p.y+p.h+0.01;
          speedY3 *= -0.25;
        }
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
    for (i=0;i<p1pass.length;i++) {
      obsticle = p1pass[i];
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
        if (collide(p,p2)=="top") {
          p2.y = p.y+p.h+0.01;
          speedY2 *= -0.25;
        }
        if (collide(p,p3)=="top") {
          p3.y = p.y+p.h+0.01;
          speedY3 *= -0.25;
        }
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
        speedX += 0.25;
      }
      if (left) {
        speedX -= 0.25;
      }
      if ((!(up&&hasup))||speedY>0) {
        hasup=false;
      }
      if (!hasup) {
        speedY+=0.3
      }
    } else {
      hasup = true;
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
      if (collide(p,p2)=="top") {
        p2.y = p.y+p.h+0.01;
        speedY2 *= -0.25;
      }
      if (collide(p,p3)=="top") {
        p3.y = p.y+p.h+0.01;
        speedY3 *= -0.25;
      }
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
    speedY = constrain(speedY,-12,9);
    speedX = constrain(speedX,-4,4);
    p.x+=speedX;
  }
  if (win.p2==false&&fail2==false) {
    dp2 = p2.x;
    speedY2+=0.4;
    p2.y+=speedY2;
    inAir = true;
    if (win.p1==false&&fail1==false) {
      obsticle = p;
      if (collide(p2,obsticle)=="top") {
        if (right2) {
          speedX2 += 0.3;
          speedX2 = speedX2*0.90;
        }
        if (left2) {
          speedX2 -= 0.3;
          speedX2 = speedX2*0.90;
        }
        p2.y = obsticle.y-p2.h;
        if (!left2&&!right2) {
          speedX2 = speedX2*0.82;
        }
        if (up2) {
          speedY2=-10;
        } else {
          speedY2 = 0;
        }
        p2.x += p.x - dp;
        inAir = false;
      }
      if (collide(p2,obsticle)=="left") {
        p2.x = obsticle.x-p2.w;
        if (right2) {
          speedX2 = 0;
        }
        inAir = false;
      }
      if (collide(p2,obsticle)=="right") {
        p2.x = obsticle.x+obsticle.w;
        if (left2) {
          speedX2 = 0;
        }
        inAir = false;
      }
    }
    if (win.p3==false&&fail3==false) {
      obsticle = p3;
      if (collide(p2,obsticle)=="top") {
        if (right2) {
          speedX2 += 0.3;
          speedX2 = speedX2*0.90;
        }
        if (left2) {
          speedX2 -= 0.3;
          speedX2 = speedX2*0.90;
        }
        p2.y = obsticle.y-p2.h;
        if (!left2&&!right2) {
          speedX2 = speedX2*0.82;
        }
        if (up2) {
          speedY2=-10;
        } else {
          speedY2 = 0;
        }
        p2.x += p3.x - dp3;
        inAir = false;
      }
      if (collide(p2,obsticle)=="left") {
        p2.x = obsticle.x-p2.w;
        if (right2) {
          speedX2 = 0;
        }
        inAir = false;
      }
      if (collide(p2,obsticle)=="right") {
        p2.x = obsticle.x+obsticle.w;
        if (left2) {
          speedX2 = 0;
        }
        inAir = false;
      }
    }
    for (i=0;i<blocks.length;i++) {
      obsticle = blocks[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p2,obsticle)=="top") {
        if (right2) {
          speedX2 += 0.3;
          speedX2 = speedX2*0.90;
        }
        if (left2) {
          speedX2 -= 0.3;
          speedX2 = speedX2*0.90;
        }
        p2.y = obsticle.y-p2.h;
        if (!left2&&!right2) {
          speedX2 = speedX2*0.82;
        }
        if (up2) {
          speedY2=-10;
        } else {
          speedY2 = 0;
        }
      }
      if (collide(p2,obsticle)=="bottom") {
        p2.y = obsticle.y+obsticle.h+0.01;
        speedY2 *= -0.25;
        if (collide(p2,p)=="top") {
          p.y = p2.y+p2.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p2,p3)=="top") {
          p3.y = p2.y+p2.h+0.01;
          speedY3 *= -0.25;
        }
      }
      if (collide(p2,obsticle)=="left"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x<screen.x) {fail2=true;}
        p2.x = obsticle.x-p2.w;
        if (right2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)=="right"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x+p2.w>screen.x+512) {fail2=true;}
        p2.x = obsticle.x+obsticle.w;
        if (left2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)!=="none") {
        inAir = false;
      }
      if (up2&&(p2.y>=screen.height-p2.h||collide(p2,obsticle)=="bottom")&&collide(p2,obsticle)!=="top") {
        speedY2=-10;
      }
      obsticle.draw();
      }
    }
    
    for (i=0;i<on.length;i++) {
      obsticle = on[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p2,obsticle)=="top") {
        if (right2) {
          speedX2 += 0.3;
          speedX2 = speedX2*0.90;
        }
        if (left2) {
          speedX2 -= 0.3;
          speedX2 = speedX2*0.90;
        }
        p2.y = obsticle.y-p2.h;
        if (!left2&&!right2) {
          speedX2 = speedX2*0.82;
        }
        if (up2) {
          speedY2=-10;
        } else {
          speedY2 = 0;
        }
      }
      if (collide(p2,obsticle)=="bottom") {
        p2.y = obsticle.y+obsticle.h+0.01;
        speedY2 *= -0.25;
        if (collide(p2,p)=="top") {
          p.y = p2.y+p2.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p2,p3)=="top") {
          p3.y = p2.y+p2.h+0.01;
          speedY3 *= -0.25;
        }
      }
      if (collide(p2,obsticle)=="left"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x<screen.x) {fail2=true;}
        p2.x = obsticle.x-p2.w;
        if (right2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)=="right"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x+p2.w>screen.x+512) {fail2=true;}
        p2.x = obsticle.x+obsticle.w;
        if (left2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)!=="none") {
        inAir = false;
      }
      if (up2&&(p2.y>=screen.height-p2.h||collide(p2,obsticle)=="bottom")&&collide(p2,obsticle)!=="top") {
        speedY2=-10;
      }
      }
    }
    for (i=0;i<p2pass.length;i++) {
      obsticle = p2pass[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p2,obsticle)=="top") {
        if (right2) {
          speedX2 += 0.3;
          speedX2 = speedX2*0.90;
        }
        if (left2) {
          speedX2 -= 0.3;
          speedX2 = speedX2*0.90;
        }
        p2.y = obsticle.y-p2.h;
        if (!left2&&!right2) {
          speedX2 = speedX2*0.82;
        }
        if (up2) {
          speedY2=-10;
        } else {
          speedY2 = 0;
        }
      }
      if (collide(p2,obsticle)=="bottom") {
        p2.y = obsticle.y+obsticle.h+0.01;
        speedY2 *= -0.25;
        if (collide(p2,p)=="top") {
          p.y = p2.y+p2.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p2,p3)=="top") {
          p3.y = p2.y+p2.h+0.01;
          speedY3 *= -0.25;
        }
      }
      if (collide(p2,obsticle)=="left"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x<screen.x) {fail2=true;}
        p2.x = obsticle.x-p2.w;
        if (right2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)=="right"&&p2.y+p2.h>obsticle.y+2) {
        if (p2.x+p2.w>screen.x+512) {fail2=true;}
        p2.x = obsticle.x+obsticle.w;
        if (left2) {
          speedX2 = 0;
        }
      }
      if (collide(p2,obsticle)!=="none") {
        inAir = false;
      }
      if (up2&&(p2.y>=screen.height-p2.h||collide(p2,obsticle)=="bottom")&&collide(p2,obsticle)!=="top") {
        speedY2=-10;
      }
      }
    }
    
    for (i=0;i<semisolids.length;i++) {
      obsticle = semisolids[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
        if (collide(p2,obsticle)=="top"&&speedY2>=0&&p2.y<=obsticle.y-24&&(!(down2&&obsticle.fall))) {
          if (right2) {
            speedX2 += 0.3;
            speedX2 = speedX2*0.90;
          }
          if (left2) {
            speedX2 -= 0.3;
            speedX2 = speedX2*0.90;
          }
          p2.y = obsticle.y-p2.h;
          if (!left2&&!right2) {
            speedX2 = speedX2*0.82;
          }
          if (up2) {
            speedY2=-10;
          } else {
            speedY2 = 0;
          }
          inAir = false;
        }
      }
    }
    
    if (inAir) {
      if (right2) {
        speedX2 += 0.25;
      }
      if (left2) {
        speedX2 -= 0.25;
      }
      if ((!(up2&&hasup2))||speedY2>0) {
        hasup2=false;
      }
      if (!hasup2) {
        speedY2+=0.3
      }
    } else {
      hasup2 = true;
    }
    
    if (p2.x<screen.x) {
      p2.x=screen.x;
      speedX2 = 0;
    }
    if (p2.x+p2.w>screen.x+512) {
      p2.x=screen.x+512-p2.w-0.1;
      speedX2 = 0;
    }
    if (p2.y<screen.y) {
      p2.y=screen.y;
      if (collide(p2,p)=="top") {
        p.y = p2.y+p2.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p2,p3)=="top") {
        p3.y = p2.y+p2.h+0.01;
        speedY3 *= -0.25;
      }
    }
    if (p2.y>screen.y+512-p2.h) {
      fail2 = true;
    } else {
      if (right2) {
        speedX2 += 0.1;
      }
      if (left2) {
        speedX2 -= 0.1;
      }
    }
    speedX2 = constrain(speedX2,-4,4);
    speedY2 = constrain(speedY2,-12,9);
    p2.x+=speedX2;
    p2.draw();
  }
  if (win.p3==false&&fail3==false) {
    dp3 = p3.x;
    speedY3+=0.4;
    p3.y+=speedY3;
    inAir = true;
    if (win.p1==false&&fail1==false) {
      obsticle = p;
      if (collide(p3,obsticle)=="top") {
        if (right3) {
          speedX3 += 0.3;
          speedX3 = speedX3*0.90;
        }
        if (left3) {
          speedX3 -= 0.3;
          speedX3 = speedX3*0.90;
        }
        p3.y = obsticle.y-p3.h;
        if (!left3&&!right3) {
          speedX3 = speedX3*0.82;
        }
        if (up3) {
          speedY3=-10;
        } else {
          speedY3 = 0;
        }
        p3.x += p.x - dp;
        inAir = false;
      }
      if (collide(p3,obsticle)=="left") {
        p3.x = obsticle.x-p3.w;
        if (right3) {
          speedX3 = 0;
        }
        inAir = false;
      }
      if (collide(p3,obsticle)=="right") {
        p3.x = obsticle.x+obsticle.w;
        if (left3) {
          speedX3 = 0;
        }
        inAir = false;
      }
    }
    if (win.p2==false&&fail2==false) {
      obsticle = p2;
      if (collide(p3,obsticle)=="top") {
        if (right3) {
          speedX3 += 0.3;
          speedX3 = speedX3*0.90;
        }
        if (left3) {
          speedX3 -= 0.3;
          speedX3 = speedX3*0.90;
        }
        p3.y = obsticle.y-p3.h;
        if (!left3&&!right3) {
          speedX3 = speedX3*0.82;
        }
        if (up3) {
          speedY3=-10;
        } else {
          speedY3 = 0;
        }
        p3.x += p2.x - dp2;
        inAir = false;
      }
      if (collide(p3,obsticle)=="left") {
        p3.x = obsticle.x-p3.w;
        if (right3) {
          speedX3 = 0;
        }
        inAir = false;
      }
      if (collide(p3,obsticle)=="right") {
        p3.x = obsticle.x+obsticle.w;
        if (left3) {
          speedX3 = 0;
        }
        inAir = false;
      }
    }
    for (i=0;i<blocks.length;i++) {
      obsticle = blocks[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p3,obsticle)=="top") {
        if (right3) {
          speedX3 += 0.3;
          speedX3 = speedX3*0.90;
        }
        if (left3) {
          speedX3 -= 0.3;
          speedX3 = speedX3*0.90;
        }
        p3.y = obsticle.y-p3.h;
        if (!left3&&!right3) {
          speedX3 = speedX3*0.82;
        }
        if (up3) {
          speedY3=-10;
        } else {
          speedY3 = 0;
        }
      }
      if (collide(p3,obsticle)=="bottom") {
        p3.y = obsticle.y+obsticle.h+0.01;
        speedY3 *= -0.25;
        if (collide(p3,p)=="top") {
          p.y = p3.y+p3.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p3,p2)=="top") {
          p2.y = p3.y+p3.h+0.01;
          speedY2 *= -0.25;
        }
      }
      if (collide(p3,obsticle)=="left"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x<screen.x) {fail3=true;}
        p3.x = obsticle.x-p3.w;
        if (right3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)=="right"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x+p3.w>screen.x+512) {fail3=true;}
        p3.x = obsticle.x+obsticle.w;
        if (left3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)!=="none") {
        inAir = false;
      }
      if (up3&&(p3.y>=screen.height-p3.h||collide(p3,obsticle)=="bottom")&&collide(p3,obsticle)!=="top") {
        speedY3=-10;
      }
      obsticle.draw();
      }
    }
    for (i=0;i<on.length;i++) {
      obsticle = on[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p3,obsticle)=="top") {
        if (right3) {
          speedX3 += 0.3;
          speedX3 = speedX3*0.90;
        }
        if (left3) {
          speedX3 -= 0.3;
          speedX3 = speedX3*0.90;
        }
        p3.y = obsticle.y-p3.h;
        if (!left3&&!right3) {
          speedX3 = speedX3*0.82;
        }
        if (up3) {
          speedY3=-10;
        } else {
          speedY3 = 0;
        }
      }
      if (collide(p3,obsticle)=="bottom") {
        p3.y = obsticle.y+obsticle.h+0.01;
        speedY3 *= -0.25;
        if (collide(p3,p)=="top") {
          p.y = p3.y+p3.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p3,p2)=="top") {
          p2.y = p3.y+p3.h+0.01;
          speedY2 *= -0.25;
        }
      }
      if (collide(p3,obsticle)=="left"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x<screen.x) {fail3=true;}
        p3.x = obsticle.x-p3.w;
        if (right3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)=="right"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x+p3.w>screen.x+512) {fail3=true;}
        p3.x = obsticle.x+obsticle.w;
        if (left3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)!=="none") {
        inAir = false;
      }
      if (up3&&(p3.y>=screen.height-p3.h||collide(p3,obsticle)=="bottom")&&collide(p3,obsticle)!=="top") {
        speedY3=-10;
      }
      }
    }
    for (i=0;i<p3pass.length;i++) {
      obsticle = p3pass[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
      if (collide(p3,obsticle)=="top") {
        if (right3) {
          speedX3 += 0.3;
          speedX3 = speedX3*0.90;
        }
        if (left3) {
          speedX3 -= 0.3;
          speedX3 = speedX3*0.90;
        }
        p3.y = obsticle.y-p3.h;
        if (!left3&&!right3) {
          speedX3 = speedX3*0.82;
        }
        if (up3) {
          speedY3=-10;
        } else {
          speedY3 = 0;
        }
      }
      if (collide(p3,obsticle)=="bottom") {
        p3.y = obsticle.y+obsticle.h+0.01;
        speedY3 *= -0.25;
        if (collide(p3,p)=="top") {
          p.y = p3.y+p3.h+0.01;
          speedY *= -0.25;
        }
        if (collide(p3,p2)=="top") {
          p2.y = p3.y+p3.h+0.01;
          speedY2 *= -0.25;
        }
      }
      if (collide(p3,obsticle)=="left"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x<screen.x) {fail3=true;}
        p3.x = obsticle.x-p3.w;
        if (right3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)=="right"&&p3.y+p3.h>obsticle.y+2) {
        if (p3.x+p3.w>screen.x+512) {fail3=true;}
        p3.x = obsticle.x+obsticle.w;
        if (left3) {
          speedX3 = 0;
        }
      }
      if (collide(p3,obsticle)!=="none") {
        inAir = false;
      }
      if (up3&&(p3.y>=screen.height-p3.h||collide(p3,obsticle)=="bottom")&&collide(p3,obsticle)!=="top") {
        speedY3=-10;
      }
      }
    }
    for (i=0;i<semisolids.length;i++) {
      obsticle = semisolids[i];
      if (obsticle.x+obsticle.w+32>=screen.x&&obsticle.x-32<=screen.x+512&&obsticle.y+obsticle.h+32>=screen.y&&obsticle.y-32<=screen.y+512) {
        if (collide(p3,obsticle)=="top"&&speedY3>=0&&p3.y<=obsticle.y-24&&(!(down3&&obsticle.fall))) {
          if (right3) {
            speedX3 += 0.3;
            speedX3 = speedX3*0.90;
          }
          if (left3) {
            speedX3 -= 0.3;
            speedX3 = speedX3*0.90;
          }
          p3.y = obsticle.y-p3.h;
          if (!left3&&!right3) {
            speedX3 = speedX3*0.82;
          }
          if (up3) {
            speedY3=-10;
          } else {
            speedY3 = 0;
          }
          inAir = false;
        }
      }
    }
    
    if (inAir) {
      if (right3) {
        speedX3 += 0.25;
      }
      if (left3) {
        speedX3 -= 0.25;
      }
      if ((!(up3&&hasup3))||speedY3>0) {
        hasup3=false;
      }
      if (!hasup3) {
        speedY3+=0.3
      }
    } else {
      hasup3 = true;
    }
    
    if (p3.x<screen.x) {
      p3.x=screen.x;
      speedX3 = 0;
    }
    if (p3.x+p3.w>screen.x+512) {
      p3.x=screen.x+512-p3.w-0.1;
      speedX3 = 0;
    }
    if (p3.y<screen.y) {
      p3.y=screen.y;
      if (collide(p3,p)=="top") {
        p.y = p3.y+p3.h+0.01;
        speedY *= -0.25;
      }
      if (collide(p3,p2)=="top") {
        p2.y = p3.y+p3.h+0.01;
        speedY2 *= -0.25;
      }
    }
    if (p3.y>screen.y+512-p3.h) {
      fail3 = true;
    } else {
      if (right3) {
        speedX3 += 0.1;
      }
      if (left3) {
        speedX3 -= 0.1;
      }
    }
    speedX3 = constrain(speedX3,-4,4);
    speedY3 = constrain(speedY3,-12,9);
    p3.x+=speedX3;
    p3.draw();
  }
  
  if (win.p1==false) {
    p.draw();
    dp = p.x;
  }
  if (win.p1==true&&win.p2==true&&win.p3==true) {
    //text("Win!",win.x+4,win.y-4);
    level++;
    if (level>=levels) {
      game(end);
    } else {
      game(window["level"+level]);
    }
  }
  if (fail1||fail2||fail3) {
    game(stage);
  }
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
  if (key=="d") {
    right2 = false;
  }
  if (key=="a") {
    left2 = false;
  }
  if (key=="w") {
    up2 = false;
  }
  if (key=="s") {
    down2 = false;
  }
  if (key=="h") {
    right3 = false;
  }
  if (key=="f") {
    left3 = false;
  }
  if (key=="t") {
    up3 = false;
  }
  if (key=="g") {
    down3 = false;
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
  if (key=="d") {
    right2 = true;
  }
  if (key=="a") {
    left2 = true;
  }
  if (key=="w") {
    up2 = true;
  }
  if (key=="s") {
    down2 = true;
  }
  if (key=="h") {
    right3 = true;
  }
  if (key=="f") {
    left3 = true;
  }
  if (key=="t") {
    up3 = true;
  }
  if (key=="g") {
    down3 = true;
  }
  if (key==" ") {
    fail1 = true;
    fail2 = true;
    fail3 = true;
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