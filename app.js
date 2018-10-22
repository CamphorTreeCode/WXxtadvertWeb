//app.js
var userLogin = require('/utils/userlogin.js');
App({
  data: {
    userInfo: false
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //查询用户当前身份
    var that = this;
    wx.request({
      url: that.globalData.appUrl + 'WXLoginStatus/findUserRoles?openId=' + that.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询用户的身份信息：")
        console.info(res.data.UserRoles)
        that.globalData.UserRoles = res.data.UserRoles;
      }
    })

  },

  getOpenId: function () {
    console.log("获取opoenid")
    var that = this
    userLogin.getOpenid()
  },
  returnOpenId: function () {
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    if (openid) {
      console.log("有openid")
    } else {
      console.log("沒有openid")
      this.getOpenId();
      openid = wx.getStorageSync('openid')
    }
    return openid
  },

  globalData: {
    shopCarAdvertise:[],
    userInfo: null,
    // appUrl: "http://192.168.2.188/xtadvert/", 
    appUrl: "http://localhost/xtadvert/",
    shareImg:"https://www.chuanshoucs.com/ServerImg/2018-08-03/97086b2d-b18e-4d57-a30d-70e0b8ddeedc.jpg",
    UserRoles:0,
    //收藏的广告位信息
    collectionContent:{},
    //导航栏跳转的lableId
    lableId:0,
  }
})