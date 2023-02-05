import Wall from "./Objects/Wall.js";
import Soil from "./Objects/Soil.js";
import Fertiliser from "./Objects/Fertiliser.js";
import Goal from "./Objects/Goal.js";
import Rock from "./Objects/Rock.js";
import Water from "./Objects/Water.js";
import Sand from "./Objects/Sand.js";
import Riverbed from "./Objects/Riverbed.js";
import Player from "./Player.js";
import PlayerSegment from "./Objects/PlayerSegment.js";


export default class Level {
  constructor(levelText) {
    this.start = [0,0];
    this.goal = [0,0];
    this.width = 0;
    this.height = 0;
    this.grid = [];
    this.fromString(levelText);
    this.player = new Player(this, this.start);
    this.complete = false;
  }
  
  canRoot(pos) {
    return grid[y][x] instanceof Soil;
  }

  push(pos, dir) {
    let x = pos[0];
    let y = pos[1];
    let dirX = dir[0];
    let dirY = dir[1];

    let curPos = pos;
    let nextPos = [x + dirX, y + dirY];
    
    // Check if move is within bounds of the grid
    if (curPos[0] < 0 || curPos[0] >= this.grid[0].length ||
        curPos[1] < 0 || curPos[1] >= this.grid.length ||
        nextPos[0] < 0 || nextPos[0] >= this.grid[0].length ||
        nextPos[1] < 0 || nextPos[1] >= this.grid.length) {
      return false;
    }
    
    let objects = this.objectsAtPos(pos);
    let pushables = [];
    for (const obj of objects) {
      if (obj.solid && !obj.pushable)
        return false;
      
      if (obj.pushable)
        pushables.push(obj);
    }

    if (this.posIsPushable(nextPos)) {
      if (!this.push(nextPos, dir)) {
        return false;
      }
    }
    
    if (this.posIsSolid(nextPos)) {
      return false;
    }

    this.grid[curPos[1]][curPos[0]] = this.grid[curPos[1]][curPos[0]].filter((el) => {
      return !pushables.includes(el);
    });
    this.grid[nextPos[1]][nextPos[0]] = this.grid[nextPos[1]][nextPos[0]].concat(pushables);
    
    for (const obj of pushables) {
      obj.onMove(this, pos, nextPos);
    }

    return true;
  }

  fromString(text) {
    let lines = text.split('\n');
    this.height = lines.length;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      this.width = Math.max(this.width, line.width);

      this.grid[i] = [];
      for (let j = 0; j < line.length; j++) {
        this.grid[i].push([]);
        let char = line[j];
        switch (char) {
          case '#':
            this.grid[i][j].push(new Wall());
            break;
          case 'o':
            this.start = [j, i];
            this.grid[i][j].push(new Soil());
            break;
          case 'g':
            this.goal = [j, i];
            this.grid[i][j].push(new Goal());
            break;
          case 'f':
            this.grid[i][j].push(new Fertiliser());
            break;
          case '.':
            this.grid[i][j].push(new Soil());
            break;
          case 'r':
            this.grid[i][j].push(new Rock());
            break;
          case 'R':
            this.grid[i][j].push(new Soil());
            this.grid[i][j].push(new Rock());
            break;
          case 'D':
            this.grid[i][j].push(new Fertiliser());
            this.grid[i][j].push(new Rock());
            break;
          case 'w':
            this.grid[i][j].push(new Water());
            break;
          case 'W':
            this.grid[i][j].push(new Water());
            let rock = new Rock();
            rock.onWater = true;
            this.grid[i][j].push(rock);
            break;
          case 'b':
            this.grid[i][j].push(new Riverbed());
            break;
          case 'B':
            this.grid[i][j].push(new Riverbed());
            this.grid[i][j].push(new Rock());
            break;
          case 'x':
            this.grid[i][j].push(new Sand());
            console.log("sandy!")
            break;
          case 'X':
            this.grid[i][j].push(new Sand());
            this.grid[i][j].push(new Rock());
            break;
        }
      }
    }
  }

  objectsAtPos(pos) {
    return this.grid[pos[1]][pos[0]];
  }

  posIsSoil(pos) {
    for (const obj of this.objectsAtPos(pos))
      if (obj instanceof Soil)
        return true;
    return false;
  }

  posIsSolid(pos) {
    for (const obj of this.objectsAtPos(pos))
      if (obj.solid)
        return true;
    return false;
  }

  posIsPushable(pos) {
    let pushable = false;
    for (const obj of this.objectsAtPos(pos)) {
      if (obj.pushable)
        pushable = true;
      else if (obj.solid)
        return false;
    }
    return pushable;
  }

  removeObject(pos, obj) {
    let i = this.grid[pos[1]][pos[0]].indexOf(obj);
    if (i != -1)
      this.grid[pos[1]][pos[0]].splice(i, 1);
  }

  addObject(pos, obj) {
    if (obj instanceof PlayerSegment)
      for (let i = 0; i < this.grid[pos[1]][pos[0]].length; i++)
        this.grid[pos[1]][pos[0]][0].onTouch(this, pos);
            
    this.grid[pos[1]][pos[0]].push(obj);
  }

  update() {
    this.player.update();
    return this.complete;
  }

  render(ctx) {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (window.sprites["Concrete"] != undefined)
          ctx.drawImage(window.sprites["Concrete"], x * 64, y * 64, 64, 64);
        
        this.grid[y][x].sort((a,b) => {
          return a.z - b.z;
        });
        for (let i = 0; i < this.grid[y][x].length; i++) {
          this.grid[y][x][i].render(ctx, [x, y]);
        }
      }
    }
  }
}