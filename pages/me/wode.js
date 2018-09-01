// pages/me/wode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户是否填写商家信息
    Info:true,
    //用户是否注册
    Reg:true,
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
    //查询用户是否填写买家商家账号信息start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerInfo/findUserRegAndInfo?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面查询用户是否填写商家信息：")
        console.info(res.data)
        that.setData({
          Info: res.data.Info,
          Reg: res.data.Reg,
        })
      }
    })
    //查询用户是否填写买家商家账号信息end
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
    return {
      imageUrl: app.globalData.shareImg,
    }
  },
  // 会员
  member: function(){
    wx.navigateTo({
      url: '/pages/me/member?roles=' + app.globalData.UserRoles,
    })
  },
  // 联系
  contact: function(){
    wx.makePhoneCall({
      phoneNumber: '021-57630970'
    })
  },
  //反馈
  fankui: function(){
    wx.navigateTo({
      url: '/pages/me/fankui',
    })
  },
  about: function(){
    wx.navigateTo({
      url: '/pages/me/about',
    })
  },
  more: function(){
    wx.navigateTo({
      url: '/pages/me/more',
    })
  },
  collect: function(){
    wx.navigateTo({
      url: '/pages/me/shoucang?roles=' + app.globalData.UserRoles,
    })
  },
  //我要发广告
  fa: function(){
    var roles = app.globalData.UserRoles;
    var Info = this.data.Info;
    var Reg = this.data.Reg;

    //根据用户身份状态判断跳转页面
    if(roles == 0){
      //用户游客状态了，判断用户填写信息
      if (Reg == true && Info == true){
        //信息全部填写完整，进入登陆页面
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      } else if (Reg == true && Info == false){
        //注册但没填写信息
        wx.navigateTo({
          url: '/pages/me/fa/zhuceSuccess',
        })
      } else if (Reg == false && Info == false){
        //没有注册，没有填写信息
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      }
    }else if(roles == 1){
      //用户登陆发广告状态
      wx.navigateTo({
        url: '/pages/me/fa/gongzuotai',
      })
    } else if (roles == 2){
      //用户登陆接广告身份
      wx.navigateTo({
        url: '/pages/me/fa/login',
      })
    }
  },
  //我要接广告
  jie: function () {
    wx.navigateTo({
      url: '/pages/me/jie/login?roles=' + app.globalData.UserRoles,
    })
  }
})