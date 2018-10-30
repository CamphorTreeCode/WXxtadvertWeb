// pages/Settlement/Settlement.js
import PayUtils from '../../utils/PayUtils.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:false,
      flage:false , 
      eyu:false,
      // distances:'',
      // lableList:[],
      // sellerName:'',
      // swiper:'',
      // unitPrice:'',
      // total_fee:0,
      // daynum:0,
      // orderDate:''
      qqdata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var data = JSON.parse(options.data);
    console.info(data)
    this.setData({
      data:data
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
  // 支付成功跳转
  payment:function(){
    this.data.flag = !this.data.flag;
    this.setData({
      flag: this.data.flag
    })
  },
  close:function(){
    this.setData({
      flag: false
    })
  },
  quxiao:function(){
    this.setData({
      flage: false,
      eyu:false
    })
  },
  Smallchange:function(){
    this.setData({
      flag: false,
      flage: true
    })
  },
  yue:function(){
    this.setData({
      flag:false,
      eyu:true
    })
  },
  WXPAY:function(){
    var that = this
    var data = this.data.data;
    data.payMode = 0;

    wx.request({
      url: app.globalData.appUrl + 'WXPay/SellerAdvertisePay',
      data: data,
      success: function(res) {
        if (res.data.error != undefined) {

          wx.showModal({
            title: '提示',
            content: res.data.error,
          })
        }else{
          PayUtils(res.data.prepay_id, app.globalData.appUrl + 'WXPay/SellerAdvertisePaySuccess', 
              { orderListId: res.data.orderId, orderday: JSON.stringify(that.data.data.orderday)},'/pages/index/index')
        }

      }
    })

  }
})
