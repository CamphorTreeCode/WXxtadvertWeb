// pages/me/fa/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录成功与失败控制
    loginCheck: true,
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
  formSubmit: function(e){
    var that = this;
    console.info(e)
    var accountName = e.detail.value.accountName;
    var accountPassword = e.detail.value.accountPassword;
    //表单验证
    function yanzheng(accountName, accountPassword){
      if (accountName == ''){
        wx.showToast({
          title: '账号名称不能为空',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      if (accountPassword == ''){
        wx.showToast({
          title: '账号密码不能为空',
          icon: 'none',
          duration: 1000
        })
        return false;
      }else{
        return true;
      }
    }
    if (yanzheng(accountName, accountPassword)){
      //验证成功
      if (app.globalData.UserRoles == 2){
        //当前登陆接广告身份
        that.setData({
          tankuang: true
        })
      }else{
        wx.request({
          url: app.globalData.appUrl + 'WXBuyerAccount/buyerAccountLogin',
          data:{
            accountName: accountName,
            accountPassword: accountPassword,
            openId: app.returnOpenId(),
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function (res) {
            console.info("下面是查询登陆信息：")
            console.info(res)
            if (res.data.frozenState == true){
              //账号冻结
              wx.showModal({
                title: '',
                content: '您的账号涉嫌违规操作现已冻结，请联系客服',
                showCancel: false,
                confirmColor: '#FF7B88'
              })
            } else if (res.data.loginCheck == true){
              //登陆成功
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1000
              })
              wx.reLaunch({
                url: '/pages/me/fa/gongzuotai',
              })
            } else if (res.data.loginCheck == false){
              //账号密码错误
              wx.showToast({
                title: '账号密码错误',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
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
  //忘记密码跳转
  wangji: function(){
    wx.navigateTo({
      url: '/pages/me/fa/wangji',
    })
  }
})