// pages/component/befteam/index.js

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: { // 即将成团
    item: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          data: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {}
  },
  ready(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(self) {
      wx.navigateTo({
        url: `/pages/details/index/index?id=${self.currentTarget.dataset.id}`,
      })
    },
    cuitWent(even){
      var eve = even.currentTarget.dataset
      app.RequiseData('user.info.userDeed', { behavior: eve.behavior, actId: eve.id, type: eve.type}, res => {
        console.log(res)
      })
      this.data.data.iscollect = !this.data.data.iscollect
      this.setData({
        data: this.data.data
      })
    }
  }
})
