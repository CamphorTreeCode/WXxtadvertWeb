// pages/search/search.js
import dynamicSearch from '../../utils/dynamicSearch.js';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //用户搜索历史
    history: [],
    //热门搜索
    hot: [],
    //用户索索内容
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    //获取用户历史搜索记录前四个start
    wx.request({
      url: app.globalData.appUrl + 'WXSearch/findSearchByOpenId',
      data: { openId: app.returnOpenId()},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是用户历史搜索记录返回的信息：")
        console.info(res)
        if (res.data.length > 0) {
          that.setData({
            history:res.data,
          })
        }
      }
    })
    //获取用户历史搜索记录前四个end

    //获取全部搜索记录次数最多的前四个start
    wx.request({
      url: app.globalData.appUrl + 'WXSearch/findSearchByCount',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是全部搜索记录次数最多返回的信息：")
        console.info(res)
        if (res.data.length > 0) {
          that.setData({
            hot:res.data,
          })
        }
      }
    })
    //获取全部搜索记录次数最多的前四个end
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

  //获取输入框用户搜索内容
  searchDetail: function(e) {
    this.setData({
      value: e.detail.value
    })
    console.info(this.data.value)
  },

  //搜索
  sousuo: function() {
    var that = this;
    var searchHot = {};
    searchHot.searchHotName = that.data.value;
    searchHot.openId = app.returnOpenId();
    //增加搜索次数start
    wx.request({
      url: app.globalData.appUrl + 'WXSearch/addSearch',
      data: searchHot,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是增加搜索内容返回的信息：")
        console.info(res)
      }
    })
    //增加搜索次数end
    wx.reLaunch({
      url: '/pages/index/index?search=' + that.data.value,
    })
  },

  // 清空用户输入内容
  empty: function() {
    this.setData({
      value: ''
    })
  },

  // 清除历史搜索
  eliminate: function() {
    //清空用户搜索start
    wx.request({
      url: app.globalData.appUrl + 'WXSearch/modifySearchByOpenId',
      data: { openId: app.returnOpenId() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是用户历史搜索记录返回的信息：")
        console.info(res)
        if(res.data == 1){
          wx.showToast({
            title: '清空成功',
            icon: 'success',
            duration: 2000
          })
          
        }

      }
    })
    this.setData({ 
      history: ''
    })
  },

})