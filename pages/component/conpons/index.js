// pages/component/conpons/index.js
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
          datalist: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    datalist:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
