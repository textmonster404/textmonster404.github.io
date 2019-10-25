String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
// create class Complex for complex numbers. //
class Complex {
  constructor(r,i) {
    this.rePart = r;
    this.imPart = i;
  }
  getAngle() {
    return Math.atan(this.imPart/this.rePart);
  }
  getMagnitude() {
    return Math.sqrt(this.imPart*this.imPart+this.rePart*this.rePart);
  }
  getConjugate() {
    return new Complex(this.rePart,-1*this.imPart);
  }
  add(c) {
    return new Complex(this.rePart+c.rePart,this.imPart+c.imPart);
  }
  multiply(c) {
    return new Complex(this.rePart*c.rePart-this.imPart*c.imPart,this.rePart*c.imPart+this.imPart*c.rePart);
  }
}
class TextImage {
    constructor(array) {
        this.length = array.length;
        for (var i=0;i<array.length;i++) {
            this[i] = array[i];
        }
        this.array = array;
    }
    draw(x,y) {
        for (var i=0;i<this.length;i++) {
            printXY(this[i],x,y+i);
        }
    }
}
sin = Math.sin;
cos = Math.cos;
tan = Math.tan;
sinh = Math.sinh;
cosh = Math.cosh;
tanh = Math.tanh;
asin = Math.asin;
acos = Math.acos;
atan = Math.atan;
abs = Math.abs;
floor = Math.floor;
function round(n) {
    return floor(n+0.5);
}
function random(n) {
    return Math.random()*n;
}
function print(str) {
    document.body.textContent += str;
}
function newline() {
    document.body.textContent += "\n"
}
function printLine(str) {
    document.body.textContent += "\n"+str;
}
function printXY(str,x,y) {
    x = x + translate.x;
    y = y + translate.y;
    if (x<0) {
        str = str.substring(abs(x));
    }
    if (y>0) {
        var temp = document.body.textContent.split("\n");
        x = round(x);
        y = round(y);
        if (y>temp.length) {
            document.body.textContent+="\n".repeat(y-temp.length);
            temp = document.body.textContent.split("\n");
        }
        var temp2 = temp[y-1];
        if (x>temp2.length) {
            temp2+=" ".repeat(x-temp2.length);
        }
        temp2 = temp2.substring(0,x)+str+temp[y-1].substring(x+str.length);
        document.body.textContent = "";
        for (var i=0;i<temp.length;i++) {
            if (i==y-1) {
                document.body.textContent += temp2;
                document.body.textContent += "\n";
            } else {
                document.body.textContent += temp[i];
                document.body.textContent += "\n";
            }
        }
    }
}
function line(x1,y1,x2,y2) {
    if (abs(x2-x1)>abs(y2-y1)) {
        if (x2>x1) {
            for (var x=x1;x<=x2;x++) {
                printXY(char,x,floor(((y2-y1)/(x2-x1))*x+(y1*x2-x1*y2)/(x2-x1)));
            }
        } else if (x1>=x2) {
            for (var x=x2;x<=x1;x++) {
                printXY(char,x,floor(((y2-y1)/(x2-x1))*x+(y1*x2-x1*y2)/(x2-x1)));
            }
        }
    }
    if (abs(x2-x1)<abs(y2-y1)) {
        if (y2>y1) {
            for (var y=y1;y<=y2;y++) {
                printXY(char,floor(((y2-y1)/(x2-x1))*y+(x1*y2-y1*x2)/(y2-x1)),y);
            }
        } else if (y1>=y2) {
            for (var y=y2;y<=y1;y++) {
                printXY(char,floor(((y2-y1)/(x2-x1))*y+(x1*y2-y1*x2)/(y2-x1)),y);
            }
        }
    }
}
function line(x0, y0, x1, y1) {
   var dx = Math.abs(x1 - x0);
   var dy = Math.abs(y1 - y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx - dy;

   while(true) {
      point(x0, y0); // Do what you need to for this

      if ((x0 === x1) && (y0 === y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
   }
}
delay = window.setTimeout;
function clear() {
    document.body.textContent=" ";
}
function point(x,y) {
    printXY(char,x,y);
}
var key = "";
mouseX = 0;
mouseY = 0;
mouseClicking = false;
keys = [];
window.onkeydown = function(e) {
    key = e.key;
    keys[e.key] = true;
}
window.onkeyup = function(e) {
    key = "";
    keys[e.key] = false;
}
window.onmousemove = function(e) {
    mouseX = Math.floor(e.clientX/7)+1;
    mouseY = Math.floor(e.clientY/15)+1;
}
window.onmousedown = function(e) {
    mouseClicking = true;
}
window.onmouseup = function(e) {
    mouseClicking = false;
}
alphaFailCharacter = "@";
alphaValue = function(n) {
    if(n<27&&n>-1) {
    return [" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"][n];
    } else {
        return alphaFailCharacter;
    }
}


ellipse = function(x,y,width,height) {
    for (var j=0;j<height*2+1;j++) {
        for (var i=0;i<width*2+1;i++) {
            if (((i+x-width)-x)**2/((width)**2) + ((j+y-height)-y)**2/((height)**2) <= 1 && (i+x-Math.floor(width))>0 && (j+y-Math.floor(height))>0) {
                printXY(char,i+x-Math.floor(width),j+y-Math.floor(height));
            }
        }
    }
}
function circle(x,y,radius) {
    ellipse(x,y,radius,radius);
}
function drawTextImage() {
    
}

char = "*";

updateSpeed = 10;
frames = 0;
translate = {"x":0,"y":0};

var updatingFunction = function() {
    frames++;
    if (frames%updateSpeed==0) {
        if (typeof update == "function") {
            update();
        }
    }
}
window.setInterval(updatingFunction,1);