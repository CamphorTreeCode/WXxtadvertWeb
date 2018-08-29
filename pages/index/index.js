// 引入SDK核心类
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk;
var a = 0;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页活动会员banner是否显示
    vipIsShow:true,
    //首页活动会员展示图
    vip_banner:'',
    dw: "https://www.chuanshoucs.com/ServerImg/2018-07-24/4bc5d507-7969-4a6a-935c-56097668a7ec.png",
    ss: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/db1613ea-713e-41df-badb-eed83fc7e27a.png',
    site: '',
    place: '搜索投放点名称、地址',
    news_img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/60bb9f57-211e-4bd1-af2e-78398f168eb1.png',
    news_text: '最新',
    recommend_img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/171d28eb-3de7-4518-81fa-7c116e63c00c.png',
    recommend_text: '推荐',
    superior_img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/21379e69-373e-462b-bb85-bb7b06a1667a.png',
    superior_text: '优质',
    native_img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/249c7606-662e-435b-a0d8-b0e8c139ff7e.png',
    native_text: '本地',
    advertising_top_left: [{
      img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/d134a7b2-77df-42a1-9552-97652b4a7723.png',
      text: '广告位推荐'
    }],
    advertising_top_right: [{
      img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/118a713a-364d-4d59-80b2-8a72be22996c.png',
      text: '换一批'
    }],
    referrer: [{
      img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/a7644d4b-a06a-401a-a21c-d312eaf61139.png',
      address: '上海松江万达',
      flow: '人流量:900/天',
      unit: '20元/天'
    }, {
      img: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/f36a7fe6-b690-4122-bbea-4c0b2b04f28b.png',
      address: '东方明珠电视塔',
      flow: '人流量:3000/天',
      unit: '100元/天'
    }],
    listbox: [{
        img: 'http://up.enterdesk.com/edpic_source/f5/34/83/f53483429ccc69d00ae98dd5f05317a4.jpg',
        lable: '水母田',
        title: '比奇堡水母田',
        flow: '人多',
        distance: '据您 100000km',
        unit: '500元/天',
        site: '美国 比奇堡',
        surplus: 235,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://fe.topitme.com/e/13/41/11315694278344113eo.jpg',
        lable: '四维空间',
        title: '哆啦A梦',
        flow: '地段优越',
        distance: '据您 500km',
        unit: '20元/天',
        site: '日本 东京',
        surplus: 4244,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://pic.58pic.com/58pic/13/14/26/44Z58PICaEP_1024.jpg',
        lable: '足球场',
        title: '上海体育中心',
        flow: '靠近地铁',
        distance: '据您24.7km',
        unit: '230元/天',
        site: '上海 长宁',
        surplus: 781,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://uploads.5068.com/allimg/1806/189-1P613160353-50.jpg',
        lable: '手办馆',
        title: '杜莎蜡像馆',
        flow: '市中心',
        distance: '据您44.5km',
        unit: '200元/天',
        site: '上海 徐汇区',
        surplus: 451,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://pic.ffpic.com/files/2013/0418/sj0419dmt05.jpg',
        lable: '臭脸服务员',
        title: '上海本帮菜酒店',
        flow: '质量优',
        distance: '据您34km',
        unit: '5000元/天',
        site: '上海 浦东',
        surplus: 765,
        plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
        quantity: 0,
        subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
        hide: 'none'
      },
      {
        img: 'http://up.enterdesk.com/edpic_source/f5/34/83/f53483429ccc69d00ae98dd5f05317a4.jpg',
        lable: '水母田',
        title: '比奇堡水母田',
        flow: '车祸高发',
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
        flow: '集体跳楼',
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
        flow: '午夜亡魂',
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
        flow: '单身狗',
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
        flow: '地球爆炸',
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
    // 实时获取用户坐标
    var that = this;
    wx.getLocation({
      success: function(res) {
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
            this.site = res.result.address_component.city;
            console.log(this);
            console.log(res.result.address_component.city + res.result.address_component.district);
            // console.log(this.site);
            that.setData({
              site: this.site
            })
          }
        })

      },
      
    });
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MR3BZ-43WC2-CQQUD-CSUJU-4YVME-OLBLK'
    });

    //首页活动会员图片start
    wx.request({
      url: app.globalData.appUrl + 'WXActivityMemberLevel/findAllActivityMemberLevel',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询活动会员信息：")
        console.info(res.data.ActivityMemberLevel)
        var isOpen = res.data.ActivityMemberLevel.isOpen;
        if (isOpen == 1){
          //活动开启
          that.setData({
            vipIsShow:false,
            vip_banner: res.data.ActivityMemberLevel.specialActivitiesImg,
          })
        } else if (isOpen == 0){
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
    a = a + 1;
    console.log(a)
    this.animation.rotate(a * 180).step();
    this.setData({
      animation: this.animation.export()
    });
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
  // 跳转到 city
  jump: function() {
    wx.navigateTo({
      url: '../switchcity/switchcity'
    })
  },
  // 跳转到搜索
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 跳转到最新
  news: function() {
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
  xiangqing: function() {
    wx.navigateTo({
      url: '../Addetails/Addetails',
    })
  },
  // vip_banner
  vip_banner: function() {
    wx.navigateTo({
      url: '../vipbanner/vipbanner',
    })
  }
})