// pages/me/wode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roles:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查询用户当前身份
    wx.request({
      url: app.globalData.appUrl + 'WXLoginStatus/findUserRoles?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询用户的身份信息：")
        console.info(res.data.UserRoles)
        that.setData({
          roles: res.data.UserRoles
        })
      }
    })
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
  onShareAppMessage: function () {
    return {
      imageUrl: app.globalData.shareImg
    }
  },
  // 会员
  member: function(){
    wx.navigateTo({
      url: '/pages/me/member?roles='+this.data.roles,
    })
  },
  // 联系
  contact: function(){
    wx.makePhoneCall({
      phoneNumber: '13688886666'
    })
  },
  //反馈
  fankui: function(){
    wx.navigateTo({
      url: '/pages/me/fankui',
    })
  },
  about: function(){
    wx.navigateTo({
      url: '/pages/me/about',
    })
  },
  more: function(){
    wx.navigateTo({
      url: '/pages/me/more',
    })
  },
  collect: function(){
    wx.navigateTo({
      url: '/pages/me/shoucang',
    })
  },
  fa: function(){
    wx.navigateTo({
      url: '/pages/me/fa/login',
    })
  },
  jie: function () {
    wx.navigateTo({
      url: '/pages/me/jie/login',
    })
  }
})