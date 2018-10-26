// pages/component/order/oldorder/index.js
const app = getApp()
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
    isnony: {
      type: Boolean,
      value: false,
    
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
        url: `/pages/personal/yesorder/index?order=${this.data.data.order_id}`,
      })
    },
    gobusiness(self) {
      wx.navigateTo({
        url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
      })
    },
    dedlorder(e) {
      var dataid = this.data.data.order_id
      wx.showModal({
        title: '提示',
        content: '确定要申请退款吗？',
        success: res => {
          if (res.confirm) {
            app.RequiseData('order.index.cannelorder', { orderid: dataid }, res => {
              if (res.status == 0) {
                this.triggerEvent("confirmEvent");
              }
              else{
                wx.showModal({
                  content: res.msg,
                  showCancel: false
                });
              }
            })
          }
        }
      })
    }
  }
})
