import GameObject from "./GameObject.js";
import Riverbed from "./Riverbed.js";
import Rock from "./Rock.js";
import Soil from "./Soil.js";
import Sand from "./Sand.js";

export default class Water extends GameObject {
  constructor() {
    super(false, false, "Water");
    this.z = -1;
  }

  fill(level, pos) {
    for (let i = 0; i < 4; i++) {
      let dir = [i%2, (i+1)%2];
      if (i > 1)
        dir = [-dir[0], -dir[1]];
      
      let newPos = [pos[0]+dir[0], pos[1]+dir[1]];
      let objs = level.objectsAtPos(newPos);
      let rock = null;
      let bed = null;
      for (const o of objs) {
        if (o instanceof Riverbed)
          bed = o;
        else if (o instanceof Rock)
          rock = o;
        else if (o instanceof Sand) {
          level.removeObject(newPos, o);
          level.addObject(newPos, new Soil());
        }
      }

      if (bed !== null) {
        level.removeObject(newPos, bed);
        level.addObject(newPos, new Water());
        if (rock === null)
          this.fill(level, newPos);
        else
          rock.onWater = true;
      }
    }
  }
}