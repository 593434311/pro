// pages/details/selectregion/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectindex: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goIndex(){
    wx.setStorageSync('region', this.data.selectindex)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync('region')){
      this.setData({
        selectindex: wx.getStorageSync('region')
      })
    }
  },
  selectd(e){
    this.setData({
      selectindex: e.currentTarget.dataset.id
    })
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