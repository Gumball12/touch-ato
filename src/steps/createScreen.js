import * as PIXI from 'pixi.js-legacy';

import scale from '../utils/scale';
import env from '../env';

export default (next) => {
  const app = new PIXI.Application({
    width: scale.width(1),
    height: scale.height(1),
    transparent: true,
    antialias: true,
  });

  document.body.appendChild(app.view);
  app.stage.position.set(scale.width(1 / 2), scale.height(1 / 2));

  if (
    scale.width(1) < env.allowWidth ||
    scale.height(1) < env.allowHeight
  ) {
    const rescale = Math.min(
      scale.width(1) / env.allowWidth,
      scale.height(1) / env.allowHeight,
    );

    app.stage.scale.set(rescale, rescale);
  }

  next(null, { app });
};
