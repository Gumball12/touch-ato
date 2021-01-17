import { waterfall } from 'async';

import addHandlers from './steps/addHandlers';
import addObjects from './steps/addObjects';
import createScreen from './steps/createScreen';
import init from './steps/init';

export default () => waterfall([
  init,
  createScreen,
  addObjects,
  addHandlers,
], () => console.log('initialized!'));
