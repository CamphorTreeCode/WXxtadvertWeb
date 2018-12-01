// pages/me/fa/gongzuotai.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否弹框  true：弹框  false:不弹框
    state: false,
    //买家用户账户和商家信息
    BuyerInfo:{},
    //待支付未读数量
    DZFOrder:'',
    //已支付未读数量
    YZFOrder:'',
    //已投放未读数量
    YTFOrder:'',
    //已完成未读数量
    YWCOrder:'',
    //待支付未读数量是否显示
    ShowDZF:true,
    //已支付未读数量是否显示
    ShowYZF:true,
    //已投放未读数量是否显示
    ShowYTF:true,
    //已完成未读数量是否显示
    ShowYWC:true,
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
    var that = this;
    //查询买家商户信息和账户信息start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerInfo/findBuyerInfoAndAccountMsg',
      data: { openId: app.returnOpenId()},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是查询的买家账户和商户信息：")
        console.info(res)
        that.setData({
          BuyerInfo: res.data.BuyerInfo,
        })
        //查询买家订单支付状态start
        wx.request({
          url: app.globalData.appUrl + 'WXOrderList/findBuyerOrderReadState',
          data: { buyerAccountId: res.data.BuyerInfo.buyerAccount.buyerAccountId },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            xcxuser_name: "xcxuser_name"
          },
          method: 'get',
          success: function (res) {
            console.info("下面是查询的买家账户和商户未读信息：")
            console.info(res)
            that.setData({
              DZFOrder: res.data.DZFOrder,
              YZFOrder: res.data.YZFOrder,
              YTFOrder: res.data.YTFOrder,
              YWCOrder: res.data.YWCOrder,
            })
            if (that.data.DZFOrder > 0){
              that.setData({
                ShowDZF:false,
              })
            } else if (that.data.DZFOrder == 0){
              that.setData({
                ShowDZF: true,
              })
            }
            if (that.data.YZFOrder > 0) {
              that.setData({
                ShowYZF: false,
              })
            } else if (that.data.YZFOrder == 0) {
              that.setData({
                ShowYZF: true,
              })
            }
            if (that.data.YTFOrder > 0) {
              that.setData({
                ShowYTF: false,
              })
            } else if (that.data.YTFOrder == 0) {
              that.setData({
                ShowYTF: true,
              })
            }
            if (that.data.YWCOrder > 0) {
              that.setData({
                ShowYWC: false,
              })
            } else if (that.data.YWCOrder == 0) {
              that.setData({
                ShowYWC: true,
              })
            }
          }
        })
    //查询买家订单支付状态end
      }
    })
    //查询买家商户信息和账户信息end

    
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

  //跳转设置商户信息页面
  shezhi: function(){
    wx.navigateTo({
      url: '/pages/me/fa/message',
    })
  },

  //退出登录，显示弹框
  tuichu: function(){
    this.setData({
      state: true
    })
  },

  //隐藏推出登陆弹框
  quxiao: function(){
    this.setData({
      state: false
    })
  },

  //确定退出登陆，返回我的页面
  queding: function(){
    var that = this;
    //用户退出登陆start
    wx.request({
      url: app.globalData.appUrl + 'WXLoginStatus/removeUserLoginStatus',
      data: { openId: app.returnOpenId()},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是用户退出登陆返回的信息：")
        console.info(res)
        if (res.data.Logout == true){
          wx.reLaunch({
            url: '/pages/me/wode',
          })
        } else if (res.data.Logout == false){
          wx.showToast({
            title: '退出失败，请重试。',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
    //用户退出登陆end
  },

  //跳转设置零钱支付密码页面
  mima: function(){
    wx.navigateTo({
      url: '/pages/me/fa/mima',
    })
  },

  //跳转已完成页面
  yiwancheng: function(){
    var buyerAccountId = this.data.BuyerInfo.buyerAccount.buyerAccountId;
    wx.navigateTo({
      url: '/pages/me/fa/yiwancheng?key=ywc' + '&buyerAccountId=' + buyerAccountId,
    })
  },

  //跳转已投放页面
  yitoufang: function(){
    var buyerAccountId = this.data.BuyerInfo.buyerAccount.buyerAccountId;
    wx.navigateTo({
      url: '/pages/me/fa/yitoufang?key=ytf' + '&buyerAccountId=' + buyerAccountId,
    })
  },

  //跳转已支付页面
  yizhifu: function(){
    var buyerAccountId = this.data.BuyerInfo.buyerAccount.buyerAccountId;
    wx.navigateTo({
      url: '/pages/me/fa/yizhifu?key=yzf' + '&buyerAccountId=' + buyerAccountId,
    })
  },

  //跳转待支付页面
  daizhifu: function(){
    var buyerAccountId = this.data.BuyerInfo.buyerAccount.buyerAccountId;
    wx.navigateTo({
      url: '/pages/me/fa/daizhifu?key=dzf' + '&buyerAccountId=' + buyerAccountId,
    })
  },

  //点击充值跳转会员页面
  GZTchongzhi: function(){
    wx.reLaunch({
      url: '/pages/me/member?roles=' + app.globalData.UserRoles,
    })
  },

  //回到首页跳转
  hui: function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})