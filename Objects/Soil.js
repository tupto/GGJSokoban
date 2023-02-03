import GameObject from "./GameObject.js";

export default class Soil extends GameObject {
  constructor(pos) {
    super(pos, true, false, "Soil");
  }
}