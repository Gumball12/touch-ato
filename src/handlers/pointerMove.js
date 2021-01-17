export default (app, model) => {
  let normX = 0;
  let normY = 0;

  app.ticker.add(() => {
    model.x -= (model.x - 18 * normX) * 0.1;
    model.y -= (model.y - 18 * normY) * 0.1;
  
    model.eye.x -= (model.eye.x - 30 * normX) * 0.1;
    model.eye.y -= (model.eye.y - 30 * normY) * 0.1;
  
    model.eye_closed.x -= (model.eye_closed.x - 30 * normX) * 0.1;
    model.eye_closed.y -= (model.eye_closed.y - 30 * normY) * 0.1;
  
    model.mouth.x -= (model.mouth.x - 22 * normX) * 0.1;
    model.mouth.y -= (model.mouth.y - 22 * normY) * 0.1;
  });

  return (evt) => {
    const clientX = (evt.touches && evt.touches[0].clientX) || evt.clientX || 0;
    const clientY = (evt.touches && evt.touches[0].clientY) || evt.clientY || 0;
  
    normX = clientX / app.renderer.width - 1 / 2;
    normY = clientY / app.renderer.height - 1 / 2;
  };
};
