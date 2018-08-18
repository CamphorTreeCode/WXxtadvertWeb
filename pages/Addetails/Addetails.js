// pages/Addetails/Addetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //遮罩层  
    flag: false,
    // 海报
    poster:false,
    //价格
    jiage:"none",
    price: ["40元/1天", "200元/5天", "400元/10天", "800元/20天", "1200元/30天"],
    priceindex:0,
    // 收藏
    collection: false,
    // 收藏弹出框
    Tcollection: false,
    // 购物车
    Shopping: true,
    // 购物车弹窗
    ShoppingCart: false,
    // 是否已经添加过了
    Shoppinged: false,
    // 购物车弹窗
    notshopping:false,
    Stxt:"",
    // 当前身份 0正常用户  1审核中 2账号不对 3游客
    identit:"3"
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  //价格
  jiage:function(){
    if(this.data.jiage=="none"){
      this.setData({
        jiage:"block"
      })
    }else{
      this.setData({
        jiage: "none"
      })
    }
  },
  //选择价格
  textjiage:function(e){
    // console.log(e)
    var index=e.target.dataset.index;
    this.setData({
      priceindex:index
    })
  },
  // 返回主页
  homebanner: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 收藏
  collection: function() {
    var that = this;
    // 改变当前收藏状态
    if (this.data.collection == false) {
      this.setData({
        collection: true,
        Tcollection: true
      })
    } else if (this.data.collection == true) {
      this.setData({
        collection: false,
        Tcollection: true
      })
    }
    
    // 收藏弹出框
    setTimeout(function() {
      that.setData({
        Tcollection: false
      })
    }, 1000);
  },
  // 购物车
  ShoppingCart: function() {

    var that = this;

    //身份正常，可以加入购物车
    if (this.data.identit == "0"){
      if (this.data.Shopping == true && this.data.Shoppinged == false) {
        this.setData({
          Shopping: false,
          ShoppingCart: true,
          Shoppinged: true
        })
      } else if (this.data.Shopping == false || this.data.Shopping == true) {
        this.setData({
          Shopping: true,
          ShoppingCart: true

        })
      }
      setTimeout(function () {
        that.setData({
          ShoppingCart: false
        })
      }, 1000);
    } else if (this.data.identit == "1"){    
        that.setData({
          notshopping:true,
          flag:true,
          Stxt:"你所注册的账号还在审核中,稍后将告知你结果"
        })
    } else if (this.data.identit == "2") {   
        that.setData({
          notshopping: true,
          flag: true,
          Stxt: "你所登陆的账号身份不符,不能加入购物车.如需加入购物车,请登录（我要发广告）"
        })
    } else if (this.data.identit == "3") {  
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你还是游客,不能进行此操作。如需加入购物车,请登录（我要发广告）"
      })
    }

  },
  // 弹窗明白了
  notshopping:function(){
    this.setData({
      notshopping: false,
      flag: false
    })
  },
  //预约
  appointment:function(){
    var that=this;
    if (this.data.identit == "1") {
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你所注册的账号还在审核中,稍后将告知你结果"
      })
    } else if (this.data.identit == "2") {
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你所登陆的账号身份不符,如需预约.请退出当前账号,登录我要发广告账号"
      })
    } else if (this.data.identit == "3") {
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你还是游客,不能进行此操作。如需预约,请登录（我要发广告）"
      })
    }
  },
  // 海报转发
  forward:function(){
    this.setData({
      flag: true,
      poster: true
    })
  },
  // 取消海报转发
  postercancel:function(){
    this.setData({
      flag: false,
      poster: false
    })
  }
})