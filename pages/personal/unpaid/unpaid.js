// pages/personal/unpaid/unpaid.js
const app = getApp()
var bas64 = require('../../../utils/bas64.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info:{},
    actUser: {},
    user_list: [],
    wxconpon: null,
    onponmony:null,
    isload: false,
    usernum: '',
    useripne: '',
    user_info:{},
    isusernum: null,
    isuseripne: null,
    is_mobile: false,
    orderid: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('order.index.orderinfo', { orderid: options.older}, res =>{
      console.log(res)
      if(res.status === 0){
        this.setData({
          orderid: options.older,
          order_info: res.data.order_info,
          actUser: res.data.act_user,
          user_info: res.data.user_info,
          user_list: res.data.user_list,
          is_mobile: res.data.is_mobile,
          usernum: res.data.user_info.realname,
          useripne: res.data.user_info.realmobile,
          isload: true
        })
        if (res.data.user_info.realname){
          this.regular()
        }
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
    var num = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.data.usernum)
    var ipne = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.useripne)
    this.setData({
      isusernum: num
    })
    if (!num){
      return false
    }
    this.setData({
      isuseripne: ipne
    })
    if (!ipne) {
      return false
    }
    return true
  },
  regulte(){ // 按钮验证
    if (this.regular()){
      this.doworder()
    }
  },
  voteuser(e){
    this.setData({
      isuseripne: true,
      isusernum: true
    })
    if (e.currentTarget.dataset.type == '1'){
      this.data.usernum = e.detail.value
    }
    if (e.currentTarget.dataset.type == '2'){
      this.data.useripne = e.detail.value
    }
  },
  doworder(){
    wx.showLoading({
      title: '请稍后...',
      mask: true,
    })
    var order = app.globalData[this.data.order_info.order_id]
    var order_id = this.data.order_info.order_id;
    var coupon_code = order ? order.code : '';
    var name = this.data.usernum
    var phone = this.data.useripne
    var coupon_id = order ? order.id : '';
    app.RequiseData('order.index.payorder', { orderid: order_id, code: coupon_code, name: encodeURIComponent(name), phone: phone, cid: coupon_id }, res => {
      wx.hideLoading()
      if (res.status != 0) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.msg,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `/pages/personal/Orderform/index?id=1`
              })
            }
          }
        })
      }
      if (res.status == 0) {
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
          success: res => {
            wx.navigateTo({
              url: `/pages/details/payment/index?id=${this.data.orderid}`
            })
          },
          complete: res => {
            console.log(res)
          }
        })
      }
    })
  },
  getPhoneNumber(e){
    if (e.detail.iv){
      console.log(e.detail.encryptedData)
      app.setuserphone({ iv: e.detail.iv, str: e.detail.encryptedData },res => {
         if(res.status == 0){
           this.setData({
             is_mobile: true
           })
           this.regulte()
         }
      })
    }
  }
})