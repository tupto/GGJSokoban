import Wall from "./Wall.js";
import Fertiliser from "./Fertiliser.js";

const WALL = '#';
const EMPTY = ' ';
const START = 's';
const GOAL = 'g';
const DIRT = '.';
const FERTILISER = 'f';

const LEVEL_ONE =
"########"+
"#      #"+
"#  o   #"+
"#      #"+
"#  .   #"+
"#      #"+
"#  g   #"+
"########";

export default class Level {
  constructor(levelText) {
    this.start = [0,0];
    this.goal = [0,0];
    this.width = 0;
    this.height = 0;
    this.fromString(levelText);
  }

  fromString(text) {
    let lines = text.split('\n');
    this.height = lines.length;

    for (let i = 0; i < lines.length; i++) {
      this.width = Math.max(this.width, line.width);

      let line = lines[i];
      grid[i] = [];
      for (let j = 0; j < line.length; j++) {
        let char = line[j];
        switch (char) {
          case '#':
            grid[i][j].push(new Wall([j, i]));
            break;
          case 'o':
            this.start = [j, i];
            break;
          case 'g':
            this.goal = [j, i];
            grid[i][j].push(new Goal([j, i]));
            break;
        }
      }
    }
  }

  toString() {

  }
}