import GameObject from "./GameObject.js";

export default class Goal extends GameObject {
  constructor() {
    super(false, false, "Goal");
  }

  onTouch(level, pos) {
    level.complete = true;
  }
}