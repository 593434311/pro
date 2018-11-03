var md5 = require('md5.js')
var bas64 = require('bas64.js')
var api_url = 'https://test.gtdysd.com/Rest/business/';
var appid = 1000;
var _timestamp;
function appRequest(methods, data, callback, errFun) {
  _timestamp = Math.round(new Date().getTime() / 1000).toString();
  var data = data;
  var sign = api(data, methods, _timestamp);
  var keyname = '';
  data.v = '1.0'
  data.method = methods
  data.appid = appid
  data.uuid = 'webseaver_crm'
  data.platform = 'web'
  data._timestamp = _timestamp
  data.sign = sign
  Object.keys(data).forEach(function (key) {
    keyname += key + '=' + data[key] + '&';
  });
  var header = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  if (wx.getStorageSync('to-ken')){
    header['user-token'] = wx.getStorageSync('to-ken')
  }
  wx.request({
    url: api_url, // api接口地址请求
    method: 'POST', //
    header: header,
    dataType: 'json',
    data: keyname,
    success: function (res) {
      if (res.data.status == '299') wx.removeStorage({ key: 'to-ken'});
      callback(res.data);
    },
    fail: function (err) {
      errFun(err);
    }
  })
}
function api(data, method, timestamp){
  var request_data = [];
  request_data['v'] = '1.0';
  request_data['appid'] = appid;
  request_data['method'] = method;
  request_data['uuid'] = "webseaver_crm";
  request_data['platform'] = "web";
  request_data['_timestamp'] = timestamp;
  if (method == "login.login.bannerlist" || method == "activity.actor.actlist" || method == "activity.index.actlist" || method == "shop.info.shoplist" || method == "note.info.notelist" || method =="login.login.bannerinfo"){
    data.trade = wx.getStorageSync('region') || 2; // 不同地区的小程序
  }
  for (var d in data) {
    request_data[d] = data[d];
  }
  return signature(request_data);
}
function objKeySort(obj) { // 排序的函数
  var newkey = Object.keys(obj).sort();
  var newObj = {}; // 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; // 返回排好序的新对象
}
function signature(data) {
  var client_secret = 'ca9c2e74e96c3d65c5b956f0770194ca';
  var ret = [];
  ret = objKeySort(data)
  var sign_str = "";
  for (var d in ret) {
    var k = d;
    var v = ret[d];
    sign_str += k + v
  }
  sign_str += client_secret
  return md5.hexMD5(sign_str)
}
function setuserinfo(data, Callback){ 
  appRequest('user.info.saveinfo', { nickname: encodeURIComponent(data.nickName), avatar: encodeURIComponent(data.avatarUrl), gender: data.gender, inviter_id: data.inviter_id }, res => {
    Callback(res)
  })
}
function setPhone(data, Callback) {
  appRequest('login.login.getphone', { ivcode: encodeURIComponent(data.iv), encrystr: encodeURIComponent(data.str) }, res => {
    Callback(res)
  })

}
module.exports = {
  request: appRequest,
  setuserinfo: setuserinfo,
  setPhone: setPhone
}  