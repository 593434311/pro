// pages/component/order/befgroup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ohtgro: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        this.activetimeOut(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ohtgro:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    activetimeOut(dates) {
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
          dates.second = dates.second - 60;
          var str = day + '天' + hour + '时' + minute + '分'
        } else {
          var str = "已结束！";
        }
        dates.str = str;//在数据中添加difftime参数名，把时间放进去
        that.setData({
          ohtgro: dates
        })
      }
      nowTime();
      var timer = setInterval(nowTime, 60000);
    },
    godeta(self){
      wx.navigateTo({
        url: `/pages/details/index/index?id=${self.currentTarget.dataset.id}`,
      })
    }
  }
})
