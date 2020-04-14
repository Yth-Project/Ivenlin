/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isNull(str) {
  return str.trim().length > 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isIPhone(str) {
  if (!(/^1[3456789]\d{9}$/.test(str))) {
    return false
  }
  return true
}
