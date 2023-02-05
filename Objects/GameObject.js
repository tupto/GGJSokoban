export default class GameObject {
  constructor(solid, pushable, spriteName) {
    this.solid = solid;
    this.pushable = pushable;
    this.spriteName = spriteName;
    this.z = 0;
  }

  onTouch(level, pos) {

  }

  onMove(level, from, to) {

  }

  render(ctx, pos) {
    if (window.sprites[this.spriteName] !== null && window.sprites[this.spriteName] instanceof HTMLImageElement) {
      ctx.drawImage(window.sprites[this.spriteName], pos[0] * 64, pos[1] * 64, 64, 64);
    }
  }
}
