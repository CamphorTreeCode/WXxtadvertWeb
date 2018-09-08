// pages/me/fa/daizhifu.js
var app = getApp();
function findBuyerOrderMsg(that){
  wx.request({
    url: app.globalData.appUrl + 'WXOrderList/findBuyerOrderMsg', //仅为示例，并非真实的接口地址
    data: {
      currentPage: ++that.data.pageSize,
      buyerAccountId: that.data.buyerAccountId,
      key: that.data.key,
    },
    method: "GET",
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      xcxuser_name: "xcxuser_name"
    },
    success: function (res) {
      console.info("下面是待支付列表数据:")
      console.info(res)
      if (res.data[0].lists.length > 0) {
        var DZFMsg = that.data.DZFMsg
        for (var i = 0; i < res.data[0].lists.length; i++) {
          DZFMsg.push(res.data[0].lists[i])
        }
        console.info(DZFMsg);
        that.setData({
          DZFMsg: DZFMsg,
        })
      }
      
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页码
    pageSize: 0,
    //待支付key
    key:'',
    //买家账号id
    buyerAccountId:'',
    //待支付数据
    DZFMsg:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var buyerAccountId = options.buyerAccountId; 
    var key = options.key;
    console.info(key)
    console.info(buyerAccountId)
    this.setData({
      buyerAccountId: buyerAccountId,
      key: key,
    })
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
    var that = this;
    that.setData({
      pageSize: 0,
      DZFMsg:[],
    })
    findBuyerOrderMsg(that);
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
    findBuyerOrderMsg(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  quzhifu: function(){
    // var that = this;
    // var date = {
    //   swiper: that.data.swiper,
    //   sellerName: that.data.sellerName,
    //   lableList: that.data.lableList,
    //   distances: that.data.listbox[0].distances,
    //   unitPrice: that.data.unitPrice,
    //   sellerAdvertiseId: that.data.sellerAdvertiseId,
    //   openid: app.returnOpenId(),
    //   // total_fee: that.data.totalPrice,
    //   total_fee: 1,
    //   body: '享投广告屏购买',
    //   buyerAccountId: 5,
    //   orderDate: that.data.period.orderDate,
    //   orderday: orderday,
    //   daynum: that.data.daynum,

    // };
    wx.navigateTo({
      // url: '/pages/Settlement/Settlement?data=' + JSON.stringify(date),
      url: '/pages/Settlement/Settlement',
    })
  }
})