// pages/find/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  goSelectedac(){
    wx.navigateTo({
      url: `/pages/find/selectedActi/index?id=${'1'}`,
    })
  },
  goSelectedmer(){
    wx.navigateTo({
      url: `/pages/find/selectedmerc/index?id=${'1'}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})