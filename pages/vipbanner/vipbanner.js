// pages/vipbanner/vipbanner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/79cf9238-efb6-4b78-8213-aaad6b14f0c8.jpg',
    main_img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/42ab8e1e-a8f3-4807-a1fc-7716f6604288.jpg',
    main_but: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/2b9cc3ea-227b-43b6-ac22-997876781181.png',
    main_activity: '活动会员',
    main_discounts: '购买广告位享受7折优惠',
    main_vip: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/5768af59-de9a-4aaa-96de-2904053f3673.png',
    main_discount: '999'
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
  rush: function() {
    var val = this.data.main_discount;
    wx.navigateTo({
      url: '../me/fa/chongzhi?goodsId=' + val + '&dis=disabled'
    })
  }
})