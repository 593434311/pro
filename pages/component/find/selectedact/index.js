// pages/component/find/selectedact/index.js
Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  data: {
  },
  methods: {
    godainst(e){
      wx.navigateTo({
        url: `/pages/find/articledetails/index?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
