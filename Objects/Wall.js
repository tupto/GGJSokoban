import GameObject from "./GameObject.js";

export default class Wall extends GameObject {
  constructor(pos) {
    super(pos, true, false, "Wall");
  }
}