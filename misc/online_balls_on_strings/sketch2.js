function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}
var name = decodeURIComponent(window.location.search.substring(1));
var myR = Math.random().toString().split(".").join("");
if (name=="") {name=myR.substring(myR.length-6,myR.length);} else {document.getElementsByTagName("input")[0].style.display="none";}
var myCur={"x":0,"y":0,"r":2,"t":0,"name":name};
firebase.database().ref().once("value").then(
  function(d) {
    data = d.val();
    pData = data;
    firebase.database().ref().remove().then(
      function(){
        firebase.database().ref(myR).set(myCur);
        firebase.database().ref().on("value",
          function(d){
            data=d.val();
            loaded=true;
          }
        );
      }
    );
  }
);
window.setInterval(function(){pData=data;firebase.database().ref().remove();del=window.setInterval(function(){data=pData;},0);window.setTimeout(function(){window.clearInterval(del);},100)},5000);
function draw() {
  if(loaded) {
    background(251);
    for(var i in data) {
      var cursor = data[i];
      fill(0);
      stroke(0);
      text(cursor.name+"    "+"Clicks: "+cursor.t,cursor.x+4,cursor.y+4);
      circle(cursor.x,cursor.y,cursor.r);
    }
    circle(myCur.x,myCur.y,myCur.r);
    myCur.x = mouseX;
    myCur.y = mouseY;
    firebase.database().ref(myR).set(myCur);
    fill(0);
    stroke(0);
  } else {
    text("Loading...",200,200);
  }
}
function mousePressed() {
  myCur.t++;
}