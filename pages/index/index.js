//index.js
//获取应用实例
// var bas64 = require('../../utils/bas64.js')
const app = getApp()

Page({
  data: {
    slider: [
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
      { picUrl: '/static/images/index/banner.png' },
    ],
    swiperCurrent: 0,
    isCoupon: false,
    clientHeight: 0,
    isloaddData: true,
    RegimentPage: 1,
    RegimentData: [],
    wearList:[],
    activeData: [], // 即将成团
    activePage: 1,
    actbeforData: [],
    actbeforPage: 0
  },
  /**
   * 页面的初始数据
   */
  onLoad: function(option) {
    var self = this;
    
    if (wx.getStorageSync('cuea')) {
      wx.removeStorageSync('cuea')
    }
    this.setData({
      isCoupon: false
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    this.gettuan()
    this.getActive()
  },
  
  goactideails(self){
    wx.navigateTo({
      url: `/pages/details/actideails/index?id=${self.currentTarget.dataset.id}`,
    })
  },
  scrolltolower() {
    this.setData({
      isloaddData: false
    })
    this.getActive()
  },
  getActive(){
    app.RequiseData('activity.index.actlist', { p: this.data.RegimentPage, pagesize: 2 }, res => {
      setTimeout(()=>{
        this.setData({
          isloaddData: true
        })
      },1000)
      if(res.status === 0){
        this.setData({
          RegimentData: this.data.RegimentData.concat(res.data),
          RegimentPage: this.data.RegimentPage + 1
        })
      }
      // this.onShow(this.data.RegimentData)
    }) 
  },
  gettuan(){
    app.RequiseData('activity.actor.actlist', { p: this.data.RegimentPage, pagesize: 10 }, res => {
      if(res.status === 0){
        this.setData({
          activeData: res.data
        })
      // this.tuantimeOut(this.data.activeData)
        this.setData({
          actbeforData: res.data.slice(0, 2),
          activePage: res.data.length / 2,
          actbeforPage:1
        })
      }
    }) 
  },
  onShow(dates) {
    // let that = this;
    // let len = dates.length;//时间数据长度
    // function nowTime() { //时间函数
    //   for(var i = 0; i<len; i++) {
    //     var intDiff = dates[i].second;//获取数据中的时间戳
    //     // console.log(intDiff)
    //     var day = 0, hour = 0, minute = 0, second = 0;
    //     if (intDiff > 0) {//转换时间
    //       day = Math.floor(intDiff / (60 * 60 * 24));
    //       hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    //       minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    //       second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    //       if (hour <= 9) hour = '0' + hour;
    //       if (minute <= 9) minute = '0' + minute;
    //       if (second <= 9) second = '0' + second;
    //       dates[i].second--;
    //       var str = day + '天' + hour + '时' + minute + '分'
    //       // console.log(str)    
    //     } else {
    //       var str = "已结束！";
    //       //area
    //     }
      
    //     if (!that.data.isloaddData) {
    //       clearInterval(timer)
    //     }
    //     dates[i].str = str;//在数据中添加difftime参数名，把时间放进去
    //   }
     
    //   that.setData({
    //     RegimentData: dates
    //   })
    // }
    // nowTime();
    // var timer = setInterval(nowTime, 60000);
  },
  tuantimeOut(dates) {
    // let that = this;
    // let len = dates.length;//时间数据长度
    // function nowTime() { //时间函数
    //   for (var i = 0; i < len; i++) {
    //     var intDiff = dates[i].second;//获取数据中的时间戳
    //     // console.log(intDiff)
    //     var day = 0, hour = 0, minute = 0, second = 0;
    //     if (intDiff > 0) {//转换时间
    //       day = Math.floor(intDiff / (60 * 60 * 24));
    //       hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    //       minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    //       second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    //       if (hour <= 9) hour = '0' + hour;
    //       if (minute <= 9) minute = '0' + minute;
    //       if (second <= 9) second = '0' + second;
    //       dates[i].second--;
    //       var str = day + '天' + hour + '时' + minute + '分'
    //       // console.log(str)    
    //     } else {
    //       var str = "已结束！";
    //       //area
    //     }
    //     dates[i].day = day;//在数据中添加difftime参数名，把时间放进去
    //     dates[i].hour = hour;//在数据中添加difftime参数名，把时间放进去
    //     dates[i].minute = minute;//在数据中添加difftime参数名，把时间放进去
    //   }
    //   that.setData({
    //     activeData: dates
    //   })
    // }
    // nowTime();
    // var timer = setInterval(nowTime, 1000);
  },
  cuitWent(even){
    var data = even.currentTarget.dataset;
    app.RequiseData('user.info.userDeed', { type: data.type, actId: data.id, behavior:'collect' }, res => {
      console.log(res)
    })
    console.log(even)
  },
  Another(){
    var actbeforPage = this.data.actbeforPage+1;
    var actbeforData = this.data.activeData.slice((actbeforPage - 1) * 2, actbeforPage * 2);
    if (actbeforPage > this.data.activePage) {
      actbeforPage = 1
      actbeforData = this.data.activeData.slice(0, 2);
    }
    console.log(actbeforPage)
    this.setData({
      actbeforData: actbeforData,
      actbeforPage: actbeforPage
    })
  },
  getCoupon(e){
    console.log(e.currentTarget.dataset.deat)
    if (e.currentTarget.dataset.deat == 'true'){
      console.log('领')
    } else this.setData({
      isCoupon: false
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})