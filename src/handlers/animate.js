import TWEEN from '@tweenjs/tween.js';

const animate = (t) => {
  requestAnimationFrame(animate);
  TWEEN.update(t);
}

export default animate;
