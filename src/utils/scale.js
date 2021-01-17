export default {
  /**
   * get inner width scale
   * 
   * @param {number} scale 0 ~ 1
   */
  width: (scale) => innerWidth * scale,
  /**
   * get inner height scale
   * 
   * @param {number} scale 0 ~ 1
   */
  height: (scale) => innerHeight * scale,
  /**
   * get scale from left
   * 
   * @param {number} scale -1 ~ 1
   */
  left: (scale) => (innerWidth / 2) * scale,
  /**
   * get scale from top
   * 
   * @param {number} scale -1 ~ 1
   */
  top: (scale) => (innerHeight / 2) * scale,
};
