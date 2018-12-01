// pages/me/jie/zhuce.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //验证码默认显示文字
    msg: "获取验证码",
    //验证码倒计时
    snsMsgWait: 60,
     //禁用输入
    buttonClicked: false,
    //控制验证码按钮的背景色
    hasPhone: true,
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

  //已有账号，去登陆
  tiao: function () {
    wx.navigateTo({
      url: '/pages/me/jie/login',
    })
  },

  //获取用户输的手机号
  shouji: function (e) {
    this.setData({
      phoneNo: e.detail.value
    })
    console.info(this.data.phoneNo)
  },

  //获取用户输入的确认密码
  Matchpwd: function (e) {
    this.setData({
      matchpwd: e.detail.value
    })
    console.info(this.data.matchpwd)
  },

  //发送验证码
  ma: function () {
    var that = this;
    var phoneNo = that.data.phoneNo
    console.log(phoneNo);
    //验证手机号
    if (phoneNo == '') {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else{
      if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(phoneNo)) {
        wx.showToast({
          title: '请按照正确联系方式填写',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else{
        //发送验证码start
        that.setData({
          buttonClicked: true,
        })
        wx.request({
          url: app.globalData.appUrl + 'WXSellerAccount/checkSellerPhone',
          data: {
            phoneNo: phoneNo,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function (res) {
            console.info("下面是卖家手机号检测信息：")
            console.info(res.data)
            if (res.data.phoneNoRepeat == true) {
              //手机号重复
              wx.showToast({
                title: '这个手机号已被注册，请更换手机号',
                icon: 'none',
                duration: 1000
              })
              that.setData({
                buttonClicked: false,
              })
            } else if (res.data.phoneNoRepeat == false) {
              //手机号可用,验证码倒计时开始
              that.setData({
                buttonClicked: true,
                verificationCode: res.data.verificationCode,
              })
              wx.showToast({
                title: '发送成功',
                icon: 'success',
                duration: 1000
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

  //提交注册信息
  formSubmit: function (e) {
    var that = this;
    console.info(e)
    var sellerAccount = e.detail.value;
    sellerAccount.openId = app.returnOpenId();
    console.info(sellerAccount)
    console.info(that.data.matchpwd)

    //验证表单
    function yanzheng(sellerAccount) {
      console.log(sellerAccount)
      if (sellerAccount.phoneNo == '') {
        wx.showToast({
          title: '请填写联系电话',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(sellerAccount.phoneNo)) {
          wx.showToast({
            title: '请按照正确联系方式填写',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (sellerAccount.verificationCode == '') {
        wx.showToast({
          title: '请填写验证码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (that.data.verificationCode != sellerAccount.verificationCode) {
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (sellerAccount.accountName == '') {
        wx.showToast({
          title: '请填写账号名称',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(sellerAccount.accountName)) {
          wx.showToast({
            title: '账号名称:数字与字母混合，最少六位',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
      }
      if (sellerAccount.accountPassword == '') {
        wx.showToast({
          title: '请填写密码',
          icon: 'none',
          duration: 1000
        })
        return false;
      } else {
        if (!/^.{6,}$/.test(sellerAccount.accountPassword)) {
          wx.showToast({
            title: '密码长度最少6位',
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
        if (that.data.matchpwd != sellerAccount.accountPassword) {
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

    //验证通过
    if (yanzheng(sellerAccount)) {
      console.info("验证成功")
      wx.request({
        url: app.globalData.appUrl + 'WXSellerAccount/addSellerAccountMsg',
        data: sellerAccount,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info("下面是注册返回信息：")
          console.info(res)
          if (res.data.AccountNameRepeat == true) {
            wx.showToast({
              title: '您输入的用户名重复',
              icon: 'none',
              duration: 1000
            })
          } else if (res.data.AllRight == true) {
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            })
            wx.navigateTo({
              url: '/pages/me/jie/zhuceSuccess',
            })
          }
        }
      })
    }
  },
 
})