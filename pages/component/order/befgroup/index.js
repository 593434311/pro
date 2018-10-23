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
    },
    gobusiness(self) {
      wx.navigateTo({
        url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
      })
    },
    dedlorder(e){
      wx.showModal({
        title: '提示',
        content: '确定要删除该订单吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })  
    }
  }
})
