// pages/component/unpaid_invt/index.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: { // 即将成团
    item: {
      type: Object,
      value: {},
      observer: (newVal, oldVal, changedPath) => {
        this.setData({
          data: newVal
        })
        // this.tuantimeOut(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {
      is_invit: false,
      invit_num: 0,
      chooseSize: false,
      animationData: {},
      is_val:""
    },
  },
  methods: {
    voteuser(e) {
      var is_val = e.detail.value;
      var val_num = e.detail.cursor;
      this.setData({
        invit_num: val_num,
        is_val: is_val
      })
    },
    name_focus(){
      this.setData({
        is_invit: false,
      })
    },
    go_talk(e) {
      if (this.data.is_val) {
        app.RequiseData('user.info.iscode', { invite_code: this.data.is_val }, res => {
          if (res.status === 0) {
            this.triggerEvent("action", this.data.is_val);
          } else {
            this.setData({
              is_invit: true,
            })
          }
        })
      } 
    },
  }
})
