var app = getApp();
import dynamicSearch from '../../utils/dynamicSearch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listbox: [],

    LableId: '', //标签id

    distance: '', //距离范围

    SellerAddress: '', //投放区域

    AdvertiseTypeId: '', //广告类型

    unitPrice: '', //商品单价

    sellerVolume: '', //广告位销量

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.info(options)
    var that = this;
    var LableId = app.globalData.lableId;
    console.info(LableId);
    that.setData({
      LableId: LableId
    })
    
    dynamicSearch(that, { LableId: LableId},app)

    /*获取用户购物车对应的广告位*/
    wx.request({
      url: app.globalData.appUrl + 'WXShopCar/findListByOpenId',
      data: { openId: app.returnOpenId() },
      success: function (res) {
        var shopCarAdvertise = [];
        for (var i = 0; i < res.data.length; i++) {
          shopCarAdvertise.push(res.data[i].sellerAdvertiseId)
        }
        app.globalData.shopCarAdvertise = shopCarAdvertise
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
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

  // 加
  addition: function(e) {
    const that = this;
    const index = e.target.dataset.index;
    var shoppingCart = {};
    shoppingCart.openId = app.returnOpenId();
    shoppingCart.unitPrice = e.currentTarget.dataset.unitprice;
    // shoppingCart.shoppingDate = shoppingDate;
    shoppingCart.sellerAdvertiseId = e.currentTarget.dataset.selleradvertiseid;
      // console.info(shoppingCart)
    if (that.data.listbox[index].quantity < 1) {
      that.data.listbox[index].quantity++;
      that.data.listbox[index].hide = 'block';
      //加入购物车start
      wx.request({
        url: app.globalData.appUrl + 'WXShopCar/addShoppingCartInfo',
        data: shoppingCart,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info("增加购物车返回的信息")
          console.info(res);
        }
      })
        //加入购物车end
      that.setData({
        listbox: that.data.listbox
      })
    }
    if (that.data.listbox[index].quantity >= 1) {
      that.data.listbox[index].plus = 'https://www.chuanshoucs.com/ServerImg/2018-08-03/f7c71b12-4149-4277-ad92-f334d3194f39.png'
      that.setData({
        listbox: that.data.listbox
      });
    }

  },

  // 减
  subtraction: function(e) {
    const that = this;
    const index = e.target.dataset.index;
    var sellerAdvertiseId = e.currentTarget.dataset.selleradvertiseid;
    var openId = app.returnOpenId();
    //删除购物车start
    wx.request({
      url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartInfo',
      data: { openId: openId, sellerAdvertiseId: sellerAdvertiseId },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("删除购物车返回的信息")
        console.info(res);
      }
    })
      //删除购物车end
    that.data.listbox[index].quantity--;
    that.setData({
      listbox: that.data.listbox
    })

    if (that.data.listbox[index].quantity < 1) {
      that.data.listbox[index].hide = 'none'
      that.data.listbox[index].plus = 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png'
      that.setData({
        listbox: that.data.listbox
      })
    }
  },

  enter:function(event){
    var that = this
    var returnDate = event.detail
    console.info(returnDate)
    var qqdata ={}
     
    if (returnDate.distance != null){
      qqdata.distance = returnDate.distance
    }
    if (returnDate.SellerAddress != null) {
      qqdata.SellerAddress = returnDate.SellerAddress
    }
    if (returnDate.AdvertiseTypeId != null) {
      qqdata.AdvertiseTypeId = returnDate.AdvertiseTypeId
    }
    if (returnDate.unitPrice != null) {
      qqdata.unitPrice = returnDate.unitPrice
    }
    if (returnDate.sellerVolume != null) {
      qqdata.sellerVolume = returnDate.sellerVolume
    }

    qqdata.LableId = that.data.LableId
    
    console.info(qqdata)
    
    dynamicSearch(that, qqdata,app)

  },
  //跳转详情页
  detail:function(e){
    console.info(e)
    wx.navigateTo({
      url: '/pages/Addetails/Addetails?sellerAdvertiseId=' + e.currentTarget.dataset.selleradvertiseid
    })
  }
  
})