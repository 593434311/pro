// pages/details/Joindeta/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    joundata:{},
    Surplus:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data: JSON.parse(options.data),
      joundata: JSON.parse(options.joundata),
      Surplus: JSON.parse(options.Surplus)
    })
    this.tuantimeOut(this.data.Surplus)
  },
  tuantimeOut(dates) {
    let that = this;
    let len = dates.length;//时间数据长度
    function nowTime() { //时间函数
      var intDiff = dates.second;//获取数据中的时间戳
      // console.log(intDiff)
      var day = 0, hour = 0, minute = 0, second = 0;
      if (intDiff > 0) {//转换时间
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        dates.second = dates.second - 60;
        var str = day + '天' + hour + '时' + minute + '分'
        // console.log(str)    
      } else {
        var str = "已结束！";
        //area
      }
      dates.day = day;//在数据中添加difftime参数名，把时间放进去
      dates.hour = hour;//在数据中添加difftime参数名，把时间放进去
      dates.minute = minute;//在数据中添加difftime参数名，把时间放进去
      that.setData({
        order_info: dates
      })
    }
    nowTime();
    var timer = setInterval(nowTime, 60000);
  }
})