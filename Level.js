import Wall from "./Objects/Wall.js";
import Soil from "./Objects/Soil.js";
import Fertiliser from "./Objects/Fertiliser.js";
import Goal from "./Objects/Goal.js";
import PlayerSegment from "./Objects/PlayerSegment.js";
import Player from "./Player.js";

const WALL = '#';
const EMPTY = ' ';
const START = 's';
const GOAL = 'g';
const DIRT = '.';
const FERTILISER = 'f';

export default class Level {
  constructor(levelText) {
    this.start = [0,0];
    this.goal = [0,0];
    this.width = 0;
    this.height = 0;
    this.grid = [];
    this.fromString(levelText);
    this.player = new Player(this, this.start);
  }
  
  canRoot(pos) {
    return grid[y][x] instanceof Soil;
  }

  push(pos, dir) {
    let x = pos[0];
    let y = pos[1];
    
    // Calculate direction offset values
    let dirX = dir[0];
    let dirY = dir[1];
    
    // Check if move is within bounds of the grid
    if (y + dirY < 0 || y + dirY >= this.grid.length ||
        x + dirX < 0 || x + dirX >= this.grid[0].length ||
        y + dirY*2 < 0 || y + dirY >= this.grid.length ||
        x + dirX*2 < 0 || x + dirX >= this.grid[0].length) {
      return false;
    }
    
    let obj = this.grid[y + dirY][x + dirX];
    
    // Check if destination cell is not a solid object
    if (obj.solid) {
      return false;
    }
    
    // Check if next cell in push direction is a pushable object
    if (this.grid[y + dirY * 2][x + dirX * 2].pushable) {
      // Recursively call push function on next pushable object
      if (!push([y + dirY, x + dirX], dir)) {
        return false;
      }
      
      let box = grid[y + dirY * 2][x + dirX * 2];
      // Check if destination of the box is not a solid object
      if (this.grid[y + dirY * 3][x + dirX * 3].solid) {
        return false;
      }
      
      // Update grid with new box position
      this.grid[y + dirY * 2][x + dirX * 2] = " ";
      this.grid[y + dirY * 3][x + dirX * 3] = box;
    }
    
    // Update grid with new player position
    this.grid[y][x] = " ";
    this.grid[y + dirY][x + dirX] = "@";
    
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
            this.grid[i][j].push(new PlayerSegment());
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
        }
      }
    }
  }

  update() {
    this.player.update();
  }

  render(ctx) {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        for (let i = 0; i < this.grid[y][x].length; i++) {
          this.grid[y][x][i].render(ctx, [x, y]);
        }
      }
    }
  }
}