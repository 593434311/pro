// pages/details/payment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info:{},
    user_info: {},
    act_info: {},
    shere: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.RequiseData('order.index.orderinfo', { orderid: options.id }, res => {
      if(res.status == 0){
        this.setData({
          act_info: res.data.act_user,
          user_info: res.data.user_list,
          shere: res.data.order_info,
          order_info: res.data.order_info.act_info,
        })
        this.tuantimeOut(this.data.order_info)
      }
    })
  },
  tuantimeOut(dates) {
    var timer;
    let that = this;
    let len = dates.length;//时间数据长度
    function nowTime() { //时间函数
      var intDiff = dates.second;//获取数据中的时间戳
      var day = 0, hour = 0, minute = 0, second = 0;
      if (intDiff > 0) {//转换时间
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        dates.second = dates.second - 15;
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
    timer = setInterval(nowTime, 15000);
  },
  onShareAppMessage: function (res) {
    return {
      title: 'test',
      path: `/pages/details/share/share?id${res.target.dataset.actid}&userid=${res.target.dataset.userid}`,
      imageUrl: 'http://gtshidai.oss-cn-shanghai.aliyuncs.com' +this.data.shere.cover_img
    }
  }
})