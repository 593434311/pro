// pages/details/business/index.js
const app = getApp() 
var WxParse = require('../../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    businData:{},
    businesActive:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    app.RequiseData('activity.index.shopact', { shop_id: options.id, p:1, pagesize: 100 }, res => {
      if(res.status == 0){
        this.setData({
          businesActive: res.data
        })
      }
    })
    app.RequiseData('shop.info.shopinfo', { shop_id: options.id}, res => {
      WxParse.wxParse('shopinfo', 'html', res.data.describe, this, 5)
      this.setData({
        businData: res.data
      })
    })
  },
  activefun(self){
    this.setData({
      activeIndex: self.currentTarget.dataset.id
    })
  }
})