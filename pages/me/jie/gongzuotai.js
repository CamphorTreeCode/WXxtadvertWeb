// pages/me/jie/gongzuotai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "https://www.chuanshoucs.com/ServerImg/2018-08-02/d68c37b7-c420-42ee-ad39-8a32fd787e76.png",
    name: "永辉超市",
    state: false
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
  
  },
  tuichu: function () {
    this.setData({
      state: true
    })
  },
  quxiao: function () {
    this.setData({
      state: false
    })
  },
  queding: function () {
    wx.redirectTo({
      url: '/pages/me/wode',
    })
  },
  tixian: function () {
    wx.navigateTo({
      url: '/pages/me/jie/tixian',
    })
  },
  mima: function(){
    wx.navigateTo({
      url: '/pages/me/jie/mima',
    })
  },
  hui: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})