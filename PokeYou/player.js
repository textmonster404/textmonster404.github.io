// create player class
class Player {
  constructor() {
    // * graphics * //
    this.direction = 6;       // direction faced
    this.animation = 0;       // current animation
    this.animationTimer = 0;  // time until next frame
    this.animationTimer2 = 0; // blinking timer
    this.animationFrameX = 0; // x-position of frame on gfx
    this.animationFrameY = 0; // y-position of frame on gfx
    this.offsetX = -16;       // horizontal graphical offset
    this.offsetY = -30;       // vertical graphical offset
    
    
    // * type * //
    this.gfx = "Flareon";     // flareon spriteset
    this.ai = "PlayerFlareon";
    
    
    // * position/speed * //
    this.x = 152;              // horizontal position
    this.y = 96;              // vertical position
    this.z = 0;               // altitude
    
    this.speedX = 0;          // horizontal speed
    this.speedY = 0;          // vertical speed
    this.speedZ = 0;          // falling speed
    
    this.speedF = 0;          // forward speed
    
    this.cooldown = 0;
    
  }
  //////////////
  // routines //
  //////////////
  /* set frame of animation */
  animate(t, x, y) {
    this.animationTimer = t;
    this.animationFrameX = x;
    this.animationFrameY = y;
  }
  /* return frame pos */
  frameX() {
    return this.animationFrameX;
  }
  frameY() {
    return this.animationFrameX;
  }
  /* collision pixel */
  collision(x,y) {
    if (Graphics["Stage00Collision"].pixels[
      (floor(x)+
      floor(y)*Graphics["Stage00Collision"].width) * 4
    ]==0 || Graphics["Stage00Collision"].pixels[
      (floor(x)+
      floor(y)*Graphics["Stage00Collision"].width) * 4
    ]==null) {
      return true;
    }
    return false;
  }
  
  ////////////////
  // * Update * //
  ////////////////
  update() {
    AI[this.ai](this);
    
    // collision //
    Graphics["Stage00Collision"].loadPixels();
    for (var i=0;i<12;i++) {
      for (var iterations=0;iterations<32;iterations++) {
        if (this.collision(this.x-6+i,this.y-11)) {
          this.y++;
        }
        if (this.collision(this.x-6+i,this.y+1)) {
          this.y--;
        }
        if (this.collision(this.x-6,this.y-11+i)) {
          this.x++;
        }
        if (this.collision(this.x+6,this.y-11+i)) {
          this.x--;
        }
      }
    }
  }
  
  
  
  //////////////////////
  // * draw routine * //
  //////////////////////
  draw() {
    // draw image
    image(
      Graphics[this.gfx],
      Math.floor(this.x+this.offsetX),
      Math.floor(this.y+this.offsetY),
      32,
      32,
      this.animationFrameX*32,
      this.animationFrameY*32 + 32*4*this.direction,
      32,
      32
    );
  }
}


