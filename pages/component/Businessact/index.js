// pages/component/Businessact/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { // 热门活动
    listdata: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(self) {
      wx.navigateTo({
        url: `/pages/details/actideails/index?id=${self.currentTarget.dataset.id}`,
      })
    }
  }
})
