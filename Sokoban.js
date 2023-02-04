import Level from "./Level.js";

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const LEVEL_ONE =
"        \n"+
"        \n"+
"   o    \n"+
"        \n"+
"   .    \n"+
"        \n"+
"   g    \n"+
"        ";

const LEVEL_TWO =
"        \n"+
"        \n"+
"  o f   \n"+
"        \n"+
"        \n"+
"  .  g  \n"+
"        \n"+
"        ";

const LEVEL_THREE =
"o ffffff\n"+
"       f\n"+
"       f\n"+
"       f\n"+
"   .   f\n"+
"       f\n"+
"       f\n"+
"      g ";

const LEVELS = [
  LEVEL_ONE,
  LEVEL_TWO,
  LEVEL_THREE
]

export default class Sokoban {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelInd = 0;
    this.level = new Level(LEVELS[this.levelInd]);
  }

  init() {
    this.level.push([3,1],[0,1])
  }

  reset() {
  }

  update() {
    let complete = this.level.update();

    if (complete) {
      if (window.sounds["LevelComplete"] !== undefined)
        window.sounds["LevelComplete"].play();
      this.level = new Level(LEVELS[++this.levelInd]);
    }
  }
  
  render() {
    this.level.render(this.ctx);
  }
}
