//app.js
var hexMD5 = require('utils/md5.js')
var request = require('utils/request.js')

App({
  
  onLaunch: function () {
    // 展示本地存储能力
    console.log(1)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        request.request('login.login.login', { code: res.code, type: 2 }, res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
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