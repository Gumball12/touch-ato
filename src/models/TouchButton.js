import TWEEN from '@tweenjs/tween.js';
import * as PIXI from 'pixi.js-legacy';

class TouchButton extends PIXI.Graphics {
  constructor({
    defaultX,
    defaultY,
    minX,
    minY,
    maxX,
    maxY,
    model,
    audio,
  } = {
    defaultX: 0,
    defaultY: 0,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  }) {
    super();

    this
      .lineStyle({ alignment: 0 })
      .beginFill(0x000000)
      .drawCircle(0, 0, 30)
      .endFill();

    this.model = model;
    this.audio = audio;

    this.x = defaultX;
    this.defaultX = defaultX;
    this.y = defaultY;
    this.defaultY = defaultY;

    this.minX = defaultX + minX;
    this.minY = defaultY + minY;
    this.maxX = defaultX + maxX;
    this.maxY = defaultY + maxY;

    this.interactive = true;
    this.buttonMode = true;

    this.dragging = false;
    this.data = null;
    this.beforeTouch();

    this
      .on('pointerdown', this.handleDragStart.bind(this))
      .on('pointermove', this.handleDragMove.bind(this))
      .on('pointerup', this.handleDragEnd.bind(this))
      .on('pointerupoutside', this.handleDragEnd.bind(this))
  }

  moved() {
    return {
      x: this.x - this.defaultX,
      y: this.y - this.defaultY,
    };
  }

  beforeTouch() {
    this.alpha = 0.2;
    this.dragging = false;
    this.data = null;
  }

  duringTouch() {
    this.alpha = 0.7;
    this.dragging = true;
  }

  handleDragStart(evt) {
    this.duringTouch();
    this.data = evt.data;
  }

  handleDragEnd(evt) {
    this.beforeTouch();

    if (evt) {
      const coords = { x: this.x, y: this.y };

      new TWEEN.Tween(coords)
        .to({ x: this.defaultX, y: this.defaultY }, 350)
        .easing(TWEEN.Easing.Back.Out)
        .onUpdate(() => {
          this.x = coords.x;
          this.y = coords.y;
        })
        .start();
    } else {
      if (this.audio) {
        this.audio.play();
      }
    }

    if (this.model) {
      this.model.lockedEyeState = false;
      this.model.openEye();
    }
  }

  handleDragMove() {
    if (this.dragging) {
      const newPos = this.data.getLocalPosition(this.parent);
      this.x = newPos.x;
      this.y = newPos.y;

      if (
        this.x > this.maxX ||
        this.x < this.minX ||
        this.y > this.maxY ||
        this.y < this.minY
      ) {
        this.beforeTouch();
        this.handleDragEnd(null);

        const coords = { x: this.x, y: this.y };

        new TWEEN.Tween(coords)
          .to({ x: this.defaultX, y: this.defaultY }, 350)
          .easing(TWEEN.Easing.Back.Out)
          .onUpdate(() => {
            this.x = coords.x;
            this.y = coords.y;
          })
          .start();
      }

      if (this.model) {
        this.model.closeEye();
        this.model.lockedEyeState = true;
      }
    }
  }
}

export default TouchButton;
