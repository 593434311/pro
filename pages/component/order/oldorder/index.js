// pages/component/order/oldorder/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    data:{}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goseorder(self) {
      wx.navigateTo({
        url: `/pages/personal/nogroup/index?older=${self.currentTarget.dataset.oldid}`,
      })
    }
  }
})
