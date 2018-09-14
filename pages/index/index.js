//index.js
//获取应用实例
var bas64 = require('../../utils/bas64.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
     
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var userData = e.detail.userInfo;
    console.log(userData)
    app.RequiseData('user.info.saveinfo', { userinfo: bas64(JSON.stringify(userData))}, res=> {
      console.log(res)
    }, err => {

    })
  }
})
