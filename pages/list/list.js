Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '投放区域',
    banner: '广告类型',
    money: '天数/金额',
    human: '人流量',
    list: [{
        text: '300 /天'
      },
      {
        text: '600 /天'
      },
      {
        text: '900 /天'
      },
      {
        text: '1200 /天'
      },
      {
        text: '1500 /天'
      },
      {
        text: '1800 /天'
      },
      {
        text: '2100 /天'
      }
    ],
    region: [{
        text: '大型商业广场'
      },
      {
        text: '旅游景点'
      },
      {
        text: '小区社区'
      },
      {
        text: '街头'
      },
      {
        text: '交通宣传'
      }
    ],
    number: [{
        text: '100元 /5天'
      },
      {
        text: '200元 /10天'
      },
      {
        text: '300元 /15天'
      },
      {
        text: '400元 /20天'
      },
      {
        text: '500元 /25天'
      },
      {
        text: '600元 /30天'
      },
      {
        text: '700元 /35天'
      }
    ],
    put: '距离',
    distance: '行政区',
    regionalism: [{
        area: '不限'
      },
      {
        area: '宝山区'
      },
      {
        area: '长宁区'
      },
      {
        area: '松江区'
      },
      {
        area: '浦东区'
      },
      {
        area: '徐汇区'
      },
      {
        area: '普陀区'
      },
      {
        area: '闵行区'
      },
      {
        area: '金山区'
      },
      {
        area: '奉贤区'
      }
    ],
    district: [{
        place: '不限'
      },
      {
        place: '1KM'
      },
      {
        place: '2KM'
      },
      {
        place: '3KM'
      },
      {
        place: '4KM'
      },
      {
        place: '5KM'
      },
      {
        place: '6KM'
      },
      {
        place: '7KM'
      },
      {
        place: '8KM'
      },
      {
        place: '9KM'
      },
    ],
    refresh: '重置',
    enter: '完成',
    one: false,
    two: false,
    three: false,
    four: false,
    one_height: 0,
    two_height: 0,
    three_height: 0,
    four_height: 0,
    tab: 0,
    color: "red",
    juli: 0,
    xingzhengqu: 0,
    guangao: 0,
    tianshu: 0,
    liuliang: 0,
    zero: null,
    position: null,
    show: true
  },
  // 点击下拉
  one: function() {
    var that = this;
    var height = 800;
    // var color = 'rgb(253, 211, 0)';
    that.setData({
      one: true,
      two: false,
      three: false,
      four: false,
      one_height: height,
      two_height: 0,
      three_height: 0,
      four_height: 0,
      zero: 0,
      position: 'fixed',
      show: false
    });
    // 页面滚动
    // wx.pageScrollTo({
    //   scrollTop: 500,
    //   duration: 1000
    // })

  },
  two: function() {
    var that = this;
    var height = 800;
    that.setData({
      one: false,
      two: true,
      three: false,
      four: false,
      one_height: 0,
      two_height: height,
      three_height: 0,
      four_height: 0,
      zero: 1,
      position: 'fixed',
      show: false
    });
  },
  three: function() {
    var that = this;
    var height = 800;
    that.setData({
      one: false,
      two: false,
      three: true,
      four: false,
      three_height: height,
      one_height: 0,
      two_height: 0,
      four_height: 0,
      zero: 2,
      position: 'fixed',
      show: false
    });
  },
  four: function() {
    var that = this;
    var height = 800;
    that.setData({
      one: true,
      two: false,
      three: false,
      four: false,
      four_height: height,
      one_height: 0,
      two_height: 0,
      three_height: 0,
      zero: 3,
      position: 'fixed',
      show: false
    });
  },
  enter: function() {
    var that = this;
    var height = 0;
    that.setData({
      one: false,
      two: false,
      three: false,
      four: false,
      one_height: height,
      two_height: height,
      three_height: height,
      four_height: height,
      zero: null,
      position: null,
      show: true
    })
  },
  tab_slide: function(e) { //滑动切换tab 
    var that = this;
    that.setData({
      tab: e.detail.current
    });
  },
  tab_click: function(e) { //点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },
  // 距离
  change: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      juli: index
    })
  },
  // 行政区
  changeColor: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      xingzhengqu: index
    })
  },
  // 广告类型
  change_b: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      guangao: index
    })
  },
  // 天数/金额
  change_bor: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      tianshu: index
    })
  },
  // 人流量
  change_border: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      liuliang: index
    })
  },
  // 页面滚动
})