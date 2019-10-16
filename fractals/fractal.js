var pattern = [];
for (var y=0;y<parseInt(window.location.search.substring(1).split("&")[1]);y++) {
  pattern[y] = [];
  for (var x=0;x<parseInt(window.location.search.substring(1).split("&")[0]);x++) {
    if (window.location.search.substring(1).split("&")[2].split("")[x%parseInt(window.location.search.substring(1).split("&")[0])+y*parseInt(window.location.search.substring(1).split("&")[0])]==1) {
      pattern[y][x] = true;
    } else {
      pattern[y][x] = false;
    }
  }
}
function drawPattern(n) {
  if (n==0) {
    for (var y=0;y<pattern.length;y++) {
      for (var x=0;x<pattern[0].length;x++) {
        if (pattern[y][x]) {
          rect(x+pattern[0].length,y+pattern.length,1,1);
        }
      }
    }
  } else {
    for (var y2=0;y2<pattern.length;y2++) {
      for (var x2=0;x2<pattern[0].length;x2++) {
        if (pattern[y2][x2]) {
          translate((pattern[0].length**n)*x2,(pattern.length**n)*y2);
          drawPattern(n-1);
          translate(-(pattern[0].length**n)*x2,-(pattern.length**n)*y2);
        }
      }
    }
  }
}
var iterations = parseInt(window.location.search.substring(1).split("&")[3]);
function setup() {
  createCanvas((pattern[0].length**iterations)*pattern[0].length+pattern[0].length, (pattern.length**iterations)*pattern.length+pattern.length);
  noLoop();
  noStroke();
  background(255);
  fill(0);
  drawPattern(iterations);
  translate(-pattern[0].length,-pattern.length);
}