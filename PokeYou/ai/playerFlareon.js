///////////////////
// input routine //
///////////////////

var inputDir = [];
var inputRoutine = function(dir,player) {
  
  var inputOpposite = [4, 5, 6, 7, 0, 1, 2, 3];
  if (inputDir[dir]) {
    if (player.direction != dir && player.animation == 0 && player.animationTimer == 0) {
      player.animate(5, 0, 0);
      player.animation = 5;
    }
    if ((player.animationTimer == 5 && player.animation == 5) || player.animationTimer == 0 && (player.animation == 3 || player.animation == 1) || ( player.animation != 5 && player.animation != 3 && player.animation != 1)) {
      player.direction = dir;
    }
    if (player.direction != dir && player.animation != 5) {
      player.animate(4, 2, 1);
      player.animation = 2;
    }
    if (player.direction == inputOpposite[dir] && player.animation != 5) {
      player.animation = 2;
    }
  }
}


/////////////////
// ai function //
/////////////////
AI.PlayerFlareon = function(player) {
  
  // constants //
  var AniIdle = 0;          // standing still
  var AniRunning = 1;       // running
  var AniAccelerating = 2;  // starting to run
  var AniDecelerating = 3;  // stopping
  var AniJumping = 4;       // jumping
  var AniDelaying = 5;      // just turned, delaying running
  var AniFire = 6;          // spitting fire
  
  var dirX = [1, 0.75, 0, -0.75, -1, -0.75, 0, 0.75]; // horizontal offset of direction
  var dirY = [0, 0.75, 1, 0.75, 0, -0.75, -1, -0.75]; // vertical offset of direction
  
  inputDir = [
    (Keys["d"]==true && Keys["a"]!=true && Keys["s"] == Keys["w"])
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true),
    (Keys["d"]==true && Keys["a"]!=true && Keys["s"]==true && Keys["w"]!=true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true)
    || (Keys["x"]==true && Keys["q"]!=true && Keys["e"]==Keys["z"])
    && (Keys["d"]!=true && Keys["a"]!=true && Keys["w"]!=true && Keys["s"]!=true),
    (Keys["d"] == Keys["a"] && Keys["s"]==true && Keys["w"]!=true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true),
    (Keys["d"]!=true && Keys["a"]==true && Keys["s"]==true && Keys["w"]!=true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true)
    || (Keys["z"]==true && Keys["e"]!=true && Keys["q"]==Keys["x"])
    && (Keys["d"]!=true && Keys["a"]!=true && Keys["w"]!=true && Keys["s"]!=true),
    (Keys["d"]!=true && Keys["a"]==true && Keys["s"] == Keys["w"])
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true),
    (Keys["d"]!=true && Keys["a"]==true && Keys["s"]!=true && Keys["w"]==true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true)
    || (Keys["q"]==true && Keys["x"]!=true && Keys["z"]==Keys["e"])
    && (Keys["d"]!=true && Keys["a"]!=true && Keys["w"]!=true && Keys["s"]!=true),
    (Keys["d"] == Keys["a"] && Keys["s"]!=true && Keys["w"]==true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true),
    (Keys["d"]==true && Keys["a"]!=true && Keys["s"]!=true && Keys["w"]==true)
    && (Keys["q"]!=true && Keys["e"]!=true && Keys["z"]!=true && Keys["x"]!=true)
    || (Keys["e"]==true && Keys["z"]!=true && Keys["x"]==Keys["q"])
    && (Keys["d"]!=true && Keys["a"]!=true && Keys["w"]!=true && Keys["s"]!=true)
  ];
  
  
  //// main routine ////
  
  // decrement animation timer
  if (player.animationTimer > 0) {
    player.animationTimer--;
  }
  
  
  // * jumping * //
  
  var jumped = false; // whether you just jumped
  
  // begin fire on j
  if (
    [0,2,5].includes(player.animation) // if is currently idle
    && Keys["j"] && player.cooldown == 0) {                    // and pressing j, then
    
    
    // * set jumping * //
    player.animate(6, 0, 3);       // frame 0,3 for 6 frames
    player.animation = AniFire;    // specify fire
    player.animationTimer2 = 8;    // set second timer for fire
    player.cooldown = 64;
    Sounds["firewoosh"].play();
    
  // play animation
  } else if (
    player.animation == AniFire      // if currently spitting fire
    && player.animationTimer == 0) { // and on next frame, then
    
    player.animationTimer2--;   // decrement timer 
    
    /* fire animation */
    player.animate(3, 1, 3);    // frame 1,2 for 3 frames
    player.animation = AniFire; // specify fire
    
    player.speedX = 0;          // set speed to 0
    
    if (player.animationTimer2 == 1) {
      player.animationFrameX = 0;
    }
    
    // * end of animation * //
    if (player.animationTimer2 == 0) {
      
      // reset animation
      player.animation = AniIdle; // specify idle
      player.animate(0, 0, 0);    // set to frame 0,
    }
  // begin jump on space
  } else if (
    (
      player.animation == AniRunning           // if running
      && [0,1,2,7,8].includes(player.frameX()) // on these frames
      || [0,2,3,5].includes(player.animation)  // or is currently idle
    ) && (Keys[" "] || Keys["k"])) {           // and pressing space, then
    
    if (player.animation == AniDelaying) {
      player.speedX = 1;
    }
    
    // * set jumping * //
    player.animate(3, 0, 2);       // frame 0,2 for 3 frames
    player.animation = AniJumping; // specify jumping
    Sounds["step"].play();
    
    
    
  // play animation
  } else if (
    player.animation == AniJumping             // if currently jumping
    && player.animationTimer == 0) {           // and on next frame, then
    
    
    /* jump animation */
    player.animate(3, player.frameX()+1, 2); // frame x+1,2 for 3 frames
    player.animation = AniJumping;           // specify jumping
    
    
    // * boost player forward from leap * //
    if (player.frameX() == 2) { // on frame 2,
      if (player.speedX != 0) { // if player is moving, then
        player.speedX = 3;      // boost player forward
      } else {                  // otherwise,
        player.speedX = 1;      // boost forward a little bit
      }
    }
    
    // * finish leap * //
    if (player.animationFrameX > 7) {
      
      // reset animation
      player.animation = AniIdle; // specify idle
      player.animate(0, 0, 0);    // set to frame 0,0
      
      // final flags
      player.speedX = 0;          // reset speed
      jumped = true;              // set flag that we just jumped
    }
  }
  
  if (player.animation == AniDelaying && player.animationTimer == 0) {
    player.animation = AniIdle;
  }
  
  // running animation
  if (
    inputDir.includes(true)                   // if moving
    && player.animation != AniDecelerating    // and not stopping
    && player.animation != AniFire            // and not spitting fire
    && player.animation != AniJumping) {      // and not jumping, then
    
    
    // * inputs * //
    inputRoutine(0,player);
    inputRoutine(1,player);
    inputRoutine(2,player);
    inputRoutine(3,player);
    inputRoutine(4,player);
    inputRoutine(5,player);
    inputRoutine(6,player);
    inputRoutine(7,player);
    
    
    
    
    // * begin running animation * //
    if (
      (player.animation == AniDelaying        // if waiting
        || player.animation == AniIdle        // or idle
      ) && player.animationTimer == 0) {      // and at end of frame, then
      
      // starting to run
      player.animate(4, 2, 1);                // frame 2,1 for 4 frames
      player.animation = AniAccelerating;     // specify accelerating
      
      // set speed
      player.speedX = 1;   // set speed to 1
      if (jumped) {        // but if you jumped earlier, then
        player.speedX = 2; // set speed to 2
      }
      
      
    // * next running frame * //
    } else if (
      player.animation == AniAccelerating // if accelerating
      && player.animationTimer == 0) {    // and at end of frame, then
      
      // almost running
      player.animate(3, 3, 0);            // frame 3,0 for 3 frames
      player.animation = AniRunning;      // specify running
      player.speedX = 1.5;                // set speed to 1.5
      Sounds["step"].play();
      
      
    // * running animation * //
    } else if (
      player.animation == AniRunning           // if running
      && player.animationTimer == 0) {         // and at end of frame, then
      
      // running
      player.animate(3, player.frameX()+1, 0); // increment frame
      player.animation = AniRunning;           // specify running
      
      // loop animation
      if (player.animationFrameX>8) {          // if after last frame, then
        player.animationFrameX = 1;            // set frame to 1
        Sounds["step"].play();
      }
      
      player.speedX = 2;                       // set speed to 2
    }
    
    
  // * when stopping * //
  } else {
    // finish bound if late enough
    if (
      player.animation == AniRunning    // if running
      && player.animationTimer == 0     // and at end of frame
      && player.animationFrameX >= 5) { // and after frame 5, then
      
      // finish running
      player.animate(3, player.frameX()+1, 0); // increment frame
      player.animation = AniRunning;           // specify running
      
      // stop
      if (player.animationFrameX>8) {          // if after last frame, then
        player.animationFrameX = 1;            // set frame to 1
        player.animation = AniDecelerating;    // specify stopping
      }
      player.speedX = 1.5;                     // set speed to 1.5
      
      
    // otherwise abruptly stop
    } else if (
      [AniRunning,AniAccelerating].includes(player.animation) // if running
      && player.animationTimer == 0) {                        // and at end of frame, then
      
      // stop abruptly if early enough
      player.animate(6, 3, 1);            // frame 3,1 for 6 frames
      player.animation = AniDecelerating; // specify stopping
      player.speedX = 0.5;                // set speed to 0.5
      
    
    // stopping
    } else if (
      player.animation == AniDecelerating // if stopping
      && player.animationTimer == 0) {    // and at end of frame, then
      
      // stop running //
      player.animate(3, 0, 0);    // frame 0,0 for 3 frames
      player.animation = AniIdle; // specify idle
      player.speedX = 0;          // set speed to 0
    }
  }
  
  if (player.cooldown > 0) {
    player.cooldown--;
  }
  
  
  
  // * blinking * //
  if (player.animation == 0) {
    
    // decrement timer
    player.animationTimer2--;
    
    // reset blinking
    if (player.animationTimer2 <= 0) {                  
      player.animationTimer2 = floor(random()*512+128); // wait random amount
      player.animationFrameX = 0;
      player.animationFrameY = 0;
    // frames 1-3
    } else if (player.animationTimer2 <= 3) {
      player.animationFrameX = 0;
      player.animationFrameY = 1;
    // frames 4-6
    } else if (player.animationTimer2 <= 6) {
      player.animationFrameX = 1;
      player.animationFrameY = 1;
    // frames 7-9
    } else if (player.animationTimer2 <= 9) {
      player.animationFrameX = 0;
      player.animationFrameY = 1;
    }
  }
  
  
  
  // * move player * //
  player.x += player.speedX * dirX[player.direction];
  player.y += player.speedX * dirY[player.direction];
  
  
  
  // * set gfx offset * //
  if (player.direction == 2 || player.direction == 6) {
    player.offsetY = -30;
  } else if (player.direction == 1 || player.direction == 3 || player.direction == 5 || player.direction == 7) {
    player.offsetY = -31;
  } else {
    player.offsetY = -32;
  }
  
  
  // * draw fire * //
  if (player.animation == AniFire) {
    var fireoffsetX = [12, 6, -16, -38, -44, -39, -16, 7][player.direction];
    var fireoffsetY = [-32, -34, -26, -34, -32, -40, -38, -40][player.direction];
    image(
      Graphics["FlareonFire"],
      floor(player.x+fireoffsetX),
      floor(player.y+fireoffsetY),
      32,
      32,
      (7-player.animationTimer2)*32,
      player.direction*32,
      32,
      32
    );
    if (player.direction == 6) {
      player.draw();
    }
  }
}