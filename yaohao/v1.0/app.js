//app.js
// import { wxapi } from "plugins/wxapi";
import { userApi } from "pages/api/userApi";

App({
  // API请求host
  apiHost: 'https://item.diandong.com',
  // 静态资源域名
  imgHost: 'http://i2.dd-img.com',
  // 接口调试模式，true:无缓存   false:有缓存
  apiDebug: false,
  // 缓存失效时间，单位秒
  expireTime: 3600,
  // 默认城市
  city: { cityId: 1101, cityName: '北京市' },
  // 微信授权状态
  accredit: false,
  // 系统环境信息
  system: {},
  /**
   * 全局变量，可使用getApp().globalData调用
   */
  globalData: {
    // 是否手机号认证
    has_mobile: false,
    // 用户登录信息
    userInfo: null,
    // 所在城市
    city: {}
  },
  // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function (e, that) {
    // 获取手机系统信息
    this.system = wx.getSystemInfoSync();

  },

  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function (opts) {
    // 用户授权获取登录信息
    this.userApi = new userApi(this);
    this.userApi.wxlogin();
  },

  /**
   * 设置登录信息
   */
  setLoginInfo: function (loginInfo) {
    var that = this;
    that.globalData.userInfo = loginInfo;
    // 手机号校验
    if (typeof (loginInfo.mobile) != 'undefined' && loginInfo.mobile.length == 11) {
      that.globalData.has_mobile = 1;
    }
  },

  /**
   * 获取当前用户登录信息
   */
  getLoginInfo: function () {
    var that = this;
    return that.globalData.userInfo;
  },

  /**
   * 手机号是否已校验
   */
  has_mobile: function () {
    var that = this;
    return that.globalData.has_mobile;
  }
});