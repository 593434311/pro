// pages/personal/unpaid/unpaid.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info:{},
    user_list: [],
    wxconpon: null,
    onponmony:null,
    isload: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('order.index.orderinfo', { orderid: options.older}, res =>{
      if(res.status === 0){
        this.setData({
          order_info: res.data.order_info,
          user_list: res.data.user_list,
          isload: true
        })
      }
    })
  },
  getorder_id(){
    var wxconpon = app.globalData[this.data.order_info.order_id] || null;
    var mony;
    if (wxconpon){
      mony = (Number(this.data.order_info.act_info.p_price) - Number(JSON.parse(wxconpon).money_reduce_y))
    }else{
      mony = null
    }
    this.setData({
      wxconpon: JSON.parse(wxconpon),
      onponmony: mony
    })
  },
  onShow(){
    if (this.data.isload){
      this.getorder_id()
    }
  },
  gocuoer(){
    var orderId = this.data.order_info.order_id
    var o_price = this.data.order_info.act_info.p_price
    wx.navigateTo({
      url: `/pages/details/selecoupon/index?orderid=${orderId}&o_price=${o_price}`
    })
  },
  getPhoneNumber(e){
    console.log(e)
  }
})