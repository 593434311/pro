// pages/find/selectedActi/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SedArticle: {},
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
    if (this.data.isself) {
      wx.showLoading({
        title: '数据加载中...',
      })
      this.setData({
        beforpage: this.data.beforpage + 1
      })
      app.RequiseData('note.info.notelist', { p: this.data.beforpage, pagesize: 20 }, res => { // 精选帖子
        wx.hideLoading();
        if (res.status == 0) {
          this.setData({
            SedArticle: res.data.data
          })
          if (Number(res.data.data.length) < 20) {
            this.setData({
              isself: false
            })
          }
        }
      })
    }
  },
  onPullDownRefresh(){
    wx.showLoading({
      title: '数据加载中...',
    })
    app.RequiseData('note.info.notelist', { p: 1, pagesize: 20 }, res => { // 精选帖子
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (res.status == 0) {
        this.setData({
          SedArticle: res.data.data
        })
        if (Number(res.data.data.length) < 20) {
          this.setData({
            isself: false
          })
        }
      }
    })
  }

})