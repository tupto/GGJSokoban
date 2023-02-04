import Level from "./Level.js";

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const LEVEL_ONE =
"        \n"+
"  o     \n"+
"        \n"+
"        \n"+
"  .  g  \n"+
"        \n"+
"        \n"+
"        ";

const WINDY_LEVEL = 
"o  fffff\n"+
"#######f\n"+
"ffffff#f\n"+
"f####f#f\n"+
"f#g##f#f\n"+
"f#ffff#f\n"+
"f######f\n"+
"ffffffff";

const LEVEL_TWO =
"        \n"+
"        \n"+
"  o  f  \n"+
"        \n"+
"        \n"+
"  .   g \n"+
"        \n"+
"        ";

const LEVEL_THREE =
"o      f\n"+
"D       \n"+
"f       \n"+
"f       \n"+
"f       \n"+
"f       \n"+
"f    g  \n"+
"f        ";



const LEVELS = [
  LEVEL_ONE,
  WINDY_LEVEL,
  LEVEL_TWO,
  LEVEL_THREE,
];

const RESET_KEY = 81;

export default class Sokoban {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelInd = 0;
    this.level = new Level(LEVELS[this.levelInd]);
  }

  init() {
  }

  reset() {
  }

  update() {
    if (RESET_KEY in window.pressedKeys && window.pressedKeys[RESET_KEY]%20 == 0) {
      this.level = new Level(LEVELS[this.levelInd]);
      if (window.sounds["Reset"] !== undefined) {
        window.sounds["Reset"].currentTime = 0;
        window.sounds["Reset"].play();
      }
    }

    let complete = this.level.update();

    if (complete) {
      if (window.sounds["LevelComplete"] !== undefined) {
        window.sounds["LevelComplete"].currentTime = 0;
        window.sounds["LevelComplete"].play();
      }
      this.level = new Level(LEVELS[++this.levelInd]);
    }
  }
  
  render() {
    this.level.render(this.ctx);
  }
}
