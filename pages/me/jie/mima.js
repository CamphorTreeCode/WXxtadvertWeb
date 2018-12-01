// pages/me/jie/mima.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发送验证码背景色
    hasPhone: true,
    //禁用输入
    buttonClicked: false,
    //验证码初始显示文字
    msg: '获取验证码',
    //验证码倒计时
    snsMsgWait: 60,
    //用户输入的验证码
    matchpwd: '',
    //用户输入的手机号
    phoneNo: '',
    //用户收到的验证码
    verificationCode: '',
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

  //获取用户手机号
  shouji: function (e) {
    this.setData({
      phoneNo: e.detail.value
    })
    console.info(this.data.phoneNo)
  },

  //获取用户输入验证码
  Matchpwd: function (e) {
    this.setData({
      matchpwd: e.detail.value
    })
    console.info(this.data.matchpwd)
  },

  //发送验证码
  ma: function () {
    var that = this;
    var phoneNo = that.data.phoneNo;
    //验证手机号
    if (phoneNo == '') {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(phoneNo)) {
        wx.showToast({
          title: '请按照正确联系方式填写',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        //发送验证码start
        that.setData({
          buttonClicked: true,
        })
        console.info("发送验证码")
        wx.request({
          url: app.globalData.appUrl + 'WXSellerAccount/findphoneNoByopenId',
          data: {
            openId: app.returnOpenId(),
            phoneNo: phoneNo
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function (res) {
            console.info("下面是信息：")
            console.info(res)
            if (res.data.phoneNoRight == false) {
              wx.showToast({
                title: '请输入注册手机号码',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                buttonClicked: false,
              })
            } else if (res.data.phoneNoRight == true) {
              wx.showToast({
                title: '发送成功',
                icon: 'success',
                duration: 1000
              })
              //倒计时开始
              that.setData({
                buttonClicked: true,
                verificationCode: res.data.verificationCode,
              })
              var inter = setInterval(function () {
                that.setData({
                  msg: "重新发送(" + that.data.snsMsgWait + ")",
                  snsMsgWait: that.data.snsMsgWait - 1,
                  hasPhone: false,
                });
                if (that.data.snsMsgWait < 0) {
                  clearInterval(inter)
                  that.setData({
                    msg: "获取验证码",
                    snsMsgWait: 60,
                    hasPhone: true,
                    buttonClicked: false
                  });
                }
              }.bind(that), 1000);
            }
          }
        })
        //发送验证码end
      }
    }
  },

  //提交设置提现密码
  formSubmit: function (e) {
    console.info(e)
    var that = this;
    var openId = app.returnOpenId();
    var phoneNo = that.data.phoneNo;
    var verificationCode = e.detail.value.verificationCode;
    var withdrawPassword = e.detail.value.withdrawPassword;

    //表单验证
    function check(phoneNo, verificationCode, withdrawPassword) {
      if (phoneNo == '') {
        wx.showToast({
          title: '请填写联系电话',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(phoneNo)) {
          wx.showToast({
            title: '请按照正确联系方式填写',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (verificationCode == '') {
        wx.showToast({
          title: '请填写验证码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (verificationCode != that.data.verificationCode) {
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (withdrawPassword == '') {
        wx.showToast({
          title: '请填写密码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/^\d{6}$/.test(withdrawPassword)) {
          wx.showToast({
            title: '密码为长度为6的纯数字',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (that.data.matchpwd == '') {
        wx.showToast({
          title: '请填写确认密码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (that.data.matchpwd != withdrawPassword) {
          wx.showToast({
            title: '两次密码输入不一致',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          return true;
        }
      }
    }

    if (check(phoneNo, verificationCode, withdrawPassword)) {
      //设置支付密码
      wx.request({
        url: app.globalData.appUrl + 'WXSellerAccount/modifySellerAccountWithdrawPassword',
        data: {
          withdrawPassword: withdrawPassword,
          openId: openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info("下面是设置支付密码信息：")
          console.info(res)
          if (res.data.SUCCESS == true) {
            //修改成功
            wx.showToast({
              title: '密码设置成功',
              icon: 'success',
              duration: 1000
            }),
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/me/jie/gongzuotai',
                })
              }, 1000)
          }
        }
      })
    }
  },
})