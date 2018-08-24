// pages/Settlement/Settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:false,
      flage:false 
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
  // 支付成功跳转
  payment:function(){
    this.data.flag = !this.data.flag;
    this.setData({
      flag: this.data.flag
    })
  },
  close:function(){
    this.setData({
      flag: false
    })
  },
  quxiao:function(){
    this.setData({
      flage: false
    })
  },
  Smallchange:function(){
    this.setData({
      flag: false,
      flage: true
    })
  }
})
