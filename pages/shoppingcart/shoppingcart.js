var app = getApp();
var a = 0;

function findall(a, x) {
  var results = [],
    len = a.length,
    pos = 0;
  while (pos < len) {
    pos = a.indexOf(x, pos);
    if (pos === -1) { //未找到就退出循环完成搜索
      break;
    }
    results.push(pos); //找到就存储索引
    pos += 1; //并从下个位置开始搜索
  }
  return results;
}


Page({

  data: {
    price: ["40元/1天", "200元/5天", "400元/10天", "800元/20天", "1200元/30天"],
    items: [{
        money: "40元/1天",
        isTouchMove: false,
        flag: true,
        priceindex: 0,
        number: 1,
        check: false
      },
      {
        money: "40元/1天",
        isTouchMove: false,
        flag: true,
        priceindex: 0,
        number: 1,
        check: false
      },
      {
        money: "40元/1天",
        isTouchMove: false,
        flag: true,
        priceindex: 0,
        number: 1,
        check: false
      }
    ],
    //去结算显示
    jiesuan: false,
    //清空显示
    clear: false,
    startX: 0, //开始坐标
    startY: 0,
    //用户购物车集合
    ShoppingCart: {},
    //账号不符合的样式
    Nonconformity: 'display:none',
    //需要登录的样式
    tourist: 'display:none',
    //购物车id
    shoppingCartId: '',
    //无内容显示
    sclength: false,
    //价格选中状态下标
    // idx:0,
    //价格数组
    priceNum: 0,
    //投放周期
    period: {},
    //选择的天数
    dayNum: 0,
    //用户选择的下标
    shopCartIndex: '',
    //用户选择的价格
    shopuUnitPrice1: '',
    //结算的下标数组
    shopIndexArr: [],
    //结算的对象数组
    shopObjArr: [],
    //用户账号id
    buyerAccountId: "",
  },
  onLoad: function(option) {
    var that = this;
    console.info(that.data.shopuUnitPrice1)
    //查询用户的账号Id
    wx.request({
      url: app.globalData.appUrl + 'WXShopCar/findUserBuyerAccountId?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info(res.data)
        that.setData({
          buyerAccountId: res.data,
        })
      }
    })
    //查询用户的账号Id

    //查询用户当前身份
    wx.request({
      url: app.globalData.appUrl + 'WXLoginStatus/findUserRoles?openId=' + app.returnOpenId() + '',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询用户的身份信息：")
        console.info(res.data.UserRoles)
        app.globalData.UserRoles = res.data.UserRoles;


        //判断用户身份，来显示不用的页面
        console.info(app.globalData.UserRoles)
        console.info(that.data.period)
        var roles = app.globalData.UserRoles;
        if (roles == 2) {
          console.info("我是发广告的")
          //发广告的
          that.setData({
            jiesuan: true,
            clear: true,
            items: {},
            Nonconformity: 'display:block',
            sclength: true,
          })
        } else if (roles == 0 || roles == '') {
          console.info("我是游客")
          //未登录，游客
          that.setData({
            jiesuan: true,
            clear: true,
            items: {},
            tourist: 'display:block',
            sclength: true,
          })
        } else if (roles == 1) {
          console.info("我是接广告的")
          //查询用户全部购物车信息start
          wx.getLocation({
            success: function(res) {
              var data = {};
              data.sellerLatitude = res.latitude;
              data.sellerLongitude = res.longitude;
              data.openId = app.returnOpenId();
              wx.request({
                url: app.globalData.appUrl + 'WXShopCar/findUserAllShoppingCartInfo',
                data: data,
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  xcxuser_name: "xcxuser_name"
                },
                success: function(res) {
                  console.info("下面是查询用户购物车返回的信息：")
                  console.info(res);
                  if (res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                      //循环设定广告位对应的广告位信息的第一张图片
                      res.data[i].sellerAdvertise.sellerInfo.advertiseImgs = JSON.parse(res.data[i].sellerAdvertise.sellerInfo.advertiseImgs);
                      //循环设定广告位距用户的距离
                      res.data[i].sellerAdvertise.distances = (res.data[i].sellerAdvertise.distances / 1000).toFixed(1);
                      if (res.data[i].shoppingDate == undefined || res.data[i].shoppingDate == '') {
                        res.data[i].shoppingDate = '请选择';
                      } else {
                        res.data[i].shoppingDate = JSON.parse(res.data[i].shoppingDate);
                      }
                      res.data[i].isTouchMove = false;
                      res.data[i].flag = true;
                      res.data[i].priceindex = findall([
                        res.data[i].sellerAdvertise.unitPrice,
                        res.data[i].sellerAdvertise.unitPrice * 5,
                        res.data[i].sellerAdvertise.unitPrice * 10,
                        res.data[i].sellerAdvertise.unitPrice * 20,
                        res.data[i].sellerAdvertise.unitPrice * 30
                      ], res.data[i].shopuUnitPrice);
                      res.data[i].number = 1;
                      res.data[i].check = false;
                      res.data[i].shopuUnitPrice =
                        res.data[i].shopuUnitPrice + "元/" + res.data[i].shopuUnitPrice / res.data[i].sellerAdvertise.unitPrice + "天";
                      res.data[i].price = [
                        res.data[i].sellerAdvertise.unitPrice + "元/1天",
                        res.data[i].sellerAdvertise.unitPrice * 5 + "元/5天",
                        res.data[i].sellerAdvertise.unitPrice * 10 + "元/10天",
                        res.data[i].sellerAdvertise.unitPrice * 20 + "元/20天",
                        res.data[i].sellerAdvertise.unitPrice * 30 + "元/30天"
                      ];
                      res.data[i].daynum = res.data[i].shopuUnitPrice.substring(res.data[i].shopuUnitPrice.indexOf("/") + 1, res.data[i].shopuUnitPrice.indexOf("天"))
                    }


                    console.info("下面是购物车转换好的信息;")
                    console.info(that.data.ShoppingCart);
                    console.info(that.data.period.orderDate)
                    if (that.data.period.orderDate != {} && that.data.period.orderDate != undefined) {
                      console.info("进来了")
                      if (that.data.shopCartIndex !== '') {
                        console.info("进来了1")
                        var ShoppingCart = that.data.ShoppingCart;
                        ShoppingCart[that.data.shopCartIndex].shoppingDate = JSON.parse(JSON.stringify(that.data.period.orderDate));
                        if (that.data.shopuUnitPrice1 == "") {
                          ShoppingCart[that.data.shopCartIndex].shopuUnitPrice = ShoppingCart[that.data.shopCartIndex].shopuUnitPrice;
                        } else {
                          ShoppingCart[that.data.shopCartIndex].shopuUnitPrice = that.data.shopuUnitPrice1;
                        }
                        ShoppingCart[that.data.shopCartIndex].priceindex = findall([
                          ShoppingCart[that.data.shopCartIndex].sellerAdvertise.unitPrice + "元/1天",
                          ShoppingCart[that.data.shopCartIndex].sellerAdvertise.unitPrice * 5 + "元/5天",
                          ShoppingCart[that.data.shopCartIndex].sellerAdvertise.unitPrice * 10 + "元/10天",
                          ShoppingCart[that.data.shopCartIndex].sellerAdvertise.unitPrice * 20 + "元/20天",
                          ShoppingCart[that.data.shopCartIndex].sellerAdvertise.unitPrice * 30 + "元/30天"
                        ], that.data.shopuUnitPrice1);
                        that.setData({
                          ShoppingCart: ShoppingCart,
                        })
                      }
                    } else {
                      that.setData({
                        ShoppingCart: res.data,
                        jiesuan: false,
                        clear: false,
                        tourist: 'display:none',
                        Nonconformity: 'display:none',
                        sclength: true,
                      })
                    }
                  } else {
                    //没有数据
                    that.setData({
                      sclength: false,
                      jiesuan: true,
                      clear: true,
                    })
                  }
                }
              })
            }
          })
          //查询用户全部购物车信息end
        }
      }
    })




  },
  onShow: function() {
    // this.data.ShoppingCart = [];
    console.info("重新加载了")
    this.onLoad();
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {

    //开始触摸时 重置所有删除
    this.data.ShoppingCart.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      ShoppingCart: this.data.ShoppingCart
    })

  },
  //滑动事件处理

  touchmove: function(e) {

    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度

      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });

    that.data.ShoppingCart.forEach(function(v, i) {
      v.isTouchMove = false

      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;

      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })

    //更新数据 
    that.setData({
      ShoppingCart: that.data.ShoppingCart
    })
  },

  /**
   * 计算滑动角度 
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //删除事件 
  del: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除本条信息吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var shoppingCartId = e.currentTarget.dataset.shoppingcartid;
          //删除购物车start
          wx.request({
            url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartInfoById',
            data: {
              shoppingCartId: shoppingCartId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            success: function(res) {
              console.info("购物车删除成功")
              console.info(res);
              if (res.data == 1) {
                that.data.ShoppingCart.splice(e.currentTarget.dataset.index, 1)
                that.setData({
                  ShoppingCart: that.data.ShoppingCart
                })
                that.onLoad();
              }
            }

          })
          //删除购物车end
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    console.info(e)


  },

  //清空购物车
  clearAll: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定清空购物车吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //删除全部购物车start
          wx.request({
            url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartAllInfo',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            success: function(res) {
              console.info("购物车删除成功")
              console.info(res);
              that.setData({
                ShoppingCart: [],
                period: {},
              })
              that.onLoad();
            }

          })
          //删除全部购物车end
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //选择价格 
  textjiage: function(e) {
    var that = this;
    var data = e.target.dataset.data;
    var index = e.target.dataset.index;
    // console.info(data)
    // console.info(index)
    that.data.ShoppingCart[data].priceindex = index;
    // console.log(that.data.ShoppingCart[data].price[index]);
    // console.log(that.data.ShoppingCart[data].sellerAdvertise.unitPrice);
    that.data.ShoppingCart[data].shopuUnitPrice = that.data.ShoppingCart[data].price[index];
    // "items[" + data + "].money";
    var key = "ShoppingCart[" + data + "].shopuUnitPrice";
    // var key = that.data.items[data].money
    var item = that.data.ShoppingCart[data].price[index]
    // console.info(key)
    // console.info(item.substring(item.indexOf("/")+1, item.indexOf("天")))
    that.setData({
      ShoppingCart: that.data.ShoppingCart,
      shopuUnitPrice1: that.data.ShoppingCart[data].price[index],
      dayNum: item.substring(item.indexOf("/") + 1, item.indexOf("天")),
      [key]: item //选择的价格
    })
    console.info(that.data.ShoppingCart)
    console.info(that.data.dayNum)
    console.info(that.data.shopuUnitPrice1)
  },
  // 价格显示 
  // jiageshow: function(e) {
  //   var that = this;
  //   var index = e.target.dataset.index;
  //   if (this.data.items[index].flag == false) {
  //     this.data.items[index].flag = true
  //     that.setData({
  //       items: this.data.items
  //     })
  //   } else {
  //     this.data.items[index].flag = false;
  //     that.setData({
  //       items: this.data.items
  //     })
  //   }
  // },
  //去支付
  payment: function() {
    var that = this;
    console.log("用户点击去结算啦")
    console.info(that.data.shopObjArr)
    if (that.data.shopObjArr == '') {
      //什么都没有选择
      console.info("啥都没有")
      wx.showToast({
        title: '请至少选择一个商品',
        icon: 'none',
        duration: 1500
      })
    } else {
      //有信息，跳转
      console.info("有东西哎")
      var key = "gwc";
      var data = [];
      var data1 = {};
      for (var i = 0; i < that.data.shopObjArr.length; i++) {
        console.info("下面是从缓存中拿到的数据;" + that.data.shopObjArr[i].sellerAdvertiseId)
        console.info(wx.getStorageSync(that.data.shopObjArr[i].sellerAdvertiseId + ""))
        data1[i] = {};
        data1[i].swiper = that.data.shopObjArr[i].sellerAdvertise.sellerInfo.advertiseImgs;
        data1[i].sellerName = that.data.shopObjArr[i].sellerAdvertise.sellerInfo.sellerName;
        data1[i].lableList = that.data.shopObjArr[i].sellerAdvertise.lableList;
        data1[i].distances = that.data.shopObjArr[i].sellerAdvertise.distances;
        data1[i].unitPrice = that.data.shopObjArr[i].sellerAdvertise.unitPrice;
        data1[i].sellerAdvertiseId = that.data.shopObjArr[i].sellerAdvertiseId;
        data1[i].openid = app.returnOpenId();
        data1[i].total_fee = 1;
        data1[i].body = '享投广告屏购买';
        data1[i].buyerAccountId = that.data.buyerAccountId;
        data1[i].orderDate = that.data.shopObjArr[i].shoppingDate;
        data1[i].orderday = wx.getStorageSync(that.data.shopObjArr[i].sellerAdvertiseId + "");
        data1[i].daynum = that.data.shopObjArr[i].shopuUnitPrice.substring(that.data.shopObjArr[i].shopuUnitPrice.indexOf("/") + 1, that.data.shopObjArr[i].shopuUnitPrice.indexOf("天"));
        data1[i].orderDateNum = that.data.shopObjArr[i].shopuUnitPrice.substring(that.data.shopObjArr[i].shopuUnitPrice.indexOf("/") + 1, that.data.shopObjArr[i].shopuUnitPrice.indexOf("天"));
        if (wx.getStorageSync(that.data.shopObjArr[i].sellerAdvertiseId + "").length != data1[i].daynum) {
          wx.showToast({
            title: '请重新选择投放时间',
            icon: 'none',
            duration: 1500
          })
          return;
        } else {
          data.push(data1[i]);
        }

      }
      console.info(data)
      wx.navigateTo({
        url: '/pages/Settlement/Settlement?data=' + JSON.stringify(data) + "&key=" + key,
      })
    }

  },
  // 勾选状态
  checkout: function(e) {
    console.info(e)
    var that = this;
    var index = e.target.dataset.index;
    if (that.data.shopObjArr == '') {
      //没有选中任何一个
      var shoppingDate = that.data.ShoppingCart[index].shoppingDate;
      if (shoppingDate == "请选择") {
        wx.showToast({
          title: '请选择投放时间',
          icon: 'none',
          duration: 1500
        })
      } else {
        var state = that.data.ShoppingCart[index].check;
        that.data.ShoppingCart[index].check = !state
        that.setData({
          ShoppingCart: that.data.ShoppingCart
        })

        if (that.data.shopIndexArr.indexOf(index) == -1) {
          //该信息不存在，添加
          that.data.shopIndexArr.push(index);
          that.data.shopObjArr.push(that.data.ShoppingCart[index]);
        } else {
          that.data.shopIndexArr.splice(that.data.shopIndexArr.indexOf(index), 1);
          that.data.shopObjArr.splice(that.data.shopObjArr.indexOf(that.data.ShoppingCart[index]), 1);
          //该信息存在，取消选择
        }
      }
    } else {
      //存在选中信息
      if(index == that.data.shopIndexArr[0]){
        //是同一条破信息
        console.info("是同一条信息")
        if (that.data.shopIndexArr.indexOf(index) == -1) {
          //该信息不存在，添加
          that.data.shopIndexArr.push(index);
          that.data.shopObjArr.push(that.data.ShoppingCart[index]);
        } else {
          that.data.shopIndexArr.splice(that.data.shopIndexArr.indexOf(index), 1);
          that.data.shopObjArr.splice(that.data.shopObjArr.indexOf(that.data.ShoppingCart[index]), 1);
          //该信息存在，取消选择
        }
      }else{
        wx.showToast({
          title: '请先结算选中的商品',
          icon: 'none',
          duration: 1500
        })
      }
      
    }
    console.info(that.data.shopIndexArr)
    console.info(that.data.shopObjArr)

  },
  //日期
  riqi: function(e) {
    console.info(e)
    var index = e.currentTarget.dataset.index;
    console.info(index)
    this.setData({
      shopCartIndex: index,
    })
    if (this.data.dayNum != 0) {
      var daynum = this.data.dayNum;
    } else {
      var daynum = this.data.ShoppingCart[index].daynum;
    }
    var sellerAdvertiseId = this.data.ShoppingCart[index].sellerAdvertiseId;
    wx.navigateTo({
      url: '/pages/Addetailspage/Addetailspage?daynum=' + daynum + "&sellerAdvertiseId=" + sellerAdvertiseId,
    })
  },

  //去登陆，跳转到我要发广告页面
  goLogin: function() {
    wx.reLaunch({
      url: '/pages/me/wode',
    })
  },
})