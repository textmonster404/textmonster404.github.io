var game = {"players":parseInt(window.location.search.substring(1).split("&")[0]) || 2,"board":window.location.search.substring(1).split("&")[1],"turn":1,"row":3,"win":0};

var boards = {};
class Board {
    constructor(board,players,row) {
        this.board = board;
        this.row = row || 3;
        this.players = players || 2;
        this.height = this.board.length;
        this.width = this.board[0].length;
    }
}
function rect(w,h) {
    var temp = [];
    for (var y=0;y<h;y++) {
        temp[y] = [];
        for (var x=0;x<w;x++) {
            temp[y][x] = 1;
        }
    }
    return temp;
}
function lineH(w) {
    var temp = [];
    for (var x=0;x<w;x++) {
        temp[x] = 1;
    }
    return temp;
}
function lineHBlank(w) {
    var temp = [];
    for (var x=0;x<w;x++) {
        temp[x] = 0;
    }
    return temp;
}
function offsetX(board,offset) {
    var temp = board;
    var temp2 = [];
    for (var x=0;x<offset;x++) {
        temp2[x] = 0;
    }
    for (var i=0;i<temp.length;i++) {
        temp[i] = temp2.concat(temp[i]);
    }
    return temp
}
function square(l) {
    return rect(l,l);
}
function overlap(board1,board2) {
    var temp = [];
    for (var y=0;y<Math.max(board1.length,board2.length);y++) {
        temp[y] = [];
        for (var x=0;x<Math.max(board1[0].length,board2[0].length);x++) {
            if ((board1[y]&&board1[y][x]==1)||(board2[y]&&board2[y][x]==1)) {
                temp[y][x] = 1;
            } else {
                temp[y][x] = 0;
            }
        }
    }
    return temp;
}


boards.classic = new Board(square(3));
boards.classic3player = new Board(square(4),3);
boards.rectangle = new Board(rect(4,3));
boards.cross = new Board(overlap(offsetX(rect(2,6),2),[lineHBlank(6),lineHBlank(6),lineH(6),lineH(6),lineHBlank(6),lineHBlank(6)]),2,4);
boards.dumbbell = new Board([[1,1,1,0,1,1,1],[1,0,1,1,1,0,1],[1,1,1,0,1,1,1]]);
boards.dumbbell3player = new Board([[1,1,1,0,1,1,1],lineH(7),[1,1,1,0,1,1,1]],3);
boards.squarefield = new Board([[1,1,1,0,1,1,1],[1,0,1,1,1,0,1],[1,1,1,0,1,1,1],[0,1,0,0,0,1,0],[1,1,1,0,1,1,1],[1,0,1,1,1,0,1],[1,1,1,0,1,1,1]],3);
boards.disc = new Board([[0,1,1,1,0],lineH(5),[1,1,0,1,1],lineH(5),[0,1,1,1,0]],3);
boards.wheel = new Board([[0,0,1,0,0],[0,1,1,1,0],[1,1,0,1,1],[0,1,1,1,0],[0,0,1,0,0]]);
boards.fourbyfour = new Board(square(4),2,4);
boards.pyramid = new Board([[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,0,0,0,1,0],[1,1,1,0,1,1,1],[0,0,0,1,0,0,0]],3);
boards.temple = new Board([[0,1,0,1,0,1,0],[1,1,1,1,1,1,1],[0,1,0,0,0,1,0],[1,1,1,1,1,1,1],[0,0,0,1,0,0,0]],2,4);
boards.spiral = new Board([[0,0,0,1,0],[1,1,1,1,0],[0,1,0,1,0],[0,1,1,1,1],[0,1,0,0,0]],3);
boards.whirlpool = new Board([[0,0,1,1,0],[1,1,1,1,0],[1,1,0,1,1],[0,1,1,1,1],[0,1,1,0,0]],3);
boards.flower = new Board([[0,1,1,1,0],[1,1,1,1,1],[1,1,0,1,1],[1,1,1,1,1],[0,1,1,1,0]],2,4);
boards.flower3player = new Board([[0,1,1,1,0],[1,1,1,1,1],[1,1,0,1,1],[1,1,1,1,1],[0,1,1,1,0]],3);
boards.diagonals = new Board([[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,1,1,0,0,1,1,0,0],[0,0,1,1,0,0,1,1,0,0],[1,1,0,0,1,1,0,0,1,1],[1,1,0,0,1,1,0,0,1,1],[0,0,1,1,0,0,1,1,0,0],[0,0,1,1,0,0,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],3,4);



function createBoard(board) {
    var HTML = "<div><b>"+board.row+"</b> in a row.</div><div><b>"+game.players+"</b> players.</div><table title=\""+""+"\"><tbody>";
    for (var y=0;y<board.height;y++) {
        HTML += "<tr>";
        for (var x=0;x<board.width;x++) {
            if (board.board[y][x]==1) {
                HTML += "<td class=\"c\"><button></button></td>";
            } else {
                HTML += "<td></td>"
            }
        }
        HTML += "</tr>";
    }
    HTML += "</tbody></table><br/><br/>";
    document.body.innerHTML += HTML;
    game.row = board.row;
}
for (var b in boards) {
    boards[b].name = b;
}
function start() {
    if (game.board&&boards[game.board]) {
        createBoard(boards[game.board]);
    } else {
        var possibleBoards = [];
        for (var b in boards) {
            if (boards[b].players==game.players) {
                possibleBoards = possibleBoards.concat([boards[b]]);
            }
        }
        var b = Math.floor(Math.random()*possibleBoards.length);
        createBoard(possibleBoards[b]);
    }
    for (var i=0;i<document.getElementsByTagName("button").length;i++) {
        document.getElementsByTagName("button")[i].onclick = clickSquare;
    }
}

function clickSquare(e) {
    if (e.target.innerText==""&&game.win==0) {
        e.target.innerText = ["X","O","\u2713"][game.turn-1];
        game.turn++;
        if (game.turn>game.players) {
            game.turn = 1;
        }
    }
    var t = document.getElementsByTagName("table")[0];
    var isfull = true;
    for (var x=0;x<t.rows[0].cells.length;x++) {
        for (var y=0;y<t.rows.length;y++) {
            if (t.getCell(x,y).innerText==""&&t.getCell(x,y).className=="c") {
                isfull = false;
            }
            if (game.row==3) {
                if (t.getCell(x,y).innerText=="X") {
                    if (t.getCell(x+1,y).innerText=="X") {
                        if (t.getCell(x+2,y).innerText=="X") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                            game.win=1;
                            document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="X") {
                        if (t.getCell(x+2,y+2).innerText=="X") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                            game.win=1;
                            document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="X") {
                        if (t.getCell(x,y+2).innerText=="X") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                            game.win=1;
                            document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x-1,y+1).innerText=="X") {
                        if (t.getCell(x-2,y+2).innerText=="X") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x-1,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x-2,y+2).children[0].style.fontWeight = "bold";
                            game.win=1;
                            document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                            return ;
                        }
                    }
                }
                if (t.getCell(x,y).innerText=="O") {
                    if (t.getCell(x+1,y).innerText=="O") {
                        if (t.getCell(x+2,y).innerText=="O") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                            game.win=2;
                            document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="O") {
                        if (t.getCell(x+2,y+2).innerText=="O") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                            game.win=2;
                            document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="O") {
                        if (t.getCell(x,y+2).innerText=="O") {
                             t.getCell(x,y).children[0].style.fontWeight = "bold";
                             t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                             t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                             game.win=2;
                             document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                             return ;
                         }
                     }
                     if (t.getCell(x-1,y).innerText=="O") {
                         if (t.getCell(x-2,y).innerText=="O") {
                             t.getCell(x,y).children[0].style.fontWeight = "bold";
                             t.getCell(x-1,y).children[0].style.fontWeight = "bold";
                             t.getCell(x-2,y).children[0].style.fontWeight = "bold";
                             game.win=2;
                             document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                             return ;
                         }
                    }
                }
                if (t.getCell(x,y).innerText=="\u2713") {
                    if (t.getCell(x+1,y).innerText=="\u2713") {
                        if (t.getCell(x+2,y).innerText=="\u2713") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                            game.win=3;
                            document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="\u2713") {
                        if (t.getCell(x+2,y+2).innerText=="\u2713") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                            game.win=3;
                            document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="\u2713") {
                        if (t.getCell(x,y+2).innerText=="\u2713") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                            t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                            game.win=3;
                            document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                            return ;
                        }
                    }
                    if (t.getCell(x-1,y).innerText=="\u2713") {
                        if (t.getCell(x-2,y).innerText=="\u2713") {
                            t.getCell(x,y).children[0].style.fontWeight = "bold";
                            t.getCell(x-1,y).children[0].style.fontWeight = "bold";
                            t.getCell(x-2,y).children[0].style.fontWeight = "bold";
                            game.win=3;
                            document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                            return ;
                        }
                    }
                }
            }
            if (game.row==4) {
                if (t.getCell(x,y).innerText=="X") {
                    if (t.getCell(x+1,y).innerText=="X") {
                        if (t.getCell(x+2,y).innerText=="X") {
                            if (t.getCell(x+3,y).innerText=="X") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y).children[0].style.fontWeight = "bold";
                                game.win=1;
                                document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="X") {
                        if (t.getCell(x+2,y+2).innerText=="X") {
                            if (t.getCell(x+3,y+3).innerText=="X") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y+3).children[0].style.fontWeight = "bold";
                                game.win=1;
                                document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="X") {
                        if (t.getCell(x,y+2).innerText=="X") {
                            if (t.getCell(x,y+3).innerText=="X") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+3).children[0].style.fontWeight = "bold";
                                game.win=1;
                                document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x-1,y).innerText=="X") {
                        if (t.getCell(x-2,y).innerText=="X") {
                            if (t.getCell(x-3,y).innerText=="X") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-3,y).children[0].style.fontWeight = "bold";
                                game.win=1;
                                document.body.innerHTML += "<h3>Player 1 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                }
                if (t.getCell(x,y).innerText=="O") {
                    if (t.getCell(x+1,y).innerText=="O") {
                        if (t.getCell(x+2,y).innerText=="O") {
                            if (t.getCell(x+3,y).innerText=="O") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y).children[0].style.fontWeight = "bold";
                                game.win=2;
                                document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="O") {
                        if (t.getCell(x+2,y+2).innerText=="O") {
                            if (t.getCell(x+3,y+3).innerText=="O") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y+3).children[0].style.fontWeight = "bold";
                                game.win=2;
                                document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="O") {
                        if (t.getCell(x,y+2).innerText=="O") {
                            if (t.getCell(x,y+3).innerText=="O") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+3).children[0].style.fontWeight = "bold";
                                game.win=2;
                                document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x-1,y).innerText=="O") {
                        if (t.getCell(x-2,y).innerText=="O") {
                            if (t.getCell(x-3,y).innerText=="O") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-3,y).children[0].style.fontWeight = "bold";
                                game.win=2;
                                document.body.innerHTML += "<h3>Player 2 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                }
                if (t.getCell(x,y).innerText=="\u2713") {
                    if (t.getCell(x+1,y).innerText=="\u2713") {
                        if (t.getCell(x+2,y).innerText=="\u2713") {
                            if (t.getCell(x+3,y).innerText=="\u2713") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y).children[0].style.fontWeight = "bold";
                                game.win=3;
                                document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x+1,y+1).innerText=="\u2713") {
                        if (t.getCell(x+2,y+2).innerText=="\u2713") {
                            if (t.getCell(x+3,y+3).innerText=="\u2713") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x+1,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x+2,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x+3,y+3).children[0].style.fontWeight = "bold";
                                game.win=3;
                                document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x,y+1).innerText=="\u2713") {
                        if (t.getCell(x,y+2).innerText=="\u2713") {
                            if (t.getCell(x,y+3).innerText=="\u2713") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+1).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+2).children[0].style.fontWeight = "bold";
                                t.getCell(x,y+3).children[0].style.fontWeight = "bold";
                                game.win=3;
                                document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                    if (t.getCell(x-1,y).innerText=="\u2713") {
                        if (t.getCell(x-2,y).innerText=="\u2713") {
                            if (t.getCell(x-3,y).innerText=="\u2713") {
                                t.getCell(x,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-1,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-2,y).children[0].style.fontWeight = "bold";
                                t.getCell(x-3,y).children[0].style.fontWeight = "bold";
                                game.win=3;
                                document.body.innerHTML += "<h3>Player 3 Wins!</h3>";
                                return ;
                            }
                        }
                    }
                }
            }
        }
    }
    if (isfull) {
        game.win=255;
        document.body.innerHTML += "<h3>Tie...</h3>";
        return ;
    }
}

HTMLTableElement.prototype.getCell = function(x,y) {
    if (this.rows[y]) {
        if (this.rows[y].cells[x]) {
            return this.rows[y].cells[x];
        } else {
            return {"innerText":""};
        }
    } else {
        return {"innerText":""};
    }
}
start();