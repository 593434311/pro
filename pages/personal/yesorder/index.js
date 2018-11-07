// pages/personal/seeolde/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actUser: {},
    act_info: {},
    order_info: {},
    user_list: [],
    coupon_info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('order.index.orderinfo', { orderid: options.order }, res => {
      if (res.status === 0) {
        this.setData({
          coupon_info: res.data.coupon_info,
          actUser: res.data.act_user,
          act_info: res.data.order_info.act_info,
          order_info: res.data.order_info,
          user_list: res.data.user_list
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