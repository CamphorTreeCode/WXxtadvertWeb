// pages/find/findask.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //点赞start
    find_like: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/cc0dc619-d625-47a4-8963-2cc87a24ea07.png',
    color: '#324169',
    transmit_color: '#324169',
    //列表页传递过来的discoverId
    discoverId:'',
    //发现详情
    Discover:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.info(options.lid)
    that.setData({
      discoverId: options.lid,
    })
    wx.request({
      url: app.globalData.appUrl + 'WXDiscover/findDiscoverDetails', //仅为示例，并非真实的接口地址
      data: {
        discoverId: that.data.discoverId,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是发现详情数据:")
        console.info(res.data)
        if (res.data.Discover.discoverImgs) {
          //图片存在，视频不存在
          res.data.Discover.discoverImgs = JSON.parse(res.data.Discover.discoverImgs);
        } else if (res.data.Discover.discoverVideo) {
          //图片不存在，视频存在
          res.data.Discover.discoverVideo = JSON.parse(res.data.Discover.discoverVideo);
        }
          that.setData({
            Discover: res.data
          })
      }
    })

    //查询用户是否点过赞start
    
    //查询用户是否点过赞end


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
    const that = this;
    this.videoContext = wx.createVideoContext('myVideo')

    if (that.data.videoimg != "") {
      // that.data.show = "none"
      that.setData({
        show: "none"
      })
    } else {
      that.setData({
        show: "block"
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
      imageUrl: app.globalData.shareImg
    }
  },
  // 点赞
  find_like: function() {
    console.info("点赞啦")
    var that = this;  
    wx.request({
      url: app.globalData.appUrl + 'WXDiscover/addDiscoverLike', //仅为示例，并非真实的接口地址
      data: {
        discoverId: that.data.discoverId,
        openId: wx.getStorageSync('openid'),
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是发现详情点赞数据:")
        console.info(res)

        // that.setData({
        //   Discover: res.data
        // })


      }
    })
    if (this.data.color == "#324169") {
      // this.data.like++;
      this.setData({
        find_like: "https://www.chuanshoucs.com/ServerImg/2018-08-03/2415e140-2cb2-48d8-8675-ff2795b955ef.png",
        color: "rgb(253, 211, 0)",
      })
    } else if (this.data.color == "rgb(253, 211, 0)") {}
  }
})