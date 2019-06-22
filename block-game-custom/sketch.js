function createGame(scr) {
var ref = firebase.database().ref().push();
console.log(firebase.database().ref(ref.getKey()).set(scr).then(function(d){var url = window.location.href.split("make").join("play")+"?g="+ref.getKey();createDiv("<a href=\""+url+"\">"+url+"</a>");}));
}



function setup() {noCanvas();}

function draw() {}
