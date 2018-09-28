// pages/details/index/index.js
const app = getApp()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('activity.actor.actinfo', { id: options.id }, res => {
      if(res.status === 0){
        this.setData({
          act_info: res.data.act_info,
          act_list: res.data.act_list,
          user_info: res.data.user_info
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  gogrolpdet(self) {
    console.log(self)
    wx.navigateTo({
      url: `/pages/details/othergro/index?data=${JSON.stringify(self.currentTarget.dataset.data)}`,
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