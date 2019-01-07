// pages/details/bannerdetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImage:[],
    bannerpath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('login.login.bannerinfo', { id: options.id }, res =>{
      // console.log(res)
      if(res.status==0){
        this.setData({
          bannerImage: res.data.data,
          bannerpath:res.data.path
        })
      }
    })
  },
  goactive(e){
    console.log(e)
    if (this.data.bannerpath){
      wx.navigateTo({
        url: this.data.bannerpath,
      })
    }
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
    var region = wx.getStorageSync('region')
    var name = region == '2' ? '南汇' : '临港';
    return {
      title: `${name}拼玩·开启优惠拼团之旅`,
      path: '/pages/index/index',
      imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/banner/index.png'
    }
  }
})