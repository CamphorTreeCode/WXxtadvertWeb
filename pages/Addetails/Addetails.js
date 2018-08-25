// pages/Addetails/Addetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //遮罩层  
    flag: false,
    // 海报
    poster: false,
    //累计投放
    put: '23',
    //剩余
    residue: '5',
    //价格
    jiage: "block",
    price: ["40元/1天", "200元/5天", "400元/10天", "800元/20天", "1200元/30天"],
    priceindex: 0,
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
    listbox: [
      {
        img: 'http://up.enterdesk.com/edpic_source/f5/34/83/f53483429ccc69d00ae98dd5f05317a4.jpg',
        lable: '水母田',
        title: '比奇堡水母田',
        flow: '牛逼',
        distance: '据您 100000km',
        unit: '500元/天',
        site: '美国 比奇堡',
        surplus: 455,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://fe.topitme.com/e/13/41/11315694278344113eo.jpg',
        lable: '四维空间',
        title: '哆啦A梦',
        flow: '流量大',
        distance: '据您 500km',
        unit: '20元/天',
        site: '日本 东京',
        surplus: 5440,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://pic.58pic.com/58pic/13/14/26/44Z58PICaEP_1024.jpg',
        lable: '足球场',
        title: '上海体育中心',
        flow: '质量好',
        distance: '据您24.7km',
        unit: '230元/天',
        site: '上海 长宁',
        surplus: 454,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://uploads.5068.com/allimg/1806/189-1P613160353-50.jpg',
        lable: '手办馆',
        title: '杜莎蜡像馆',
        flow: '销量高',
        distance: '据您44.5km',
        unit: '200元/天',
        site: '上海 徐汇区',
        surplus: 786,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://pic.ffpic.com/files/2013/0418/sj0419dmt05.jpg',
        lable: '臭脸服务员',
        title: '上海本帮菜酒店',
        flow: '人比较傻',
        distance: '据您34km',
        unit: '5000元/天',
        site: '上海 浦东',
        surplus: 456,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      }
    ]
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
  jump:function(){
    wx.navigateTo({
      url: '../Addetailspage/Addetailspage',
    })
  }
})