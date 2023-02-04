import GameObject from "./GameObject.js";

export default class Fertiliser extends GameObject {
  constructor() {
    super(false, false, "Fertiliser");
  }

  onTouch(level, pos) {
    level.player.increaseLength();
    level.removeObject(pos, this);
  }
}