// pages/me/fa/wangji.js
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
    //用户输入的手机号
    phoneNo: "",
    //用户输入的确认密码
    matchpwd: "",
    //用户注册信息
    buyerAccount: {},
    //用户获取的验证码
    verificationCode: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  //获取用户输入的确认密码
  Matchpwd: function(e) {
    this.setData({
      matchpwd: e.detail.value
    })
    console.info(e.detail.value)
  },

  //获取用户输的手机号
  shouji: function(e) {
    this.setData({
      phoneNo: e.detail.value
    })
    console.info(e.detail.value)
  },

  //发送验证码
  ma: function() {
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
        wx.request({
          url: app.globalData.appUrl + 'WXBuyerAccount/findphoneNoByopenId',
          data: {
            openId: app.returnOpenId(),
            phoneNo: phoneNo
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function(res) {
            console.info("下面是信息：")
            console.info(res)
            if (res.data.phoneNoRight == false) {
              wx.showToast({
                title: '请输入注册手机号码',
                icon: 'none',
                duration: 1000
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
              var inter = setInterval(function() {
                that.setData({
                  msg: "重新发送(" + this.data.snsMsgWait + ")",
                  snsMsgWait: this.data.snsMsgWait - 1,
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

  //提交重置密码
  formSubmit: function(e) {
    var that = this;
    console.info(e)
    var phoneNo = that.data.phoneNo;
    var verificationCode = e.detail.value.verificationCode;
    var accountPassword = e.detail.value.accountPassword;
    var openId = app.returnOpenId();
    //表单验证
    function check(phoneNo, verificationCode, accountPassword) {
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
          return true;
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
        } else {
          return true;
        }
      }
      if (accountPassword == '') {
        wx.showToast({
          title: '请填写密码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/^.{6,}$/.test(accountPassword)) {
          wx.showToast({
            title: '密码长度最少6位',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          return true;
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
        if (that.data.matchpwd != accountPassword) {
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

    if (check(phoneNo, verificationCode, accountPassword)) {
      //重置密码
      wx.request({
        url: app.globalData.appUrl + 'WXBuyerAccount/resetBuyerAccountPwd',
        data: {
          accountPassword: accountPassword,
          openId: openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          xcxuser_name: "xcxuser_name"
        },
        success: function(res) {
          console.info("下面是注册返回信息：")
          console.info(res)
          if (res.data.SUCCESS == true) {
            //修改成功
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
              }),
              setTimeout(function() {
                wx.navigateTo({
                  url: '/pages/me/fa/login',
                })
              }, 1000)
          }
        }
      })
    }
  },
})