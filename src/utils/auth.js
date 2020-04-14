import Cookies from 'js-cookie'

const TokenKey = 'token'
const ErrCountKey = 'login-err-count'
const TestKey = 'vtest'

// token 权限
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 登录失败次数
export function getErrCount() {
  return Cookies.get(ErrCountKey)
}

export function setErrCount(count) {
  return Cookies.set(ErrCountKey, count)
}

export function removeErrCount() {
  return Cookies.remove(ErrCountKey)
}

// 测试开发页面环境
export function getTest() {
  return Cookies.get(TestKey)
}

export function setTest(key) {
  return Cookies.set(TestKey, key)
}

export function removeTest() {
  return Cookies.remove(TestKey)
}
