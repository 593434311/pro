//index.js
//获取应用实例
// var bas64 = require('../../utils/bas64.js')
const app = getApp()

Page({
  data: {
    slider: [],
    swiperCurrent: 0,
    isCoupon: false,
    clientHeight: 0,
    isloaddData: true,
    isweedata: true,
    RegimentPage: 1,
    currentTab: 0,
    RegimentData: [],// 热门活动
    wearList:[],
    activeData: [], // 即将成团
  },
  /**
   * 页面的初始数据
   */
  bannerDetail(e){
    wx.navigateTo({
      url: `/pages/details/bannerdetails/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  onloadaaa: function (res) {
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
    this.getbutton()
  },
  getActive() {
    wx.showLoading({
      title: '加载中...'
    })
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 4 }, res => {
      wx.hideLoading();
      if (res.data.length === 0) {
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
  getbutton(){
    app.RequiseData('login.login.bannerlist', { }, res => {
      this.setData({
        slider: res.data,
      })
    })
  },
  gettuan(){
    app.RequiseData('activity.actor.actlist', { p: 1, pagesize: 20 }, res => {
      var thit = this
      if(res.status === 0){
         var tuandata = res.data;
        var newdata = [];
        var length = tuandata.length;
        if(length %2 != 0){
          tuandata.push(tuandata[0])
        }
        for (var i in tuandata){
          if(i %2){
            var arr = [];
            arr[0] = tuandata[i - 1]
            arr[1] = tuandata[i]
            newdata.push(arr)
          }
        }
        this.setData({
          activeData: newdata,
        })
      }
    }) 
  },
  Another(){
    var leng = this.data.activeData.length
    var berb = this.data.currentTab
    berb++
    berb = berb == leng ? 0 : berb
    this.setData({
      currentTab: berb
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.iv) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        isCoupon: false
      })
      e.detail.inviter_id = ''
      app.setuserinfo(e.detail.userInfo, res => {
        console.log(res)
        if (res.status === 0) {
          app.globalData.user_info = res.data
          app.RequiseData('coupon.user.couponadd', { type: 1 }, res => {
            wx.hideLoading()
            if (res.status == 0) {
              wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })

    } else {
      wx.showLoading({
        title: '授权失败',
        icon: 'none',
        duration: 1000
      })
    }
  },
  catchTouchMove: function (res) {
    console.log(res)
  },
  onReachBottom(){
    if (this.data.isweedata) {
      this.getActive()
    }
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading();
    this.setData({
      activeData: [],
      slider: [],
      RegimentPage: 1,
      RegimentData: []
    })
    this.gettuan()
    this.getbutton()
    this.getActive()
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    },1500)
  },
  onShow(){
    this.setData({
      activeData: [],
      slider: [],
      RegimentPage: 1,
      RegimentData: []
    })
    this.onloadaaa()
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})