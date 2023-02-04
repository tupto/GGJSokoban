import GameObject from "./GameObject.js";

export default class PlayerSegment extends GameObject {
  constructor(player) {
    super(true, false, "PlayerSegment");
  }
}