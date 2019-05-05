var $ = function(str) {return document.getElementById(str);}
var n = parseInt(decodeURIComponent(window.location.search.substring(1)));
var puzzle = sudoku.generate(n,true);
for (var i=0;i<puzzle.length;i++) {
    if (puzzle.charAt(i)!==".") {
        $((i%9)+","+(Math.floor(i/9)%9)).innerHTML=puzzle.charAt(i);
    }
}