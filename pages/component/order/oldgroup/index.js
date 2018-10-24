// pages/component/order/oldgroup/index.js
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
  data: {
    data: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goseorder(self){
      wx.navigateTo({
        url: `/pages/personal/seeolde/index?order=${this.data.data.order_id}`,
      })
    },
    gobusiness(self) {
      wx.navigateTo({
        url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
      })
    }
  }
})
