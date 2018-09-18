//app.js
var hexMD5 = require('utils/md5.js')
var request = require('utils/request.js')

App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        if (wx.getStorageSync('to-ken')) {
          request.request('login.login.chtoken', { token: wx.getStorageSync('to-ken') }, res => {
            if (!res.data) {
              request.request('login.login.login', { code: res.code, type: 2 }, res => {
                wx.setStorageSync('to-ken', res.data.token)
              })
            }
          })
        } else {
          request.request('login.login.login', { code: res.code, type: 2 }, res => {
            if(res.status == 0){
              wx.setStorageSync('to-ken', res.data.token)
            }// else console.error(res)
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
        }
      }
    })
  },
  RequiseData(methods, data, callback, errFun) {
    request.request(methods, data, callback, errFun)
  },
  globalData: {
    userInfo: null
  }
})