/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

// @ts-ignore
export const pick = (object, keys) => {
  // @ts-ignore
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
