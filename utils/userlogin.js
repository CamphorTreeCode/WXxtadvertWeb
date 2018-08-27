
function login(that) {
  wx.login({
    success: function (res) {
      console.log(res)
      var jscode = res.code
      wx.getUserInfo({
        success: function (res) {
          var app = getApp()
          console.log(res)
          var WeChatUser = res.userInfo

          getOpenid()
          var openid = wx.getStorageSync('openid')
          WeChatUser.openId = openid
          wx.request({
            url: app.globalData.appUrl + 'WXWeChatUser/addWeChatUser', //仅为示例，并非真实的接口地址
            data: WeChatUser,
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            method: "post",
            success: function (res) {
              console.log(res)
            }
          })
        }
      })

    }
  })
  /**传用户数据 */
}

//获取openid
function getOpenid() {
  // 登录
  wx.login({
    success: res => {
      var app = getApp()
      try {
        var value = wx.getStorageSync('openid')
        console.info(res.code)
        if (value) {

        } else {
          wx.request({
            url: app.globalData.appUrl + 'WXWeChatUser/getOpenid', //仅为示例，并非真实的接口地址
            data: { jscode: res.code },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded',// 默认值
              //'content-type': 'application/json', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            success: function (res) {
              console.log(res)
              var that = this;

              try {
                wx.setStorageSync('openid', res.data.openId);
                app.globalData.openid = res.data.openId
              } catch (e) {
              }
            }

          })
        }
      } catch (e) {
        // Do something when catch error
      }


    }
  })
}

module.exports = {
  login: login,
  getOpenid: getOpenid,
}
