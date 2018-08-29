// pages/me/fankui.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "true",
    tankuang: false,
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
  testSubmit: function(e){
    console.info(e)

    var bu = true;
    //表单验证
    if (e.detail.value.feedBackDetails == '') {
      bu = false;
      wx.showToast({
        title: '请填写反馈内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          var openId = app.returnOpenId();
          var feedBackDetails = e.detail.value.feedBackDetails;
          var formId = e.detail.formId;
          wx.request({
            url: app.globalData.appUrl + 'WXFeedBack/addFeedBackMsg',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            data: {
              openId: openId,
              feedBackDetails: feedBackDetails,
              formId:formId
            },
            success: function (res) {
              console.info(res)
            }
          })
        }
      })
    }
    if (bu) {
      this.setData({
        tankuang: true,
        show: false
      })
      setTimeout(function () {
        console.info("*********************")
        wx.reLaunch({
          url: '/pages/me/wode',
        })
      }, 1000)
    }
  }
})