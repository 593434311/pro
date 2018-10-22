// pages/details/allactive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    RegimentPage: 1,
    RegimentData: [],
    isweedata: false
  },
  onLoad: function (option) {
    getActive()
  },
  getActive() {
    wx.showToast({
      title: '',
      image: '/static/images/icon/test.gif'
    })
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 6 }, res => {
      // wx.hideToast();
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
  onPullDownRefresh: function () {

  },
  onReachBottom() {
    if (this.data.isweedata) {
      this.getActive()
    }
  }

})