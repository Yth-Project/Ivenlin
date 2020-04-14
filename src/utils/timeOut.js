import Cookies from 'js-cookie'

const CurrentTimeOutKey = 'current-time-out'

// 短信倒计时当前时间
export function getCurrentTimeOut() {
  return Cookies.get(CurrentTimeOutKey)
}

export function setCurrentTimeOut(currentTimeOut) {
  return Cookies.set(CurrentTimeOutKey, currentTimeOut)
}

export function removeCurrentTimeOut() {
  return Cookies.remove(CurrentTimeOutKey)
}
