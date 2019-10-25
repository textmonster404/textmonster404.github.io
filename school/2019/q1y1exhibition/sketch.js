var x = 1;
var y = 1;
var speedY = 0;
var spawnX = 1;
var spawnY = 1;
var spawnMap = 0;

maps = [new TextImage([
        "                                   ",
        "       ====================|       ",
        "       |                   |       ",
        "       |      T E X T      |       ",
        "       | A D V E N T U R E |       ",
        "       |                   |       ",
        "       |====================       ",
        "                                   ",
        "                      ===          ",
        "                      |%|          ",
        "====                  |%|          ",
        "  :             ====--===--========",
        "# :             |%|    :   |%%%%%%%",
        "===================================",
        "                 ",
        ""
    ]), new TextImage([
        "                                                                                     |%%%|   ",
        "                   _                                                                 |%%%|   ",
        "    _           /\\/ \\            =====                                               |%%%|   ",
        "   / \\/\\        \\---/   _        }%%%|                                               |%%%|   ",
        "   \\---/               / \\/\\     |%%%{                                               |%%%|   ",
        "                       \\---/     |%%%}                   @@@@                        |%%%|   ",
        "                                 {%%%|                 @@@@@@@            @@@@       |%%%|   ",
        "                                 =====        ^        @\\@@||@@         @@@@@@@      |%%%|   ",
        "                                   $          | |        \\|||/@     @@@ @==|=/@      |%%%|   ",
        "             =====       =====   =====      | |_|         |||      @@@@@   |       ==========",
        "  #     /\\   |%%%|       |%%%|   |%%%}      |_|           :::       \\|=@   |       :        :",
        "=====  ===========\\     /======  |%%%|========|===        |||        |     |       :        :",
        "%%%%%^^%%%%%%%%%%%^^^^^^^%%%%|   |%%%|           \\========|||============^^^^^===============",
        "==============================  =|%%%{                   \\---/                              ",
        "         | +                     |%%%|                                                      ",
        "         ========================|%%%|                                                      "
    ]), new TextImage([
        "                                                                                               ",
        "                                                                            ______             ",
        "                          _  _               ____                    ___        ------         ",
        "                         / \\/ \\/\\          ---                         ---                     ",
        "                         \\_v_v__/                                                              ",
        "                _                 _                                                            ",
        "     @         / \\/\\            _/ \\                      - _/\\--      ===         ============",
        "       @       \\---/        /\\//==================         / \\ \\       | |===|   |=|           ",
        "        @                 __=====/               |=====================|     |   |             ",
        "==     _/\\               /  |                                                |^^^|             ",
        ":     / \\ \\            _====/                                                                  ",
        ":  # /   \\ \\          //|                                                                      ",
        "=============^^^^^======/                                                                      ",
        "                                                                                               ",
        "                                                                                               ",
        "                                                                                               "
    ]), new TextImage([
        "                                                             ",
        "                           @@                                ",
        "                             @                               ",
        "            ________      - -/\\_--                           ",
        "                 ------     / / \\                            ",
        "  #                    |=================^^=====|            ",
        "=======================|                        |  |=========",
        "                                                |  |         ",
        "                                                |\\ |         ",
        "                                                | \\|         ",
        "                                                |. |         ",
        "                                                | .|         ",
        "                                                |.'|         ",
        "                                                |:;|         ",
        "                                                |^^|         ",
        "                                                             "
    ])
];
var solid = ["=","|","{","}","$","%"];
var map = parseInt(localStorage.getItem("map")) || 0;
function setup(){
    for (var i=0;i<maps[map].length;i++) {
        if (maps[map][i].includes("#")) {
            y=i+1;
            spawnY = y;
            x=maps[map][i].split("#")[0].length+1;
            spawnX = x;
            speedY = 0;
            maps[map][i] = maps[map][i].split("#").join(" ");
        }
    }
}
var keysLeft = 0;
function update() {
    clear();
    char = "=";
    maps[map].draw(1,1);
    speedY+=0.1;
    if (keys["ArrowRight"]&&x<maps[map][0].length&&!solid.includes(maps[map][floor(y-1)].charAt(floor(x)))) {
        x+=0.75;
    }
    if (keys["ArrowLeft"]&&x>1&&!solid.includes(maps[map][floor(y-1)].charAt(floor(x-2)))) {
        x-=0.75;
    }
    if (solid.includes(maps[map][floor(y-2)].charAt(floor(x-1)))) {
        speedY=0.5;
    }
    if (solid.includes(maps[map][floor(y)].charAt(floor(x-1)))) {
        speedY=0;
    }
    if (keys["ArrowUp"]&&solid.includes(maps[map][floor(y)].charAt(floor(x-1)))&&!solid.includes(maps[map][floor(y-2)].charAt(floor(x-1)))) {
        speedY=-0.6;
    }
    if (y>=maps[map].length||maps[map][floor(y-1)].charAt(floor(x-1))=="^") {
        x = spawnX;
        y = spawnY;
        speedY = 0;
        map = spawnMap;
    }
    if (maps[map][floor(y-1)].charAt(floor(x-1))=="+") {
        keysLeft++;
        maps[map][floor(y-1)] = maps[map][floor(y-1)].replaceAt(floor(x-1)," ");
    }
    if (maps[map][floor(y-1)].charAt(floor(x-2))=="$"&&keysLeft>0) {
        keysLeft--;
        maps[map][floor(y-1)] = maps[map][floor(y-1)].replaceAt(floor(x-2)," ");
    }
    if (maps[map][floor(y-1)].charAt(floor(x))=="$"&&keysLeft>0) {
        keysLeft--;
        maps[map][floor(y-1)] = maps[map][floor(y-1)].replaceAt(floor(x)," ");
    }
    for (var k=0;k<keysLeft;k++) {
        char = "+";
        point(floor(x),floor(y-k-1));
    }
    if (map<maps.length-1&&floor(x)==maps[map][0].length&&keys["ArrowRight"]) {
        map++;
        x = 1;
        for (var i=0;i<maps[map].length;i++) {
            if (maps[map][i].includes("#")) {
                spawnY = i+1;
                spawnX = maps[map][i].split("#")[0].length+1;
                maps[map][i] = maps[map][i].split("#").join(" ");
                spawnMap = map;
            }
        }
    }
    if (map>0&&floor(x)==1&&keys["ArrowLeft"]) {
        map--;
        x = maps[map][0].length;
        for (var i=0;i<maps[map].length;i++) {
            if (maps[map][i].includes("#")) {
                spawnY = i+1;
                spawnX = maps[map][i].split("#")[0].length+1;
                maps[map][i] = maps[map][i].split("#").join(" ");
                spawnMap = map;
            }
        }
    }
    if (map==0&&x<1) {
        x=1;
    }
    if (speedY>1) {speedY=1;}
    if (speedY<-1) {speedY=-1;}
    y+=speedY;
    char = "#";
    point(floor(x),floor(y));
    localStorage.setItem("map",map);
    localStorage.setItem("x",x);
    localStorage.setItem("y",y);
}