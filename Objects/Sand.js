import GameObject from "./GameObject.js";

export default class Sand extends GameObject {
  constructor() {
    super(false, false, "Sand");
    this.z = -1;
  }
}