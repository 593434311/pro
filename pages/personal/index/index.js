// pages/personal/index/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getuser: undefined,
    num: {}

   
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  imgYu(e) {
    var _this = this;
    var src = e.currentTarget.dataset.src;
    var pictures = this.data.pictures;
    wx.previewImage({
      //当前显示下表
      current:src,
      //数据源
      urls: [src]
    })
    
  },
  onLoad: function (options) {
    
    // this.onLoad(options)
    app.globalData.payment = false
    this.setData({
      getuser: app.globalData.user_info ||undefined
    })
    wx.hideTabBarRedDot({index: 2})
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  getreloadLog: function () {
    app.RequiseData('user.info.userinfo', { }, res => {
      console.log(res);

      if(res.status === 0){
        this.setData({
          num: res.data.order_count,
          getuser: res.data.user_info
        })
      }
    })
  },
  onShow: function(){
    this.getreloadLog();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})