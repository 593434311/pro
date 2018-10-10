// pages/personal/seeolde/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info: {},
    user_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    app.RequiseData('order.index.orderinfo', { orderid: options.order }, res => {
      if (res.status === 0) {
        this.setData({
          order_info: res.data.order_info,
          user_list: res.data.user_list
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})