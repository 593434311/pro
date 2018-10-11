// pages/personal/unpaid/unpaid.js
const app = getApp()
var bas64 = require('../../../utils/bas64.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info:{},
    user_list: [],
    wxconpon: null,
    onponmony:null,
    isload: false,
    usernum: '',
    useripne: '',
    isusernum: null,
    isuseripne: null
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
  regular(){
    this.setData({
      isusernum: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.data.usernum)
    })
    this.setData({
      isuseripne: /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.useripne)
    })
  },
  regulte(){ // 按钮验证
    this.regular()
    this.setData({
      isusernum: this.data.isusernum,
      isuseripne: this.data.isuseripne
    })
  },
  voteuser(e){
    if (e.currentTarget.dataset.type == '1'){
      this.data.usernum = e.detail.value
    }
    if (e.currentTarget.dataset.type == '2'){
      this.data.useripne = e.detail.value
    }
    this.regular()
  },
  getPhoneNumber(e){
    var order = app.globalData[this.data.order_info.order_id]
    var order_id = this.data.order_info.order_id;
    var coupon_code = order ? order.code : '0';
    var name = this.data.usernum
    var phone = this.data.useripne
    var coupon_id = order ? order.id : '0';
    if (e.detail.iv){
      app.RequiseData('order.index.payorder', { orderid: order_id, code: coupon_code, name: name, phone: phone, cid: coupon_id}, res => {
        if(res.status == 0){
          console.log(res)
          var timeSta = res.data.timeStamp;
          var nonceStr = res.data.nonceStr;
          var packag = res.data.package;
          var signType = res.data.signType;
          var paySign = res.data.paySign;
          wx.requestPayment({
            timeStamp: timeSta,
            nonceStr: nonceStr,
            package: packag,
            signType: signType,
            paySign: paySign,
            success: res =>{
              console.log(res)
            },
            complete: res => {
              console.log(res)
            }
          })
        }
       
      })
    }
  }
})