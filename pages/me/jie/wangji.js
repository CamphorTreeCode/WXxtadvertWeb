// pages/me/jie/wangji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    hasPhone: true,
    buttonClicked: false,
    msg: "获取验证码",
    snsMsgWait: 60
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
  tijiao: function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    }),
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/me/jie/login',
      })
    }, 1000)
  },
  ma: function(){
    var inter = setInterval(function () {
      this.setData({
        msg: "重新发送(" + this.data.snsMsgWait + ")",
        snsMsgWait: this.data.snsMsgWait - 1,
        hasPhone: false,
        buttonClicked: true
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          msg: "获取验证码",
          snsMsgWait: 60,
          hasPhone: true,
          buttonClicked: false
        });
      }
    }.bind(this), 1000);
  }
})