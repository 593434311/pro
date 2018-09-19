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
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }

})