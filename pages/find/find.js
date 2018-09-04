// pages/find/find.js
var app = getApp()


function findAllDiscoverMsg(that) {
  console.log(that.data.pageSize)
  wx.request({
    url: app.globalData.appUrl + 'WXDiscover/findAllDiscoverMsg', //仅为示例，并非真实的接口地址
    data: {
      currentPage: ++that.data.pageSize
    },
    method: "GET",
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    success: function(res) {
      console.info("下面是发现列表数据:")
      console.info(res)
      if (res.data[0].lists.length > 0) {
        var DiscoverList = that.data.DiscoverList
        for (var i = 0; i < res.data[0].lists.length; i++) {
          if (res.data[0].lists[i].discoverImgs){
            //图片存在，视频不存在
            res.data[0].lists[i].discoverImgs = JSON.parse(res.data[0].lists[i].discoverImgs).slice(0, 3);
          } else if (res.data[0].lists[i].discoverVideo){
            //图片不存在，视频存在
            res.data[0].lists[i].discoverVideo = JSON.parse(res.data[0].lists[i].discoverVideo);
          }
          DiscoverList.push(res.data[0].lists[i])
        }
        that.setData({
          DiscoverList: DiscoverList,
          showLoading: true,
        })
        console.info(DiscoverList);
      }else{
        that.setData({
          bottomText: false,
          showLoading: true
        })
      }
    }
  })
}
Page({
  /**
   * 页面的初始数据
   */
  inputValue: '',
  data: {
    //发现列表
    DiscoverList: [],
    //页码
    pageSize:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    });
   
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
    that.setData({
      pageSize:0,
      DiscoverList: [],
    })

    //查询发现列表start
    findAllDiscoverMsg(that);
    //查询发现列表end
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
    this.setData({
      showLoading: false
    })
    console.log(1)
    findAllDiscoverMsg(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      imageUrl: app.globalData.shareImg,
    }
  },
  // 跳转发现详情
  find: function(e) {
    console.info(e.currentTarget.dataset.lid)
    wx.navigateTo({
      url: '../findask/findask?lid=' + e.currentTarget.dataset.lid,
    })
  },

})