// pages/details/index/index.js
const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js')
Page({
  data: {
    imgUrls: [],
    duration: 200,
    indicatorDots: true,
    autoplay: true,
    act_info: [],
    act_list: [],
    user_info: [],
    getPhNumber: false,
    inviter_id: '' // 邀请人 
    // getPhNumber: 'getPhoneNumber'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inviter_id: options.userid  || ''
    })
    wx.showLoading({
      title: '加载中...',
    })
    app.RequiseData('activity.actor.actinfo', { id: options.id }, res => {
      if(res.status === 0){
        WxParse.wxParse('article', 'html', res.data.act_info.info, this, 5)
        this.setData({
          imgUrls: res.data.act_info.img_list,
          act_info: res.data.act_info,
          act_list: res.data.act_list,
          user_info: res.data.user_info
        })
      }
      wx.hideLoading()
    })
    wx.getSetting({
      success:res =>{
        // console.log(res)
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  bindGetUserInfo(e){
    wx.showToast({ title: '请稍后...', icon: 'loading'});
    if(!app.globalData.user_info){ // 判断本地是否有数据
      app.setuserinfo(e.detail.rawData, res =>{
        if(res.status === 0){
          this.orderdown(e.currentTarget.dataset)
        }
      })
    } else this.orderdown(e.currentTarget.dataset)
  },
  orderdown(ty){
    app.RequiseData('activity.index.openact', 
      { act_id: this.data.act_info.act_id, target_user_id: ty.type ? this.data.act_info.user_id : '', inviter_id: this.data.inviter_id }, res => {
      wx.hideToast();
      if(res.status === 0){
        wx.navigateTo({
          url: `/pages/personal/unpaid/unpaid?older=${res.data}`
        })
      }else if(res.status === 203){
        wx.showModal({
          content: res.msg,
          showCancel: false,
          success: resa => {
            if (resa.confirm) {
              this.onLoad(this.options)
            }
          }
        });
      }else{
        wx.showModal({
          content: res.msg,
          showCancel: false
        });
      }
    })
  },
  gogrolpdet() {
    wx.navigateTo({
      url: `/pages/details/othergro/index?data=${JSON.stringify(this.data.act_list)}`,
    })
  },
  gobusiness(self){
    wx.navigateTo({
      url: `/pages/details/business/index?id=${self.currentTarget.dataset.ids}`,
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
  imgYu(event) {
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

  }
})