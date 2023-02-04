export default class GameObject {
  constructor(solid, pushable, spriteName) {
    this.solid = solid;
    this.pushable = pushable;
    this.spriteName = spriteName;
  }

  onTouch(level, pos) {

  }

  render(ctx, pos) {
    if (window.sprites[this.spriteName] !== null && window.sprites[this.spriteName] instanceof HTMLImageElement) {
      ctx.drawImage(window.sprites[this.spriteName], pos[0] * 32, pos[1] * 32, 32, 32);
    }
  }
}
