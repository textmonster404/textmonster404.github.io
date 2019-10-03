

var boards = {}
boards.first = [
    [" "," ","1"],
    [" "," ","b"],
    ["b"," "," "],
    ["1","1"," "]
];
boards.flip = [
    [" "," "," "," "],
    [" ","b","b"," "],
    ["3","b","b"," "],
    ["3","b","b","3"],
    ["b","b","b","b"],
    [" "," "," "," "],
    [" "," ","b"," "],
    [" "," ","b","2"],
    ["2","2","b","b"]
];
boards.swap = [
    ["3","2","1"],
    ["1","3","2"],
    ["2","3","1"]
];
boards.shake = [
    ["b","b"," ","b","b"],
    ["b"," "," "," ","b"],
    ["1"," "," "," ","1"],
    ["b","2","1","2","b"],
    ["b","b","2","b","b"]
];
boards.spiral = [
    ["4","4","2"," "," "],
    ["b","b","b","b"," "],
    [" "," "," "," "," "],
    [" ","b","b","b","b"],
    [" "," ","4","2","2"]
];
boards.mountain = [
    ["b","b","b","b","b"],
    ["2","b","b","b","1"],
    ["b"," ","b"," ","b"],
    [" "," "," "," "," "],
    ["1","1"," ","2","2"]
];
boards.tunnel = [
    ["b","b"," ","b","b"],
    ["b","4"," ","1","b"],
    ["2","3"," ","2","1"],
    ["4","1"," ","3","3"],
    ["b","2"," ","4","b"],
    ["b","b"," ","b","b"]
];
boards.gravity = [
    ["b","b","b","b","b","b","b","b","b"],
    [" "," "," "," ","b"," "," "," "," "],
    [" ","b"," "," ","b"," "," ","b","1"],
    ["1","b"," "," "," "," "," ","b","1"],
    ["b","b","b","b","b","b","b","b","b"],
    ["1","b"," "," "," "," "," ","b","b"],
    [" ","b"," "," ","b"," "," ","b","b"],
    [" "," "," "," ","b"," "," "," "," "],
    ["b","b","b","b","b","b","b","b","1"],
    ["b","b","b","b","b","b","b","b","1"]
];

var gravity = 2;
var cellClicked = [-1,-1];
var dimensions = [];
var to1D,getCell,update,draw,click;
var uInterval = -1;
var dInterval = -1;
if (boards[window.location.search.substring(1)]) {
dimensions = [boards[window.location.search.substring(1)][0].length,boards[window.location.search.substring(1)].length];
    var tHTML = "<table style=\"border:1px solid black;border-collapse:collapse;\"><tbody>";
    for (var i=0;i<dimensions[1];i++) {
        tHTML+="<tr>";
        for (var j=0;j<dimensions[0];j++) {
            tHTML+="<td><button>"+boards[window.location.search.substring(1)][i][j]+"</button></td>";
        }
        tHTML+="</tr>"
    }
    tHTML+="</tbody></table>";
    document.body.innerHTML+=tHTML;
    document.body.innerHTML += `<br/><br/><table>
    <tr>
        <td style="border:none;"></td>
        <td>
            <button style="background:white;" id="up">
                <span style="color:black;">\u25b2</span>
            </button>
        </td>
        <td style="border:none;"></td>
    </tr>
    <tr>
        <td>
            <button style="background:white;" id="left">
                <span style="color:black;">\u25c4</span>
            </button>
        </td>
        <td style="border:none;"></td>
        <td>
            <button style="background:white;" id="right">
                <span style="color:black;">\u25ba</span>
            </button>
        </td>
    </tr>
    <tr>
        <td style="border:none;"></td>
        <td>
            <button style="background:white;" id="down">
                <span style="color:black;">\u25bc</span>
            </button>
        </td>
        <td style="border:none;"></td>
    </tr>
</table>`;
    function to1D(x,y) {
        return x+y*dimensions[0];
    }
    function getCell(x,y) {
        if (document.getElementsByTagName("table")[0].rows[y]) {
            if (document.getElementsByTagName("table")[0].rows[y].cells[x]) {
                return document.getElementsByTagName("table")[0].rows[y].cells[x].children[0];
            }
        }
    }
    function update() {
        if (gravity==2) {
            for (var y=dimensions[1];y>=0;y--) {
                for (var x=0;x<dimensions[0];x++) {
                    if (getCell(x,y)) {
                        if (getCell(x,y+1)&&getCell(x,y).innerText!=""&&getCell(x,y).innerText!="b") {
                            if (getCell(x,y+1).innerText=="") {
                                getCell(x,y+1).innerText = getCell(x,y).innerText;
                                getCell(x,y).innerText = "";
                            } else {
                                if (getCell(x+1,y)) {
                                    if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                        if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y).innerText = "";
                                            getCell(x+2,y).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x+1,y+1)) {
                                    if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                        if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y+1).innerText = "";
                                            getCell(x+2,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x,y+1)) {
                                    if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                        if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x,y+1).innerText = "";
                                            getCell(x,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x-1,y+1)) {
                                    if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                        if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x-1,y+1).innerText = "";
                                            getCell(x-2,y+2).innerText = "";
                                        }
                                    }
                                }
                            }
                        } else if (getCell(x,y).innerText!="b") {
                            if (getCell(x+1,y)) {
                                if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                    if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y).innerText = "";
                                        getCell(x+2,y).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x+1,y+1)) {
                                if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                    if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y+1).innerText = "";
                                        getCell(x+2,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x,y+1)) {
                                if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                    if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x,y+1).innerText = "";
                                        getCell(x,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x-1,y+1)) {
                                if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                    if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x-1,y+1).innerText = "";
                                        getCell(x-2,y+2).innerText = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (gravity==0) {
            for (var y=0;y<dimensions[1];y++) {
                for (var x=0;x<dimensions[0];x++) {
                    if (getCell(x,y)) {
                        if (getCell(x,y-1)&&getCell(x,y).innerText!=""&&getCell(x,y).innerText!="b") {
                            if (getCell(x,y-1).innerText=="") {
                                getCell(x,y-1).innerText = getCell(x,y).innerText;
                                getCell(x,y).innerText = "";
                            } else {
                                if (getCell(x+1,y)) {
                                    if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                        if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y).innerText = "";
                                            getCell(x+2,y).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x+1,y+1)) {
                                    if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                        if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y+1).innerText = "";
                                            getCell(x+2,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x,y+1)) {
                                    if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                        if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x,y+1).innerText = "";
                                            getCell(x,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x-1,y+1)) {
                                    if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                        if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x-1,y+1).innerText = "";
                                            getCell(x-2,y+2).innerText = "";
                                        }
                                    }
                                }
                            }
                        } else if (getCell(x,y).innerText!="b") {
                            if (getCell(x+1,y)) {
                                if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                    if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y).innerText = "";
                                        getCell(x+2,y).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x+1,y+1)) {
                                if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                    if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y+1).innerText = "";
                                        getCell(x+2,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x,y+1)) {
                                if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                    if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x,y+1).innerText = "";
                                        getCell(x,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x-1,y+1)) {
                                if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                    if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x-1,y+1).innerText = "";
                                        getCell(x-2,y+2).innerText = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (gravity==3) {
            for (var x=0;x<dimensions[0];x++) {
                for (var y=0;y<dimensions[1];y++) {
                    if (getCell(x,y)) {
                        if (getCell(x-1,y)&&getCell(x,y).innerText!=""&&getCell(x,y).innerText!="b") {
                            if (getCell(x-1,y).innerText=="") {
                                getCell(x-1,y).innerText = getCell(x,y).innerText;
                                getCell(x,y).innerText = "";
                            } else {
                                if (getCell(x+1,y)) {
                                    if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                        if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y).innerText = "";
                                            getCell(x+2,y).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x+1,y+1)) {
                                    if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                        if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y+1).innerText = "";
                                            getCell(x+2,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x,y+1)) {
                                    if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                        if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x,y+1).innerText = "";
                                            getCell(x,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x-1,y+1)) {
                                    if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                        if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x-1,y+1).innerText = "";
                                            getCell(x-2,y+2).innerText = "";
                                        }
                                    }
                                }
                            }
                        } else if (getCell(x,y).innerText!="b") {
                            if (getCell(x+1,y)) {
                                if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                    if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y).innerText = "";
                                        getCell(x+2,y).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x+1,y+1)) {
                                if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                    if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y+1).innerText = "";
                                        getCell(x+2,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x,y+1)) {
                                if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                    if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x,y+1).innerText = "";
                                        getCell(x,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x-1,y+1)) {
                                if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                    if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x-1,y+1).innerText = "";
                                        getCell(x-2,y+2).innerText = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (gravity==1) {
            for (var x=dimensions[0]-1;x>=0;x--) {
                for (var y=0;y<dimensions[1];y++) {
                    if (getCell(x,y)) {
                        if (getCell(x+1,y)&&getCell(x,y).innerText!=""&&getCell(x,y).innerText!="b") {
                            if (getCell(x+1,y).innerText=="") {
                                getCell(x+1,y).innerText = getCell(x,y).innerText;
                                getCell(x,y).innerText = "";
                            } else {
                                if (getCell(x+1,y)) {
                                    if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                        if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y).innerText = "";
                                            getCell(x+2,y).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x+1,y+1)) {
                                    if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                        if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x+1,y+1).innerText = "";
                                            getCell(x+2,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x,y+1)) {
                                    if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                        if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x,y+1).innerText = "";
                                            getCell(x,y+2).innerText = "";
                                        }
                                    }
                                }
                                if (getCell(x-1,y+1)) {
                                    if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                        if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                            getCell(x,y).innerText = "";
                                            getCell(x-1,y+1).innerText = "";
                                            getCell(x-2,y+2).innerText = "";
                                        }
                                    }
                                }
                            }
                        } else if (getCell(x,y).innerText!="b") {
                            if (getCell(x+1,y)) {
                                if (getCell(x+1,y).innerText==getCell(x,y).innerText&&getCell(x+2,y)) {
                                    if (getCell(x+2,y).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y).innerText = "";
                                        getCell(x+2,y).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x+1,y+1)) {
                                if (getCell(x+1,y+1).innerText==getCell(x,y).innerText&&getCell(x+2,y+2)) {
                                    if (getCell(x+2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x+1,y+1).innerText = "";
                                        getCell(x+2,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x,y+1)) {
                                if (getCell(x,y+1).innerText==getCell(x,y).innerText&&getCell(x,y+2)) {
                                    if (getCell(x,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x,y+1).innerText = "";
                                        getCell(x,y+2).innerText = "";
                                    }
                                }
                            }
                            if (getCell(x-1,y+1)) {
                                if (getCell(x-1,y+1).innerText==getCell(x,y).innerText&&getCell(x-2,y+2)) {
                                    if (getCell(x-2,y+2).innerText==getCell(x,y).innerText) {
                                        getCell(x,y).innerText = "";
                                        getCell(x-1,y+1).innerText = "";
                                        getCell(x-2,y+2).innerText = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function draw() {
        var win = true;
        for (var y=dimensions[1];y>=0;y--) {
            for (var x=0;x<dimensions[0];x++) {
                if (getCell(x,y)) {
                    if (getCell(x,y).innerText=="1") {
                        getCell(x,y).style.background = "red";
                        win=false;
                    } else if (getCell(x,y).innerText=="2") {
                        getCell(x,y).style.background = "green";
                        win=false;
                    } else if (getCell(x,y).innerText=="3") {
                        getCell(x,y).style.background = "yellow";
                        win=false;
                    } else if (getCell(x,y).innerText=="4") {
                        getCell(x,y).style.background = "blue";
                        win=false;
                    } else if (getCell(x,y).innerText=="b") {
                        getCell(x,y).style.background = "black";
                    } else {
                        getCell(x,y).style.background = "white";
                    }
                }
            }
        }
        if (win) {
            clearInterval(uInterval);
            clearInterval(dInterval);
            document.body.innerHTML+="<h3>Win!</h3><div><a href=\"sandpile.html\">Back</a></div>"
        }
    }
    function click(e) {
        for (var y=0;y<dimensions[1];y++) {
            for (var x=0;x<dimensions[0];x++) {
                if (getCell(x,y)==e.target) {
                    if (!(cellClicked[0]==x&&cellClicked[1]==y)&&getCell(x,y).innerText!="b") {
                        if ((gravity==0||gravity==2)&&(cellClicked[0]==x-1&&cellClicked[1]==y||cellClicked[0]==x+1&&cellClicked[1]==y)) {
                            var temp = getCell(cellClicked[0],cellClicked[1]).innerText;
                            getCell(cellClicked[0],cellClicked[1]).innerText = e.target.innerText;
                            e.target.innerText = temp;
                            cellClicked = [-1,-1];
                        } else if ((gravity==1||gravity==3)&&(cellClicked[0]==x&&cellClicked[1]==y-1||cellClicked[0]==x&&cellClicked[1]==y+1)) {
                            var temp = getCell(cellClicked[0],cellClicked[1]).innerText;
                            getCell(cellClicked[0],cellClicked[1]).innerText = e.target.innerText;
                            e.target.innerText = temp;
                            cellClicked = [-1,-1];
                        } else if (cellClicked[0]==x&&cellClicked[1]==y) {
                            var temp = getCell(cellClicked[0],cellClicked[1]).innerText;
                            getCell(cellClicked[0],cellClicked[1]).innerText = e.target.innerText;
                            e.target.innerText = temp;
                            cellClicked = [-1,-1];
                        } else {
                            cellClicked = [x,y];
                        }
                    }
                }
            }
        }
    }
    for (var i=0;i<document.getElementsByTagName("button").length;i++) {
        document.getElementsByTagName("button")[i].onclick=click;
    }
    document.getElementsByTagName("button")[document.getElementsByTagName("button").length-4].onclick = function(){gravity=0;};
    document.getElementsByTagName("button")[document.getElementsByTagName("button").length-3].onclick = function(){gravity=3;};
    document.getElementsByTagName("button")[document.getElementsByTagName("button").length-2].onclick = function(){gravity=1;};
    document.getElementsByTagName("button")[document.getElementsByTagName("button").length-1].onclick = function(){gravity=2;};
    uInterval = window.setInterval(update,100);
    dInterval = window.setInterval(draw,0);
} else {
    document.body.innerHTML += `<h2>How to play:</h2>
<div>Swap adjacent tiles by clicking on the board.</div>
<div>Change gravity by clicking the arrows (not the arrow keys).</div>
<div>Eliminate sand by getting a 3-in-a-row of one color.</div>
<div>Try to eliminate all of the sand.</div>
<h3>Select level</h3>
<ol>
    <li><a href="sandpile.html?first">First</a>
    <li><a href="sandpile.html?flip">Flip</a>
    <li><a href="sandpile.html?swap">Swap</a>
    <li><a href="sandpile.html?shake">Shake</a>
    <li><a href="sandpile.html?spiral">Spiral</a>
    <li><a href="sandpile.html?mountain">Mountain</a>
    <li><a href="sandpile.html?tunnel">Tunnel</a>
    <li><a href="sandpile.html?gravity">Gravity</a>
</ol>`;
}