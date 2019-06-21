function createGame(scr) {
var ref = firebase.database().ref().push();
console.log(firebase.database().ref(ref.getKey()).set(scr).then(function(d){var url = window.location.href.split("make").join("play")+"?g="+ref.getKey();document.body.innerHTML+="<div><a href=\""+url+"\">"+url+"</a></div>";}));
}



function setup() {noCanvas();}

function draw() {}
