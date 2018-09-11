// pages/me/jie/gongzuotai.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否弹框  true：弹框  false:不弹框
    state: false,
    //卖家余额
    balance: '',
    //卖家订单金额
    ordermoney: '',
    //卖家今日收益
    todayIncome: '',
    //卖家总计收益
    totalIncome: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    //查询卖家商户信息start
    wx.request({
      url: app.globalData.appUrl + 'WXSellerInfo/findSellerInfoMsg',
      data: {
        openId: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function(res) {
        console.info("下面是查询的卖家账户和商户信息：")
        console.info(res)
        that.setData({
          SellerInfo: res.data.SellerInfo,
        })
      }
    })
    //查询卖家商户信息end

    //查询卖家金额统计start
    wx.request({
      url: app.globalData.appUrl + 'WXSellerAccount/amountStatistical',
      data: {
        openid: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function(res) {
        console.info("下面是查询卖家金额统计信息：")
        console.info(res)
        that.setData({
          balance: res.data.balance,
          ordermoney: res.data.ordermoney,
          todayIncome: res.data.todayIncome,
          totalIncome: res.data.totalIncome,
        })
      }
    })
    //查询卖家金额统计end
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //退出登录，显示弹框
  tuichu: function() {
    this.setData({
      state: true
    })
  },

  //隐藏推出登陆弹框
  quxiao: function() {
    this.setData({
      state: false
    })
  },

  //确定退出登陆，返回我的页面
  queding: function() {
    var that = this;
    //用户退出登陆start
    wx.request({
      url: app.globalData.appUrl + 'WXLoginStatus/removeUserLoginStatus',
      data: { openId: app.returnOpenId() },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是用户退出登陆返回的信息：")
        console.info(res)
        if (res.data.Logout == true) {
          wx.redirectTo({
            url: '/pages/me/wode',
          })
        } else if (res.data.Logout == false) {
          wx.showToast({
            title: '退出失败，请重试。',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
    //用户退出登陆end
  },

  //跳转提现页面
  tixian: function() {
    wx.navigateTo({
      url: '/pages/me/jie/tixian',
    })
  },

  //跳转设置支付密码
  mima: function() {
    wx.navigateTo({
      url: '/pages/me/jie/mima',
    })
  },

  //回到首页跳转
  hui: function() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})