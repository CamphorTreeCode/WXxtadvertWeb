// pages/me/jie/message.js
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
    //控制广告类型的选择
    guang: true,
    //控制执照的上传...
    zhizhao: true,
    aaa: '#ccc',
    //控制logo的上传
    tempFilePath: '',
    // 设置广告类型默认值
    inputText: '',
    zhao: '',
    shu: -1,
    array: [
      {
        message: "大型商业广场"
      },
      {
        message: "旅游景点"
      },
      {
        message: "小区社区"
      },
      {
        message: "街头"
      },
      {
        message: "交通宣传"
      }
    ],
    numberarray: [
      {
        lun: false,
        lunbo:"",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      }
    ]
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
        that.setData({
          address: res.address
        })
      },
    })
  },
  tijiao: function () {
    wx.navigateTo({
      url: '/pages/me/jie/tijiaoSuccess',
    })
  },
  logo: function () {
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
  zhizhao: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片     
        console.info(res)
        that.setData({
          zhizhao: false,
          zhao: res.tempFilePaths[0]
        });
        console.log(that.data.zhao);

      }
    })
  },
  // 广告位
  guang: function(){
    this.setData({
      guang: (!this.data.guang)
    })
  },
  // 标签选择
  qian: function(e){
    var id = e.currentTarget.dataset.index;
    this.setData({
      shu: id,
      inputText: this.data.array[id].message
    })
  },
  // 轮播
  hou0: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[0].lun': true,
          'numberarray[0].lunbo': res.tempFilePaths[0]
        })
      }
    })
  },
  hou1: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[1].lun': true,
          'numberarray[1].lunbo': res.tempFilePaths[0]
        })
      }
    })
  },
  hou2: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[2].lun': true,
          'numberarray[2].lunbo': res.tempFilePaths[0]
        })
      }
    })
  },
  hou3: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[3].lun': true,
          'numberarray[3].lunbo': res.tempFilePaths[0]
        })
      }
    })
  },
  hou4: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[4].lun': true,
          'numberarray[4].lunbo': res.tempFilePaths[0]
        })
      }
    })
  }
})
