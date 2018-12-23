// pages/details/index/index.js
const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js')
Page({
  data: {
    imgUrls: [],
    duration: 200,
    indicatorDots: true,
    autoplay: true,
    showmask: false,
    act_info: {},
    act_list: {},
    user_info: {},
  },
  onLoad: function (options) {
    this.setData({
      showmask: true
    })
    app.RequiseData('activity.index.actinfo', { id: options.id }, res => {
      this.setData({
        showmask: false
      })
      if(res.status === 0){
        WxParse.wxParse('article', 'html', res.data.act_info.info, this, 5)
　        this.setData({
            imgUrls: res.data.act_info.img_list,
            act_info: res.data.act_info,
            act_list: res.data.act_list,
            user_info: res.data.user_info  ||{}
        })
      }
    })
    
  },
  gogrolpdet(self){
    wx.navigateTo({
      url: `/pages/details/othergro/index?data=${JSON.stringify(self.currentTarget.dataset.data)}`,
    })
  },
  gobusiness(self) {
    wx.navigateTo({
      url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
    })
  },
  bindGetUserInfo: function (e) {
    this.setData({
      showmask: true
    })
    if (!app.globalData.user_info.avatar) { // 判断本地是否有数据
      app.setuserinfo(e.detail.userInfo, res => {
        this.setData({
          showmask: false
        })
        if (res.status === 0) {
          this.setData({
            showmask: true
          })
          this.orderdown(e.currentTarget.dataset)
        }
      })
    } else this.orderdown(e.currentTarget.dataset)
  },
  orderdown(ty) {
    app.RequiseData('activity.index.openact',
      { act_id: this.data.act_info.id, target_user_id: ty.type ? this.data.act_info.user_id : '', inviter_id: '',oid: '' }, res => {
        this.setData({
          showmask: false
        })
        if (res.status === 0) {
          wx.navigateTo({
            url: `/pages/personal/unpaid/unpaid?older=${res.data}`
          })
        } else if (res.status === 203) {
          wx.showModal({
            content: res.msg,
            showCancel: false,
            success: resa => {
              if (resa.confirm) {
                this.onLoad(this.options)
              }
            }
          });
        } else if (res.status === 300) {
          wx.showModal({
            title: '提示',
            content: '您在该活动中有未支付订单, 是否前往支付？',
            confirmText: '前往',
            success(ress) {
              if (ress.confirm) {
                wx.navigateTo({
                  url: `/pages/personal/unpaid/unpaid?older=${res.msg}`
                })
              }
            }
          });
        } else {
          wx.showModal({
            content: res.msg,
            showCancel: false
          });
        }
      })
  },
  click: function (){
    wx.switchTab({
      url: '/pages/index/index',
      success: function () {

      }
    })
  },
  cuitWent(even) {
    var eve = even.currentTarget.dataset
    app.RequiseData('user.info.userDeed', { behavior: eve.behavior, actId: eve.id, type: eve.type }, res => {
      // to doing
    })
    if (eve.behavior == 'collect')
      this.data.act_info.attribute_num.collect = Number(this.data.act_info.attribute_num.collect) + 1
    else this.data.act_info.attribute_num.collect = Number(this.data.act_info.attribute_num.collect) - 1
    this.data.act_info.user_attribute.collect = !this.data.act_info.user_attribute.collect
    this.setData({
      act_info: this.data.act_info
    })
  },
  imgYu(event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    for (var i in imgList) {
      imgList[i] = 'http://gtshidai.oss-cn-shanghai.aliyuncs.com' + imgList[i]
    }
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.act_info.title,
      path: `/pages/details/actideails/index?id=${this.data.act_info.id}&userid=`,
      imageUrl: `http://gtshidai.oss-cn-shanghai.aliyuncs.com${this.data.act_info.cover_img}`
    }
  }
})