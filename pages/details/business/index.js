// pages/details/business/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  activefun(self){
    this.setData({
      activeIndex: self.currentTarget.dataset.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})