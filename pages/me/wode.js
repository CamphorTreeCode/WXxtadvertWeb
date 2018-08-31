// pages/me/wode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户是否填写商家信息
    IsBuyerInfo:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    //查询用户是否填写商家信息start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerInfo/findBuyerInfoCount?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面查询用户是否填写商家信息：")
        console.info(res.data)
        that.setData({
          IsBuyerInfo: res.data.BuyerInfo,
        })
      }
    })
    //查询用户是否填写商家信息end
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
      imageUrl: app.globalData.shareImg,
    }
  },
  // 会员
  member: function(){
    wx.navigateTo({
      url: '/pages/me/member?roles=' + app.globalData.UserRoles,
    })
  },
  // 联系
  contact: function(){
    wx.makePhoneCall({
      phoneNumber: '021-57630970'
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
      url: '/pages/me/shoucang?roles=' + app.globalData.UserRoles,
    })
  },
  //我要发广告
  fa: function(){
    //判断用户身份状态
    if (this.data.IsBuyerInfo == true){
      //信息填写
      wx.navigateTo({
        url: '/pages/me/fa/login?roles=' + app.globalData.UserRoles,
      })
    } else if (this.data.IsBuyerInfo == false){
      //信息没有填写
      wx.navigateTo({
        url: '/pages/me/fa/zhuceSuccess',
      })
    }
   
  },
  //我要接广告
  jie: function () {
    wx.navigateTo({
      url: '/pages/me/jie/login?roles=' + app.globalData.UserRoles,
    })
  }
})