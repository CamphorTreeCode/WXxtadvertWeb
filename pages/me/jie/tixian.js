// pages/me/jie/tixian.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    //卖家余额
    balance: '',
    //提现金额
    withdrawAll:'',
    //用户的提现金额
    tixianMoney:'',
    //模板消息id
    formId:'',
    //卖家账号id
    sellerAccountId:'',
    //卖家商户id
    sellerInfoId:'',
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
    //查询卖家金额统计start
    wx.request({
      url: app.globalData.appUrl + 'WXSellerAccount/amountStatistical',
      data: {
        openid: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是查询卖家金额统计信息：")
        console.info(res)
        that.setData({
          balance: res.data.balance,
        })
      }
    })
    //查询卖家金额统计end

    //查询卖家账号信息start
    wx.request({
      url: app.globalData.appUrl + 'WXWithdrawMoney/findSellerAccountMsg',
      data: {
        openId: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是查询卖家账号信息：")
        console.info(res)
        that.setData({
          sellerAccountId: res.data.sellerAccountId,
        })
      }
    })
    //查询卖家账号信息end

    //查询卖家商户信息start
    wx.request({
      url: app.globalData.appUrl + 'WXWithdrawMoney/findSellerInfoMsg',
      data: {
        openId: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      method: 'get',
      success: function (res) {
        console.info("下面是查询卖家商户信息：")
        console.info(res)
        that.setData({
          sellerInfoId: res.data.sellerInfoId,
        })
      }
    })
    //查询卖家商户信息end
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

  //获取用户输入提现金额
  TX: function (e) {
    this.setData({
      withdrawAll: e.detail.value
    })
    console.info("获取用户输入金额:" + this.data.withdrawAll)
  },

  //点击全部提现,显示全部余额
  withdraw:function(){
    this.setData({
      withdrawAll:this.data.balance,
    })
    console.info("全部提现金额:" + this.data.withdrawAll)
  },

  //点击显示提现弹框
  formSubmit: function(e){
    console.info(e)
    var that = this;
    var tixianMoney = e.detail.value.tixianMoney;
    console.info("提现弹框:" + e.detail.value.tixianMoney)

    if (tixianMoney == ''){
      wx.showToast({
        title: '请填写提现金额',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (tixianMoney == 0) {
      wx.showToast({
        title: '提现金额不能为0',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (tixianMoney > that.data.balance){
      wx.showToast({
        title: '提现金额大于您的余额',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      this.setData({
        state: true,
        tixianMoney: tixianMoney,
      })
    }
  },

  //点击取消，隐藏提现按钮
  quxiao: function(){
    this.setData({
      state: false
    })
  },

  //确认提现按钮
  tixian: function(e){
    console.info(e)
    var that = this;
    var tixianMoney = that.data.tixianMoney;
    console.info(tixianMoney)
    var withdrawMoney = e.detail.value;
    withdrawMoney.openId = app.returnOpenId();
    withdrawMoney.formId = e.detail.formId;
    withdrawMoney.withdrawPassword = e.detail.value.withdrawPassword;
    withdrawMoney.withdrawMoney = that.data.tixianMoney;
    withdrawMoney.sellerInfoId = that.data.sellerInfoId;
    withdrawMoney.sellerAccountId = that.data.sellerAccountId;
    console.info(withdrawMoney)

    if (e.detail.value.withdrawPassword == ''){
      wx.showToast({
        title: '请输入提现密码',
        icon: 'none',
        duration: 1000
      })
    }else{

      //用户提现start
      wx.request({
        url: app.globalData.appUrl + 'WXWithdrawMoney/sellerWithdrawMoney',
        data: withdrawMoney,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        method: 'get',
        success: function (res) {
          console.info("下面是用户提现返回的信息：")
          console.info(res)
          if (res.data.addSellerWithdrawMoney == true) {
            wx.showToast({
              title: '提交审核成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/me/jie/gongzuotai',
              })
            }, 1000)
          } else if (res.data.withdrawPassword == false) {
            wx.showToast({
              title: '密码错误，请重新输入',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    //用户提现end
    }
  }
})