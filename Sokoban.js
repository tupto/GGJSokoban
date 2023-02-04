import Level from "./Level.js";

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const LEVEL_ONE =
"########\n"+
"#      #\n"+
"#  o   #\n"+
"#      #\n"+
"#  .   #\n"+
"#      #\n"+
"#  g   #\n"+
"########";

export default class Sokoban {
  constructor(ctx) {
    this.ctx = ctx;
    this.level = new Level(LEVEL_ONE);
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
      this.level = new Level(LEVEL_ONE);
    }
  }
  
  render() {
    this.level.render(this.ctx);
  }
}
