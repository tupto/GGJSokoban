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
    this.maxLength = 3;
    this.prevDir = UP;
    let rootSegment = new PlayerSegment("ROOT_S");
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
      else {
        if (window.sounds["Bump"] !== undefined) {
          window.sounds["Bump"].currentTime = 0;
          window.sounds["Bump"].play();
        }
      }
    }

    else if ((DOWN_KEY in window.pressedKeys) && window.pressedKeys[DOWN_KEY]%20 == 0) {
      if (prevDir == UP)
        this.removeEnd();
      else if (canExtend)
        this.attemptMove(DOWN);
      else {
        if (window.sounds["Bump"] !== undefined) {
          window.sounds["Bump"].currentTime = 0;
          window.sounds["Bump"].play();
        }
      }
    }

    else if ((LEFT_KEY in window.pressedKeys) && window.pressedKeys[LEFT_KEY]%20 == 0) {
      if (prevDir == RIGHT)
        this.removeEnd();
      else if (canExtend)
        this.attemptMove(LEFT);
      else {
        if (window.sounds["Bump"] !== undefined) {
          window.sounds["Bump"].currentTime = 0;
          window.sounds["Bump"].play();
        }
      }
    }

    if ((RIGHT_KEY in window.pressedKeys) && window.pressedKeys[RIGHT_KEY]%20 == 0) {
      if (prevDir == LEFT)
        this.removeEnd();
      else if (canExtend)
        this.attemptMove(RIGHT);
      else {
        if (window.sounds["Bump"] !== undefined) {
          window.sounds["Bump"].currentTime = 0;
          window.sounds["Bump"].play();
        }
      }
    }

    if ((ROOT_KEY in window.pressedKeys) && window.pressedKeys[ROOT_KEY]%20 == 0) {
      this.reroot();
    }
  }

  attemptMove(dir) {
    let pos = [dir[0] + this.endPos[0], dir[1] + this.endPos[1]];
    
    let solid = this.level.posIsSolid(pos);
    let pushable = this.level.posIsPushable(pos);

    if (solid && !pushable) {
      if (window.sounds["Bump"] !== undefined) {
        window.sounds["Bump"].currentTime = 0;
        window.sounds["Bump"].play();
      }
      return false;
    }
    else {
      if (this.level.posIsPushable(pos))
        if (!this.level.push(pos, dir)) {
          if (window.sounds["Bump"] !== undefined) {
            window.sounds["Bump"].currentTime = 0;
            window.sounds["Bump"].play();
          }
          return false;
        }

      if (window.sounds["Grow"] !== undefined && !(window.sounds["Fertilised"].duration > 0 && !window.sounds["Fertilised"].paused)) {
        window.sounds["Grow"].currentTime = 0;
        window.sounds["Grow"].play();
      }
      
      let prevPos = pos;
      this.endPos = pos;

      if (this.curLength == 0) {
        this.segments[0].segmentType = this.dirToRoot(dir);
      }
      else {
        this.segments[this.segments.length-1].segmentType = this.dirToMid(dir);
      }

      let segment = new PlayerSegment(this.dirToTip(dir));
      this.level.addObject(pos, segment);
      this.segments.push(segment);
      this.directions.push(dir);

      this.curLength++;
    }
  }

  dirToTip(dir) {
    switch (dir) {
      case UP:
        return "U";
      case DOWN:
        return "D";
      case LEFT:
        return "L";
      case RIGHT:
        return "R";
    }
  }

  dirToMid(dir) {
    let prevDir = this.directions[this.directions.length-1];
    switch (prevDir) {
      case UP:
        switch (dir) {
          case UP:
            return "UD";
          case LEFT:
            return "DL";
          case RIGHT:
            return "DR";
        }
        break;

      case DOWN:
        switch (dir) {
          case DOWN:
            return "UD";
          case LEFT:
            return "UL";
          case RIGHT:
            return "UR";
        }
        break;

      case LEFT:
        switch (dir) {
          case UP:
            return "UR";
          case DOWN:
            return "DR";
          case LEFT:
            return "LR";
        }
        break;

      case RIGHT:
        switch (dir) {
          case UP:
            return "UL";
          case DOWN:
            return "DL";
          case RIGHT:
            return "LR";
        }
        break;
    }
  }

  dirToRoot(dir) {
    switch (dir) {
      case UP:
        return "ROOT_U";
      case DOWN:
        return "ROOT_D";
      case LEFT:
        return "ROOT_L";
      case RIGHT:
        return "ROOT_R";
      default:
        return "ROOT_S";
    }
  }

  removeEnd() {
    if (this.curLength == 0) 
      return;

    if (this.curLength == 1) {
      this.segments[0].segmentType = this.dirToRoot("ROOT_S");
    }
    else {
      this.segments[this.segments.length-2].segmentType = this.dirToTip(this.directions[this.directions.length-2]);
    }

    let obj = this.segments[this.segments.length-1];
    this.level.removeObject(this.endPos, obj);

    this.curLength--;

    let dir = this.directions[this.directions.length-1];

    this.segments.splice(this.segments.length-1, 1);
    this.directions.splice(this.segments.length-1, 1);
    
    this.endPos[0] -= dir[0];
    this.endPos[1] -= dir[1];
    
    if (window.sounds["Shrink"] !== undefined) {
      window.sounds["Shrink"].currentTime = 0;
      window.sounds["Shrink"].play();
    }
  }

  reroot() {
    if (this.curLength == 0 || !this.level.posIsSoil(this.endPos)) {
      if (window.sounds["Bump"] !== undefined) {
        window.sounds["Bump"].currentTime = 0;
        window.sounds["Bump"].play();
      }
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

    this.segments[0].segmentType = this.dirToRoot(this.directions[0]);
    this.segments[this.segments.length-1].segmentType = this.dirToTip(this.directions[this.directions.length-1]);

    if (window.sounds["Reroot"] !== undefined) {
      window.sounds["Reroot"].currentTime = 0;
      window.sounds["Reroot"].play();
    }
    
    return true;
  }
}