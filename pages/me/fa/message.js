// pages/me/fa/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    //控制提交审核按钮背景色
    tianwan: false,
    //控制logo的默认上传按钮显示
    state: true,
    zhizhao: true,
    tempFilePath: '',
    zhao: '',
    
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
  dizhi: function(){
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res.address);
        that.setData({
          address: res.address
        })
      },
    })
  },
  tijiao: function(){
    wx.navigateTo({
      url: '/pages/me/fa/tijiaoSuccess',
    })
  },
  logo: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          state: false,
          tempFilePath: res.tempFilePaths[0]
        });
        // console.log(tempFilePath);
      }
    })
    // console.log(this.data.tempFilePath);
  },
  zhizhao: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          zhizhao: false,
          zhao: res.tempFilePaths[0]
        });
        // console.log(tempFilePath);
      }
    })
  }
})