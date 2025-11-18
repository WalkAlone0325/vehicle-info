import Request from '@/uni_modules/luch-request/index.js'
import { getToken } from './'

const http = new Request({
  // baseURL: 'http://220.194.140.28:8086/oilenginemonitoringservice/',
  baseURL: 'https://gps.sxtdwb.com:4043/oilenginemonitoringservice/'
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    config.header.Authorization = `Bearer ${getToken()}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let flag = false
// 响应拦截
http.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code === 401 && !flag) {
      flag = true
      uni.removeStorageSync('token')
      uni.removeStorageSync('user')
      uni.removeStorageSync('roles')
      uni.reLaunch({
        url: '/pages/login/login'
      })
      // uni.showModal({
      //   title: '提示',
      //   content: '登录已过期，请重新登录',
      //   showCancel: false,
      //   success: res => {
      //     if (res.confirm) {
      //       uni.navigateTo({
      //         url: '/pages/login/login'
      //       })
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //       uni.switchTab({
      //         url: '/pages/index/index'
      //       })
      //     }
      //   },
      //   fail: err => {
      //     console.log(err)
      //   }
      // })
    }
    if (data.code !== 200 && data.code != 401) {
      uni.showToast({ title: data.msg, icon: 'none' })
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
