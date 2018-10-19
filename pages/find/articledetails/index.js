// pages/find/articledetails/index.js
var WxParse = require('../../../wxParse/wxParse.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodeinfo:{}
  },
  onLoad: function (options) {
    app.RequiseData('note.info.noteinfo', { id: options.id }, res => {// 精选商家
      if (res.status == 0) {
        res.data.u_time = this.fmtDate(res.data.u_time)
        WxParse.wxParse('noteinfo', 'html', res.data.contents, this, 5)
        this.setData({
          nodeinfo: res.data
        })
      }
    })
  },
  fmtDate(obj){
    var date = new Date(Number(obj));
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "." + m.substring(m.length - 2, m.length) + "." + d.substring(d.length - 2, d.length);
  },
  cuitWent(even) {
    var eve = even.currentTarget.dataset
    app.RequiseData('user.info.userDeed', { behavior: eve.behavior, actId: eve.id, type: eve.type }, res => {
      // to doing
    })
    var colloe = this.data.nodeinfo.attribute_num
    if (eve.behavior == 'collect')
      colloe.collect = Number(colloe.collect) + 1
    else colloe.collect = Number(colloe.collect) - 1
    this.data.nodeinfo.user_attribute.collect = !this.data.nodeinfo.user_attribute.collect
    this.setData({
      nodeinfo: this.data.nodeinfo
    })
  }
})