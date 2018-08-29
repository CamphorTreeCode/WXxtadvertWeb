// pages/me/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断是游客还是接广告的
    jie: true,
    // 判断是否是会员
    huiyuan: true,
    //判断余额不足，是否出现弹框
    money: false
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
  chong: function(e){
    console.info(e.target.dataset.index)
    
    wx.navigateTo({
      url: '/pages/me/fa/chongzhi?page=HY&memberId=' + e.target.dataset.index +'&memberMoney='+5800+'',
    })
  },
  sure: function(){
    this.setData({
      money: false
    })
  }
})