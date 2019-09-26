size = 32;

var playerNumber = parseInt(window.location.search.substring(1).split("&")[0]);
var computerNumber = parseInt(window.location.search.substring(1).split("&")[1]);

function hexToRGB(color) {
    var result = [];
    var c = color.substring(1);
    result[0] = parseInt(c.substring(0,2),16);
    result[1] = parseInt(c.substring(2,4),16);
    result[2] = parseInt(c.substring(4,6),16);
    return result;
}
function setPlayers() {
    window.location.href = "index.html?"+document.getElementsByTagName("input")[0].value+"&"+document.getElementsByTagName("input")[1].value;
}
function getPlayers() {
    window.setTimeout(function(){
    document.getElementsByTagName("input")[0].value = playerNumber;
    document.getElementsByTagName("input")[1].value = computerNumber;},1);
}
var colors = [(localStorage.getItem("color1")||"#ff0000"),(localStorage.getItem("color2")||"#00ff00"),(localStorage.getItem("color3")||"#ffff00"),(localStorage.getItem("color4")||"#0000ff")];
function setColors() {
window.setTimeout(function(){document.getElementsByTagName("input")[2].value=colors[0];
document.getElementsByTagName("input")[3].value=colors[1];
document.getElementsByTagName("input")[4].value=colors[2];
document.getElementsByTagName("input")[5].value=colors[3];},1);}
setColors();
getPlayers();

if (playerNumber==NaN) {
    playerNumber=1;
}
if (computerNumber==NaN) {
    computerNumber=1;
}

var lossP = 0;
var lossC = 0;

var ticks = 0;
var slowness = 1;

var powerups = {"slow":0,"wall":0};


var tHTML = "<table style=\"border:1px solid black;\" cellspacing=\"1\"><tbody>";
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
        if (key==this.keyUp) {this.up = true;this.down = false;this.left = false;this.right = false;}
        if (key==this.keyDown) {this.up = false;this.down = true;this.left = false;this.right = false;}
        if (key==this.keyLeft) {this.up = false;this.down = false;this.left = true;this.right = false;}
        if (key==this.keyRight) {this.up = false;this.down = false;this.left = false;this.right = true;}
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
            var powerUp = Math.floor(Math.random()*32);
            this.powerups = {"wall":false,"slow":false,"double":false};
            if (powerUp==0) {this.powerups.wall=true}
            else if (powerUp==1) {this.powerups.slow=true;}
            else if (powerUp==2) {this.powerups.double=true;}
            else if (powerUp==3) {this.powerups.triple=true;}
            else if (powerUp==4) {this.powerups.add=true;}
            else if (powerUp==5) {this.powerups.shorten=true;}
            else if (powerUp==6) {this.powerups.freeze=true;}
            else if (powerUp==7) {this.powerups.subtract=true;}
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
            var powerUp = Math.floor(Math.random()*32);
            this.powerups = {"wall":false,"slow":false,"double":false};
            if (powerUp==0) {this.powerups.wall=true}
            else if (powerUp==1) {this.powerups.slow=true;}
            else if (powerUp==2) {this.powerups.double=true;}
            else if (powerUp==3) {this.powerups.triple=true;}
            else if (powerUp==4) {this.powerups.add=true;}
            else if (powerUp==5) {this.powerups.shorten=true;}
            else if (powerUp==6) {this.powerups.freeze=true;}
            else if (powerUp==7) {this.powerups.subtract=true;}
        }
    }
    draw() {
        if (this.powerups.wall) {
            pixel(this.x,this.y,255,0,0);
        } else if (this.powerups.slow) {
            pixel(this.x,this.y,65,80,255);
        } else if (this.powerups.double) {
            pixel(this.x,this.y,255,128,0);
        } else if (this.powerups.triple) {
            pixel(this.x,this.y,255,255,0);
        } else if (this.powerups.add) {
            pixel(this.x,this.y,0,255,0);
        } else if (this.powerups.shorten) {
            pixel(this.x,this.y,255,0,255);
        } else if (this.powerups.freeze) {
            pixel(this.x,this.y,150,150,255);
        } else if (this.powerups.subtract) {
            pixel(this.x,this.y,128,64,64);
        } else {
            pixel(this.x,this.y,0,0,0);
        }
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
        this.fast = false;
        this.aggressive = [true,false][Math.floor(Math.random()*2)];
        this.error = Math.floor(Math.random()*16)+16;
        this.catious = [true,false][Math.floor(Math.random()*2)];
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
        if (!this.killed&&((powerups.slow>0&&ticks%slowness==0)||this.fast||powerups.slow==0)) {
            if (this.input.up&&this.dir!=2) {this.dir=0;}
            if (this.input.down&&this.dir!=0) {this.dir=2;}
            if (this.input.left&&this.dir!=1) {this.dir=3;}
            if (this.input.right&&this.dir!=3) {this.dir=1;}
            if (this.dir==0) {this.head.y-=1;}
            if (this.dir==1) {this.head.x+=1;}
            if (this.dir==2) {this.head.y+=1;}
            if (this.dir==3) {this.head.x-=1;}
            if (powerups.wall>0) {
                if (this.head.x>size-1) {
                    this.head.x=size-1;
                    if (this.computer&&!this.killed) {
                        lossC++;
                    } else if (!this.killed) {
                        lossP++;
                    }
                    this.killed=true;
                }
                if (this.head.x<0) {
                    this.head.x=0;
                    if (this.computer&&!this.killed) {
                        lossC++;
                    } else if (!this.killed) {
                        lossP++;
                    }
                    this.killed=true;
                }
                if (this.head.y>size-1) {
                    this.head.y=size-1;
                    if (this.computer&&!this.killed) {
                        lossC++;
                    } else if (!this.killed) {
                        lossP++;
                    }
                    this.killed=true;
                }
                if (this.head.y<0) {
                    this.head.y=0;
                    if (this.computer&&!this.killed) {
                        lossC++;
                    } else if (!this.killed) {
                        lossP++;
                    }
                    this.killed=true;
                }
            } else {
                if (this.head.x>size-1) {this.head.x=0;}
                if (this.head.x<0) {this.head.x=size-1;}
                if (this.head.y>size-1) {this.head.y=0;}
                if (this.head.y<0) {this.head.y=size-1;}
            }
            if (!this.killed) {
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
                        if (fruit[i].powerups.double) {this.len++;}
                        if (fruit[i].powerups.triple) {this.len+=2;}
                        if (fruit[i].powerups.slow){this.fast=true;powerups.slow+=64;slowness=2;for (var a=0;a<players.concat(computers).length;a++) {if(players.concat(computers)[a]!=this){players.concat(computers)[a].fast=false;}}}
                        if (fruit[i].powerups.freeze){this.fast=true;powerups.slow+=48;slowness=4;for (var a=0;a<players.concat(computers).length;a++) {if(players.concat(computers)[a]!=this){players.concat(computers)[a].fast=false;}}}
                        if (fruit[i].powerups.wall){powerups.wall+=64;}
                        if (fruit[i].powerups.add){fruit[fruit.length]=new Fruit();}
                        if (fruit[i].powerups.shorten) {
                            for (var b=0;b<players.concat(computers).length;b++) {
                                if (players.concat(computers)[b].len>3&&players.concat(computers)[b]!=this&&!players.concat(computers)[b].killed) {
                                    players.concat(computers)[b].len-=2;
                                    players.concat(computers)[b].history = players.concat(computers)[b].history.splice(2);
                                }
                            }
                        }
                        fruit[i].move();
                        if (fruit[i].powerups.subtract){if (fruit.length>1)fruit.length--;}
                    }
                }
            }
        }
    }
    ai() {
        if (!this.killed) {
            this.input.up = false;
            this.input.down = false;
            this.input.left = false;
            this.input.right = false;
            if (Math.floor(Math.random()*this.error)==0) {
                var decision = Math.floor(Math.random()*4);
                if (decision==0) {
                    this.input.up=true;
                    this.input.down=false;
                    this.input.left=false;
                    this.input.right=false;
                } else if (decision==1) {
                    this.input.up=false;
                    this.input.down=false;
                    this.input.left=false;
                    this.input.right=true;
                } else if (decision==2) {
                    this.input.up=false;
                    this.input.down=true;
                    this.input.left=false;
                    this.input.right=false;
                } else if (decision==3) {
                    this.input.up=false;
                    this.input.down=false;
                    this.input.left=true;
                    this.input.right=false;
                }
            }
            if (this.aggressive) {
                var f = players.concat(computers)[0];
                for (var i=0;i<players.concat(computers).length;i++) {
                    if ((Math.abs(players.concat(computers)[i].head.x-this.head.x)+Math.abs(players.concat(computers)[i].head.y-this.head.y))<(Math.abs(f.head.x-this.head.x)+Math.abs(f.head.y-this.head.y))) {f = players.concat(computers)[0];}
                }
                var ox = 0;
                var oy = 0;
                
                if (f.dir==0) {oy=-(Math.abs(f.head.x-this.head.x)+this.len-2)}
                if (f.dir==1) {ox=(Math.abs(f.head.y-this.head.y)+this.len-2)}
                if (f.dir==2) {oy=(Math.abs(f.head.x-this.head.x)+this.len-2)}
                if (f.dir==3) {ox=-(Math.abs(f.head.y-this.head.y)+this.len-2)}
                for (var a=-this.len+2;a<=this.len-2;a++){
                    for (var o=2;o<8;o++) {
                        if (this.head.x+a==f.tail.x+ox&&this.head.y+o==f.tail.y+oy) {
                            this.input.up = false;
                            this.input.left = false;
                            this.input.down = true;
                            this.input.right = false;
                        }
                        if (this.head.x-o==f.tail.x+ox&&this.head.y+a==f.tail.y+oy) {
                            this.input.up = false;
                            this.input.left = true;
                            this.input.down = false;
                            this.input.right = false;
                        }
                        if (this.head.x+a==f.tail.x+ox&&this.head.y-o==f.tail.y+oy) {
                            this.input.up = false;
                            this.input.left = false;
                            this.input.down = true;
                            this.input.right = false;
                        }
                        if (this.head.x+o==f.tail.x+ox&&this.head.y+a==f.tail.y+oy) {
                            this.input.up = false;
                            this.input.left = false;
                            this.input.down = false;
                            this.input.right = true;
                        }
                    }
                }
            }
            var f = fruit[0];
            for (var i=0;i<fruit.length;i++) {
                if ((Math.abs(fruit[i].x-this.head.x)+Math.abs(fruit[i].y-this.head.y))<(Math.abs(f.x-this.head.x)+Math.abs(f.y-this.head.y))) {f = fruit[i];}
            }
            
            for (var o=0;o<24;o++) {
                if (this.head.x==f.x&&this.head.y-o==f.y&&this.dir!=2) {
                    this.input.up = true;
                    this.input.left = false;
                    this.input.down = false;
                    this.input.right = false;
                }
                if (this.head.x+o==f.x&&this.head.y==f.y&&this.dir!=3) {
                    this.input.up = false;
                    this.input.left = false;
                    this.input.down = false;
                    this.input.right = true;
                }
                if (this.head.x==f.x&&this.head.y+o==f.y&&this.dir!=0) {
                    this.input.up = false;
                    this.input.left = false;
                    this.input.down = true;
                    this.input.right = false;
                }
                if (this.head.x-o==f.x&&this.head.y==f.y&&this.dir!=1) {
                    this.input.up = false;
                    this.input.left = true;
                    this.input.down = false;
                    this.input.right = false;
                }
            }
            for (var i=0;i<players.concat(computers).length;i++) {
                var p = players.concat(computers)[i];
                for (var m=0;m<p.history.length;m++) {
                    var c = p.history[m];
                    for (var o=1;o<6;o++) {
                        if (this.head.x==c.x&&this.head.y-o==c.y&&this.dir==0) {
                            if (Math.floor(Math.random()*2)==0) {
                                this.input.left=true;
                                this.input.up = false;
                                this.input.down = false;
                                this.input.right = false;
                            } else {
                                this.input.right=true;
                                this.input.up = false;
                                this.input.down = false;
                                this.input.left = false;
                            }
                        }
                        if (this.head.x+o==c.x&&this.head.y==c.y&&this.dir==1) {
                            if (Math.floor(Math.random()*2)==0) {
                                this.input.up=true;
                                this.input.left = false;
                                this.input.down = false;
                                this.input.right = false;
                            } else {
                                this.input.down=true;
                                this.input.up = false;
                                this.input.left = false;
                                this.input.right = false;
                            }
                        }
                        if (this.head.x==c.x&&this.head.y+o==c.y&&this.dir==2) {
                            if (Math.floor(Math.random()*2)==0) {
                                this.input.left=true;
                                this.input.up = false;
                                this.input.down = false;
                                this.input.right = false;
                            } else {
                                this.input.right=true;
                                this.input.up = false;
                                this.input.down = false;
                                this.input.left = false;
                            }
                        }
                        if (this.head.x-o==c.x&&this.head.y==c.y&&this.dir==3) {
                            if (Math.floor(Math.random()*2)==0) {
                                this.input.up=true;
                                this.input.left = false;
                                this.input.down = false;
                                this.input.right = false;
                            } else {
                                this.input.down=true;
                                this.input.up = false;
                                this.input.left = false;
                                this.input.right = false;
                            }
                        }
                    }
                }
            }
            if (powerups.wall>0) {
                if (this.head.y<3&&this.dir==0) {
                    if (Math.floor(Math.random()*2)==0) {
                        this.input.left=true;
                        this.input.up = false;
                        this.input.down = false;
                        this.input.right = false;
                    } else {
                        this.input.right=true;
                        this.input.up = false;
                        this.input.down = false;
                        this.input.left = false;
                    }
                }
                if (this.head.x<3&&this.dir==3) {
                    if (Math.floor(Math.random()*2)==0) {
                        this.input.up=true;
                        this.input.left = false;
                        this.input.down = false;
                        this.input.right = false;
                    } else {
                        this.input.down=true;
                        this.input.up = false;
                        this.input.left = false;
                        this.input.right = false;
                    }
                }
                if (this.head.y>size-3&&this.dir==2) {
                    if (Math.floor(Math.random()*2)==0) {
                        this.input.left=true;
                        this.input.up = false;
                        this.input.down = false;
                        this.input.right = false;
                    } else {
                        this.input.right=true;
                        this.input.up = false;
                        this.input.down = false;
                        this.input.left = false;
                    }
                }
                if (this.head.x>size-3&&this.dir==1) {
                    if (Math.floor(Math.random()*2)==0) {
                        this.input.up=true;
                        this.input.left = false;
                        this.input.down = false;
                        this.input.right = false;
                    } else {
                        this.input.down=true;
                        this.input.up = false;
                        this.input.left = false;
                        this.input.right = false;
                    }
                }
            }
            if (this.catious){
            for (var i=0;i<players.concat(computers).length;i++) {
                var p = players.concat(computers)[i];
                for (var m=0;m<p.history.length;m++) {
                    var c = p.history[m];
                    for (var a=-1;a<=1;a++){
                        for (var o=1;o<6;o++) {
                            if (this.head.x+a==c.x&&this.head.y-o==c.y&&this.dir==0) {
                                if (Math.floor(Math.random()*2)==0) {
                                    this.input.left=true;
                                    this.input.up = false;
                                    this.input.down = false;
                                    this.input.right = false;
                                } else {
                                    this.input.right=true;
                                    this.input.up = false;
                                    this.input.down = false;
                                    this.input.left = false;
                                }
                            }
                            if (this.head.x+o==c.x&&this.head.y+a==c.y&&this.dir==1) {
                                if (Math.floor(Math.random()*2)==0) {
                                    this.input.up=true;
                                    this.input.left = false;
                                    this.input.down = false;
                                    this.input.right = false;
                                } else {
                                    this.input.down=true;
                                    this.input.up = false;
                                    this.input.left = false;
                                    this.input.right = false;
                                }
                            }
                            if (this.head.x+a==c.x&&this.head.y+o==c.y&&this.dir==2) {
                                if (Math.floor(Math.random()*2)==0) {
                                    this.input.left=true;
                                    this.input.up = false;
                                    this.input.down = false;
                                    this.input.right = false;
                                } else {
                                    this.input.right=true;
                                    this.input.up = false;
                                    this.input.down = false;
                                    this.input.left = false;
                                }
                            }
                            if (this.head.x-o==c.x&&this.head.y+a==c.y&&this.dir==3) {
                                if (Math.floor(Math.random()*2)==0) {
                                    this.input.up=true;
                                    this.input.left = false;
                                    this.input.down = false;
                                    this.input.right = false;
                                } else {
                                    this.input.down=true;
                                    this.input.up = false;
                                    this.input.left = false;
                                    this.input.right = false;
                                }
                            }
                        }
                    }
                }
            }
            }
            if (Math.floor(Math.random()*this.error/2)==0) {
                var decision = Math.floor(Math.random()*4);
                if (decision==0) {
                    this.input.up=true;
                    this.input.down=false;
                    this.input.left=false;
                    this.input.right=false;
                } else if (decision==1) {
                    this.input.up=false;
                    this.input.down=false;
                    this.input.left=false;
                    this.input.right=true;
                } else if (decision==2) {
                    this.input.up=false;
                    this.input.down=true;
                    this.input.left=false;
                    this.input.right=false;
                } else if (decision==3) {
                    this.input.up=false;
                    this.input.down=false;
                    this.input.left=true;
                    this.input.right=false;
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
    if (i==0) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("ArrowUp","ArrowDown","ArrowLeft","ArrowRight"),hexToRGB(colors[0])[0],hexToRGB(colors[0])[1],hexToRGB(colors[0])[2]);}
    if (i==1) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("w","s","a","d"),hexToRGB(colors[1])[0],hexToRGB(colors[1])[1],hexToRGB(colors[1])[2]);}
    if (i==2) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("t","g","f","h"),hexToRGB(colors[2])[0],hexToRGB(colors[2])[1],hexToRGB(colors[2])[2]);}
    if (i==3) {players[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,dir,new Input("i","k","j","l"),hexToRGB(colors[3])[0],hexToRGB(colors[3])[1],hexToRGB(colors[3])[2]);}
}
for (var i=0;i<computerNumber;i++) {
    var col = Math.floor(Math.random()*64)+128;
    computers[i] = new Snake(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3,Math.floor(Math.random()*4),new Input(0,1,2,3),col+Math.floor(Math.random()*96)-48,col+Math.floor(Math.random()*96)-48,col+Math.floor(Math.random()*96)-48,true);
}
var fruit = []
for (var i=0;i<Math.ceil((computerNumber+playerNumber)/2+1);i++) {
    fruit[i] = new Fruit();
}
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
    if (powerups.slow>0) {
        powerups.slow--;
    } else {
        for (var i=0;i<players.concat(computers).length;i++) {
            players.concat(computers)[i].fast=false;
        }
        slowness=1;
    }
    if (powerups.wall>0) {
        powerups.wall--;
        document.getElementsByTagName("table")[0].style.borderColor="red";
    } else {
        document.getElementsByTagName("table")[0].style.borderColor="black";
    }
    if (lossP==playerNumber&&lossC==computerNumber) {document.body.innerHTML+="<div>TIE.</div>";window.clearInterval(updateInterval);setColors();getPlayers();} else if (lossP==playerNumber-1&&lossC==computerNumber) {if(!players[0].killed){document.body.innerHTML+="<div style=\"color:"+colors[0]+";\">WIN!</div>";window.clearInterval(updateInterval);setColors();getPlayers();}else if(!players[1].killed){document.body.innerHTML+="<div style=\"color:"+colors[1]+"\">WIN!</div>";window.clearInterval(updateInterval);setColors();getPlayers();}else if(!players[2].killed){document.body.innerHTML+="<div style=\"color:"+colors[2]+";\">WIN!</div>";window.clearInterval(updateInterval);setColors();getPlayers();}else if(!players[3].killed){document.body.innerHTML+="<div style=\"color:"+colors[3]+";\">WIN!</div>";window.clearInterval(updateInterval);setColors();getPlayers();}} else if (lossP==playerNumber&&lossC<computerNumber) {document.body.innerHTML+="<div>LOSS.</div>";window.clearInterval(updateInterval);setColors();getPlayers();}
    for (var i=0;i<fruit.length;i++) {
        fruit[i].draw();
    }
    ticks++;
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
window.onkeypress = function(e) {
    for (var i=0;i<players.length;i++) {
        players[i].input.update(e.key);
    }
}
var updateInterval = window.setInterval(update,100);