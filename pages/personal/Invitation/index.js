// pages/personal/Invitation/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invt_data:[],
    nowPage:1,
    showData: [],
    data_date:3,
    pageSize:2,
    allPage:0,
    testData: []
  },
  dateHandle(e){
    this.setData({
      data_date: e.currentTarget.dataset.date,
    })
    this.getData()
  },
  getData:function(){
    app.RequiseData('user.info.codelist', { date: this.data.data_date, p: this.data.nowPage, size: this.data.pageSize }, res =>{
      console.log(res)
      this.setData({
        testData:res.data.data,
        allPage: Math.ceil(res.data.count / this.data.pageSize)
      })
    })
  },
  preClick(e){
    var pag = this.data.nowPage;
    if(pag!=1){
      this.setData({
        nowPage:pag-1
      })
      this.getData()
    }
  },
  nextClick(e) {
    var pag = this.data.nowPage;
    var allpag = this.data.allPage;
    if (pag<allpag) {
      this.setData({
        nowPage: pag + 1
      })
      this.getData()
    }
  },





  // dateHandle(e){
  //   this.setData({
  //     data_date: e.currentTarget.dataset.date,
  //     nowPage: 1,
  //     allPage: 0,
  //     testData: []
  //   })
  //   this.getData()
  // },
  // getData: function () {
  //   app.RequiseData('user.info.codelist', { date: this.data.data_date, p: this.data.nowPage, size: this.data.pageSize }, res => {
  //     this.setData({
  //       allPage: Math.ceil(res.data.count / this.data.pageSize),
  //       testData: res.data.data
  //     })
  //   })
  // },
  // preClick() {
  //   var pag= this.data.nowPage
  //   if (pag != 1){
  //     this.setData({
  //       nowPage: pag - 1
  //     })
  //     this.getData()
  //   }
  // },
  // nextClick(){
  //   var bepag = this.data.nowPage
  //   var allpag = this.data.allPage
  //   if (bepag < allpag) {
  //     this.setData({
  //       nowPage: bepag + 1
  //     })
  //     this.getData()
  //   }
  // },
  onLoad: function (options) {
    app.RequiseData('user.info.apply_code',{}, res => {
      this.setData({
        invt_data: res.data
      })
    })
    this.getData()
  },
  onShareAppMessage() {
    console.log(this.data.invt_data.invite_code)
    return {
      title: `拼玩·开启优惠拼团之旅`,
      path: `/pages/details/poster/poster?id=${this.data.invt_data.invite_code}`,
      imageUrl: ''
    }
  }
})