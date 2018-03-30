// pages/result/result.js
var app = getApp();//获取应用实例
import { userApi } from "../api/userApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disBoolean: false,
    succBoolean: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.data.args = options;

    // that.data.args = {
    //   apply_code: "0493100468577",
    //   city: "4402",
    //   mobile: "13767182683"
    // }
    console.log(that.data.args);
    that.userApi = new userApi(that);
    that.userApi.query(that.data.args, 'cb_query');
    // that.userApi.isnote(that.data.args, 'cb_isnote');
  },

  cb_isnote: function (res, opt) {
    console.log(res);
    var that = this;
    if (res.code == 0) {
      if (res.message == '已定制') {
        that.setData({
          disBoolean: true,
          succBoolean: true
        })
      }
    }
  },



  cb_query: function (res, opt) {
    var that = this;
    console.log(res);
    if (res.code == 0) {
      if (res.data != '') {
        console.log(res.data.apply_code);
        var codeReal = res.data.apply_code.slice(0, 6) + '***' + res.data.apply_code.slice(10, 13);
        // console.log(codeReal);
        that.data.result = true

        that.setData({
          codeReal: codeReal,
          dataReal: res.data
        })
      } else {
        that.data.result = false
      }
      console.log(that.data.result);
      that.setData({
        result: that.data.result
      })
    } else {

    }
  },

  onMessage: function () {
    var that = this;

    wx.showToast({
      title: '定制中...',
      icon: 'loading'
    });
    that.setData({
      disBoolean: true
    })
    that.userApi.remind(that.data.args, 'cb_remind');
  },

  cb_remind: function (res, opt) {
    var that = this;
    console.log(res);

    if (res.code == 0) {
      wx.showToast({
        title: '定制成功',
        image: '/pages/images/success.png'
      });
      setTimeout(function () {
        that.setData({
          succBoolean: true
        })
      }, 300)

    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    // return {
    //   title: '自定义转发标题',
    //   path: '/pages/result/result',
    //   success: function (res) {
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  }
})