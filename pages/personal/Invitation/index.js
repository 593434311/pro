// pages/personal/Invitation/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invt_data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // go_del(e){
  //   wx.navigateTo({
  //     url: "/pages/details/poster/poster",
  //   })
  // },
  onLoad: function (options) {
    app.RequiseData('user.info.apply_code',{}, res => {
      this.setData({
        invt_data: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log(this.data.invt_data.invite_code)
    return {
      title: `拼玩·开启优惠拼团之旅`,
      path: `/pages/details/poster/poster?id=${this.data.invt_data.invite_code}`,
      imageUrl: ''
    }
  }
})