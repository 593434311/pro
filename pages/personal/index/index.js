// pages/personal/index/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getuser: undefined,
    num: {},
    showModalStatus:false
    
  },
  move(){
    
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;
    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })
    }.bind(this),300)
    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  powerDrawe(){
    var currentStatu = 'open';
    this.util(currentStatu);
  },
  onLoad: function (options) {
    app.globalData.payment = false
    this.setData({
      getuser: app.globalData.user_info ||undefined
    })
    wx.hideTabBarRedDot({index: 2})
  },
  download() {
    wx.showLoading({
      title: '下载中...',
      mask: true,
    })
    wx.downloadFile({
      url: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/static/erweima@2x.png',
      success: res => {
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res =>{
            this.setData({
              showModalStatus: false
            })
          }
        })
      }
    })
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
  powerDrawer(){
    this.setData({
      showModalStatus: false
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