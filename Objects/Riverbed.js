import GameObject from "./GameObject.js";

export default class Riverbed extends GameObject {
  constructor() {
    super(false, false, "Riverbed");
    this.z = -1;
  }
}