// pages/details/selecoupon/index].js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codelist: [],
    orderid: null,
    o_price: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderid: options.orderid,
      o_price: Number(options.o_price)
    })
    app.RequiseData('coupon.user.codelist', { p: 1, pagesize: 100, o_price: this.data.o_price*100 }, res => {
      if(res.status == 0){
        this.setData({
          codelist: res.data
        })
      }
    })
  },
  useConpon(self){
    var code = self.currentTarget.dataset.id
    app.globalData[this.data.orderid] = JSON.stringify(code)
    wx.navigateBack();
  },
  noconpon(){
    delete app.globalData[this.data.orderid]
    wx.navigateBack();
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