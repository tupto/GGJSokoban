import GameObject from "./GameObject.js";

export default class Wall extends GameObject {
  constructor() {
    super(true, false, "Wall");
  }
}