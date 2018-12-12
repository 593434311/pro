// pages/component/unpaid_invt/index.js

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
      if (this.data.invit_num > 6 || this.data.invit_num < 6) {
        this.setData({
          is_invit: true,
        })
        
      } else {
        this.setData({
          is_invit: false,
        })
        this.triggerEvent("action", this.data.is_val);
      }



    },

    
    
  }
})
