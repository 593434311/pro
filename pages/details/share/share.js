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
    id: '',
    actid: ''
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
      id: options.id || '',
      inviter: options.userid || '',
      actid: options.scene? decodeURIComponent(options.scene) : ''

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
        url: this.data.id ? `/pages/details/index/index?id=${this.data.id}&userid=${this.data.inviter}` : `/pages/details/actideails/index?id=${this.data.actid}`,
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
                  url: this.data.id ? `/pages/details/index/index?id=${this.data.id}&userid=${this.data.inviter}` : `/pages/details/actideails/index?id=${this.data.actid}`
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
  onShareAppMessage() {
    var region = wx.getStorageSync('region')
    var name = region == '2' ? '南汇' : '临港';
    return {
      title: `${name}拼玩·开启优惠拼团之旅`,
      path: '/pages/index/index',
      imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/banner/index.png'
    }
  }
})