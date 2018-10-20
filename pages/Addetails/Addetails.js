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
    //海报事件
    haibao: true,
    //投放周期
    period: {},
    //广告位id
    sellerAdvertiseId: 0,
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
    //单价
    unitPrice:0,
    //选择的天数和总价
    daynum: 1,
    totalPrice: '',
    //标签集合
    lableList:[],
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
    //收藏id
    buyerCollectionId:null,
    //收藏对象
    buyerCollection:{},
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
    // identit: "3",
    foter: 'block',
    recommend: '同屏推荐',
    listbox: [],
    adv:[],
    collectionContent:[],
    //收藏是否失效
    isinvalid:0,
    shade: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.info("下面是页面传值：")
    console.info(options)
    that.setData({
      isinvalid: options.isinvalid
    })
    //查询用户是否收藏start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerController/findIsCollection', //仅为示例，并非真实的接口地址
      data: {
        sellerAdvertiseId: options.sellerAdvertiseId,
        openId: app.returnOpenId()
      },
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        //'content-type': 'application/json', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是该用户收藏状态：1:已收藏  0:未收藏")
        console.log(res.data)
        if (res.data != "") {
          console.log("已经收藏")
          that.setData({
            collection: true,
            Tcollection: false,
            buyerCollectionId: res.data.buyerCollectionId,
          })
        } else if (res.data == "") {
          console.log("未收藏")
          that.setData({
            collection: false,
            Tcollection: false
          })
        }
      }
    })
    //查询用户是否收藏end

    //根据传入的广告位id查询对应的广告位
    if (!options.collectionContent) {
      console.info("不是页面传的广告位")
    wx.request({
      url: app.globalData.appUrl + 'WXSellerAdvertise/findById',
      data: {
        SellerAdvertiseId: options.sellerAdvertiseId,
        openId: app.returnOpenId(),
      },
      success: function(res) {
        console.info("下面是广告位详情信息：")
        console.info(res)
        var adv = res.data;
        that.data.collectionContent.push(adv);
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
          userImgList: adv.userImgList,
          unitPrice: adv.unitPrice,
          lableList: adv.lableList,
          // adv:adv,
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
                console.info("下面是同屏推荐信息")
                console.info(res.data)
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
                that.data.collectionContent.push(res.data);
              }
            })
          },
        })
      }
    })
    } else {
      console.log("页面传的广告位：")
      console.log(options)
      console.info(app.globalData.collectionContent)
      var collectionContent = app.globalData.collectionContent;
      that.setData({
        sellerAdvertiseId: collectionContent[0].sellerAdvertiseId,
        swiper: JSON.parse(collectionContent[0].sellerInfo.advertiseImgs),
        sellerName: collectionContent[0].sellerInfo.sellerName,
        put: collectionContent[0].sellerVolume == undefined ? 0 : collectionContent[0].sellerVolume,
        price: [collectionContent[0].unitPrice + "元/1天", collectionContent[0].unitPrice * 5 + "元/5天", collectionContent[0].unitPrice * 10 + "元/10天", collectionContent[0].unitPrice * 20 + "元/20天", collectionContent[0].unitPrice * 30 + "元/30天"],
        totalPrice: collectionContent[0].unitPrice,
        advertiseTypeName: collectionContent[0].sellerInfo.advertiseType.advertiseTypeName,
        sellerAddress: collectionContent[0].sellerInfo.sellerAddress,
        advertiseIntro: collectionContent[0].sellerInfo.advertiseIntro,
        advertiseBrowser: collectionContent[0].advertiseBrowser,
        userImgList: collectionContent[0].userImgList,
        unitPrice: collectionContent[0].unitPrice,
        lableList: collectionContent[0].lableList,
        listbox: collectionContent[1]
      })
    }

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
  onShareAppMessage: function (options) {
    console.log(options)
    var sellerName = this.data.sellerName;
    var advertiseTypeName = this.data.advertiseTypeName;
    var price = this.data.price[0];
    return {
      title: "火热广告位"+"【" + sellerName + " 】" + "，地点： " + advertiseTypeName + "，单价：" + price,
    }
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
    //选择的天数和对应的总价格
    var price = this.data.price[index];
    this.setData({
      priceindex: index,
      // choosePrice: price,
    })
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
  collection: function(e) {
    var that = this;
    console.info("下面是收藏传值信息：")
    console.info(e)
    var buyerCollection = that.data.buyerCollection;
    var collectionContent = that.data.collectionContent;
    var buyerCollectionId = e.currentTarget.dataset.buyercollectionid;
    buyerCollection.sellerAdvertiseId = e.currentTarget.dataset.selleradvertiseid;
    buyerCollection.collectionContent = JSON.stringify(collectionContent) ;
    buyerCollection.openId = app.returnOpenId();
    console.info("下面是收藏信息")
    console.info(buyerCollection);
    
    // 改变当前收藏状态
    if (that.data.collection == false) {
      //未收藏，点击收藏
      console.info("未收藏，点击收藏")
      //请求收藏接口 start
      wx.request({
        url: app.globalData.appUrl + 'WXBuyerController/addBuyerCollectionMsg',
        data: buyerCollection,
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
            console.info(res);
          console.info(res.data.buyerCollectionId)
            console.log("收藏成功")
            that.setData({
              collection: true,
              Tcollection: true,
              buyerCollectionId: res.data.buyerCollectionId,
            })
        }
      })
      //请求收藏接口 start
    } else if (that.data.collection == true) {
      //已经收藏，点击取消收藏
      console.info("已经收藏，点击取消收藏")
      //取消收藏接口 start
      wx.request({
        url: app.globalData.appUrl + 'WXBuyerController/removeBuyerCollection',
        data: {
          buyerCollectionId: buyerCollectionId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          console.info("取消收藏成功")
          console.info(res);
            that.setData({
              collection: false,
              Tcollection: true
            })
          } 
        
      })
      //取消收藏接口 end
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
    if (app.globalData.UserRoles == 1) {
      if (this.data.Shopping == true && this.data.Shoppinged == false) {
        //加入购物车start
        var shoppingDate;
        console.info(that.data.period.orderDate)
        console.info(that.data.totalPrice)
        if (that.data.period.orderDate != undefined){
          shoppingDate = that.data.period.orderDate;
        }else{
          shoppingDate = '';
        }
        var shoppingCart = {};
        shoppingCart.unitPrice = that.data.totalPrice;
        shoppingCart.shoppingDate = shoppingDate;
        shoppingCart.sellerAdvertiseId = that.data.sellerAdvertiseId;
        shoppingCart.openId = app.returnOpenId();
        console.info(shoppingCart)
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
            // that.setData({
            //   collection: false,
            //   Tcollection: true
            // })
          }

        })
          //加入购物车end

        // this.setData({
        //   Shopping: false,
        //   ShoppingCart: true,
        //   Shoppinged: true
        // })
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
    } 
    // else if (this.data.identit == "1") {
    //   that.setData({
    //     notshopping: true,
    //     flag: true,
    //     Stxt: "你所注册的账号还在审核中,稍后将告知你结果"
    //   })
    // } 
    else if (this.data.identit == 2) {
      that.setData({
        notshopping: true,
        flag: true,
        Stxt: "你所登陆的账号身份不符,不能加入购物车.如需加入购物车,请登录（我要发广告）"
      })
    } else if (this.data.identit == 0) {
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
    // if (this.data.identit == "1") {
    //   that.setData({
    //     notshopping: true,
    //     flag: true,
    //     Stxt: "你所注册的账号还在审核中,稍后将告知你结果"
    //   })
    // } else if (this.data.identit == "2") {
    //   that.setData({
    //     notshopping: true,
    //     flag: true,
    //     Stxt: "你所登陆的账号身份不符,如需预约.请退出当前账号,登录我要发广告账号"
    //   })
    // } else if (this.data.identit == "3") {
    //   that.setData({
    //     notshopping: true,
    //     flag: true,
    //     Stxt: "你还是游客,不能进行此操作。如需预约,请登录（我要发广告）"
    //   })
    // }
    console.info(that.data.period)
    
    var that = this
    if (that.data.period.orderday == undefined) {

      wx.showModal({
        title: '提示',
        content: '请选择投放周期',
      })
      return false;
    }
    var orderDate = that.data.period.orderDate
    var orderday = that.data.period.orderday
    // wx.request({
    //   url: app.globalData.appUrl + 'WXPay/SellerAdvertisePay',
    //   data: {
    //     sellerAdvertiseId: that.data.sellerAdvertiseId,
    //     orderDate: JSON.stringify(that.data.period.orderDate),
    //     orderday: orderday,
    //     SellerAdvertiseBody: "对应的广告位信息",
    //     openid: app.returnOpenId(),
    //     // total_fee: that.data.totalPrice,
    //     total_fee: 1,
    //     body: '享投广告屏购买',
    //     payMode: 0,
    //     buyerAccountId: 10,
    //   },
    //   success: function(res) {
    //     if (res.data.error != undefined) {

    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.error,
    //       })
    //     }else{
    //       PayUtils(res.data.prepay_id, app.globalData.appUrl + 'WXPay/SellerAdvertisePaySuccess', { orderListId: res.data.orderId, orderday: JSON.stringify(that.data.period.orderday)},'/pages/index/index')
    //     }

    //   }
    // })
    var date = {
      swiper: that.data.swiper,
      sellerName: that.data.sellerName,
      lableList: that.data.lableList,
      distances: that.data.listbox[0].distances,
      unitPrice: that.data.unitPrice,
      sellerAdvertiseId: that.data.sellerAdvertiseId,
      openid: app.returnOpenId(),
      // total_fee: that.data.totalPrice,
      total_fee: 1,
      body: '享投广告屏购买',
      buyerAccountId: 5,
      orderDate: that.data.period.orderDate,
      orderday: orderday,
      daynum: that.data.daynum,
      
    };
    wx.navigateTo({
      url: '/pages/Settlement/Settlement?data='+JSON.stringify(date),
    })
    
  },
  // 海报转发
  forward: function() {
    this.setData({
      flag: true,
      poster: true,
      foter: 'none'
    })
  },

  //生成海报事件start
  getGoodsQrcode: function () {
    wx.showLoading({
      title: '正在生成海报...',
      mask: true,
    });

    var that = this;
    console.info("生成海报事件触发")
    console.info(that.data.CompanyJobId)
    //获取Access_Token
    wx.request({
      url: app.globalData.appUrl + 'WXGetQR_CodeController/getewm', //仅为示例，并非真实的接口地址
      data: {
        scene: that.data.sellerAdvertiseId,
        page: "/pages/Addetails/Addetails"
      },
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        //'content-type': 'application/json', // 默认值
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("返回的小程序码为：")
        console.log(res.data)
        var localCode = res.data;
        console.info(localCode)

        wx.downloadFile({
          url: res.data,
          success: function (QRCode) {
            console.info(QRCode.tempFilePath)
            that.setData({
              Img: QRCode.tempFilePath,
            })
            wx.downloadFile({
              url: that.data.swiper[0],
              success: function (jobImage) {
                that.setData({
                  //岗位图片下载缓存
                  jobImage: jobImage.tempFilePath,
                })

                //画布高度
                let scrollHeight = wx.getSystemInfoSync().windowHeight * 0.9;
                //画布宽度
                let scrollWidth = wx.getSystemInfoSync().windowWidth * 0.9;
                //用户昵称
                // var nickname = app.globalData.userInfo.nickName;
                // if (nickname.length > 4) {
                //   nickname = nickname.substring(0, 3) + "..."
                // };
                //用户头像
                // var userImg = that.data.userImg;
                //职位图片
                var jobImage = that.data.jobImage;
                //公司名称
                var sellerName = that.data.sellerName;
                if (sellerName.length > 9) {
                  sellerName = sellerName.substring(0, 8) + "..."
                }
                //广告位价格     
                var price = that.data.price[0];
                //广告类型
                var advertiseTypeName = that.data.advertiseTypeName;
                //小程序码
                // var QRCode = res.data;
                var QRCode = that.data.Img;

                that.setData({
                  haibao: false,
                  poster: false,
                  height: scrollHeight,
                  width: scrollWidth
                })
                const ctx = wx.createCanvasContext('shareCanvas');
                ctx.clearRect(0, 0, scrollWidth * 0.9, scrollHeight * 0.9);
                ctx.drawImage("/img/detail/background.jpg", 0, 0, scrollWidth * 0.9, scrollHeight * 0.9);
                ctx.drawImage(jobImage, 12.5, 35, scrollWidth * 0.9 - 23, scrollWidth * 0.9 - 90);
                ctx.fillText(sellerName, 12.5, scrollWidth * 0.9 - 25)
                ctx.fillText("单价：" + price , 12.5, scrollWidth * 0.9 - 5)
                ctx.fillText("广告类型：" + advertiseTypeName, 12.5, scrollWidth * 0.9 + 15)
                ctx.fillStyle = '#999';
                ctx.setFontSize(12)
                ctx.fillText('长按识别小程序码访问', 12.5, scrollHeight * 0.9 * 0.7 + 25)
                ctx.drawImage(QRCode, scrollWidth * 0.9 - 118, scrollHeight * 0.9 * 0.525, 110, 110);
                // ctx.drawImage("/img/postdetails/logo.png", scrollWidth * 0.9 - 85, scrollHeight * 0.9 * 0.5875, 45.25, 45.5);
                ctx.draw()

                wx.hideLoading()
                setTimeout(function () {
                  wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    canvasId: 'shareCanvas',
                    success: function (res) {
                      console.log('朋友圈分享图生成成功:' + res.tempFilePath)

                      that.setData({
                        filePath: res.tempFilePath
                      })
                      //删除本地存放的小程序码
                      wx.request({
                        url: app.globalData.appUrl + 'WXGetQR_CodeController/deleteLocalCode',
                        data: {
                          localCode: localCode,
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded', // 默认值
                          xcxuser_name: "xcxuser_name"
                        },
                        success: function (res) {
                          console.info(res)
                        }
                      })
                    },
                    fail: function (err) {
                      console.log('失败')
                      console.log(err)
                    }
                  })
                }, 1000)
              },
            })
          },
        })
      }
    })
  },
  //生成海报事件start

  //预览图片
  preview_img: function () { //图片预览函数
    var that = this;
    console.info(that.data.filePath);
    wx.previewImage({
      current: that.data.filePath, // 当前显示图片的http链接
      urls: [that.data.filePath] // 需要预览的图片http链接列表
    })
  },

  touchStart: function () {
    var that = this;
    console.info(that.data.filePath);
    wx.previewImage({
      current: that.data.filePath, // 当前显示图片的http链接
      urls: [that.data.filePath] // 需要预览的图片http链接列表
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

  //关闭海报
  closeHaiBao: function () {
    var that = this;
    console.info("关闭海报事件触发")
    that.setData({
      poster: false,
      foter: 'block',
      haibao: true,
      flag: false,
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
      that.data.listbox[index].plus = '/img/detail/hjia.png'
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
      that.data.listbox[index].plus = '/img/detail/yjia.png'
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
  },
  //跳转详情页
  detail: function (e) {
    console.info(e)
    wx.navigateTo({
      url: '/pages/Addetails/Addetails?sellerAdvertiseId=' + e.currentTarget.dataset.selleradvertiseid
    })
  }

})