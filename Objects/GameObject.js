import GameObject from "./GameObject.js";

export default class GameObject {
  constructor(pos, solid, pushable, spriteName) {
    this.pos = pos;
    this.solid = solid;
    this.pushable = pushable;
    this.spriteName = spriteName;
  }

  onTouch(other) {

  }

  render(ctx) {
    if (window.sprites[spriteName] !== null) {
      ctx.drawImage(window.sprites[spriteName], this.pos[0] * 32, this.pos[1] * 32, 32, 32);
    }
  }
}
