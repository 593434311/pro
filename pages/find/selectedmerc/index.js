// pages/find/selectedmerc/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sedbusin:{},
    beforpage: 1,
    isself: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()
  },
  onReachBottom() {
    if(this.data.isself){
      wx.showLoading({
        title: '数据加载中...',
      })
      this.setData({
        beforpage: this.data.beforpage +1
      })
      app.RequiseData('shop.info.shoplist', { p: this.data.beforpage, pagesize: 10 }, res => {// 精选商家
        wx.hideLoading();
        if (res.status == 0) {
          this.setData({
            Sedbusin: this.data.Sedbusin.concat(res.data.data)
          })
          if (Number(res.data.data.length) < 10){
            this.setData({
              isself: false
            })
          }
        }
      })
    }
  },
  onPullDownRefresh() {
    wx.showLoading({
      title: '数据加载中...',
    })
    app.RequiseData('shop.info.shoplist', { p: 1, pagesize: 20 }, res => {// 精选商家
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (res.status == 0) {
        this.setData({
          Sedbusin: res.data.data
        })
        if (Number(res.data.data.length) < 10) {
          this.setData({
            isself: false
          })
        }
      }
    })
  }
})