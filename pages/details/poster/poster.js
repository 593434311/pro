// pages/details/poster/poster.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codedata:{},
    userdata:{},
    imgstyl: 'background-image:url(http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/poster/poster_bg.png)'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  go_index(e){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    app.RequiseData('user.info.sharecode', { invite_code: options.id }, res => {
      if(res.status == 0){
        this.setData({
          codedata: res.data.info,
          userdata: res.data.user_info
        })
       
      }
      console.log(options.id)
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  /**
   * 生命周期函数--监听页面隐藏
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var region = wx.getStorageSync('region')
    var name = region == '2' ? '南汇' : '临港';
    return {
      title: `${name}拼玩·开启优惠拼团之旅`,
      path: '/pages/index/index',
      imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/banner/index.png'
    }
  }
})