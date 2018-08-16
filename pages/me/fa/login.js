// pages/me/fa/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录成功与失败控制
    shenfen: true,
    // 登录失败弹框
    tankuang: false,
    //冻结弹框
    dongjie: false
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
  //登录按钮
  login: function(){
    // 身份正确跳转
    if (this.data.shenfen){
      wx.redirectTo({
        url: '/pages/me/fa/gongzuotai',
      })
    }
      //另外一个身份正在登录，请退出再登录
    if (this.data.tankuang) {
      this.setData({
        tankuang: true
      })
    }
    //账号冻结
    if(this.data.dongjie){
      wx.showModal({
        title: '',
        content: '您的账号涉嫌违规操作现已冻结，请联系客服',
        showCancel: false,
        confirmColor: '#FF7B88'
      })
    }  
  },
  //登录失败弹窗知道了
  zhidao: function(){
    this.setData({
      tankuang: false
    })
  },
  //注册
  zhuce: function(){
    wx.navigateTo({
      url: '/pages/me/fa/zhuce',
    })
  },
  wangji: function(){
    wx.navigateTo({
      url: '/pages/me/fa/wangji',
    })
  }
})