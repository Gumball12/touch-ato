import scale from '../utils/scale';
import env from '../env';

export default (app) => () => {
  app.view.style.width = `${scale.width(1)}px`;
  app.view.style.height = `${scale.height(1)}px`;
  app.renderer.resize(scale.width(1), scale.height(1));

  app.stage.position.x = scale.width(1 / 2);
  app.stage.position.y = scale.height(1 / 2);

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
};
