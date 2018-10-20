// pages/me/shoucang.js
var app = getApp();
function findBuyerCollectionList(that){
  var openId = app.returnOpenId();
  wx.request({
    url: app.globalData.appUrl + 'WXBuyerController/findBuyerCollectionList',
    data: { openId: openId, currentPage: ++that.data.pageSize},
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      xcxuser_name: "xcxuser_name"
    },
    success: function (res) {
      console.info("下面是查询用户收藏列表信息：")
      console.info(res)
      if (res.data.lists.length > 0) {
        var buyerCollectionList = that.data.buyerCollectionList;
        for (var i = 0; i < res.data.lists.length; i++) {
          res.data.lists[i].sellerAdvertise.sellerInfo.advertiseImgs = JSON.parse(res.data.lists[i].sellerAdvertise.sellerInfo.advertiseImgs);
          res.data.lists[i].state = "false";
          res.data.lists[i].collectionContent = JSON.parse(res.data.lists[i].collectionContent);
          buyerCollectionList.push(res.data.lists[i]);
        }
        that.setData({
          buyerCollectionList: buyerCollectionList,
        })
        console.info(buyerCollectionList);
      } 
      // else if (res.data.lists.length <= 0){
      //   that.setData({
      //     aaa: false,
      //     jie: false,
      //   })
      // }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //aaa判断用户身份收藏弹框
    aaa: true,
    //左滑显示取消收藏
    state: false,
    //接广告进来显示暂未开放
    jie: false,
    //页码
    pageSize: 0,
    //收藏列表
    buyerCollectionList:[],
    //用户身份
    roles:0,
    array: 
      [{
        name: '上海松江区万达广告位',
        state: false,
        tag: 
        [
          {
          tagname:'人流量300/天'
          }
        ]
       },
        {
          name: '上海松江区万达广告位',
          state: false,
          tag:
            [
              {
                tagname: '人流量100/天'
              }
            ]
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      roles: options.roles,
    })
    if (that.data.roles == 2){
      //接广告暂未开放
      that.setData({
        aaa:false,
        jie:true,
      })
    } else if (that.data.roles == 0){
      //游客
      that.setData({
        aaa: false,
        jie: false,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (that.data.roles == 1){
      that.setData({
        pageSize: 0,
        buyerCollectionList: [],
      })
      //查询收藏列表start
      findBuyerCollectionList(that);
    //查询收藏列表end
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
    findBuyerCollectionList(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      imageUrl: app.globalData.shareImg,
    }
  },
  touchstart: function (e) {
    //开始触摸时 重置所有取消收藏
    this.data.buyerCollectionList.forEach(function (v, i) {
      if (v.state)//只操作为true的
        v.state = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      buyerCollectionList: this.data.buyerCollectionList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.buyerCollectionList.forEach(function (v, i) {
      v.state = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.state = false
        else //左滑
          v.state = true
      }
    })
    //更新数据
    that.setData({
      buyerCollectionList: that.data.buyerCollectionList
    })
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //去看看
  qkk: function (e) {
    console.info(e)
    var isinvalid = e.currentTarget.dataset.isinvalid;
    var index = e.currentTarget.dataset.index;
    var collectionContent = this.data.buyerCollectionList[index].collectionContent;
    console.info("*****************************");
    app.globalData.collectionContent = collectionContent;
    console.info(collectionContent);
    wx.navigateTo({
      url: '/pages/Addetails/Addetails?sellerAdvertiseId=' + e.currentTarget.dataset.selleradvertiseid + '&isinvalid=' + isinvalid + '&collectionContent=' + collectionContent
    })
  },

  //取消收藏
  quxiao :function(e){
    console.log("取消收藏", e, e.currentTarget.dataset.buyercollectionid);
    console.log("index", e.currentTarget.dataset.index);
    var buyerCollectionId = e.currentTarget.dataset.buyercollectionid;
    var index = e.currentTarget.dataset.index
    var that = this
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
        console.info("回调结果为："+res.data);
        if (res.data == 1) {
          wx.showToast({
            title: '取消收藏成功！',
            icon: 'success',
            duration: 2000
          })
          var buyerCollectionList = that.data.buyerCollectionList
          buyerCollectionList.splice(index, 1)
          that.setData({
            buyerCollectionList: buyerCollectionList
          })
        } else {

        }
      }
    })
  },



})
