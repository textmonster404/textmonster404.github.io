function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}
var name = decodeURIComponent(window.location.search.substring(1));
var myR = Math.random().toString().split(".").join("");
if (name=="") {name=myR.substring(myR.length-6,myR.length);} else {document.getElementsByTagName("input")[0].style.display="none";}
var myCir={"x":0,"y":0,"speedX":0,"speedY":0,"mouseX":0,"mouseY":0,"name":name};
firebase.database().ref().once("value").then(
  function(d) {
    data = d.val();
    pData = data;
    firebase.database().ref().remove().then(
      function(){
        firebase.database().ref(myR).set(myCir);
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
      var ball = data[i];
      if (i!==myR) {
        fill(0);
        stroke(0);
        line(ball.mouseX,ball.mouseY,ball.x,ball.y);
        circle(ball.x,ball.y,5);
        circle(ball.mouseX,ball.mouseY,2);
        text(ball.name,ball.mouseX,ball.mouseY);
      }
    }
    myCir.mouseX = mouseX;
    myCir.mouseY = mouseY;
    if (sqrt(abs(myCir.mouseX-myCir.x)**2+abs(myCir.mouseY-myCir.y)**2)>100) {
      myCir.speedX+=(myCir.mouseX-myCir.x)/40;
      myCir.speedY+=(myCir.mouseY-myCir.y)/40;
    }
    myCir.speedY+=0.5;
    myCir.speedX*=0.95;
    myCir.speedY*=0.95;
    myCir.x+=myCir.speedX;
    myCir.y+=myCir.speedY;
    if (myCir.x>window.innerWidth-5) {
      myCir.x=window.innerWidth-5;
      myCir.speedX*=-0.9;
    }
    if (myCir.y>window.innerHeight-5) {
      myCir.y=window.innerHeight-5;
      myCir.speedY*=-0.9;
    }
    if (myCir.x<5) {
      myCir.x=5;
      myCir.speedX*=-1;
    }
    if (myCir.y<5) {
      myCir.y=5;
      myCir.speedY*=-1;
    }
    firebase.database().ref(myR).set(myCir);
    fill(0);
    stroke(0);
    line(myCir.mouseX,myCir.mouseY,myCir.x,myCir.y);
    circle(myCir.x,myCir.y,5);
    text(myCir.name,myCir.mouseX,myCir.mouseY);
  } else {
    text("Loading...",200,200);
  }
}
