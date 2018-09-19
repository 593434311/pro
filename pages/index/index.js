//index.js
//获取应用实例
// var bas64 = require('../../utils/bas64.js')
// const app = getApp()

Page({

  data: {
    slider: [
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
    ],
    swiperCurrent: 0,
  },
  goDetails(_id) {
    console.log(_id)
    wx.navigateTo({
      url: '/pages/details/index/index',
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }

})