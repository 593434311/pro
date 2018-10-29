// pages/personal/wallet/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audit: 0.00,
    may: 0.00,
    yet: 0.00,
    pulvalue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('user.money.moneyinfo', { orderid: options.older }, res => {
      if(res.status == 0){
        this.setData({
          audit: res.data.audit_money,
          may: res.data.may_money,
          yet: res.data.yet_money
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  inputvalue(e){
    this.setData({
      pulvalue: e.detail.value
    })
  },
  commitvalue(){
    if (this.data.pulvalue!= 0){
      app.RequiseData('user.money.subdeposit', { num: this.data.pulvalue*100 }, res => {
        if(res.status == 0){
          wx.showModal({
            content: '恭喜您申请提现成功~',
            showCancel: false
          });
        }else{
          wx.showModal({
            content: res.data,
            showCancel: false
          });
        }
      })
    }else{
      wx.showModal({
        content: '请输入您要提现的金额',
        showCancel: false
      });
    }
  }
})