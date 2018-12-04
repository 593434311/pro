// pages/find/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sedbusin: [],
    SedArticle:[],
    showmask: false,
    isweedata:true,
    RegimentPage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onaaLoad: function () {
    this.setData({
      Sedbusin: [],
      RegimentPage: 1,
      showmask: true
    })
    this.getbushdata()
    app.RequiseData('note.info.notelist', { p: 1, pagesize: 3 }, res => { // 精选帖子
      this.setData({
        showmask: false
      })
      if (res.status == 0) {
        this.setData({
          SedArticle: res.data.data
        })
      }
    })
    
  },
  getbushdata(){
    app.RequiseData('shop.info.shoplist', { p: this.data.RegimentPage, pagesize: 6 }, res => {// 精选商家
      if (res.status == 0) {
        this.setData({
          RegimentPage: this.data.RegimentPage + 1,
          Sedbusin: this.data.Sedbusin.concat(res.data.data)
        })
        if(res.data.data.length < 6){
          this.setData({
            isweedata: false
          })
        }
      }
    })
  },
  onShow(){
    this.onaaLoad()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom() {
    if (this.data.isweedata) {
      console.log(1)
      this.getbushdata()
    }
  },
  goSelectedac(){
    wx.navigateTo({
      url: `/pages/find/selectedActi/index?id=${'1'}`,
    })
  },
  goSelectedmer(){
    wx.navigateTo({
      url: `/pages/find/selectedmerc/index?id=${'1'}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onPullDownRefresh() {
    this.onaaLoad()
  },
  onShareAppMessage: function () {

  }
})