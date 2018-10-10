// pages/component/Businessact/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: { // 热门活动
    listdata: {
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
    data:{}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(self) {
      wx.navigateTo({
        url: `/pages/details/actideails/index?id=${self.currentTarget.dataset.id}`,
      })
    },
    cuitWent(even) {
      var eve = even.currentTarget.dataset
      app.RequiseData('user.info.userDeed', { behavior: eve.behavior, actId: eve.id, type: eve.type }, res => {
        // to doing
      })
      if (eve.behavior == 'collect')
        this.data.data.attribute_num.collect = Number(this.data.data.attribute_num.collect) + 1
      else this.data.data.attribute_num.collect = Number(this.data.data.attribute_num.collect) - 1
      this.data.data.user_attribute.collect = !this.data.data.user_attribute.collect
      this.setData({
        data: this.data.data
      })
    },
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
          dates.second = dates.second  - 60;
          var str = day + '天' + hour + '时' + minute + '分'
          // console.log(str)    
        } else {
          var str = "已结束！";
          //area
        }
        dates.str = str;//在数据中添加difftime参数名，把时间放进去
        that.setData({
          data: dates
        })
      }      
      nowTime();
      var timer = setInterval(nowTime, 60000);
    }
  }
})
