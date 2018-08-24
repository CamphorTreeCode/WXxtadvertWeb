// pages/me/fa/chongzhi.js
import PayUtils from '../../../utils/PayUtils.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options.page)
    this.setData({
      page: options.page
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
  
  },

  chongzhi: function(){
    console.info(this.data.page)
    if (this.data.page=="GZT") {
      //工作台充值
      wx.request({
        url: app.globalData.appUrl + 'WXBuyerAccount/RechargeBalance',
        data: {
          openId: "oBfPD5HiCQxV7UteHr1BeGbpqTXs",
          total_fee: 1,
          body: "享投发广告余额充值"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        method: 'get',
        success: function (res) {

          console.info(res)

          PayUtils(
            res.data.prepay_id.prepay_id,
            app.globalData.appUrl + "WXBuyerAccount/addRechargeBalance",
            { openId: "oBfPD5HiCQxV7UteHr1BeGbpqTXs", total_fee: 1 },
            "/pages/me/fa/gongzuotai"
          );

        }
      })
    }

    
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //   },
    //   'fail': function (res) {
    //   }
    // })
  }
})