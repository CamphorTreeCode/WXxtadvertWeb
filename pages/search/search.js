// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '搜索投放点地址、名称',
    ss: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/df843ac6-b2ce-44bb-b7c9-7cc05c0bcf1f.png',
    history_search: '历史搜索',
    hot_search: '热门搜索',
    eliminate: '清除',
    history: [{
      city: '陆家嘴'
    }, {
      city: '东方明珠'
    }, {
      city: '交通大学'
    }],
    hot: [{
      city: '北京'
    }, {
      city: '上海'
    }, {
      city: '驻马店'
    }],
    value: ''
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
  // 清空
  empty: function() {
    this.setData({
      value: ''
    })
  },
  // 清除历史搜索
  eliminate: function() {
    this.setData({
      history: ''
    })
  }
})