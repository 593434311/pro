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
    clientHeight: 0,
    isloaddData: true,
    RegimentPage: 1,
    RegimentData: []
    
  },
  /**
   * 页面的初始数据
   */
  onLoad: function(option) {
    var self = this;
    if (wx.getStorageSync('cuea')) {
      wx.removeStorageSync('cuea')
    }
    this.setData({
      isCoupon: true
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    this.getActive()
    console.log(wx.getStorageSync('to-ken') ) 
  },
  goDetails(_id) {
    wx.navigateTo({
      url: '/pages/details/index/index',
    })
  },
  scrolltolower() {
    this.getActive()
  },
  getActive(){
    this.setData({
      isloaddData: false
    })
    app.RequiseData('activity.actor.actlist', { p: this.data.RegimentPage, pagesize: 10 }, res => {
      this.setData({
        isloaddData: true,
        RegimentData: res.data,
        RegimentPage: this.data.RegimentPage + 1
      })
      console.log(res)
    }) 
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