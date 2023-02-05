import GameObject from "./GameObject.js";

const SEGMENT_TYPES = {
  ROOT_D: [0,0],
  ROOT_R: [1,0],
  ROOT_L: [2,0],
  ROOT_U: [3,0],
  ROOT_S: [0,1],
  LR: [1,1],
  UD: [2,1],
  DL: [3,1],
  UR: [0,2],
  DR: [1,2],
  UL: [2,2],
  U: [3,2],
  R: [0,3],
  L: [1,3],
  D: [2,3],
}

export default class PlayerSegment extends GameObject {
  constructor(segmentType) {
    super(true, false, "Player");
    this.segmentType = segmentType;
    this.z = 2;
  }

  render(ctx, pos) {
    if (window.sprites[this.spriteName] !== null && window.sprites[this.spriteName] instanceof HTMLImageElement) {
      let typePos = SEGMENT_TYPES[this.segmentType];
      ctx.drawImage(window.sprites[this.spriteName],
        typePos[0] * 64, typePos[1] * 64, 64, 64,
        pos[0] * 64, pos[1] * 64, 64, 64);
    }
  }
}