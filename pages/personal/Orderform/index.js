// pages/personal/Orderform/index.js
var sliderWidth = 65;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "待付款", "已付款", "已成团", "未成团"],
    texts: '您还未参与任何拼团，去首页选择喜欢的活动吧~',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    windowheight: 0,
    loadMoreData: '加载更多……' ,
    contentlist: [],
    showmask: false,
    hideHeader: false,
    hideBottom: false,
    befopage: 1,
    befodata: [],
    isself: true,
    isdata: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      showmask: true
    })
    app.RequiseData('order.index.orderlist', { p:1, pagesize: 6, state: options.id }, res => {
      if (res.status === 0) {
        this.setData({
          befodata: res.data.data
        })
      }
      if (res.data.data.length == 0){
        this.setData({
          isdata: true
        })
      }
      if (res.data.data.length < 6) {
        this.setData({
          isself: false
        })
      }
      this.setData({
        showmask: false
      })
    })
    this.setData({
      activeIndex: options.id
    })
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
  },
  tabClick: function (e) {
    this.setData({
      showmask: true
    })
    this.setData({
      befodata: [],
      befopage: 1,
      isdata: false
    })
    app.RequiseData('order.index.orderlist', { p: this.data.befopage, pagesize: 6, state: e.currentTarget.id }, res => {
      this.setData({
        showmask: false
      })
      if(res.status === 0){
        this.setData({
          befodata: res.data.data
        })
        if (res.data.data.length == 0){
          this.setData({
            isdata: true
          })
        }
        if (res.data.data.length < 6) {
          this.setData({
            isself: false
          })
        }
      }
    })
    this.setData({
      isself : true,
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  loadMore() {
    if (this.data.isself){
      this.setData({
        showmask: true
      })
      this.data.befopage++
      app.RequiseData('order.index.orderlist', { p: this.data.befopage, pagesize: 6, state: this.data.activeIndex }, res => {
        if (res.status === 0) {
          this.setData({
            befodata: this.data.befodata.concat(res.data.data)
          })
          if (res.data.data.length < 6){
            this.setData({
              isself: false
            })
          }
        }
        this.setData({
          showmask: false
        })
      })
    }
  },
  _confirmEvent(){
    this.getdata()
  },
  cannelorder(){
    wx.navigateTo({
      url: "/pages/personal/cancel/index"
    })
  },
  getdata(){
    this.setData({
      befodata: [],
      befopage: 1,
      isdata: false,
      showmask: true
    })
    app.RequiseData('order.index.orderlist', { p: this.data.befopage, pagesize: 6, state: this.data.activeIndex  }, res => {
      this.setData({
        showmask: false
      })
      if (res.status === 0) {
        this.setData({
          befodata: res.data.data
        })
        if (res.data.data.length == 0) {
          this.setData({
            isdata: true
          })
        }
        if (res.data.data.length < 6) {
          this.setData({
            isself: false
          })
        }
      }
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: res.target.dataset.title,
        path: `/pages/details/share/share?id=${res.target.dataset.actid}&userid=${res.target.dataset.userid}`,
        imageUrl: `http://gtshidai.oss-cn-shanghai.aliyuncs.com${res.target.dataset.image}`
      }
    }else{
      var region = wx.getStorageSync('region')
      var name = region == '2' ? '南汇' : '临港';
      return {
        title: `${name}拼玩·开启优惠拼团之旅`,
          path: '/pages/index/index',
          imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com/pinwan/banner/index.png'
        }
      
    }
  }
})