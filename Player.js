const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;
const ROOT_KEY = 82;

export default class Player {
  constructor(level, pos) {
    this.level = level;
    this.rootPos = pos;
    this.endPos = pos;
    this.curLength = 0;
    this.maxLength = 2;
  }

  increaseLength() {
    this.maxLength++;
  }

  update() {
    let canExtend = this.curLength < this.maxLength;
    if ((UP_KEY in window.pressedKeys) && window.pressedKeys[UP_KEY]%30 == 0) {
      
    }

    if ((DOWN_KEY in window.pressedKeys) && window.pressedKeys[DOWN_KEY]%30 == 0) {
      
    }

    if ((LEFT_KEY in window.pressedKeys) && window.pressedKeys[LEFT_KEY]%30 == 0) {
      
    }

    if ((RIGHT_KEY in window.pressedKeys) && window.pressedKeys[RIGHT_KEY]%30 == 0) {
      
    }

    if ((ROOT_KEY in window.pressedKeys) && window.pressedKeys[ROOT_KEY]%30 == 0) {
      if (window.sounds["Bump"] != null) {
        window.sounds["Bump"].play();
      }
    }
  }
}