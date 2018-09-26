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
    Regiment:{
      Data: [],
      Page: 0,
    }
  },
  /**
   * 页面的初始数据
   */
  onLoad: function(option) {
    if (wx.getStorageSync('cuea')) {
      wx.removeStorageSync('cuea')
    }
    this.setData({
      isCoupon: true
    })
    this.scrolltolower()
    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight
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
<<<<<<< HEAD
  scrolltolower() {
    this.setData({
      
     
    })
    app.RequiseData('activity.actor.actlist', { p: this.Regiment.Page, pagesize: 10}, res =>{
      console.log(res)
    }) // activity.index.actlist
=======
  scrolltolower(e) {
    app.RequiseData('activity.actor.actlist',{ p: 1, pagesize:10 }, res =>{
      console.log(res)
    })
>>>>>>> 85ccd98cf11d544932582bf6d4d97e0a25b71794
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