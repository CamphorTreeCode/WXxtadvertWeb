Page({

  data: {
    price: ["40元/1天", "200元/5天", "400元/10天", "800元/20天", "1200元/30天"],
    items: [{
        isTouchMove: false,
        flag: false,
        priceindex: 0,
        number: 1,
        check: false
      }, 
      {
        isTouchMove: false,
        flag: false,
        priceindex: 0,
        number: 1,
        check: false
      },    
      {
        isTouchMove: false,
        flag: false,
        priceindex: 0,
        number: 1,
        check: false
      }
    ],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function(option) {
    //   var x=0;
    // var time=  setInterval(function(){
    //       x++;
    //       console.log(x)
    //       if(x>=60){
    //           clearInterval(time)
    //       }
    //   },1000)
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
  //加号 
  addpush: function(e) {
    var index = e.target.dataset.index;
    this.data.items[index].number++
      this.setData({
        items: this.data.items
      })
  },
  //减号 
  reduce: function(e) {
    var index = e.target.dataset.index;
    this.data.items[index].number--
      this.setData({
        items: this.data.items
      })
  },
  //选择价格 
  textjiage: function(e) {
    var data = e.target.dataset.data;
    var index = e.target.dataset.index;

    this.data.items[data].priceindex = index
    this.setData({
      items: this.data.items
    })
  },
  // 价格显示 
  jiageshow: function(e) {
    var that = this;
    var index = e.target.dataset.index;
    if (this.data.items[index].flag == false) {
      this.data.items[index].flag = true
      that.setData({
        items: this.data.items
      })
    } else {
      this.data.items[index].flag = false;
      that.setData({
        items: this.data.items
      })
    }
  },
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
  }
})