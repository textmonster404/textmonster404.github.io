size = 32;

var playerNumber = parseInt(window.location.search.substring(1).split("&")[0]);
var computerNumber = parseInt(window.location.search.substring(1).split("&")[1]);

var lossP = 0;
var lossC = 0;


var tHTML = "<table style=\"border:1px solid black;\"><tbody>";
for (var i=0;i<size;i++) {
    tHTML+="<tr>";
    for (var j=0;j<size;j++) {
        tHTML+="<td></td>";
    }
    tHTML+="</tr>"
}
tHTML+="</tbody></table>";
document.body.innerHTML+=tHTML;

function cells() {return document.getElementsByTagName("td");}
function getCell(x,y) {
    return document.getElementsByTagName("tr")[y].cells[x];
}
class Input {
    constructor(keyUp,keyDown,keyLeft,keyRight) {
        this.keyUp = keyUp;
        this.keyDown = keyDown;
        this.keyLeft = keyLeft;
        this.keyRight = keyRight;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
    update(key) {
        if (key==this.keyUp) {this.up = true;} else {this.up = false;}
        if (key==this.keyDown) {this.down = true;} else {this.down = false;}
        if (key==this.keyLeft) {this.left = true;} else {this.left = false;}
        if (key==this.keyRight) {this.right = true;} else {this.right = false;}
    }
}
class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}
class Fruit {
    constructor() {
        var inside = true;
        while (inside) {
            this.x = Math.floor(Math.random()*size);
            this.y = Math.floor(Math.random()*size);
            
            for (var i=0;i<players.concat(computers).length;i++) {
                var p = players.concat(computers)[i];
                for (var m=0;m<p.history.length;m++) {
                    var c = p.history[m];
                    if (c.x!=this.x&&c.y!=this.y) {
                        inside = false;
                    }
                }
            }
        }
    }
    move() {
        var inside = true;
        while (inside) {
            this.x = Math.floor(Math.random()*size);
            this.y = Math.floor(Math.random()*size);
            
            for (var i=0;i<players.concat(computers).length;i++) {
                var p = players.concat(computers)[i];
                for (var m=0;m<p.history.length;m++) {
                    var c = p.history[m];
                    if (c.x!=this.x&&c.y!=this.y) {
                        inside = false;
                    }
                }
            }
        }
    }
    draw() {
        pixel(this.x,this.y,255,0,0);
    }
}
class Snake {
    constructor(x,y,l,dir,controls,r,g,b,computer) {
        this.head = {"x":x,"y":y};
        this.tail = {"x":x,"y":y};
        this.history = [new Point(x,y)];
        this.len = l;
        this.color = {"r":r,"g":g,"b":b};
        this.dir = dir;
        this.input = controls;
        this.killed = false;
        this.computer = computer || false; 
    }
    update() {
        for (var i=0;i<players.concat(computers).length;i++) {
            var p = players.concat(computers)[i];
            for (var m=0;m<p.history.length;m++) {
                var c = p.history[m];
                if (this.history.length>2&&!this.killed) {
                    if (this.head.x==this.history[this.history.length-2].x&&this.head.y==this.history[this.history.length-2].y) {
                        if (this.dir==0) {this.dir=2;}
                        if (this.dir==1) {this.dir=3;}
                        if (this.dir==2) {this.dir=0;}
                        if (this.dir==3) {this.dir=1;}
                    } else if ((c!=this.history[this.history.length-1])&&c.x==this.head.x&&c.y==this.head.y) {if(this.computer&&!this.killed){lossC++;}else if(!this.killed){lossP++;}this.killed=true;}
                }
            }
        }
        if (!this.killed) {
            if (this.input.up&&this.dir!=2) {this.dir=0;}
            if (this.input.down&&this.dir!=0) {this.dir=2;}
            if (this.input.left&&this.dir!=1) {this.dir=3;}
            if (this.input.right&&this.dir!=3) {this.dir=1;}
            if (this.dir==0) {this.head.y-=1;}
            if (this.dir==1) {this.head.x+=1;}
            if (this.dir==2) {this.head.y+=1;}
            if (this.dir==3) {this.head.x-=1;}
            if (this.head.x>size-1) {this.head.x=0;}
            if (this.head.x<0) {this.head.x=size-1;}
            if (this.head.y>size-1) {this.head.y=0;}
            if (this.head.y<0) {this.head.y=size-1;}
            this.history = this.history.concat([new Point(this.head.x,this.head.y)]);
            if (this.history.length>this.len) {
                this.history = this.history.splice(1);
            }
            if (this.history.length>=this.len) {
                this.tail = this.history[0];
            }
            for (var i=0;i<fruit.length;i++) {
                if (this.head.x==fruit[i].x&&this.head.y==fruit[i].y) {
                    this.len++;
                    fruit[i].move();
                }
            }
        }
    }
    ai() {
        if (!this.killed) {
            if (Math.floor(Math.random()*8)==0) {
                if (this.dir==2) {this.dir=[1,2,3][Math.floor(Math.random()*3)];}
                else if (this.dir==0) {this.dir=[0,1,3][Math.floor(Math.random()*3)];}
                else if (this.dir==1) {this.dir=[0,1,2][Math.floor(Math.random()*3)];}
                else if (this.dir==3) {this.dir=[0,2,3][Math.floor(Math.random()*3)];}
            }
            for (var i=0;i<players.concat(computers).length;i++) {
                var p = players.concat(computers)[i];
                for (var m=0;m<p.history.length;m++) {
                    var c = p.history[m];
                    for (var o=1;o<6;o++) {
                        if (this.head.x==c.x&&this.head.y-o==c.y&&this.dir==0) {
                            this.dir = [1,3][Math.floor(Math.random()*2)];
                        }
                        if (this.head.x+o==c.x&&this.head.y==c.y&&this.dir==1) {
                            this.dir = [0,2][Math.floor(Math.random()*2)];
                        }
                        if (this.head.x==c.x&&this.head.y+o==c.y&&this.dir==2) {
                            this.dir = [1,3][Math.floor(Math.random()*2)];
                        }
                        if (this.head.x-o==c.x&&this.head.y==c.y&&this.dir==3) {
                            this.dir = [0,2][Math.floor(Math.random()*2)];
                        }
                    }
                }
            }
            var f = fruit[0];
            for (var i=0;i<fruit.length;i++) {
                if ((Math.abs(fruit[1].x-this.head.x)+Math.abs(fruit[1].y-this.head.y))<(Math.abs(fruit[0].x-this.head.x)+Math.abs(fruit[0].y-this.head.y))) {f = fruit[1];}
            }
            for (var o=0;o<24;o++) {
                if (this.head.x==f.x&&this.head.y-o==f.y&&this.dir!=2) {
                    this.dir = 0;
                }
                if (this.head.x+o==f.x&&this.head.y==f.y&&this.dir!=3) {
                    this.dir = 1;
                }
                if (this.head.x==f.x&&this.head.y+o==f.y&&this.dir!=0) {
                    this.dir = 2;
                }
                if (this.head.x-o==f.x&&this.head.y==f.y&&this.dir!=1) {
                    this.dir = 3;
                }
            }
            if (this.history.length>2&&!this.killed) {
                if (this.head.x==this.history[this.history.length-2].x&&this.head.y==this.history[this.history.length-2].y) {
                    if (this.dir==0) {this.dir=2;}
                    if (this.dir==1) {this.dir=3;}
                    if (this.dir==2) {this.dir=0;}
                    if (this.dir==3) {this.dir=1;}
                }
            }
            if (Math.floor(Math.random()*16)==0) {
                if (this.dir==2) {this.dir=[1,2,3][Math.floor(Math.random()*3)];}
                else if (this.dir==0) {this.dir=[0,1,3][Math.floor(Math.random()*3)];}
                else if (this.dir==1) {this.dir=[0,1,2][Math.floor(Math.random()*3)];}
                else if (this.dir==3) {this.dir=[0,2,3][Math.floor(Math.random()*3)];}
            }
        }
        for (var n=0;n<this.history.length;n++) {
            if (this.history.length>2&&!this.killed) {
                if (this.head.x==this.history[this.history.length-2].x&&this.head.y==this.history[this.history.length-2].y) {
                    if (this.dir==0) {this.dir=2;}
                    if (this.dir==1) {this.dir=3;}
                    if (this.dir==2) {this.dir=0;}
                    if (this.dir==3) {this.dir=1;}
                }
            }
        }
    }
    draw() {
        for (var k=0;k<this.history.length;k++) {
            var c = this.history[k];
            if (this.killed) {pixel(c.x,c.y,186,186,186);}
            else {pixel(c.x,c.y,this.color.r,this.color.g,this.color.b);}
        }
    }
}


var players = [];
var computers = [];

var dir = Math.floor(Math.random()*4);
for (var i=0;i<playerNumber;i++) {
    if (i==0) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("ArrowUp","ArrowDown","ArrowLeft","ArrowRight"),0,0,0);}
    if (i==1) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("w","s","a","d"),255,0,0);}
    if (i==2) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("t","g","f","h"),0,255,0);}
    if (i==3) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("i","k","j","l"),0,0,255);}
}
for (var i=0;i<computerNumber;i++) {
    computers[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,Math.floor(Math.random()*4),new Input(0,1,2,3),96,96,96,true);
}

var fruit = [new Fruit(),new Fruit()];
function update() {
    background(255,255,255);
    for (var i=0;i<players.length;i++) {
        players[i].update();
        players[i].draw();
    }
    for (var i=0;i<computers.length;i++) {
        computers[i].ai();
        computers[i].update();
        computers[i].draw();
    }
    if (lossP==playerNumber-1&&lossC==computerNumber) {document.body.innerHTML+="<div>WIN!</div>";window.clearInterval(updateInterval);} else if (lossP==playerNumber&&lossC<computerNumber) {document.body.innerHTML+="<div>LOSS.</div>";window.clearInterval(updateInterval);}
    for (var i=0;i<fruit.length;i++) {
        fruit[i].draw();
    }
}




function background(r,g,b) {
    for (var x=0;x<size;x++) {
        for (var y=0;y<size;y++) {
            pixel(x,y,r,g,b);
        }
    }
}
function pixel(x,y,r,g,b) {
    getCell(x,y).style.background="rgb("+r+","+g+","+b+")";
}
window.onkeydown = function(e) {
    for (var i=0;i<players.length;i++) {
        players[i].input.update(e.key);
    }
}
var updateInterval = window.setInterval(update,100);