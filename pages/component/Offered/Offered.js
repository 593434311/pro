// pages/component/Offered/Offered.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {      // 属性名
      type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {}    // 属性初始值（可选），如果未指定则会根据类型选择一个
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
      if (!this.data.state){
        const data = JSON.stringify(e.currentTarget.dataset.data)
        const jondata = JSON.stringify(e.currentTarget.dataset.jondata)
        const Surplus = JSON.stringify(this.data.Surplus)
        wx.navigateTo({
          url: `/pages/details/Joindeta/index?data=${data}&joundata=${jondata}&Surplus=${Surplus}`,
        })
      }
    }
  }
})
