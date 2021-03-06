// pages/me/fa/chongzhi.js
var app = getApp()
import PayUtils from "../../../utils/PayUtils.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面显示金额
    val: '',
    //页面金额不能编辑
    dis: '',
    //那个页面进来充值
    page:'',
    //会员id
    memberId:'',
    //活动会员id
    activityMemberLevelId:'',
    //会员展示
    HuiYuan:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.info(options)
    if (options.memberId){
      this.setData({
        val: options.memberMoney,
        dis: options.dis,
        page: options.page,
        memberId: options.memberId,
        YuanJia: options.YuanJia,
        HuiYuan:false,
      })
    }else{
      this.setData({
        val: options.memberMoney,
        dis: options.dis,
        page: options.page,
        activityMemberLevelId: options.activityMemberLevelId,
      })
    }
    
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

  chongzhi: function(){
    // console.info(this.data.page)
    if (this.data.page =="HuoDong") {
      var openId = app.returnOpenId();
      var val = this.data.val;
      var activityMemberLevelId = this.data.activityMemberLevelId;
      //工作台充值
      wx.request({
        url: app.globalData.appUrl + 'WXActivityMemberLevel/rechargeActivityMembershipBalance',
        data: {
          openId: openId,
          total_fee: 1,
          body: "享投发广告活动会员余额充值"
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
            app.globalData.appUrl + "WXActivityMemberLevel/addRechargeActivityMembershipBalance",
            { openId: openId, total_fee: val, activityMemberLevelId: activityMemberLevelId},
            "/pages/index/index"
          );

        }
      })
    } else if (this.data.page == "HY"){
      console.info("会员充值")
      //会员充值
      console.info(this.data.page)
      // console.info(this.data.memberMoney)
      // console.info(app.returnOpenId())
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
            "/pages/me/wode"
          );

        }
    })

  }
}
})