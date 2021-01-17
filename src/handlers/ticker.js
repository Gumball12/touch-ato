export default (app, model) => {
  app.ticker.add(() => model.tick());
};
