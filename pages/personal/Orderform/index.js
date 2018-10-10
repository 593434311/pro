// pages/personal/Orderform/index.js
var sliderWidth = 65;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "代付款", "已付款", "已成团", "未成团"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    windowheight: 0,
    loadMoreData: '加载更多……' ,
    contentlist: [],
    hideHeader: false,
    hideBottom: false,
    befopage: 1,
    befodata: [],
    isself: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    app.RequiseData('order.index.orderlist', { p:1, pagesize: 6, state: options.id }, res => {
      wx.hideLoading()
      if (res.status === 0) {
        this.setData({
          befodata: res.data.data
        })
      }
      if (res.data.data.length < 6) {
        this.setData({
          isself: false
        })
      }
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
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
    })
    this.setData({
      befodata: []
    })
    app.RequiseData('order.index.orderlist', { p: this.data.befopage, pagesize: 6, state: e.currentTarget.id }, res => {
      wx.hideLoading()
      if(res.status === 0){
        this.setData({
          befodata: res.data.data
        })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  refresh(){
    console.log('上拉')
  },
  loadMore() {
    if (this.data.isself){
      wx.showLoading({
        title: '数据加载中...',
        mask: true,
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
        wx.hideLoading()
      })
    }
  }
})