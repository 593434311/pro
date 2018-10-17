// pages/find/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sedbusin: [],
    SedArticle:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('shop.info.shoplist', { p: 1, pagesize: 6 }, res => {// 精选商家
      if(res.status == 0){
        this.setData({
          Sedbusin: res.data.data
        })
      }
    })
    app.RequiseData('note.info.notelist', { p: 1, pagesize: 6 }, res => { // 精选帖子
      if (res.status == 0) {
        this.setData({
          SedArticle: res.data.data
        })
      }
    })
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