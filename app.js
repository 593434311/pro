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
    if (wx.getStorageSync('to-ken')) {
      request.request('login.login.chtoken', { token: wx.getStorageSync('to-ken') }, res => {
        if (res.status == 0) {
          wx.checkSession({
            success: succ =>{
              this.globalData.openId = res.data.openid;
              this.globalData.user_info = res.data.user_info;
              if (res.data.iscoupon === '0') {
                wx.setStorageSync('cuea', 'isd'); // 
              }   
            },
            fail: fail => {
              wx.login({
                success: resa => {
                  request.request('login.login.login', { code: resa.code, type: 2 }, reques => {
                    if (reques.status == 0) {
                      this.globalData.openId = reques.data.openid;
                      this.globalData.user_info = reques.data.user_info;
                      wx.setStorageSync('to-ken', reques.data.token);
                    }
                  })
                }
              })
            }
          })
               
        } else {
          wx.login({
            success: resa => {
              request.request('login.login.login', { code: resa.code, type: 2 }, reques => {
                if (reques.status == 0) {
                  this.globalData.openId = reques.data.openid;
                  this.globalData.user_info = reques.data.user_info;
                  wx.setStorageSync('to-ken', reques.data.token);
                }
              })
            }
          })
        }
      })
    } else {
      wx.login({
        success: res => {
          request.request('login.login.login', { code: res.code, type: 2 }, resd => {
            if (resd.status == 0) {
              this.globalData.openId = resd.data.openid
              this.globalData.user_info = resd.data.user_info;
              wx.setStorageSync('to-ken', resd.data.token)
              if (resd.data.iscoupon === '0') {
                wx.setStorageSync('cuea', 'isd'); // 
              } 
            }// else console.error(res)
          })
        }
      })
    }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

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
  setuserinfo(data, callback) {
    request.setuserinfo(data, callback)
  },
  setuserphone(data, callback) {
    request.setPhone(data, callback)
  },
  globalData: {
    user_info: null,
    openId: null
  }
})