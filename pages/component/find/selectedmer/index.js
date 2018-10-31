// pages/component/find/selectedmer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    imgYu(event){
      console.log(event)
      var src = event.currentTarget.dataset.src;//获取data-src
      var imgList = event.currentTarget.dataset.list;//获取data-list
      for (var i in imgList){
        imgList[i] = 'http://gtshidai.oss-cn-shanghai.aliyuncs.com' + imgList[i]
      }
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
    gobusin(self){
      wx.navigateTo({
        url: `/pages/details/business/index?id=${self.currentTarget.dataset.id}`,
      })
    }
  }
})
