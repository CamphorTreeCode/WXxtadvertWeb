// 引入SDK核心类
var app = getApp();
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
import dynamicSearch from '../../utils/dynamicSearch.js'
var qqmapsdk;
var a = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页活动会员banner是否显示
    vipIsShow: true,
    //首页活动会员展示图
    vip_banner: '',
    site: '',
    //导航栏
    HomeNavigation: [],
    advertising_top_left: [{
      img: '/img/lefthand.png',
      text: '广告位推荐'
    }],
    advertising_top_right: [{
      img: '/img/huanyipi.png',
      text: '换一批'
    }],
    referrer: [{
      img: '/img/round1.png',
    }, {
      img: '/img/round2.png',
    }],
    listbox: [],
    //定位的街道
    addressDetail: '',
    //选择地址的纬度
    latitude1: '',
    //选择地址的经度
    longitude1: '',
    //搜索内容
    search: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.info("页面传值的搜索内容" + options.search);
    if (options.search != undefined && options.search != " ") {
      that.setData({
        search: options.search
      })
    } else {
      that.setData({
        search: ""
      })
    }

    // 实时获取用户坐标
    wx.getLocation({
      success: function(res) {
        console.info(res)
        // 纬度
        var latitude = res.latitude
        console.log('纬度 :', latitude);
        // 经度
        var longitude = res.longitude;
        console.log('经度 ：', longitude);
        qqmapsdk.reverseGeocoder({
          location: {
            longitude: longitude,
            latitude: latitude
          },
          success: function(res) {
            console.info("地址信息：")
            console.info(res)
            this.site = res.result.address_component.city;
            console.log(this);
            console.log(res.result.address_component.city + res.result.address_component.district);
            var addressDetail = res.result.address_component.street;
            // console.log(this.site);
            that.setData({
              site: this.site,
              addressDetail: addressDetail,
            })
          }
        })

      },

    });
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MR3BZ-43WC2-CQQUD-CSUJU-4YVME-OLBLK'
    });




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
  },
  /*
   *点击换一批
   */
  rotate: function() {
    a += 1;
    this.animation.rotate(a * 180).step();
    this.setData({
      animation: this.animation.export()
    });
    this.roundTwoAdvertise(this)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.onLoad();
    var that = this;
    /*获取用户购物车对应的广告位*/
    wx.request({
      url: app.globalData.appUrl + 'WXShopCar/findListByOpenId',
      data: {
        openId: app.returnOpenId()
      },
      success: function(res) {
        var shopCarAdvertise = [];
        for (var i = 0; i < res.data.length; i++) {
          shopCarAdvertise.push(res.data[i].sellerAdvertiseId)
        }
        app.globalData.shopCarAdvertise = shopCarAdvertise
      }
    })

    /*获取首页导航栏*/
    wx.request({
      url: app.globalData.appUrl + 'WXNavigation/findAll',
      success: function(res) {
        console.info("下面是首页导航栏的信息：")
        console.info(res)
        that.setData({
          HomeNavigation: res.data
        })
      }
    })

    //地址转换坐标
    qqmapsdk.geocoder({
      address: that.data.site,
      success: function(res) {
        console.log(res);
        that.setData({
          latitude1: res.result.location.lat,
          longitude1: res.result.location.lng,
        })
        console.info("当前位置时&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.info(that.data.site)
        //广告位列表
        // dynamicSearch(that, {}, app)
      },
    });
    console.info("当前位置时&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.info(that.data.site)

    if (that.data.search != '' || that.data.search != undefined) {
      var data1 = {};
      data1.search = that.data.search;
      dynamicSearch(that, data1, app)
    } else {
      //广告位列表
      dynamicSearch(that, {}, app)
    }

    //随机两个广告位
    that.roundTwoAdvertise(that)

    //首页活动会员图片start
    wx.request({
      url: app.globalData.appUrl + 'WXActivityMemberLevel/findAllActivityMemberLevel',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询活动会员信息：")
        console.info(res)
        res.data.ActivityMemberLevel.activityMemberIcon = JSON.parse(res.data.ActivityMemberLevel.activityMemberIcon)[0]
        res.data.ActivityMemberLevel.specialActivitiesImg = JSON.parse(res.data.ActivityMemberLevel.specialActivitiesImg)[0]
        var isOpen = res.data.ActivityMemberLevel.isOpen;
        if (isOpen == 1) {
          //活动开启
          that.setData({
            vipIsShow: false,
            vip_banner: res.data.ActivityMemberLevel.specialActivitiesImg,
          })
        } else if (isOpen == 0) {
          //活动关闭
          that.setData({
            vipIsShow: true,
          })
        }

      }
    })
    //首页活动会员图片end
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
    // this.onLoad()
    wx.reLaunch({
      url: '/pages/index/index'
    })
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
  // 跳转到 city
  jump: function() {
    wx.navigateTo({
      // url: '../switchcity/switchcity?site=' + this.data.site + '&addressDetail=' + this.data.addressDetail,
      url: '../switchcity/switchcity',
    })
  },
  // 跳转到搜索
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 跳转导航栏分类页面
  news: function(e) {
    var lableId = e.currentTarget.dataset.lableid;
    app.globalData.lableId = lableId;
    wx.navigateTo({
      url: '../news/news',
    })
  },
  // 跳转到推荐
  recommend: function() {
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  // 跳转到优质
  superior: function() {
    wx.navigateTo({
      url: '../superior/superior',
    })
  },
  // 跳转到本地
  native: function() {
    wx.navigateTo({
      url: '../native/native',
    })
  },
  // 加入购物车
  addition: function(e) {
    const that = this;
    const index = e.target.dataset.index;
    // console.info(e)
    var shoppingCart = {};
    shoppingCart.openId = app.returnOpenId();
    shoppingCart.shopuUnitPrice = e.currentTarget.dataset.unitprice;
    // shoppingCart.shoppingDate = shoppingDate;
    shoppingCart.sellerAdvertiseId = e.currentTarget.dataset.selleradvertiseid;
    // console.info(shoppingCart)
    //没有加入购物车
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
        success: function(res) {
          console.info("增加购物车返回的信息")
          console.info(res);
        }
      })
      //加入购物车end
      that.setData({
        listbox: that.data.listbox
      })
    }
    //已经加入购物车了
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
    console.info(e)
    console.info(app.globalData.shopCarAdvertise)
    var sellerAdvertiseId = e.currentTarget.dataset.selleradvertiseid;
    var openId = app.returnOpenId();
    //删除购物车start
    wx.request({
      url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartInfo',
      data: {
        openId: openId,
        sellerAdvertiseId: sellerAdvertiseId
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
  enter: function(event) {
    var that = this
    var returnDate = event.detail
    console.info(returnDate)

    if (returnDate == 'error') {
      return false;
    }
    var qqdata = {}

    if (returnDate.distance != null) {
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

    console.info(qqdata)

    dynamicSearch(that, qqdata, app)

  },
  //随机两个广告位
  roundTwoAdvertise: function(that) {
    wx.request({
      url: app.globalData.appUrl + 'WXSellerAdvertise/findTwoRandomSellerAdvertise',
      success: function(res) {
        console.info(res)
        var referrer = that.data.referrer;
        for (var i = 0; i < res.data.length; i++) {
          referrer[i].sellerName = res.data[i].sellerInfo.sellerName;
          referrer[i].lableList = res.data[i].lableList;
          referrer[i].unitPrice = res.data[i].unitPrice;
          referrer[i].sellerAdvertiseId = res.data[i].sellerAdvertiseId;
        }
        that.setData({
          referrer: referrer
        })
      }
    })
  },

  //跳转详情页
  detail: function(e) {
    console.info(e)
    wx.navigateTo({
      url: '/pages/Addetails/Addetails?sellerAdvertiseId=' + e.currentTarget.dataset.selleradvertiseid
    })
  },
  // vip_banner
  vip_banner: function() {
    wx.navigateTo({
      url: '../vipbanner/vipbanner',
    })
  }
})