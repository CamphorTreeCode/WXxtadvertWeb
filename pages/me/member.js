// pages/me/member.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断是游客还是接广告的
    jie: true,
    // 判断是否是会员
    huiyuan: true,
    //判断会员余额是否大于充值金额，是否出现弹框
    money: false,
    //用户会员信息
    MemberLevelMsg: '',
    //全部会员信息
    MemberLevel: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info("下面是页面传值:")
    console.info(options)

    var that = this;
    //判断会员身份start
    var roles = options.roles;
    if (roles == 0) {
      //游客
      that.setData({
        jie: true,
        huiyuan: true,
      })
    } else if (roles == 1) {
      //发广告的
      that.setData({
        jie: false,
        huiyuan: false,
      })
    } else if (roles == 2) {
      //接广告的
      that.setData({
        jie: false,
        huiyuan: true,
      })
    }
    //判断会员身份end

    //查询投广告用户的会员号信息start
    wx.request({
      url: app.globalData.appUrl + 'WXMemberLevel/findMemberLevelMsg',
      data: {
        openId: app.returnOpenId(),
        roles: roles
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询用户会员信息：")
        console.info(res.data)
        that.setData({
          MemberLevelMsg: res.data
        })
      }
    })
    //查询投广告用户的会员号信息end

    //查询全部会员等级信息start
    wx.request({
      url: app.globalData.appUrl + 'WXMemberLevel/findAllMemberLevel',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询全部的会员信息：")
        console.info(res.data.MemberLevel)
        //不取数组中第一个注册会员
        res.data.MemberLevel.shift();
        that.setData({
          MemberLevel: res.data.MemberLevel
        })
        console.info(that.data.MemberLevel)
      }
    })
    //查询全部会员等级信息end

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
  
  chong: function(e) {
    console.info(e)
    var index = e.currentTarget.dataset.index;
    console.info(index);
    //选择的会员等级金额
    var memberMoney = this.data.MemberLevel[index].memberMoney;
    console.info("会员金额：" + memberMoney);
    //选择的会员等级id
    var memberId = this.data.MemberLevel[index].memberId;
    console.info("会员等级id:" + memberId);
    //用户会员余额  
    var balance = this.data.MemberLevelMsg.MemberLevelMsg.balance;
    console.info("用户当前余额：" + balance);
    //用户最终充值金额
    var money = memberMoney - balance;
    if (balance > memberMoney){
      //会员余额比充值会员金额大，不能充值
      this.setData({
        money: true
      })
    } else if (balance < memberMoney){
      //会员余额比充值会员金额小，可以充值
      this.setData({
        money: false
      })
      //跳转充值页面
      wx.navigateTo({
        url: '/pages/me/fa/chongzhi?page=HY&memberId=' + memberId + '&memberMoney=' + money + '&dis=disabled' + '&YuanJia=' + memberMoney,
      })
    }
   
  },
  //点击确定，弹框隐藏
  sure: function() {
    this.setData({
      money: false
    })
  }
})