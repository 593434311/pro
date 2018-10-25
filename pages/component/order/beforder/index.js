// pages/component/order/beforder/index.js
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
    },
    gobusiness(self) {
      wx.navigateTo({
        url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`
      })
    },
    dedlorder(e) {
      var dataid = this.data.data.order_id
      wx.showModal({
        title: '提示',
        content: '确定要取消该订单吗？',
        success:  res => {
          if (res.confirm) {
            app.RequiseData('order.index.canorder', { orderid: dataid }, res => {
              if(res.status == 0){
                this.triggerEvent("confirmEvent");
              }else{
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
