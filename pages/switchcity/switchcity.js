var city = require('../../utils/city.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();
//欢迎关注:http://www.wxapp-union.com/portal.php
//CSDN微信小程序开发专栏:http://blog.csdn.net/column/details/13721.html
Page({
  data: {
    //城市名
    top_title: '上海',
    //当前城市
    nowCity: '',
    //当前街道
    nowRegion: '',
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    //热门城市
    hot: [],
  },
  onLoad: function(options) {
    var that = this;
    console.info("下面是页面传值：")
    console.info(options)
    that.setData({
      top_title: options.site,
      nowCity: options.site,
      nowRegion: options.addressDetail,
    })

    // 实时获取用户当前位置start
    wx.getLocation({
      success: function (res) {
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
          success: function (res) {
            console.info("地址信息：")
            console.info(res)
            this.site = res.result.address_component.city;
            console.log(this);
            console.log(res.result.address_component.city + res.result.address_component.district);
            var addressDetail = res.result.address_component.street;
            // console.log(this.site);
            that.setData({
              top_title: this.site,
              // addressDetail: addressDetail,
            })
          }
        })
      },
    });

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MR3BZ-43WC2-CQQUD-CSUJU-4YVME-OLBLK'
    });
    // 实时获取用户当前位置end

    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    // console.log(cityInfo);

    var sysInfo = wx.getSystemInfoSync();
    // console.log(sysInfo);
    var winHeight = sysInfo.windowHeight;
    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;

      tempObj.push(temp)
    }

    that.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

    //查询热门城市次数最多的前四个start
    wx.request({
      url: app.globalData.appUrl + 'WXHotCity/findHotCity',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询热门城市返回的信息：")
        console.info(res)
        var hot = that.data.hot;
        if (res.data.length > 0) {
          // for (var i = 0; i < res.data.length; i++) {
          //   console.info("11111")
          //   if (res.data[i].hotCityName.length > 7) {
          //     res.data[i].hotCityName = res.data[i].hotCityName.slice(0, 7) + "...";
          //   }
          //   hot.push(res.data[i])
          // }
          that.setData({
            hot: res.data
          })
          console.info(hot)
        }
      }
    })
    //查询热门城市次数最多的前四个end

  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function() {
    // 生命周期函数--监听页面显示

  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  searchStart: function(e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },
  searchMove: function(e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    // console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    } else { //向下移动
      if (pageY > bHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function(e) {
    // console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that = this;
    setTimeout(function() {
      that.setData({
        isShowLetter: false
      })
    }, 1000)

  },
  nowLetter: function(pageY, that) { //当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);
    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },
  bindScroll: function(e) {
    // console.log(e.detail)
  },
  setScrollTop: function(that, showLetter) {
    var scrollTop = 0;

    var cityList = that.data.cityList;
    var cityCount = 0;
    var initialCount = 0;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i].initial) {
        scrollTop = initialCount * 30 + cityCount * 41;
        break;
      } else {
        initialCount++;
        cityCount += cityList[i].cityInfo.length;
      }
    }
    that.setData({
      scrollTop: scrollTop
    })
  },
  bindCity: function(e) {
    var that = this;
    console.info("用户选择城市信息：")
    console.info(e)
    var city = e.currentTarget.dataset.city;
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      site: city,
    })
    var hotCity = {};
    hotCity.hotCityName = city;
    //增加热门城市start
    wx.request({
      url: app.globalData.appUrl + 'WXHotCity/addHotCity',
      data: hotCity,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是点击城市返回的信息：")
        console.info(res)
      }
    })
    //增加热门城市end

    wx.navigateBack({
      delta: 1
    })
  },

  //热门城市点击事件
  hotEvent:function(e){
    console.info(e)
    var city = e.currentTarget.dataset.hotcityname;
    var hotcityId = e.currentTarget.dataset.hotcityid;
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      site: city,
    })
    var hotCity = {};
    hotCity.hotCityName = city;
    //增加热门城市start
    wx.request({
      url: app.globalData.appUrl + 'WXHotCity/addHotCity',
      data: hotCity,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是点击城市返回的信息：")
        console.info(res)
      }
    })
    //增加热门城市end

    wx.navigateBack({
      delta: 1
    })
  },
})