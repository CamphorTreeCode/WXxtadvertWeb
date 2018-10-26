var app = getApp();

function findall(a, x) {
  var results = [],
    len = a.length,
    pos = 0;
  while (pos < len) {
    pos = a.indexOf(x, pos);
    if (pos === -1) {//未找到就退出循环完成搜索
      break;
    }
    results.push(pos);//找到就存储索引
    pos += 1;//并从下个位置开始搜索
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
    shoppingCartId:'',
    //无内容显示
    sclength:false,
    //价格选中状态下标
    // idx:0,
    //价格数组
    priceNum:0,
    //投放周期
    period: {},
  },
  onLoad: function(option) {
    var that = this;
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
        Nonconformity: 'display:block'
      })
    } else if (roles == 0) {
      console.info("我是游客")
      //未登录，游客
      that.setData({
        jiesuan: true,
        clear: true,
        items: {},
        tourist: 'display:block'
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
                  if (res.data[i].shoppingDate == undefined){
                    res.data[i].shoppingDate = '请选择';
                  }else{
                    res.data[i].shoppingDate = JSON.parse(res.data[i].shoppingDate);
                  }
                  
                  res.data[i].isTouchMove = false;
                  res.data[i].flag = true;
                  res.data[i].priceindex = findall([
                                                    res.data[i].sellerAdvertise.unitPrice,
                                                    res.data[i].sellerAdvertise.unitPrice * 5,
                                                    res.data[i].sellerAdvertise.unitPrice * 10,
                                                    res.data[i].sellerAdvertise.unitPrice * 20,
                                                    res.data[i].sellerAdvertise.unitPrice * 30], res.data[i].shopuUnitPrice);
                  res.data[i].number = 1;
                  res.data[i].check = false;
                  // res.data[i].priceNum = findall([
                  //                                 res.data[i].sellerAdvertise.unitPrice,
                  //                                 res.data[i].sellerAdvertise.unitPrice * 5,
                  //                                 res.data[i].sellerAdvertise.unitPrice * 10,
                  //                                 res.data[i].sellerAdvertise.unitPrice * 20,
                  //                                 res.data[i].sellerAdvertise.unitPrice * 30], res.data[i].shopuUnitPrice);
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
                that.setData({
                  ShoppingCart: res.data,
                  jiesuan: false,
                  clear: false,
                  tourist: 'display:none',
                  Nonconformity: 'display:none',
                  sclength:true,
                  
                })
                console.info("下面是购物陈高转换好的信息;")
                console.info(that.data.ShoppingCart);
              }else{
                //没有数据
                that.setData({
                  sclength:false,
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
  },
  onShow: function() {
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
      success: function (res) {
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
            success: function (res) {
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
  clearAll:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定清空购物车吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //删除全部购物车start
          wx.request({
            url: app.globalData.appUrl + 'WXShopCar/removeShoppingCartAllInfo',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              xcxuser_name: "xcxuser_name"
            },
            success: function (res) {
              console.info("购物车删除成功")
              console.info(res);
              that.setData({
                ShoppingCart: [],
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
    that.data.ShoppingCart[data].shopuUnitPrice == that.data.ShoppingCart[data].price[index];
    // "items[" + data + "].money";
    var key = "ShoppingCart[" + data + "].shopuUnitPrice";
    // var key = that.data.items[data].money
    var item = that.data.ShoppingCart[data].price[index]
    // console.info(key)
    // console.info(item.substring(item.indexOf("/"), item.indexOf("天")))
    that.setData({
      ShoppingCart: that.data.ShoppingCart,
      [key]: item //选择的价格
    })
    // console.info(that.data.ShoppingCart)
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
    console.log("123")
    wx.navigateTo({
      url: '/pages/Settlement/Settlement',
    })
  },
  // 勾选状态
  checkout: function(e) {
    console.info(e)
    var index = e.target.dataset.index;
    var state = this.data.ShoppingCart[index].check;
    this.data.ShoppingCart[index].check = !state
    this.setData({
      ShoppingCart: this.data.ShoppingCart
    })
  },
  //日期
  riqi: function(e) {
    console.info(e)
    var index = e.currentTarget.dataset.index;
    var daynum = this.data.ShoppingCart[index].daynum;
    var sellerAdvertiseId = this.data.ShoppingCart[index].sellerAdvertiseId;
    wx.navigateTo({
      url: '/pages/Addetailspage/Addetailspage?daynum=' + daynum + "&sellerAdvertiseId=" + sellerAdvertiseId,
    })
  },

  //去登陆，跳转到我要发广告页面
  goLogin: function() {
    wx.navigateTo({
      url: '/pages/me/wode',
    })
  },
})