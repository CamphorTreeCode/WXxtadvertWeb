// pages/Settlement/Settlement.js
import PayUtils from '../../utils/PayUtils.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    flage: false,
    eyu: false,
    // distances:'',
    // lableList:[],
    // sellerName:'',
    // swiper:'',
    // unitPrice:'', 
    // total_fee:0,
    // daynum:0,
    // orderDate:''
    qqdata: {},
    data: [],
    //结算商品总价
    Total_fee: '',
    //不同页面之间传值标识
    key: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options.key)
    var data = JSON.parse(options.data);
    console.info("支付页面的传值：")
    console.info(data)
    var fee = 0;
    for (var i = 0; i < data.length; i++) {
      fee += data[i].unitPrice * data[i].daynum;
    }
    this.setData({
      key: options.key,
      Total_fee: fee,
      data: data
    })

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
  // 支付成功跳转
  payment: function() {
    this.data.flag = !this.data.flag;
    this.setData({
      flag: this.data.flag
    })
  },
  close: function() {
    this.setData({
      flag: false
    })
  },
  quxiao: function() {
    this.setData({
      flage: false,
      eyu: false
    })
  },
  Smallchange: function() {
    this.setData({
      flag: false,
      flage: true
    })
  },
  yue: function() {
    this.setData({
      flag: false,
      eyu: true
    })
  },
  WXPAY: function() {
    var that = this
    var data = that.data.data;
    for (var i = 0; i < data.length; i++) {
      data[i].payMode = 0;
      data[i].amount_fee = that.data.Total_fee;
    }
    // data.payMode = 0;
    // console.info(JSON.stringify(data))
    console.info("下面是data中的数据：")
    console.info(data)
    console.info(data.length)
    if (data.length > 1) {
      //多个商品结算
      console.info("多个商品结算哦")
      wx.request({
        url: app.globalData.appUrl + 'WXPay/SellerAdvertisePayMore',
        data: {
          payScreen: data
        },
        header: {
          'content-type': 'application/json', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        method: 'get',
        success: function(res) {
          console.info("下面是购买商品返回的信息：")
          for (var i = 0; i < that.data.data.length; i++) {
            console.info("返回的结果" + i)
            console.info(res.data[i])
          }
          console.info(res.data)
          console.info(res.data.length)
          console.info(res.data.prepay_id)
          var data = res.data.prepay_id;
          if (res.data.error != undefined) {
            wx.showModal({
              title: '提示',
              content: res.data.error,
            })
          } else {
            //循环调用支付成功函数
            PayUtils(data.prepay_id, app.globalData.appUrl + 'WXPay/SellerAdvertisePaySuccess', {
              orderListId: data.orderId,
              orderday: data.orderday
            }, '/pages/Paymentsuccess/Paymentsuccess');
          }

        }
      })
    } else {
      //单个商品结算
      console.info("单个商品结算哦")
      wx.request({
        url: app.globalData.appUrl + 'WXPay/SellerAdvertisePayOne',
        data: {
          payScreen: data
        },
        header: {
          'content-type': 'application/json', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        method: 'get',
        success: function(res) {
          console.info("下面是购买商品返回的信息：")
          console.info(res.data)
          console.info(res.data.length)
          console.info(res.data.prepay_id)
          var data1 = res.data.prepay_id;
          if (res.data.error != undefined) {
            wx.showModal({
              title: '提示',
              content: res.data.error,
            })
          } else {
            //循环调用支付成功函数
            PayUtils(data1.prepay_id, app.globalData.appUrl + 'WXPay/SellerAdvertisePaySuccess', {
              orderListId: data1.orderId,
              orderday: data1.orderday
            }, '/pages/Paymentsuccess/Paymentsuccess');
            if (that.data.key == "gwc") {
              //购物车页面传值
              console.info("购物车页面传值")
              //删除购物车start
              console.info("执行删除购物车了：：：：：")
              console.info(data)
              console.info(data[0].sellerAdvertiseId)
              wx.request({
                url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartInfo',
                data: {
                  openId: app.returnOpenId(),
                  sellerAdvertiseId: data[0].sellerAdvertiseId,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                  xcxuser_name: "xcxuser_name"
                },
                success: function(res) {
                  console.info("删除购物车返回的信息")
                  console.info(res);
                }
              })
              //删除购物车end
            } else {
              //另外连个页面传值
              console.info("另外两个页面传值")
            }
            //清除本地缓存
            wx.removeStorage({
              key: data[0].sellerAdvertiseId + "",
              success: function (res) {
                console.info("清除缓存成功", res)
              }
            })

          }

        }
      })

    }
  }
})