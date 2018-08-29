// pages/Addetails/Addetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //遮罩层  
    flag: false,
    // 海报
    poster: false,
    //广告位id
    sellerAdvertiseId:0,
    //轮播图
    swiper: [],
    //广告名称
    sellerName: '广告位名称',
    //累计投放
    put: '23',
    //剩余
    residue: '5',
    //价格
    jiage: "block",
    price: ["40元/1天", "200元/5天", "400元/10天", "800元/20天", "1200元/30天"],
    priceindex: 0,
    //选择的天数和总价
    daynum: 1,
    totalPrice: '',
    //广告类型
    advertiseTypeName: '广告类型',
    //地址
    sellerAddress: '地址',
    //广告位简介
    advertiseIntro: '广告位简介',
    //浏览量
    advertiseBrowser: 0,
    //近期浏览用户
    userImgList: [],
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
    notshopping: false,
    Stxt: "",
    // 当前身份 0正常用户  1审核中 2账号不对 3游客
    identit: "3",
    foter: 'block',
    recommend: '同屏推荐',
    listbox: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //根据传入的广告位id查询对应的广告位
    wx.request({
      url: app.globalData.appUrl + 'WXSellerAdvertise/findById',
      data: {
        SellerAdvertiseId: options.sellerAdvertiseId,
        openId: app.returnOpenId(),
      },
      success: function(res) {
        var adv = res.data;
        //渲染广告位详细信息
        that.setData({
          sellerAdvertiseId: adv.sellerAdvertiseId,
          swiper: JSON.parse(adv.sellerInfo.advertiseImgs),
          sellerName: adv.sellerInfo.sellerName,
          put: adv.sellerVolume == undefined ? 0 : adv.sellerVolume,
          price: [adv.unitPrice + "元/1天", adv.unitPrice * 5 + "元/5天", adv.unitPrice * 10 + "元/10天", adv.unitPrice * 20 + "元/20天", adv.unitPrice * 30 + "元/30天"],
          totalPrice: adv.unitPrice,
          advertiseTypeName: adv.sellerInfo.advertiseType.advertiseTypeName,
          sellerAddress: adv.sellerInfo.sellerAddress,
          advertiseIntro: adv.sellerInfo.advertiseIntro,
          advertiseBrowser: adv.advertiseBrowser,
          userImgList: adv.userImgList
        })
        //渲染同屏推荐
        wx.getLocation({
          success: function(res) {
            wx.request({
              url: app.globalData.appUrl + 'WXSellerAdvertise/findSameScreen',
              data: {
                sellerAdvertiseId: adv.sellerAdvertiseId,
                advertId: adv.advertId,
                sellerLatitude: res.latitude,
                sellerLongitude: res.longitude
              },
              success: function(res) {
                for (var i = 0; i < res.data.length; i++) {
                  //循环设定广告位对应的广告位信息的第一张图片
                  res.data[i].sellerInfo.advertiseImgs = JSON.parse(res.data[i].sellerInfo.advertiseImgs)
                  //循环设定广告位距用户的距离
                  res.data[i].distances = (res.data[i].distances / 1000).toFixed(1)
                  //比对广告位是否在购物车中  
                  if (app.globalData.shopCarAdvertise.indexOf(res.data[i].sellerAdvertiseId) != -1) {
                    res.data[i].hide = 'block'
                    res.data[i].quantity = 1
                    res.data[i].plus = '/img/detail/hjia.png'
                    res.data[i].subtract = '/img/detail/yjian.png'
                  }
                  //如果广告屏不在购物车中不显示减号和数量为
                  else {
                    res.data[i].plus = '/img/detail/yjia.png'
                    res.data[i].subtract = '/img/detail/yjian.png'
                    res.data[i].hide = 'none'
                    res.data[i].quantity = 0
                  }

                }
                that.setData({
                  listbox: res.data
                })
              }
            })
          },
        })

      }

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
  //价格
  jiage: function() {
    if (this.data.jiage == "block") {
      this.setData({
        jiage: "none"
      })
    } else {
      this.setData({
        jiage: "block"
      })
    }
  },
  //选择价格
  textjiage: function(e) {
    // console.log(e)
    var index = e.target.dataset.index;
    this.setData({
      priceindex: index
    })
    //选择的天数和对应的总价格
    var price = this.data.price[index]
    //总价格
    this.data.totalPrice = price.substring(0, price.indexOf("元"))
    //天
    this.data.daynum = price.substring(price.indexOf("/") + 1, price.indexOf("天"))
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
    if (this.data.identit == "0") {
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
      setTimeout(function() {
        that.setData({
          ShoppingCart: false
        })
      }, 1000);
    } else if (this.data.identit == "1") {
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你所注册的账号还在审核中,稍后将告知你结果"
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
  notshopping: function() {
    this.setData({
      notshopping: false,
      flag: false
    })
  },
  //预约
  appointment: function() {
    var that = this;
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
  forward: function() {
    this.setData({
      flag: true,
      poster: true,
      foter: 'none'
    })
  },
  // 取消海报转发
  postercancel: function() {
    this.setData({
      flag: false,
      poster: false,
      foter: 'block'
    })
  },
  // 加
  addition: function(e) {
    const that = this;
    const index = e.target.dataset.index;

    if (that.data.listbox[index].quantity < 1) {
      that.data.listbox[index].quantity++;
      that.data.listbox[index].hide = 'block'
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
  // 选择周期跳转
  jump: function() {
    wx.navigateTo({
      url: '../Addetailspage/Addetailspage?daynum=' + this.data.daynum + "&sellerAdvertiseId=" + this.data.sellerAdvertiseId,
    })
  }
  /*自定义加减*/

})