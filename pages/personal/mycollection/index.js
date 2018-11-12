// pages/personal/Orderform/index.js
var sliderWidth = 65;
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["活动", "团购", "商家", "文章"],
    showmask: false,
    activeIndex: 0,
    windowheight: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    befopage: 1,
    isdata: false,
    befodata: [],
    isself: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowheight: res.windowHeight,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.pulldata()
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      befodata: [],
      befopage: 1
    })
    this.pulldata()
  },
  loadMore() {
    if (this.data.isself) {
      this.data.befopage++
      this.pulldata()
    }
  },
  pulldata(){
    this.setData({
      showmask: true,
      isdata: false
    })
    app.RequiseData('user.info.usercollect', { type: Number(this.data.activeIndex)+1, pagesize: 10, p: this.data.befopage }, res => {
      if (res.status === 0) {
        this.setData({
          befodata: this.data.befodata.concat(res.data)
        })
        if (res.data.length < 6) {
          this.setData({
            isself: false
          })
        }
      }
      if (res.data.length == 0) {
        this.setData({
          isdata: true
        })
      }
      this.setData({
        showmask: false,
      })
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