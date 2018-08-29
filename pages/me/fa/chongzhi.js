// pages/me/fa/chongzhi.js
var app = getApp()
// var PayUtils = require("../../../utils/PayUtils.js")
import PayUtils from "../../../utils/PayUtils.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    val: '',
    dis: '',
    page:"",
    memberId:"",
    memberMoney:""

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    // var goods = options.goodsId;
    // var dis = options.dis;
    // console.log(options);
    // this.setData({
    //   val: goods,
    //   dis: dis
    // })
  },

  onLoad: function (options) {
    console.info(options)
    this.setData({
      page: options.page,
      memberId: options.memberId,
      memberMoney: options.memberMoney

    })
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
  // chongzhi: function() {
  //   wx.requestPayment({
  //     'timeStamp': '',
  //     'nonceStr': '',
  //     'package': '',
  //     'signType': 'MD5',
  //     'paySign': '',
  //     'success': function(res) {},
  //     'fail': function(res) {}
  //   })

  chongzhi: function(){
    console.info(this.data.page)
    console.info(this.data.memberId)
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
    } else if (this.data.page == "HY"){
      console.info("会员充值")
      //会员充值
      console.info(this.data.page)
      console.info(this.data.memberMoney)
      console.info(app.returnOpenId())
      var memberId = this.data.memberId;
      var openId = app.returnOpenId();
      wx.request({
        url: app.globalData.appUrl + 'WXMemberLevel/rechargeMembershipBalance',
        data: {
          openId: openId,
          total_fee: 1,
          body: "享投会员余额充值",
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
            app.globalData.appUrl + "WXMemberLevel/addRechargeMembershipBalance",
            { openId: openId, total_fee: 5800, memberId: memberId},
            "/pages/me/member"
          );

        }
    })

  }
}
})