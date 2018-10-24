// pages/personal/seeolde/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actUser: {},
    order_info: {},
    user_list: [],
    shop_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('order.index.orderinfo', { orderid: options.order }, res => {
      if (res.status === 0) {
        this.setData({
          actUser: res.data.act_user,
          order_info: res.data.order_info,
          user_list: res.data.user_list,
          shop_info: res.data.shop_info
        })
      }
    })
    
  },
  gobusiness(self) {
    wx.navigateTo({
      url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`
    })
  },
  onShareAppMessage: function () {

  }
})