import GameObject from "./GameObject.js";

export default class Fertiliser extends GameObject {
  constructor() {
    super(false, false, "Fertiliser");
  }

  onTouch(level, pos) {
    level.player.increaseLength();
    level.removeObject(pos, this);
    if (window.sounds["Fertilised"] !== undefined) {
      window.sounds["Fertilised"].currentTime = 0;
      window.sounds["Fertilised"].play();
    }
  }
}