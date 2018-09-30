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
    getPhNumber: false
    // getPhNumber: 'getPhoneNumber'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('activity.actor.actinfo', { id: options.id }, res => {
      if(res.status === 0){
        WxParse.wxParse('article', 'html', res.data.act_info.info, this, 5)
        this.setData({
          act_info: res.data.act_info,
          act_list: res.data.act_list,
          user_info: res.data.user_info
        })
      }
    })
    wx.getSetting({
      success:res =>{
        console.log(res)
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  bindGetUserInfo(e){
    wx.showToast({ title: '请稍后...', icon: 'loading'});
    if(!app.globalData.user_info){ // 判断本地是否有数据
      app.setuserinfo(e.detail.rawData, res =>{
        if(res.status === 0){
          this.orderdown(e.currentTarget.dataset)
        }
      })
    } else this.orderdown(e.currentTarget.dataset)
  },
  orderdown(ty){
    app.RequiseData('activity.index.openact', 
    { act_id: this.data.act_info.id, target_user_id: ty.type?this.data.act_info.user_id:'', inviter_id: '' }, res => {
      wx.hideToast();
      if(res.status === 0){
        wx.navigateTo({
          url: `/pages/personal/unpaid/unpaid?older=${res.data}`
        })
      }else if(res.status === 203){
        wx.showModal({
          content: res.msg,
          showCancel: false,
          success: resa => {
            if (resa.confirm) {
              this.onLoad(this.options)
            }
          }
        });
      }
    })
  },
  gogrolpdet() {
    wx.navigateTo({
      url: `/pages/details/othergro/index?data=${JSON.stringify(this.data.act_list)}`,
    })
  },
  gobusiness(self){
    wx.navigateTo({
      url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
    })
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