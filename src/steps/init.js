import * as PIXI from 'pixi.js-legacy';

export default (next) => {
  PIXI.utils.skipHello();

  next();
};
