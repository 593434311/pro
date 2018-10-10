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
    isweedata: true,
    RegimentPage: 1,
    RegimentData: [],// 热门活动
    wearList:[],
    activeData: [], // 即将成团
    activePage: 1,
    actbeforData: [],
    actbeforPage: 0
  },
  /**
   * 页面的初始数据
   */
  onLoad: function(option) {
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: '5'
    // })
    var self = this;
    var cuea = setInterval(() => {
      if (wx.getStorageSync('cuea')){
        if (wx.getStorageSync('cuea') === 'isd'){
          this.setData({
            isCoupon: true
          })
        }
        clearInterval(cuea)
        wx.removeStorageSync('cuea')
      }
    },2000)
    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    this.gettuan()
    this.getActive()
  },
  
  goactideails(self){
    wx.navigateTo({
      url: `/pages/details/actideails/index?id=${self.currentTarget.dataset.id}`,
    })
  },
  getActive(){
    wx.showLoading({
      title: '玩命加载中',
    })
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 2 }, res => {
      wx.hideLoading();
      if(res.data.length === 0){
        this.data.isweedata = false
      }
      if (res.status === 0) {
        this.setData({
          RegimentData: this.data.RegimentData.concat(res.data),
          RegimentPage: this.data.RegimentPage + 1
        })
      }
    }) 
 
  },
  gettuan(){
    app.RequiseData('activity.actor.actlist', { p: this.data.RegimentPage, pagesize: 10 }, res => {
      if(res.status === 0){
        this.setData({
          activeData: res.data
        })
        this.setData({
          actbeforData: res.data.slice(0, 2),
          activePage: res.data.length / 2,
          actbeforPage:1
        })
      }
    }) 
  },
  cuitWent(even){
    var data = even.currentTarget.dataset;
    app.RequiseData('user.info.userDeed', { type: data.type, actId: data.id, behavior:'collect' }, res => {
      console.log(res)
    })
    console.log(even)
  },
  Another(){
    var actbeforPage = this.data.actbeforPage+1;
    var actbeforData = this.data.activeData.slice((actbeforPage - 1) * 2, actbeforPage * 2);
    if (actbeforPage > this.data.activePage) {
      actbeforPage = 1
      actbeforData = this.data.activeData.slice(0, 2);
    }
    this.setData({
      actbeforData: actbeforData,
      actbeforPage: actbeforPage
    })
  },
  bindGetUserInfo: function (e) {
    this.setData({
      isCoupon: false
    })
    app.setuserinfo(e.detail.rawData, res => {
      if (res.status === 0) {
        app.globalData.user_info = res.data
      }
    })
    app.RequiseData('coupon.user.couponadd', { type: 1 }, res => {
      wx.showToast({
        title: '领取成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  onReachBottom(){
    if (this.data.isweedata) {
      this.getActive()
    }
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading();
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})