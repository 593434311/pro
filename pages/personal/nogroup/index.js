// pages/personal/seeolde/index.js
const app = getApp()
Page({
  data: {
    actUser: {},
    order_info: {},
    user_list: [],
    shop_info: {}
  },
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
  }
})