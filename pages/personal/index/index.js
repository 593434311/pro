// pages/personal/index/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getuser: undefined,
    num: {},
    imgList:[],
    src:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  imgYu(event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
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