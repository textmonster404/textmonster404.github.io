class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  update() {
    var cx = (Characters["Player"].x+Characters["Partner"].x)/2;
    var cy = (Characters["Player"].y+Characters["Partner"].y)/2;
    
    this.x = cx*2 - width/2;
    this.y = cy*2 - height/2 - 12;
    Graphics["Stage00Collision"].loadPixels();
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x+width > Graphics["Stage00Collision"].width*2) {
      this.x = Graphics["Stage00Collision"].width*2-width;
    }
    if (this.y+height > Graphics["Stage00Collision"].height*2) {
      this.y = Graphics["Stage00Collision"].height*2-height;
    }
    translate(-floor(this.x/2)*2, -floor(this.y/2)*2);
  }
}
