import GameObject from "./GameObject.js";
import Water from "./Water.js";

export default class Rock extends GameObject {
  constructor() {
    super(true, true, "Rock");
    this.onWater = false;
    this.z = 1;
  }

  onMove(level, from, to) {
    let objsFrom = level.objectsAtPos(from);
    let objsTo = level.objectsAtPos(to);

    if (this.onWater) {
      for (const o of objsFrom) {
        if (o instanceof Water)
          o.fill(level, from);
      }
    }

    let objs = level.objectsAtPos(to);
    for (const o of objsTo) {
      if (o instanceof Water)
        this.onWater = true;
    }
  }
}