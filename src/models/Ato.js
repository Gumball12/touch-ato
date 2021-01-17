import * as PIXI from 'pixi.js-legacy';
import scale from '../utils/scale';

class Ato extends PIXI.Container {
  constructor() {
    super();
    this.ticked = 0;
    this.lockedEyeState = false;
    this.touchLeft = null;
    this.touchRight = null;

    this.head = new PIXI.Graphics();

    this.eye = new PIXI.Graphics()
      .lineStyle({ width: 10, cap: 'round' })
      .moveTo(-30, -5)
      .lineTo(-30, -2)
      .moveTo(30, -5)
      .lineTo(30, -2);

    this.eye_closed = new PIXI.Graphics()
      .lineStyle({ width: 4, cap: 'round' })
      .moveTo(-25, -2)
      .lineTo(-35, -2)
      .moveTo(25, -2)
      .lineTo(35, -2);

    this.mouth = new PIXI.Graphics()
      .lineStyle({ width: 6, cap: 'round' })
      .moveTo(0, 10)
      .quadraticCurveTo(
        0, 20,
        10, 20,
      )
      .moveTo(0, 10)
      .quadraticCurveTo(
        0, 20,
        -10, 20,
      );

    this.openEye();

    this.addChild(this.head);
    this.addChild(this.eye);
    this.addChild(this.eye_closed);
    this.addChild(this.mouth);

    this.helper = new PIXI.Graphics()
      .lineStyle({ width: 1, color: 0xff0000 })
      .moveTo(scale.left(-1), scale.top(0))
      .lineTo(scale.left(1), scale.top(0))
      .moveTo(scale.left(0), scale.top(-1))
      .lineTo(scale.left(0), scale.top(1))
      .moveTo(-231, scale.top(-1))
      .lineTo(-231, scale.top(1))
      .moveTo(231, scale.top(-1))
      .lineTo(231, scale.top(1))
      .moveTo(-121, scale.top(-1))
      .lineTo(-121, scale.top(1))
      .moveTo(121, scale.top(-1))
      .lineTo(121, scale.top(1))
      .moveTo(scale.left(-1), 129)
      .lineTo(scale.left(1), 129)
      .moveTo(scale.left(-1), -191)
      .lineTo(scale.left(1), -191);

    this.helper.visible = false;

    this.addChild(this.helper);
  }

  setTouchButtons({ touchLeft, touchRight }) {
    this.touchLeft = touchLeft;
    this.touchRight = touchRight;
  }

  tick() {
    this.ticked++;
    this.toggleEyes();
    this.interaction();
  }

  toggleEyes() {
    if (this.ticked % 30 === 0 && !this.eye.visible) {
      this.openEye();
      this.ticked = 0;
    } else if (this.ticked % 250 === 0) {
      this.closeEye();
    }
  }

  closeEye() {
    if (!this.lockedEyeState) {
      this.eye.visible = false;
      this.eye_closed.visible = true;
    }
  }

  openEye() {
    if (!this.lockedEyeState) {
      this.eye.visible = true;
      this.eye_closed.visible = false;
    }
  }

  interaction() {
    if (!this.touchLeft || !this.touchRight) {
      return;
    }

    this.head.clear();

    this.head
      .lineStyle({
        width: 8,
        join: 'round',
        cap: 'round',
      })
      .beginFill(0xffd8e0)
      .moveTo(-15, -94)
      .bezierCurveTo(
        -34, -236,
        -121, -203,
        -82, -86,
      )
      .lineTo(
        -89 + this.touchLeft.moved().x / 16,
        -20 + this.touchLeft.moved().y / 16,
      )
      .bezierCurveTo(
        -231 + this.touchLeft.moved().x,
        173 + this.touchLeft.moved().y,
        231 + this.touchRight.moved().x,
        173 + this.touchRight.moved().y,
        89 + this.touchRight.moved().x / 16,
        -20 + this.touchRight.moved().y / 16,
      )
      .lineTo(82, -86)
      .bezierCurveTo(
        121, -203,
        34, -236,
        15, -94
      )
      .quadraticCurveTo(
        0, -100,
        -15, -94
      );
  }
}

export default Ato;
