// pages/component/order/beforder/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
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
    data:{}
  },
  methods: {
    goOldede(self) {
      wx.navigateTo({
        url: `/pages/personal/unpaid/unpaid?older=${self.currentTarget.dataset.oldid}`
      })
    }
  }
})
