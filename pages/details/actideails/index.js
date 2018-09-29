// pages/details/index/index.js
const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js')
Page({
  data: {
    imgUrls: [
      '/static/images/details_index/banner@2x.png',
      '/static/images/details_index/banner@2x.png',
      '/static/images/details_index/banner@2x.png',
      '/static/images/details_index/banner@2x.png'
    ],
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    act_info: [],
    act_list: [],
    user_info: [],
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('activity.index.actinfo', { id: options.id }, res => {
      if(res.status === 0){
        WxParse.wxParse('article', 'html', res.data.act_info.info, this, 5)
        this.setData({
          act_info: res.data.act_info,
          act_list: res.data.act_list,
          user_info: res.data.user_info
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  gogrolpdet(self){
    console.log(self)
    wx.navigateTo({
      url: `/pages/details/othergro/index?data=${JSON.stringify(self.currentTarget.dataset.data)}`,
    })
  },
  gobusiness(self) {
    wx.navigateTo({
      url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
    })
  },
  onReachBottom: function () {

  },
  click: function (){
    wx.switchTab({
      url: '/pages/index/index',
      success: function () {

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})