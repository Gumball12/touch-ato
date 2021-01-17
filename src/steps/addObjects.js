import Ato from '../models/Ato';
import TouchButton from '../models/TouchButton';

export default ({ app }, next) => {
  const model = new Ato();

  const audio = document.createElement('audio');
  audio.setAttribute('src', '/pock.mp3');

  const touchRight = new TouchButton({
    defaultX: 120,
    defaultY: 50,
    minX: -50,
    maxX: 200,
    minY: -70,
    maxY: 100,
    model,
    audio,
  });
  const touchLeft = new TouchButton({
    defaultX: -120,
    defaultY: 50,
    minX: -200,
    maxX: 50,
    minY: -70,
    maxY: 100,
    model,
    audio,
  });

  model.setTouchButtons({ touchLeft, touchRight });

  app.stage.addChild(model);
  app.stage.addChild(touchLeft);
  app.stage.addChild(touchRight);

  next(null, { app, model, touchLeft, touchRight });
};
