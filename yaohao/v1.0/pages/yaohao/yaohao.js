// pages/yaohao/yaohao.js
var app = getApp();//获取应用实例
import { userApi } from "../api/userApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录弾层（默认隐藏）
    loginShow: false,
    cityData:[],
    rData:'',
    city: '1101',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.userApi = new userApi(that);
    that.userApi.cityList('cb_cityList');
  },

  cb_cityList: function (res, opt) {
    var that = this;
    console.log(res.data);
    that.data.rData = res.data;

    for (var i = 0; i < that.data.rData.length;i++){
      that.data.cityData.push(that.data.rData[i].city);
    }
    // that.data.cityData=['美国', '中国', '巴西'];
    console.log(that.data.cityData);


    that.setData({
      cityData: that.data.cityData,
      numData: res.data[0]
    })
  },

  bindPickerChange: function (e) {
    console.log(e);
    var that = this;

    console.log(that.data.rData[e.detail.value]);
    that.data.code = e.detail.value
    this.setData({
      index: that.data.code,
      numData: that.data.rData[e.detail.value]
    })
  },

  // 显示登录弾层
  loginTips: function (isshow) {
    var that = this;
    that.data.loginShow = isshow;
    that.setData({ loginShow: that.data.loginShow });
  },

  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.input == '' || e.detail.value.input.trim().length == 0) {
      wx.showToast({
        title: '编码不能为空',
        image: '/pages/images/warning.png'
      });
      return false;
    }

    var num = /^[0-9]{13}$/;
    if (!num.test(e.detail.value.input)) {
      wx.showToast({
        title: '编码为13位数字',
        image: '/pages/images/error.png',
      })
      return false;
    }


    // 登录信息检测
    var loginStatus = that.userApi.checkLogin();
    if (!loginStatus.status) {
      // 已授权显示登录弹窗
      if (loginStatus.promission) {
        that.loginTips(1);
      }
      return false;
    }

    var loginInfo = that.userApi.getLoginInfo();
    
    if (that.data.code){
      that.data.city = that.data.rData[that.data.code].code;
    }


    wx.navigateTo({
      url: '../result/result?city=' + that.data.city + '&apply_code=' + e.detail.value.input + '&mobile=' + loginInfo.mobile,
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
    return {
      title: '新能源车摇号结果订阅查询_电动邦',
      path: '/pages/yaohao/yaohao',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})