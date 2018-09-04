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
    Discover:{},
    //用户是否点过赞
    UserDiscoverLike:true,
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
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

        //查询用户是否点过赞start
        wx.request({
          url: app.globalData.appUrl + 'WXDiscover/findUserDiscoverLike', //仅为示例，并非真实的接口地址
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
            console.info("下面是发现详情用户是否点赞数据:")
            console.info(res.data.UserDiscoverLike)
            that.setData({
              UserDiscoverLike: res.data.UserDiscoverLike
            })
            if (res.data.UserDiscoverLike == false) {
              that.setData({
                find_like: "https://www.chuanshoucs.com/ServerImg/2018-08-03/2415e140-2cb2-48d8-8675-ff2795b955ef.png",
                color: "rgb(253, 211, 0)",
              })
            }
          }
        })
        //查询用户是否点过赞end
      }
    })
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
    //转发增加转发量start
    var that = this
    return {
      imageUrl: app.globalData.shareImg,
      success: function (e) {
        console.log(e)
        if (e.errMsg == "shareAppMessage:ok") {
          wx.request({
            url: app.globalData.appUrl + 'WXDiscover/addDiscoverForward',
            data: {
              discoverId: that.data.discoverId,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            success: function (res) {
              console.info(res);
              that.data.Discover.Discover.discoverForward = that.data.Discover.Discover.discoverForward + 1;
              that.setData({
                Discover: that.data.Discover,
              })
              wx.showToast({
                title: '分享成功',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
    }
    //转发增加转发量end
  },
  // 点赞
  find_like: function() {
    console.info("点赞啦")
    var that = this;  
    if (that.data.UserDiscoverLike==false){
      //已经点过赞
      wx.showToast({
        title: '你已点过赞了',
        icon: 'none',
        duration: 1500
      })
    } else if (that.data.UserDiscoverLike == true){
      //没有点过赞可以点赞
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
          if (res.data.DiscoverLike == true){
            that.data.Discover.Discover.discoverFabulous = that.data.Discover.Discover.discoverFabulous+1
            that.setData({
              Discover: that.data.Discover,
              find_like: "https://www.chuanshoucs.com/ServerImg/2018-08-03/2415e140-2cb2-48d8-8675-ff2795b955ef.png",
              color: "rgb(253, 211, 0)",
            })
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 1500
            })
          } else if (res.data.DiscoverLike == false){
            wx.showToast({
              title: '你已点过赞了',
              icon: 'none',
              duration: 1500
            })
          }
        
        }
      })
    }
  }
})