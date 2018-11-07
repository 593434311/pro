// pages/details/allactive/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RegimentPage: 0,
    RegimentData: [],
    isweedata: true
  },
  onLoad: function (option) {
    wx.startPullDownRefresh()
  },
  getActive() {
    wx.showLoading({
      title: '加载中...'
    })
    this.data.RegimentPage++
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 6 }, res => {
      wx.stopPullDownRefresh()
      wx.hideLoading();
      if (res.data.length === 0) {
        this.data.isweedata = false
      }
      if (res.status === 0) {
        this.setData({
          RegimentData: this.data.RegimentData.concat(res.data),
          RegimentPage: this.data.RegimentPage
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      RegimentPage: 0,
      isweedata: true,
      RegimentData: []
    })
    this.getActive()
  },
  onReachBottom() {
    if (this.data.isweedata) {
      this.getActive()
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