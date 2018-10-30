// pages/details/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isnewuser: false,
    isCoupon: false ,
    inviter: '',
    act: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    var self = this;
    this.setData({
      act: options.id,
      inviter: options.userid || ''
    })
    app.RequiseData('login.login.chtoken', { token: wx.getStorageSync('to-ken') }, res => {
      if (res.data.iscoupon === '0'){
        this.setData({
          isnewuser: true
        })
      }
    })
  },
  Receive(){
    if (!this.data.isnewuser ){
      wx.navigateTo({
        url: `/pages/details/index/index?id=${this.data.act}&userid=${this.data.inviter}`,
      })
    }else{
      this.setData({
        isCoupon: true
      })
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.iv) {
      wx.showLoading({
        title: '请稍后...',
      })
      this.setData({
        isCoupon: false
      })
      e.detail.userInfo.inviter_id = this.data.inviter
      app.setuserinfo(e.detail.userInfo, res => {
        if (res.status === 0) {
          app.globalData.user_info = res.data
          app.RequiseData('coupon.user.couponadd', { type: 1 }, res => {
            wx.hideLoading()
            if (res.status == 0) {
              wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 1200
              })
              setTimeout(res=>{
                wx.navigateTo({
                  url: `/pages/details/index/index?id=${this.data.act}&userid=${this.data.inviter}`,
                })
              }, 1200)
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
})