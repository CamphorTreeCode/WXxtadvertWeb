// pages/me/wode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //买家用户是否填写商家信息
    Info: true,
    //买家用户是否注册
    Reg: true,
    //买家用户商户信息是否审核通过
    BuyerInfoState: true,

    //卖家用户是否填写商家信息
    SellerInfo: true,
    //卖家用户是否注册
    SellerReg: true,
    //卖家用户商户信息是否审核通过
    SellerInfoState: true,
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
    var that = this;
    //查询用户是否填写买家商家账号信息start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerInfo/findUserRegAndInfo?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面查询买家用户是否填写商家信息：")
        console.info(res.data)
        if (res.data.BuyerInfoState == true || res.data.BuyerInfoState == false) {
          that.setData({
            Info: res.data.Info,
            Reg: res.data.Reg,
            BuyerInfoState: res.data.BuyerInfoState,
          })
        } else if (res.data.BuyerInfoState == 2){
          that.setData({
            Info: res.data.Info,
            Reg: res.data.Reg,
            BuyerInfoState: res.data.BuyerInfoState,
          })
        }else{
          that.setData({
            Info: res.data.Info,
            Reg: res.data.Reg,
          })
        }
      }
    })
    //查询用户是否填写买家商家账号信息end

    //查询用户是否填写卖家商家账号信息start
    wx.request({
      url: app.globalData.appUrl + 'WXSellerInfo/findSellerRegAndInfo?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面查询卖家用户是否填写商家信息：")
        console.info(res.data)
        if (res.data.SellerInfoState == true || res.data.SellerInfoState == false) {
          that.setData({
            SellerInfo: res.data.SellerInfo,
            SellerReg: res.data.SellerReg,
            SellerInfoState: res.data.SellerInfoState,
          })
        } else if (res.data.SellerInfoState == 2) {
          that.setData({
            SellerInfo: res.data.SellerInfo,
            SellerReg: res.data.SellerReg,
            SellerInfoState: res.data.SellerInfoState,
          })
        } else {
          that.setData({
            SellerInfo: res.data.SellerInfo,
            SellerReg: res.data.SellerReg,
          })
        }
      }
    })
    //查询用户是否填写卖家商家账号信息end
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
    return {
      imageUrl: app.globalData.shareImg,
    }
  },
  // 会员
  member: function() {
    wx.navigateTo({
      url: '/pages/me/member?roles=' + app.globalData.UserRoles,
    })
  },
  // 联系我们
  contact: function() {
    wx.makePhoneCall({
      phoneNumber: '021-57630970'
    })
  },
  //意见反馈
  fankui: function() {
    wx.navigateTo({
      url: '/pages/me/fankui',
    })
  },
  //关于我们
  about: function() {
    wx.navigateTo({
      url: '/pages/me/about',
    })
  },
  //开发小程序
  more: function() {
    wx.navigateTo({
      url: '/pages/me/more',
    })
  },
  //收藏
  collect: function() {
    wx.navigateTo({
      url: '/pages/me/shoucang?roles=' + app.globalData.UserRoles,
    })
  },
  //我要发广告
  fa: function() {
    var roles = app.globalData.UserRoles;
    var Info = this.data.Info;
    var Reg = this.data.Reg;
    var BuyerInfoState = this.data.BuyerInfoState;
    //根据用户身份状态判断跳转页面
    if (roles == 0) {
      //用户游客状态了，判断用户填写信息
      if (Reg == true && Info == true && BuyerInfoState == true) {
        //信息全部填写完整，进入登陆页面
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      } else if (Reg == true && Info == true && BuyerInfoState == false) {
        //信息全部填写完整，没有审核进入待审核页面
        wx.navigateTo({
          url: '/pages/me/fa/tijiaoSuccess',
        })
      } else if (Reg == true && Info == true && BuyerInfoState == 2) {
        //信息全部填写完整，审核不通过进入信息页面
        wx.navigateTo({
          url: '/pages/me/fa/message',
        })
      }else if (Reg == true && Info == false) {
        //注册但没填写信息
        wx.navigateTo({
          url: '/pages/me/fa/zhuceSuccess',
        })
      } else if (Reg == false && Info == false) {
        //没有注册，没有填写信息
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      }
    } else if (roles == 1) {
      //用户登陆发广告状态
      wx.navigateTo({
        url: '/pages/me/fa/gongzuotai',
      })
    } else if (roles == 2) {
      //用户登陆接广告身份
      if (Reg == true && Info == true && BuyerInfoState == true) {
        //信息全部填写完整，进入登陆页面
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      } else if (Reg == true && Info == true && BuyerInfoState == false) {
        //信息全部填写完整，没有审核进入待审核页面
        wx.navigateTo({
          url: '/pages/me/fa/tijiaoSuccess',
        })
      } else if (Reg == true && Info == true && BuyerInfoState == 2) {
        //信息全部填写完整，审核不通过进入信息页面
        wx.navigateTo({
          url: '/pages/me/fa/message',
        })
      } else if (Reg == true && Info == false) {
        //注册但没填写信息
        wx.navigateTo({
          url: '/pages/me/fa/zhuceSuccess',
        })
      } else if (Reg == false && Info == false) {
        //没有注册，没有填写信息
        wx.navigateTo({
          url: '/pages/me/fa/login',
        })
      }
      wx.navigateTo({
        url: '/pages/me/fa/login',
      })
    }
  },
  //我要接广告
  jie: function() {
    var roles = app.globalData.UserRoles;
    var SellerInfo = this.data.SellerInfo;
    var SellerReg = this.data.SellerReg;
    var SellerInfoState = this.data.SellerInfoState;
    console.info(roles + "," + SellerReg + "," + SellerInfo + "," + SellerInfoState)
    //根据用户身份状态判断跳转页面
    if (roles == 0) {
      //用户游客状态了，判断用户填写信息
      if (SellerReg == true && SellerInfo == true && SellerInfoState == true) {
        //信息全部填写完整，进入登陆页面
        wx.navigateTo({
          url: '/pages/me/jie/login',
        })
      } else if (SellerReg == true && SellerInfo == true && SellerInfoState == false) {
        //信息全部填写完整，没有审核进入待审核页面
        wx.navigateTo({
          url: '/pages/me/jie/tijiaoSuccess',
        })
      } else if (SellerReg == true && SellerInfo == true && SellerInfoState == 2) {
        //信息全部填写完整，审核不通过进入信息页面
        wx.navigateTo({
          url: '/pages/me/jie/message',
        })
      } else if (SellerReg == true && SellerInfo == false) {
        //注册但没填写信息
        wx.navigateTo({
          url: '/pages/me/jie/zhuceSuccess',
        })
      } else if (SellerReg == false && SellerInfo == false) {
        //没有注册，没有填写信息
        wx.navigateTo({
          url: '/pages/me/jie/login',
        })
      }
    } else if (roles == 2) {
      //用户登陆接广告状态
      wx.navigateTo({
        url: '/pages/me/jie/gongzuotai',
      })
    } else if (roles == 1) {
      //用户登陆发广告身份
      if (SellerReg == true && SellerInfo == true && SellerInfoState == true) {
        //信息全部填写完整，进入登陆页面
        wx.navigateTo({
          url: '/pages/me/jie/login',
        })
      } else if (SellerReg == true && SellerInfo == true && SellerInfoState == false) {
        //信息全部填写完整，没有审核进入待审核页面
        wx.navigateTo({
          url: '/pages/me/jie/tijiaoSuccess',
        })
      } else if (SellerReg == true && SellerInfo == true && SellerInfoState == 2) {
        //信息全部填写完整，审核不通过进入信息页面
        wx.navigateTo({
          url: '/pages/me/jie/message',
        })
      } else if (SellerReg == true && SellerInfo == false) {
        //注册但没填写信息
        wx.navigateTo({
          url: '/pages/me/jie/zhuceSuccess',
        })
      } else if (SellerReg == false && SellerInfo == false) {
        //没有注册，没有填写信息
        wx.navigateTo({
          url: '/pages/me/jie/login',
        })
      }
    }
  }
})