import Level from "./Level.js";

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const LEVEL_ZERO =
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"fffff      \n"+
"o          ";

const LEVEL_ONE =
"           \n"+
"           \n"+
"    o      \n"+
"           \n"+
"           \n"+
"    .  g   \n"+
"           \n"+
"           \n"+
"           ";

const WINDY_LEVEL = 
"o  ffffffff\n"+
"##########f\n"+
"fffffffff#f\n"+
"f#######f#f\n"+
"f#ffffg#f#f\n"+
"f#f#####f#f\n"+
"f#fffffff#f\n"+
"f#########f\n"+
"fffffffffff";

const LEVEL_TWO =
"           \n"+
"           \n"+
"   o  f    \n"+
"           \n"+
"           \n"+
"   .   g   \n"+
"           \n"+
"           \n"+
"           ";

const LEVEL_THREE =
"o        ff\n"+
"D          \n"+
"f          \n"+
"f          \n"+
"f          \n"+
"f          \n"+
"f          \n"+
"f     g    \n"+
"f          ";

const LEVEL_FOUR = 
"oDDDDDDDD  \n"+
"rrr  DDD   \n"+
"r rRDrrr   \n"+
"rrrrrrr  rr\n"+
" rrrrrrrD f\n"+
"rrrrrrrrD D\n"+
"rrrrrrrrf f\n"+
"rrrr rrr  r\n"+
" rrrrrrr  g";

const LEVEL_FIVE = 
"           \n"+
"        g  \n"+
"           \n"+
"           \n"+
"  oW       \n"+
"  fb       \n"+
"  fBbbbbx  \n"+
"    x      \n"+
"           ";



const LEVELS = [
  LEVEL_ZERO,
  LEVEL_ONE,
  WINDY_LEVEL,
  LEVEL_TWO,
  LEVEL_THREE,
  LEVEL_FIVE,
  LEVEL_FOUR,
];

const RESET_KEY = 81;

export default class Sokoban {
  constructor(ctx) {
    this.ctx = ctx;
    this.levelInd = 0;
    this.level = new Level(LEVELS[this.levelInd]);
    this.win = false;
  }

  init() {
  }

  reset() {
  }

  update() {
    if (RESET_KEY in window.pressedKeys && window.pressedKeys[RESET_KEY]%20 == 0) {
      if (this.win) {
        this.levelInd = 0;
        this.win = false;
      }
      
      this.level = new Level(LEVELS[this.levelInd]);
      if (window.sounds["Reset"] !== undefined) {
        window.sounds["Reset"].currentTime = 0;
        window.sounds["Reset"].play();
      }
    }

    if (this.win)
      return;

    let complete = this.level.update();

    if (complete) {
      if (window.sounds["LevelComplete"] !== undefined) {
        window.sounds["LevelComplete"].currentTime = 0;
        window.sounds["LevelComplete"].play();
      }

      if (this.levelInd != LEVELS.length-1)
        this.level = new Level(LEVELS[++this.levelInd]);
      else
        this.win = true;
    }
  }
  
  render() {
    if (!this.win)
      this.level.render(this.ctx);
    else {
      this.ctx.drawImage(window.sprites["Victory"], 0, 0);
    }
  }
}
