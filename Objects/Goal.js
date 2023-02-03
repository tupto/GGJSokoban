import GameObject from "./GameObject.js";

export default class Goal extends GameObject {
  constructor(pos) {
    super(pos, false, false, "Goal");
  }
}