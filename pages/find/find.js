// pages/find/find.js
Page({
  /**
   * 页面的初始数据
   */
  inputValue: '',
  data: {
    find: [{
        img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/7a499704-504b-442f-9e90-2f3a395e13e8.png',
        title_cn: '享投官方',
        title_en: 'Share Advertising',
        time: '2018-04-17 14:40',
        text: '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。',
        examine: '查看详情',
        show: 'block',
        video: 'http://tb-video.bdstatic.com/tieba-smallvideo-transcode/1645899_99a2bee874c960a9db411081e8eaad6e_1.mp4',
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534163777907&di=516d62ecad8bfb7c4fea54f24b6cafed&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F6609c93d70cf3bc768974522dd00baa1cc112a6d.jpg',
        read: '129',
        like: '99',
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
      },
      {
        img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/7a499704-504b-442f-9e90-2f3a395e13e8.png',
        title_cn: '享投官方',
        title_en: 'Share Advertising',
        time: '2018-04-17 14:40',
        text: '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。',
        examine: '查看详情',
        show: 'block',
        video: 'http://tb-video.bdstatic.com/tieba-smallvideo-transcode/1645899_99a2bee874c960a9db411081e8eaad6e_1.mp4',
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534163777907&di=516d62ecad8bfb7c4fea54f24b6cafed&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F6609c93d70cf3bc768974522dd00baa1cc112a6d.jpg',
        read: '129',
        like: '99',
        videoimg: []
      },
      {
        img: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/7a499704-504b-442f-9e90-2f3a395e13e8.png',
        title_cn: '享投官方',
        title_en: 'Share Advertising',
        time: '2018-04-17 14:40',
        text: '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。',
        examine: '查看详情',
        show: 'block',
        video: 'http://tb-video.bdstatic.com/tieba-smallvideo-transcode/1645899_99a2bee874c960a9db411081e8eaad6e_1.mp4',
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534163777907&di=516d62ecad8bfb7c4fea54f24b6cafed&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F6609c93d70cf3bc768974522dd00baa1cc112a6d.jpg',
        read: '129',
        like: '99',
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
      },
    ],

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
    this.videoContext = wx.createVideoContext('myVideo');

    const that = this;
    const length = that.data.find.length;
    for (var x = 0; x < length; x++) {
      if (that.data.find[x].videoimg != "") {
        that.data.find[x].show = "none"
        that.setData({
          find: that.data.find
        })
      } else {
        that.data.find[x].show = "block";
        that.setData({
          find: that.data.find
        })
      }
    }
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
  // 跳转发现详情
  find:function(){
    wx.navigateTo({
      url: '../findask/findask',
    })
  }

})