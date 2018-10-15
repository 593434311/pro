// pages/component/Offered/Offered.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    Surplus:{
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          Surplus: newVal 
        })
      }
    },
    state:{
      type: Number,
      value: null
    },
    issere: {
      type: String,
      value: ''
    },
    isSurplus:{
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    Surplus:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    godetails(e){
      if (!this.data.isSurplus){
        if (!this.data.state) {
          const data = this.data.Surplus.id
          wx.navigateTo({
            url: `/pages/details/Joindeta/index?actid=${data}&nomny=${this.data.issere}`,
          })
        }
      }
    }
  }
})
