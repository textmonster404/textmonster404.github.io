var textures = {};
var blocks = {};
var block_ids = [];
var structure;
function preload() {
  textures.air = loadImage("air.png");
  textures.stone = loadImage("stone.png");
  textures.oak_planks = loadImage("oak_planks.png");
  textures.birch_planks = loadImage("birch_planks.png");
  textures.spruce_planks = loadImage("spruce_planks.png");
  textures.jungle_planks = loadImage("jungle_planks.png");
  textures.dark_oak_planks = loadImage("dark_oak_planks.png");
  textures.acacia_planks = loadImage("acacia_planks.png");
  textures.crafting_table_top = loadImage("crafting_table_top.png");
  textures.crafting_table_side = loadImage("crafting_table_side.png");
  textures.crafting_table_front = loadImage("crafting_table_front.png");
  textures.furnace_top = loadImage("furnace_top.png");
  textures.furnace_side = loadImage("furnace_side.png");
  textures.furnace_front = loadImage("furnace_front.png");
  textures.furnace_front_on = loadImage("furnace_front_on.png");
  textures.glass = loadImage("glass.png");
  blocks.air = blockAll(textures.air,0);
  blocks.stone = blockAll(textures.stone,0);
  blocks.glass = blockAll(textures.glass,0);
  blocks.oak_planks = blockAll(textures.oak_planks,0);
  blocks.birch_planks = blockAll(textures.birch_planks,0);
  blocks.spruce_planks = blockAll(textures.spruce_planks,0);
  blocks.jungle_planks = blockAll(textures.jungle_planks,0);
  blocks.dark_oak_planks = blockAll(textures.dark_oak_planks,0);
  blocks.acacia_planks = blockAll(textures.acacia_planks,0);
  blocks.oak_stairs = new BlockStairs(textures.oak_planks,0);
  blocks.oak_stairs_0 = new BlockStairs(textures.oak_planks,0);
  blocks.oak_stairs_1 = new BlockStairs(textures.oak_planks,90);
  blocks.oak_stairs_2 = new BlockStairs(textures.oak_planks,180);
  blocks.oak_stairs_3 = new BlockStairs(textures.oak_planks,270);
  blocks.crafting_table = new Block(textures.crafting_table_front,textures.crafting_table_front,textures.crafting_table_top,textures.crafting_table_top,textures.crafting_table_side,textures.crafting_table_side,0);
  blocks.furnace = new Block(textures.furnace_side,textures.furnace_front,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,0);
  blocks.furnace_0 = new Block(textures.furnace_side,textures.furnace_front,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,0);
  blocks.furnace_1 = new Block(textures.furnace_side,textures.furnace_front,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,90);
  blocks.furnace_2 = new Block(textures.furnace_side,textures.furnace_front,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,180);
  blocks.furnace_3 = new Block(textures.furnace_side,textures.furnace_front,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,270);
  blocks.furnace_lit = new Block(textures.furnace_side,textures.furnace_front_on,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,0);
  blocks.furnace_lit_0 = new Block(textures.furnace_side,textures.furnace_front_on,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,0);
  blocks.furnace_lit_1 = new Block(textures.furnace_side,textures.furnace_front_on,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,90);
  blocks.furnace_lit_2 = new Block(textures.furnace_side,textures.furnace_front_on,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,180);
  blocks.furnace_lit_3 = new Block(textures.furnace_side,textures.furnace_front_on,textures.furnace_top,textures.furnace_top,textures.furnace_side,textures.furnace_side,270);
  structure = [
    [
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.air,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.air]
    ],
    [
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.crafting_table,blocks.furnace,blocks.furnace_lit,blocks.oak_planks],
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.air,blocks.oak_planks,blocks.oak_planks],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air]
    ],
    [
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air],
      [blocks.oak_planks,blocks.oak_planks,blocks.air,blocks.oak_planks,blocks.oak_planks],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air]
    ],
    [
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.oak_planks,blocks.air,blocks.air,blocks.air,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air]
    ],
    [
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks,blocks.oak_planks],
      [blocks.air,blocks.air,blocks.air,blocks.air,blocks.air]
    ]
  ];
}
var canvas;
function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  for (var i in textures) {
    textures[i].resizeNN(1024,1024);
  }
  canvas = document.querySelector("canvas");
  perspective(PI/3,width/height,0.1,2048);
  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
  canvas.onclick = function(){canvas.requestPointerLock()};
}

function blockAll(texture,angle) {
  return new Block(texture,texture,texture,texture,texture,texture,angle);
}
class Block {
  constructor(front,back,top,bottom,left,right,angle) {
    this.front = front;
    this.back = back;
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    block_ids[block_ids.length] = this;
    this.angle = angle;
  }
  render(x,y,z) {
    if (this.angle==0) {
      cubeTextured(x*32,-y*32,z*32,32,32,32,this.front,this.back,this.top,this.bottom,this.left,this.right);
    } else if (this.angle==90) {
      cubeTextured(x*32,-y*32,z*32,32,32,32,this.right,this.left,this.top,this.bottom,this.front,this.back);
    } else if (this.angle==180) {
      cubeTextured(x*32,-y*32,z*32,32,32,32,this.back,this.front,this.top,this.bottom,this.right,this.left);
    } else if (this.angle==270) {
      cubeTextured(x*32,-y*32,z*32,32,32,32,this.left,this.right,this.top,this.bottom,this.front,this.back);
    }
  }
}
class BlockDoor {
  constructor(front,back,top,bottom,left,right,angle) {
    this.front = front;
    this.back = back;
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    block_ids[block_ids.length] = this;
    this.angle = angle;
  }
  render(x,y,z) {
    if (this.angle==0) {
      cubeTextured(x*32,-y*32,z*32,32,32,16,this.front,this.back,this.top,this.bottom,this.left,this.right);
    } else if (this.angle==90) {
      cubeTextured(x*32,-y*32,z*32,32,32,16,this.right,this.left,this.top,this.bottom,this.front,this.back);
    } else if (this.angle==180) {
      cubeTextured(x*32,-y*32,z*32+16,32,32,16,this.back,this.front,this.top,this.bottom,this.right,this.left);
    } else if (this.angle==270) {
      cubeTextured(x*32+16,-y*32,z*32,16,32,32,this.left,this.right,this.top,this.bottom,this.front,this.back);
    }
  }
}
class BlockStairs {
  constructor(texture,angle) {
    this.front = texture;
    this.back = texture;
    this.left = texture;
    this.right = texture;
    this.top = texture;
    this.bottom = texture;
    block_ids[block_ids.length] = this;
    this.angle = angle;
  }
  render(x,y,z) {
    if (this.angle==0) {
      cubeTextured(x*32,-y*32,z*32+16,32,32,16,this.front,this.back,this.top,this.bottom,this.left,this.right);
      cubeTextured(x*32,-y*32+16,z*32,32,16,16,this.front,this.back,this.top,this.bottom,this.left,this.right);
    } else if (this.angle==90) {
      cubeTextured(x*32+16,-y*32,z*32,32,32,16,this.right,this.left,this.top,this.bottom,this.front,this.back);
      cubeTextured(x*32,-y*32+16,z*32,16,16,32,this.right,this.left,this.top,this.bottom,this.front,this.back);
    } else if (this.angle==180) {
      cubeTextured(x*32,-y*32,z*32,32,32,16,this.back,this.front,this.top,this.bottom,this.right,this.left);
      cubeTextured(x*32,-y*32+16,z*32-16,32,16,16,this.back,this.front,this.top,this.bottom,this.right,this.left);
    } else if (this.angle==270) {
      cubeTextured(x*32,-y*32,z*32,16,32,32,this.left,this.right,this.top,this.bottom,this.front,this.back);
      cubeTextured(x*32-16,-y*32+16,z*32,16,16,32,this.left,this.right,this.top,this.bottom,this.front,this.back);
    }
  }
}
function cube(x,y,z,w,h,d) {
  translate(x,y,z);
  rect(0,0,w,h);
  translate(0,0,d);
  rect(0,0,w,h);
  translate(0,0,-d);
  rotateY(-PI/2);
  rect(0,0,d,h);
  translate(0,0,-w);
  rect(0,0,d,h);
  translate(0,0,w);
  rotateY(PI/2);
  rotateX(PI/2);
  rect(0,0,w,d);
  translate(0,0,-h);
  rect(0,0,w,d);
  translate(0,0,h);
  rotateX(-PI/2);
}
function cubeTextured(x,y,z,w,h,d,tFront,tBack,tTop,tBottom,tLeft,tRight) {
  translate(x,y,z);
  image(tFront,0,0,w,h);
  translate(w,0,d);
  image(tBack,0,0,-w,h);
  translate(-w,0,-d);
  rotateY(-PI/2);
  translate(d,0,0);
  image(tLeft,0,0,-d,h);
  translate(0,0,-w);
  image(tRight,0,0,-d,h);
  translate(-d,0,w);
  rotateY(PI/2);
  rotateX(PI/2);
  image(tTop,0,0,w,d);
  translate(w,0,-h);
  image(tBottom,0,0,-w,d);
  translate(-w,0,h);
  rotateX(-PI/2);
  translate(-x,-y,-z);
}

var t = 0;
var posZ = 0;
var posX = 0;
var posY = 0;
var alpha = 0;
var gamma = 0;
var beta = 0;
var pointerX = 0;
var pointerY = 0;
var keys = {};
function draw() {
  background(255);
  fill(0);
  translate(0,0,innerHeight-structure[0].length*16);
  alpha = (pointerY-innerHeight/2)*PI/(innerHeight);
  gamma = (pointerX-innerWidth/2)*PI/(innerHeight);
  if (window.location.search=="?gyro") {
    alpha = radians(rotationX);
    gamma = radians(rotationY);
    beta = radians(rotationZ);
  }
  rotateX(-alpha);
  rotateY(gamma);
  rotateZ(beta);
  translate(posX,posY,posZ);
  translate(-structure[0][0].length*16,structure.length*16-32,-structure[0].length*16);
  for (var y=0;y<structure.length;y++) {
    for (var z=0;z<structure[0].length;z++) {
      for (var x=0;x<structure[0][0].length;x++) {
        if (structure[y][z][x]!=blocks.air) {
          structure[y][z][x].render(x,y,z);
        }
      }
    }
  }
  if (keys["w"]) {
    posZ+=10*cos(gamma);
    posX-=10*sin(gamma);
  }
  if (keys["s"]) {
    posZ-=10*cos(gamma);
    posX+=10*sin(gamma);
  }
  if (keys["a"]) {
    posX+=10*sin(gamma+PI/2);
    posZ-=10*cos(gamma+PI/2);
  }
  if (keys["d"]) {
    posX-=10*sin(gamma+PI/2);
    posZ+=10*cos(gamma+PI/2);
  }
  if (keys[" "]) {
    posY+=10;
  }
  if (keys["Shift"]) {
    posY-=10;
  }
  t++;
}
onkeydown = function(e) {
  keys[e.key]=true;
}
onkeyup = function(e) {
  keys[e.key]=null;
}
document.onmousemove = function(e) {
  pointerX += e.movementX;
  pointerY += e.movementY;
}