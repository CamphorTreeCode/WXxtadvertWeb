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
          res.data[0].lists[i].orderDate = JSON.parse(res.data[0].lists[i].orderDate);
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
  quzhifu: function(e){
    var that = this;
    console.info(e)
    var index = e.currentTarget.dataset.index;
    console.info(index)
    console.info(that.data.DZFMsg[index])
    var key = "dzf";
    var date = [{
      swiper: JSON.parse(that.data.DZFMsg[index].sellerAdvertise.sellerInfo.advertiseImgs),
      sellerName: that.data.DZFMsg[index].sellerAdvertise.sellerInfo.sellerName,
      lableList: that.data.DZFMsg[index].sellerAdvertise.lableList,
      distances: that.data.DZFMsg[index].sellerAdvertise.distances,
      unitPrice: that.data.DZFMsg[index].sellerAdvertise.unitPrice,
      sellerAdvertiseId: that.data.DZFMsg[index].sellerAdvertiseId,
      openid: app.returnOpenId(),
      // total_fee: that.data.DZFMsg[index].orderAmount,
      total_fee: 1,
      body: '享投广告屏购买',
      buyerAccountId: that.data.DZFMsg[index].buyerAccountId,
      orderDate: that.data.DZFMsg[index].orderDate,
      orderday: that.data.DZFMsg[index].orderday,
      daynum: that.data.DZFMsg[index].orderDateNum,
    }];
    console.info(date)
    wx.navigateTo({
      url: '/pages/Settlement/Settlement?data=' + JSON.stringify(date) + "&key=" + key,
    })
  }
})