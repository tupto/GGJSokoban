import GameObject from "./GameObject.js";
import Player from "./PlayerSegment.js";

export default class Fertiliser extends GameObject {
  constructor() {
    super(false, false, "Fertiliser");
  }

  onTouch(other) {
    if (other.prototype instanceof Player) {
        
    }
  }
}