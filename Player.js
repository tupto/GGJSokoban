const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;
const ROOT_KEY = 82;

const UP = 0;
const DOwN = 1;
const LEFT = 2;
const RIGHT = 3;

export default class Player {
  constructor(level, pos) {
    this.level = level;
    this.rootPos = pos;
    this.endPos = pos;
    this.curLength = 0;
    this.maxLength = 2;
    this.prevDir = UP;
  }

  increaseLength() {
    this.maxLength++;
  }

  update() {
    let canExtend = this.curLength < this.maxLength;
    if ((UP_KEY in window.pressedKeys) && window.pressedKeys[UP_KEY]%30 == 0) {
      if (canExtend) {

      }
      else if (this.prevDir == DOWN)
        removeEnd();
    }

    else if ((DOWN_KEY in window.pressedKeys) && window.pressedKeys[DOWN_KEY]%30 == 0) {
      if (canExtend) {

      }
      else if (this.prevDir == UP)
        removeEnd();
    }

    else if ((LEFT_KEY in window.pressedKeys) && window.pressedKeys[LEFT_KEY]%30 == 0) {
      if (canExtend) {

      }
      else if (this.prevDir == RIGHT)
        removeEnd();
    }

    if ((RIGHT_KEY in window.pressedKeys) && window.pressedKeys[RIGHT_KEY]%30 == 0) {
      if (canExtend) {

      }
      else if (this.prevDir == LEFT)
        removeEnd();
    }

    if ((ROOT_KEY in window.pressedKeys) && window.pressedKeys[ROOT_KEY]%30 == 0) {
      if (window.sounds["Bump"] !== undefined) {
        window.sounds["Bump"].play();
      }
    }
  }

  removeEnd() {
    if (this.curLength == 0) 
      return;
    
  }
}