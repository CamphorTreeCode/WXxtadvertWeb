// pages/me/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    title: "选择您要开发的小程序类型",
    array: 
      [
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/b6282afd-16fd-43a4-b8b4-f307ee72c794.png',
          message:'电商'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/212a458d-f0c4-434c-b242-2d1e9301da2f.png',
          message: '花店'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/5e9c16cc-ae08-4723-adb7-bc0edad8cce6.png',
          message: '商超'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/9327a7a7-6ef8-4a70-9b2c-e01f44abfd4a.png',
          message: '水果生鲜'
        },
      ],
    lie:
      [
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/3f6381e6-1630-42f9-84e8-21a7f46588de.png',
          message: '外卖'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/60f3c1ec-364a-4ad4-9948-4f1865338629.png',
          message: '家政'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/f164fad8-313e-4161-94e0-d90974cece6a.png',
          message: '商务'
        },
        {
          img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/d49ccea1-2883-47aa-9e05-f3525b0fe75f.png',
          message: '餐饮'
        },
      ],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
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
  tan: function(){
    this.setData({
      state: true
    })
  },
  shanchu: function(){
    this.setData({
      state: false
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})