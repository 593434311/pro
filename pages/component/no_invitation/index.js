// pages/component/no_invitation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    state: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          befoimg: this.data.imglist[Number(newVal)]
        })
      }
    },
    text: {
      type: String,
      value: ''
    },
    isbutton: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    imglist: ['zwdd@2x.png', 'zwhd@2x.png', 'zwsc@2x.png', 'zwxx@2x.png'],
    befoimg: 'zwdd@2x.png'

  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
