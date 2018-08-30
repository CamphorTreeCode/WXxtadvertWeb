// pages/vipbanner/vipbanner.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ActivityMemberLevel:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //活动会员信息start
    wx.request({
      url: app.globalData.appUrl + 'WXActivityMemberLevel/findAllActivityMemberLevel',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询活动会员信息：")
        console.info(res.data.ActivityMemberLevel)
        that.setData({
          ActivityMemberLevel: res.data.ActivityMemberLevel
        })
      }
    })
    //活动会员end
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
  rush: function() {
    var memberMoney = this.data.ActivityMemberLevel.activityMemberMoney;
    var activityMemberLevelId = this.data.ActivityMemberLevel.activityMemberLevelId;
    wx.navigateTo({
      url: '../me/fa/chongzhi?memberMoney=' + memberMoney + '&dis=disabled' + '&page=HuoDong' + '&activityMemberLevelId=' + activityMemberLevelId
    })
  }
})