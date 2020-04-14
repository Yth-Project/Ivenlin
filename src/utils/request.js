import axios from 'axios'
import {
  MessageBox,
  Message,
  Notification
} from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  retry: 3, // 请求次数
  retryDelay: 1000 // 请求间隙
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    // Object.assign(config.data, store.getters.userObj.companyId)
    // 每个接口都默认配置id
    const {
      companyId
    } = store.getters.userObj
    // 如果使用params请求则不使用data为参数  改为用params
    if (companyId && !config.params && config.method !== 'get' && config.data) {
      config.data.companyId = companyId
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === -1) {
        return MessageBox.confirm(res.msg, '操作失败', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        })
        /* Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        }) */
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // 返回文件流 blob - images
      if (res.type || res.byteLength) {
        return res
      }
      // 返回文件流 arrayBuffer - pdf
      /* if(res.byteLength){
        return res
      } */
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    Notification.error({
      title: '请联系开发工程师',
      message: error.message,
      position: 'top-left'
    })
    return Promise.reject(error)
  }
)

export default service
