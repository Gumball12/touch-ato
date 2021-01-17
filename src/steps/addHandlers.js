import pointerMove from '../handlers/pointerMove';
import animate from '../handlers/animate';
import ticker from '../handlers/ticker';
import resize from '../handlers/resize';

export default ({ app, model }, next) => {
  addEventListener('touchmove', pointerMove(app, model));
  addEventListener('mousemove', pointerMove(app, model));
  addEventListener('resize', resize(app));

  animate();
  ticker(app, model);

  next();
};
