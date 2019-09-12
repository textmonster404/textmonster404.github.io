function overBox(x,y,box,f) {
  if (x>=box.x&&x<=box.x+box.w&&y>=box.y&&y<=box.y+box.h) {
    f();
  }
}

var design = {"p1":localStorage.getItem("p1style") || 0,"p2":localStorage.getItem("p2style") || 1,"p3":localStorage.getItem("p3style") || 2,"p4":localStorage.getItem("p4style") || 3};
var nes;
var designs = [];

var selecting = 0;
function preload() {
  nes = loadFont("coplatform-nes.ttf");
  designs[0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAALUlEQVRYR+3QQREAAAABQfqXFsNnFTizzXk99+MAAQIECBAgQIAAAQIECBAgMBo/ACHo7lH9AAAAAElFTkSuQmCC");
  designs[1] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAARElEQVRYR+3XsQ0AIAwDMPL/0UViQFzQMjgPJPKWrOFkuH/dAVVVnWOSnG4DCBAgQIAAAQIECBAgQOAfgc5f+HaNv+MNv4FwIWQhR4wAAAAASUVORK5CYII=");
  designs[2] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAmUlEQVRYR83Xyw6AMAhE0fL/H42JCV3UIH0wZdya2NPrBqQVP1J8fnMBqqpInIi8Z/MC7PaoEmGB6wC7qcnG/59d4lOABmA3R5dwC9AA0JCwAA0ABZkuQAPIhiwXoAFkQbYL0ABOIccFaAC7kLQCNIBVSHoBGsAsBFaABhBB+vtb06+35PTFJHvqHQ/0ZkweAHIP/Pt2+Xb8AE8BwCE5gBnLAAAAAElFTkSuQmCC");
  designs[3] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVRYR+2XUQ6AMAhDx/0PjYkJfrAQ2MZGNfrt0kfbRaRW/FCxfnsAmJlPwhDRrY0HIGS73BCnTQdgALI7IYOFHYABWI1ETzzsAAzAaCRW5tMOwAB4kXiZLzsAA6AjiWae5sAPUO6A9bX8/i2I7gnRW9FtRN7BMoCosH7P60TYgTKAWWF97n0bUdbkXifMDpQB7BK2OoHzZ3Rq8s6JKmHRvQBSiMAwhcLy+AAAAABJRU5ErkJggg==");
  designs[4] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2XwQ7AIAhD7f9/NEuW4IHN9DC0O9STCQZeKoJgiBfE8ccEiIh4gwFwn+m2p18D/FeBXXefeUZzwAAyBU4FnrmQmyw0BpApUK+i9oVusEcdMIBcge5+X2t+9U97AXPw1W4AqkD3u1/VleWPyAAyBXYHpn9CA8gUUA2p8un4AklxwDBHd49JAAAAAElFTkSuQmCC");
  designs[5] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA3ElEQVRYR+1X0QrCQAxrP2v4/bLPOtmwghmhqcrqiXsZ7LouzTW9zMcYw8zM3bdbet3DaVw1j7cDMLOdgU9VFtSo+Tbe5wKgVqbGlRlQE6txMoDY2+hy/AB7zuQS8fMAUPU9rwpwr2KPsXK1uZAJxuCjB9oA4CjOKldVwJjD9w9nwdcAYLrP1IAFZPOCMvAH0M5Apv9X199WATLDRq8swzAkOIiu67o/uizL09Jpk/B0ANXKMvus5pP9QDaA2FnyO4ak3ZKpnq8aV+4BtbnUuDKArPvn84TtP6fdAG5GtHXsQrEoegAAAABJRU5ErkJggg==");
  designs[6] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtUlEQVRYR+2XSw7AIAgFy/0PTdMFLrB2JGqkid014TM8BVWu4Keq+uUiIhIJGTJ+Ai8HoASR6t5svUKVAtsALLERzgbxce2/KJAGwNZtlhKtOE0F0gCMgpCCqEAagCgIVe7jVV3QGjTRwNTGZQnIcHTykb8cgKPAUWC7AtanBLJsEKUH6K3cTzzyy38aUgU04+kURQW2AcxKTHsi3624tx17154uNmWPeEMaSMsBKAEB/u51fANqqgAQlAH+0gAAAABJRU5ErkJggg==");
}
function setup() {
  var canvas = createCanvas(512, 512);
  canvas.elt.style.border = "2px solid black";
  textAlign(CENTER);
  textFont("monospace");
  textFont(nes);
  textSize(16);
}
function draw() {
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Back",2,18);
  textAlign(CENTER);
  text("Select design.",256,18);
  rect(145,65,30,30);
  rect(145+64,65,30,30);
  rect(145+128,65,30,30);
  rect(145+128+64,65,30,30);
  image(designs[design.p1],144,64,32,32);
  image(designs[design.p2],144+64,64,32,32);
  image(designs[design.p3],144+128,64,32,32);
  image(designs[design.p4],144+128+64,64,32,32);
  fill(0);
  for (var i=0;i<designs.length;i++) {
    if (i==design.p1) {fill(255,0,0);} else {fill(0);}
    text(i+1,144+16,18*i+128);
  }
  for (var i=0;i<designs.length;i++) {
    if (i==design.p2) {fill(0,255,0);} else {fill(0);}
    text(i+1,144+64+16,18*i+128);
  }
  for (var i=0;i<designs.length;i++) {
    if (i==design.p3) {fill(255,255,0);} else {fill(0);}
    text(i+1,144+128+16,18*i+128);
  }
  for (var i=0;i<designs.length;i++) {
    if (i==design.p4) {fill(0,0,255);} else {fill(0);}
    text(i+1,144+128+64+16,18*i+128);
  }
}
function mousePressed() {
  overBox(mouseX,mouseY,{"x":2,"y":2,"w":64,"h":16},function(){window.location.replace("index.html");});
  for (var i=0;i<designs.length;i++) {
    overBox(mouseX,mouseY,{"x":144-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p1style",i);design.p1=i;});
  }
  for (var i=0;i<designs.length;i++) {
    overBox(mouseX,mouseY,{"x":144+64-(i.toString().length*8)+16,"y":18*i+112,"w":i.toString().length*16,"h":16},function(){localStorage.setItem("p2style",i);design.p2=i;});
  }
  for (var i=0;i<designs.length;i++) {
    overBox(mouseX,mouseY,{"x":144+128-(i.toString().length*8)+16,"y":18*i+112,"w":16,"h":16},function(){localStorage.setItem("p3style",i);design.p3=i;});
  }
  for (var i=0;i<designs.length;i++) {
    overBox(mouseX,mouseY,{"x":144+128+64-(i.toString().length*8)+16,"y":18*i+112,"w":16,"h":16},function(){localStorage.setItem("p4style",i);design.p4=i;});
  }
}
