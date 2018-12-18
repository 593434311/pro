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
  },
  copyTBL(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // wx.showModal({
            //   title: '提示',
            //   content: '复制成功',
            //   showCancel: false
            // })
          }
        })
      }
    })
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