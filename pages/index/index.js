//index.js
//获取应用实例
// var bas64 = require('../../utils/bas64.js')
const app = getApp()

Page({
  data: {
    slider: [
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
    ],
    swiperCurrent: 0,
    isCoupon: false,
    isloaddData: true,
    Regiment:{
      befoDtat: [],
      allData: [],
      befoPage: 1,
      allPage: 0,
      clientHeight:0
    }
  },
  /**
   * 页面的初始数据
   */
  onLoad: function (options) {
    if (wx.getStorageSync('cuea')) {
      wx.removeStorageSync('cuea')
    }
    this.setData({
      isCoupon: true
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight - 50
        });
      }
    });
    console.log(wx.getStorageSync('to-ken') )
  },
  goDetails(_id) {
    wx.navigateTo({
      url: '/pages/details/index/index',
    })
  },
  scrolltolower(e) {
    console.log(e) // activity.index.actlist
  },
  getCoupon(e){
    console.log(e.currentTarget.dataset.deat)
    if (e.currentTarget.dataset.deat == 'true'){
      console.log('领')
    } else this.setData({
      isCoupon: false
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }

})