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
    var temp = document.body.textContent.split("\n");
    if (y>temp.length) {
        document.body.textContent+="\n".repeat(y-temp.length);
        temp = document.body.textContent.split("\n");
    }
    var temp2 = temp[y-1];
    if (x>temp2.length) {
        temp2+=" ".repeat(x-temp2.length);
    }
    temp2 = temp2.substring(0,x)+str;
    document.body.textContent = "";
    for (var i=0;i<temp.length;i++) {
        if (i==y-1) {
            document.body.textContent += temp2;
        } else {
            document.body.textContent += temp[i];
            document.body.textContent += "\n";
        }
    }
}
function clear() {
    document.body.textContent=" ";
}
var key = "";
mouseX = 0;
mouseY = 0;
mouseClicking = false;
document.onkeydown = function(e) {
    key = e.key;
}
document.onkeyup = function(e) {
    key = "";
}
document.onmousemove = function(e) {
    mouseX = Math.floor(e.screenX/7)+1;
    mouseY = Math.floor(e.screenY/15)+1;
}
document.onmousedown = function(e) {
    mouseClicking = true;
}
document.onmouseup = function(e) {
    mouseClicking = false;
}
alphaFailCharacter = "@";
alphaValue = function(char) {
    if(char<27&&char>-1) {
    return [" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"][char];
    } else {
        return alphaFailCharacter;
    }
}


ellipse = function(x,y,width,height,character) {
    for (var j=0;j<height*2+1;j++) {
        for (var i=0;i<width*2+1;i++) {
            if (((i+x-width)-x)**2/((width)**2) + ((j+y-height/2)-y)**2/((height/2)**2) <= 0.9 && (i+x-Math.floor(width))>0 && (j+y-Math.floor(height))>0) {
                printXY(character,i+x-Math.floor(width)-1,j+y-Math.floor(height)*2);
            }
        }
    }
}

updateSpeed = 10;
frames = 0;

var updatingFunction = function() {
    frames++;
    if (frames%updateSpeed==0) {
        if (typeof update == "function") {
            update();
        }
    }
}
window.setInterval(updatingFunction,1);