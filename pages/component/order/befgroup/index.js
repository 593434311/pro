// pages/component/order/befgroup/index.js
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
    },
    isshow:{
      type: Number,
      value: null
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
        url: `/pages/personal/nogroup/index?order=${this.data.data.order_id}`,
      })
    }
  }
})
