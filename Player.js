import PlayerSegment from "./Objects/PlayerSegment.js";

const UP_KEY = 87;
const DOWN_KEY = 83;
const LEFT_KEY = 65;
const RIGHT_KEY = 68;
const ROOT_KEY = 82;

const UP = [0,-1];
const DOWN = [0,1];
const LEFT = [-1,0];
const RIGHT = [1,0];

export default class Player {
  constructor(level, pos) {
    this.level = level;
    this.rootPos = pos;
    this.endPos = pos;
    this.curLength = 0;
    this.maxLength = 2;
    this.prevDir = UP;
    let rootSegment = new PlayerSegment();
    this.directions = [];
    this.segments = [rootSegment];
    this.level.addObject(pos, rootSegment);
  }

  increaseLength() {
    this.maxLength++;
  }

  update() {
    let prevDir = this.directions.length > 0 ? this.directions[this.directions.length-1] : null;

    let canExtend = this.curLength < this.maxLength;
    if ((UP_KEY in window.pressedKeys) && window.pressedKeys[UP_KEY]%20 == 0) {
      if (prevDir == DOWN)
      this.removeEnd();
      else if (canExtend) {
        this.attemptMove(UP);
      }
    }

    else if ((DOWN_KEY in window.pressedKeys) && window.pressedKeys[DOWN_KEY]%20 == 0) {
      if (prevDir == UP)
        this.removeEnd();
      else if (canExtend) {
        this.attemptMove(DOWN);
      }
    }

    else if ((LEFT_KEY in window.pressedKeys) && window.pressedKeys[LEFT_KEY]%20 == 0) {
      if (prevDir == RIGHT)
        this.removeEnd();
      else if (canExtend)
        this.attemptMove(LEFT);
    }

    if ((RIGHT_KEY in window.pressedKeys) && window.pressedKeys[RIGHT_KEY]%20 == 0) {
      if (prevDir == LEFT) {
        this.removeEnd();
      } else if (canExtend) {
        this.attemptMove(RIGHT);
      }
    }

    if ((ROOT_KEY in window.pressedKeys) && window.pressedKeys[ROOT_KEY]%20 == 0) {
      this.reroot();
    }
  }

  attemptMove(dir) {
    let pos = [dir[0] + this.endPos[0], dir[1] + this.endPos[1]];
    
    if (this.level.posIsSolid(pos)) {
      if (window.sounds["Bump"] !== undefined)
        window.sounds["Bump"].play();
      return false;
    }
    else if (this.level.posIsPushable(pos)) {

    }
    else {
      if (window.sounds["Grow"] !== undefined)
        window.sounds["Grow"].play();
      this.endPos = pos;
      let segment = new PlayerSegment();
      this.level.addObject(pos, segment);
      this.segments.push(segment);
      this.directions.push(dir);
      this.curLength++;
    }
  }

  removeEnd() {
    if (this.curLength == 0) 
      return;

    let obj = this.segments[this.segments.length-1];
    this.level.removeObject(this.endPos, obj);

    this.curLength--;

    let dir = this.directions[this.directions.length-1];

    this.segments.splice(this.segments.length-1, 1);
    this.directions.splice(this.segments.length-1, 1);
    
    this.endPos[0] -= dir[0];
    this.endPos[1] -= dir[1];
    
    if (window.sounds["Shrink"] !== undefined)
      window.sounds["Shrink"].play();
  }

  reroot() {
    if (this.curLength == 0 || !this.level.posIsSoil(this.endPos)) {
      if (window.sounds["Bump"] !== undefined)
        window.sounds["Bump"].play();
      return false;
    }

    this.segments.reverse();
    this.directions.reverse();

    for (let i = this.directions.length-1; i >= 0; i--) {
      if (this.directions[i] == UP)
        this.directions[i] = DOWN;
      else if (this.directions[i] == DOWN)
        this.directions[i] = UP;
      else if (this.directions[i] == LEFT)
        this.directions[i] = RIGHT;
      else if (this.directions[i] == RIGHT)
        this.directions[i] = LEFT;

      this.endPos[0] += this.directions[i][0];
      this.endPos[1] += this.directions[i][1];
    }

    if (window.sounds["Reroot"] !== undefined)
      window.sounds["Reroot"].play();
    
    return true;
  }
}