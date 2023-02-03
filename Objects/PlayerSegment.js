import GameObject from "./GameObject.js";

export default class PlayerSegment extends GameObject {
  constructor(pos) {
    super(pos, true, false, "Player");
  }
}