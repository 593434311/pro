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
    showmask:false,
    isweedata: true,
    RegimentPage: 1,
    region: 2,
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
  onloadaaa(res) {
    var cuea = setInterval(() => {
      if (wx.getStorageSync('cuea') == 'isd') {
        clearInterval(cuea)
        this.setData({
          isCoupon: true
        })
      }
    }, 500)
    setTimeout( () =>{
      clearInterval(cuea)
    },5000)
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
    this.setData({
      showmask: true
    })
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 8 }, res => {
      this.setData({
        showmask: false
      })
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
        if(length %3 != 0){
          var ken = 3 - (length % 3)
          for (var i = 0; i < ken; i++){
            tuandata.push(tuandata[i])
          }
        }
        for (var i in tuandata){
          if (Number(i+3) %3 == 0){
              var arr = [];
              arr[0] = tuandata[i]
              arr[1] = tuandata[Number(i)+1]
              arr[2] = tuandata[Number(i)+2]
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
  bindGetUserInfo(e) {
    if (e.detail.iv) {
      wx.showLoading({
        mask: true,
        title: '请稍后...',
      })
      this.setData({
        isCoupon: false
      })
      e.detail.userInfo.inviter_id = ''
      app.setuserinfo(e.detail.userInfo, res => {
        wx.removeStorageSync('cuea')
        if (res.status === 0) {
          app.globalData.user_info = res.data
          app.RequiseData('coupon.user.couponadd', { type: 1 }, resad => {
            wx.hideLoading()
            if (resad.status == 0) {
              wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 2000
              })
            }else{
              wx.showModal({
                content: resad.msg,
                showCancel: false
              });
            }
          })
        }else{
          wx.hideLoading()
          wx.showModal({
            content: res.msg,
            showCancel: false
          });
        }
      })

    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 1000
      })
    }
  },
  catchTouchMove: function (res) {
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
    },1000)
  },
  onShow(){
    this.setData({
      activeData: [],
      slider: [],
      region: wx.getStorageSync('region') || 2,
      isweedata:true,
      RegimentPage: 1,
      RegimentData: []
    })
    this.onloadaaa()
  },
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goselectadd(){
    wx.navigateTo({
      url: `/pages/details/selectregion/index`,
    })
  },
  // goIndex() {
  //   wx.setStorageSync('region', this.data.selectindex)
  //   wx.switchTab({
  //     url: '/pages/index/index',
  //   })
  // },
  // onLoad: function (options) {
  //   if (wx.getStorageSync('region')) {
  //     this.setData({
  //       selectindex: wx.getStorageSync('region')
  //     })
  //   }
  // },
  onShareAppMessage(){
    var region = wx.getStorageSync('region')
    var name = region == '2' ? '南汇' :'临港';
    return {
      title: `${name}拼玩·开启优惠拼团之旅`,
      path: '/pages/index/index',
      imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/banner/index.png'
    }
  }
})