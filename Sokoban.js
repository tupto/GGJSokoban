import Level from "./Level.js";

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const LEVEL_ZERO =
"fffff     g\n"+
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
"           \n"+
"           \n"+
"  o        \n"+
"           \n"+
"           \n"+
"  .  g     \n"+
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
"           \n"+
"        g  \n"+
"           \n"+
"           \n"+
"  oW       \n"+
"  fb       \n"+
"  fBbbbbs  \n"+
"    s      \n"+
"           ";

const LEVEL_FIVE =
"##g#wWbbbbbb\n"+
"## #......b\n"+
"## #......b\n"+
"obs#......b\n"+
".B##......B\n"+
".b##......b\n"+
".b##......b\n"+
".B........b\n"+
".bbbbbBbbbb";

const LEVEL_SIX = 
"      bbbb \n"+
"      b  b \n"+
"    oDbDrb \n"+
"      b  b \n"+
"      b  b \n"+
"      s  b \n"+
"    .    Wf\n"+
"    f     f\n"+
"g          ";

const LEVEL_SEVEN = 
"oDDDDDDDD  \n"+
"rrr  DDD   \n"+
"r rRDrrr   \n"+
"rrrrrrr  rr\n"+
" rrrrrrrD f\n"+
"rrrrrrrrD D\n"+
"rrrrrrrrf f\n"+
"rrrr rrr  r\n"+
" rrrrrrr  g";

const LEVEL_EIGHT = 
"           \n"+
". f WBBBbbb\n"+
"   .      b\n"+
"          b\n"+
"o   s   g b\n"+
"    b     b\n"+
"    Brrrrrb\n"+
". f bbbbbbb\n"+
"           ";

const LEVEL_NINE = 
" sssssssssC\n"+
"oWbbbbbbbbb\n"+
" r########b\n"+
" r########b\n"+
" r########b\n"+
"sBbbbbbbbbb\n"+
"sb#########\n"+
"sbbbbbbbbb#\n"+
"ssssssssssg";

const LEVELS = [
  LEVEL_ONE,
  LEVEL_TWO,
  LEVEL_THREE,
  LEVEL_FOUR,
  LEVEL_FIVE,
  WINDY_LEVEL,
  LEVEL_SIX,
  LEVEL_SEVEN,
  LEVEL_EIGHT,
  LEVEL_NINE,
];

const RESET_KEY = "KeyQ";

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
    if (!this.win) {
      this.level.render(this.ctx);

      if (this.levelInd == 0) {
        if (window.sprites["WASDKeys"] !== undefined)
          this.ctx.drawImage(window.sprites["WASDKeys"], 250, 50);
        if (window.sprites["RKey"] !== undefined)
          this.ctx.drawImage(window.sprites["RKey"], 180, 350);
      }
      else if (this.levelInd == 2) {
        if (window.sprites["QKey"] !== undefined)
          this.ctx.drawImage(window.sprites["QKey"], 80, 20);
      }
    } else {
      this.ctx.drawImage(window.sprites["Victory"], 0, 0);
    }
  }
}
