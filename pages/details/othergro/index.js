// pages/details/othergro/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    act_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.activetimeOut(JSON.parse(options.data))
  },
  /**
   * 用户点击右上角分享
   */
  activetimeOut(dates) {
    let that = this;
    let len = dates.length;//时间数据长度
    function nowTime() { //时间函数
      for (var i = 0; i < len; i++){
        var intDiff = dates[i].second;//获取数据中的时间戳
        var day = 0, hour = 0, minute = 0, second = 0;
        if (intDiff > 0) {//转换时间
          day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          dates[i].second = dates[i].second - 60;
          var str = day + '天' + hour + '时' + minute + '分'
          // console.log(str)    
        } else {
          var str = "已结束！";
          //area
        }
        dates[i].str = str;//在数据中添加difftime参数名，把时间放进去
        that.setData({
          act_list: dates
        })
      }
    }
    nowTime();
  },
  goactivdet(self){
    wx.navigateTo({
      url: `/pages/details/actideails/index?id=${self.currentTarget.dataset.id}`,
    })
  },
  onShareAppMessage: function () {

  }
})