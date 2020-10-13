var Graphics = {};
var Sounds = {};
var Keys = {};
var Characters = {};
var AI = {};
var Cam = new Camera();

// create array function
Array.prototype.quantityOf = function(value) {
  var count = 0;
  for (var i=0;i<this.length;i++) {
    if (this[i] == value) {
      count++;
    }
  }
  return count;
}



///////////////
/* main code */
///////////////

function preload() {
  Sounds["firewoosh"] = loadSound("sounds/firewoosh.wav");
  Sounds.firewoosh.setVolume(0.25);
  Sounds["step"] = loadSound("sounds/step.wav");
  Sounds.step.setVolume(0.5);
  Sounds["step2"] = loadSound("sounds/step2.wav");
  Sounds.step.setVolume(0.5);
  Sounds["hop"] = loadSound("sounds/hop.wav");
  Sounds.hop.setVolume(0.5);
  
  // load graphics //
  Graphics["controls"] = loadImage("graphics/controls.png");
  Graphics["Shadow"] = loadImage("graphics/Shadow.png");
  
  Graphics["Stage00FGO"] = loadImage("graphics/Stage00FGO.png");
  Graphics["Stage00BGO"] = loadImage("graphics/Stage00BGO.png");
  Graphics["Stage00Tiles"] = loadImage("graphics/Stage00Tiles.png");
  Graphics["Stage00Collision"] = loadImage("graphics/Stage00Collision.png");
  
  
  
  Graphics["Flareon"] = loadImage("graphics/Flareon.png");
  Graphics["FlareonBlue"] = loadImage("graphics/FlareonBlue.png");
  Graphics["FlareonFire"] = loadImage("graphics/FlareonFire.png");
}

function setup() {
  // canvas //
  createCanvas(448, 384);         // create canvas
  drawingContext.imageSmoothingEnabled = false;  // scale by nearest neighbor
  
  
  
  // characters
  Characters["Player"] = new Player();
  Characters["Partner"] = new Player();
  Characters.Player.gfx = "Flareon";
  Characters.Partner.gfx = "FlareonBlue";
}

//////////////////////
// * draw routine * //
//////////////////////
function draw() {
  if (instance == 2) {
  Characters.Player.gfx = "FlareonBlue";
  Characters.Partner.gfx = "Flareon";
  }
  clear();
  var player = Characters.Player;
  var partner = Characters.Partner;
  
  
  
  Cam.update();
  
  scale(2.0);
  
  
  image(Graphics["Stage00Tiles"],0,0);
  
  image(Graphics["Shadow"],floor(player.x-16),floor(player.y-28));
  image(Graphics["Shadow"],floor(partner.x-16),floor(partner.y-28));
  
  image(Graphics["Stage00BGO"],0,0);
  
  
  if (partner.y > player.y) {
    player.draw();
    partner.draw();
    // * draw fire * //
    if (partner.animation == AniFire) {
      var fireoffsetX = [12, 6, -16, -38, -44, -39, -16, 7][partner.direction];
      var fireoffsetY = [-32, -34, -26, -34, -32, -40, -38, -40][partner.direction];
      image(
        Graphics["FlareonFire"],
        floor(partner.x+fireoffsetX),
        floor(partner.y+fireoffsetY),
        32,
        32,
        (7-partner.animationTimer2)*32,
        partner.direction*32,
        32,
        32
      );
      if (player.direction == 6) {
        partner.draw();
      }
    }
  } else {
    partner.draw();
    // * draw fire * //
    if (partner.animation == AniFire) {
      var fireoffsetX = [12, 6, -16, -38, -44, -39, -16, 7][partner.direction];
      var fireoffsetY = [-32, -34, -26, -34, -32, -40, -38, -40][partner.direction];
      image(
        Graphics["FlareonFire"],
        floor(partner.x+fireoffsetX),
        floor(partner.y+fireoffsetY),
        32,
        32,
        (7-partner.animationTimer2)*32,
        partner.direction*32,
        32,
        32
      );
      if (player.direction == 6) {
        partner.draw();
      }
    }
    player.draw();
  }
  player.update();
  
  image(Graphics["Stage00FGO"],0,0);
  
  Online();
  
  
}


// update keys //
function keyPressed() {
  Keys[key] = true;
}
function keyReleased() {
  Keys[key] = null;
}
