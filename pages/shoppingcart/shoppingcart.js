var app = getApp();
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
  },
  onLoad: function(option) {
    var that = this;
    //判断用户身份，来显示不用的页面
    console.info(app.globalData.UserRoles)
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
              console.info(res)
              if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                  //循环设定广告位对应的广告位信息的第一张图片
                  res.data[i].sellerAdvertise.sellerInfo.advertiseImgs = JSON.parse(res.data[i].sellerAdvertise.sellerInfo.advertiseImgs);
                  //循环设定广告位距用户的距离
                  res.data[i].sellerAdvertise.distances = (res.data[i].sellerAdvertise.distances / 1000).toFixed(1);
                  res.data[i].isTouchMove = false;
                  res.data[i].flag = true;
                  res.data[i].priceindex = 0;
                  res.data[i].number = 1;
                  res.data[i].check = false;
                  res.data[i].price = [res.data[i].sellerAdvertise.unitPrice + "元/1天", res.data[i].sellerAdvertise.unitPrice * 5 + "元/5天", res.data[i]                                        .sellerAdvertise.unitPrice * 10 + "元/10天", res.data[i].sellerAdvertise.unitPrice * 20 + "元/20天", res.data[i]                                           .sellerAdvertise.unitPrice * 30 + "元/30天"];
                }
              }
              that.setData({
                ShoppingCart: res.data,
                jiesuan: false,
                clear: false,
                tourist: 'display:none',
                Nonconformity: 'display:none',
              })
              console.info("下面是购物陈高转换好的信息;")
              console.info(that.data.ShoppingCart)
            }
          })
        }
      })
      //查询用户全部购物车信息end
    }
  },
  onShow: function() {

  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {

    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
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

    that.data.items.forEach(function(v, i) {
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
      items: that.data.items
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
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },
  // //加号 
  // addpush: function(e) {
  //   var index = e.target.dataset.index;
  //   this.data.items[index].number++
  //     this.setData({
  //       items: this.data.items
  //     })
  // },
  // //减号 
  // reduce: function(e) {
  //   var index = e.target.dataset.index;
  //   this.data.items[index].number--
  //     this.setData({
  //       items: this.data.items
  //     })
  // },
  //选择价格 
  textjiage: function(e) {
    var that = this;
    var data = e.target.dataset.data;
    var index = e.target.dataset.index;
    that.data.items[data].priceindex = index
    // console.log(that.data.price[index]); 
    // console.log(that.data.items[data].money);
    that.data.items[data].money == that.data.price[index];
    // "items[" + data + "].money";
    var key = "items[" + data + "].money";
    // var key = that.data.items[data].money
    var item = that.data.price[index]
    that.setData({
      items: that.data.items,
      [key]: item //选择的价格
    })
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
    var index = e.target.dataset.index;
    var state = this.data.items[index].check;
    this.data.items[index].check = !state
    this.setData({
      items: this.data.items
    })
  },
  //日期
  riqi: function() {
    wx.navigateTo({
      url: '/pages/Addetailspage/Addetailspage?daynum=' + 5 + "&sellerAdvertiseId=" + 52,
    })
  },

  //去登陆，跳转到我要发广告页面
  goLogin: function() {
    wx.navigateTo({
      url: '/pages/me/wode',
    })
  },
})