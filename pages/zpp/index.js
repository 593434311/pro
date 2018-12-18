Page({
  data: {
    testData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    showData: [],
    startPage: 0
  },

  onLoad() {
    if (this.data.testData.length) {
      this.getData()
    }
  },

  handleClick: function () {
    var startPage = this.data.startPage + 3
    if (startPage < this.data.testData.length) {
      this.setData({
        startPage: startPage
      })
      this.getData()
    }
  },

  getData: function () {
    var showData = this.data.testData.slice(this.data.startPage, this.data.startPage + 3)
    this.setData({
      showData: showData
    })
  }

  // data: {
  //   list: ["list0", "list1", "list2", "list3", "list4", "list5", "list6", "list7", "list8", "list9", "list10", "list11", "list12", "list13", "list14", "list15", "list16", "list17", "list18", "list19", "list20", "list21", "list22", "list23", "list24", "list25", "list26", "list27", "list28", "list29"],
  //   toView: 'eeede'
  // },

  // jumpTo: function (e) {
  //   // 获取标签元素上自定义的 data-opt 属性的值
  //   let target = e.currentTarget.dataset.opt;
  //   this.setData({
  //     toView: target
  //   })
  // }
})