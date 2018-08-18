// pages/find/findask.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/7a499704-504b-442f-9e90-2f3a395e13e8.png',
    title_cn: '享投官方',
    title_en: 'Share Advertising',
    time: '2018-04-17 14:40',
    text: '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。',
    show: 'block',
    video: 'http://dwz.cn/BN3CWYIq',
    poster: 'http://dwz.cn/L7st6WRa',
    read: '129',
    like: '56',
    transmit: '100',
    videoimg: [{
        video_img: 'http://t.cn/RDu6gpV',
      },
      {
        video_img: 'http://t.cn/RDuXUHB',
      },
      {
        video_img: 'http://t.cn/RDuXfQz',
      },
      {
        video_img: 'http://t.cn/RDuXKFJ',
      },
      {
        video_img: 'http://t.cn/RDuXj63',
      },
      {
        video_img: 'http://t.cn/RDuXnlD',
      },
    ],
    find_like: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/cc0dc619-d625-47a4-8963-2cc87a24ea07.png',
    color: '#324169',
    transmit_color: '#324169',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      title: '我在拼多多抢屎，快来帮我砍一刀'
    }
  },
  // 点赞
  find_like: function() {

    if (this.data.color == "#324169") {
      this.data.like++;
      this.setData({
        find_like: "https://www.chuanshoucs.com/ServerImg/2018-08-03/2415e140-2cb2-48d8-8675-ff2795b955ef.png",
        color: "rgb(253, 211, 0)",
        like: this.data.like
      })
    } else if (this.data.color == "rgb(253, 211, 0)") {}
  }
})