var app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    city: '投放区域',
    banner: '广告类型',
    money: '天数/金额',
    human: '销量',
    list: ['不限'],
    region: [{
      advertiseTypeName: '不限',
      advertiseTypeId: '不限'
    }],
    number: [{
      unitPriceAmount: '不限'
    }],
    put: '距离',
    distance: '行政区',
    regionalism: [{
        area: '不限'
      },

      {
        area: '松江区'
      }

    ],
    district: [{
        place: '不限'
      },
      {
        place: 3
      },
      {
        place: 5
      },
      {
        place: 8
      },
      {
        place: 10
      },
      {
        place: 13
      },
      {
        place: 15
      },
      {
        place: 20
      },
      {
        place: 25
      },
      {
        place: 30
      }
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
    show: true,
    /*开始渲染******************************************************* */


    // distance: '', //距离范围
    // SellerAddress: '', //投放区域
    // AdvertiseTypeId: '', //广告类型
    // unitPrice: '', //商品单价
    // sellerVolume: '', //广告位销量
    condition: {
      distance: null,
      SellerAddress: null,
      AdvertiseTypeId: null,
      unitPrice: null,
      sellerVolume: null
    },
    firstinput: '',
    secondinput: ''



  },
  /* 模板加载 */
  ready: function() {
    var that = this
    //获取全部广告位类型
    wx.request({
      url: app.globalData.appUrl + 'Advtype/alladvtype',
      success: function(res) {

        that.setData({
          region: that.data.region.concat(res.data.data)
        })
      }
    })
    //获取全部广告位类型
    wx.request({
      url: app.globalData.appUrl + 'Unitprice/allunitprice',
      success: function(res) {
        that.setData({
          number: that.data.number.concat(res.data.data)
        })
      }
    })
    //获取全部销量类型
    wx.request({
      url: app.globalData.appUrl + 'Sellervol/allsellervolume',
      success: function(res) {
        var list = [];
        var sellervolume = res.data.data
        for (var i = 0; i < sellervolume.length - 1; i++) {
          var scope = ''
          if (i == 0) {
            scope = "0-" + sellervolume[i].sellerVolumeAmount
          } else {
            scope = sellervolume[i - 1].sellerVolumeAmount + 1 + "-" + sellervolume[i].sellerVolumeAmount
          }
          list.push(scope)
        }
        that.setData({
          list: that.data.list.concat(list)
        })
      }
    })


  },
  methods: {
    // 点击下拉
    one: function(event) {
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
    enter: function(e) {

      var that = this;

      if (e.target.dataset.index == 4) {

        var sellerVolume = this.data.condition.sellerVolume

        if (sellerVolume == null) {

          var firstinput = this.data.firstinput

          var secondinput = this.data.secondinput

          var regNum = new RegExp('[0-9]', 'g');

          if (firstinput != '') {
            if (firstinput < 0) {
              wx.showModal({
                title: '输入的最小值错误',
                content: '最小为0',
              })
              that.setData({
                firstinput: ''
              })
              return false;
            }

            if (firstinput > 2147483647) {
              wx.showModal({
                title: '输入的最小值错误',
                content: '最大为2147483647',
              })
              that.setData({
                firstinput: ''
              })
              return false;
            }

            var sign = regNum.exec(firstinput)
            if (!sign) {
              wx.showModal({
                title: '输入的最小值错误',
                content: '只能输入数字',
              })
              that.setData({
                firstinput: ''
              })
              return false;
            }
          }

          if (secondinput != '') {
            if (secondinput > 2147483647) {
              wx.showModal({
                title: '输入的最大值错误',
                content: '最大为2147483647',
              })
              that.setData({
                secondinput: ''
              })
              return false;

            }

            if (secondinput < 10) {
              wx.showModal({
                title: '输入的最大值错误',
                content: '最小值为10',
              })
              that.setData({
                secondinput: ''
              })
              return false;

            }

            var sign1 = regNum.exec(secondinput)
            if (!sign1) {
              wx.showModal({
                title: '输入的最大值错误',
                content: '只能输入数字',
              })
              that.setData({
                secondinput: ''
              })
              return false;
            }
          }

          if (firstinput != '' && secondinput != '') {
            if (firstinput > secondinput) {
              wx.showModal({
                title: '输入错误',
                content: '最小值大于最大值',
              })
              that.setData({
                firstinput: '',
                secondinput: ''
              })
              return false;
            }
          }




          if (firstinput != '' || secondinput != '') {
            if (firstinput == '') {
              firstinput = 0;
            }
            if (secondinput == '') {
              secondinput = 2147483647
            }

            this.data.condition.sellerVolume = firstinput + '-' + secondinput
          }

        }
      }


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

      var myEventDetail = this.data.condition // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('enter', myEventDetail, myEventOption)
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
    //refresh按钮
    refresh: function(e) {
      console.info("进入重置方法")
      console.info(e)
      var index = e.target.dataset.index
      console.info(index)
      if (index == 1) {
        this.data.condition.distance = null;
        this.data.condition.SellerAddress = null;
        this.setData({
          juli: 0,
          xingzhengqu: 0,
        })
      }
      if (index == 2) {
        this.data.condition.AdvertiseTypeId = null;
        this.setData({
          guangao: 0
        })
      }
      if (index == 3) {
        this.data.condition.unitPrice = null;
        this.setData({
          tianshu: 0
        })
      }
      if (index == 4) {
        this.data.condition.sellerVolume = null;
        this.setData({
          liuliang: 0,
          firstinput: '',
          secondinput: ''
        })
      }

      console.info(this.data.condition)
    },

    // 距离
    change: function(e) {
      var index = e.target.dataset.index;
      var condition = this.changeCondition('distance', e.target.dataset.distance)
      this.setData({
        juli: index,
        condition: condition
      })


    },
    // 行政区
    changeColor: function(e) {
      var index = e.target.dataset.index;
      var condition = this.changeCondition('SellerAddress', e.target.dataset.selleraddress)
      this.setData({
        xingzhengqu: index,
        condition: condition
      })
    },
    // 广告类型 
    change_b: function(e) {
      var index = e.target.dataset.index;
      var condition = this.changeCondition('AdvertiseTypeId', e.target.dataset.advertisetypeid)
      this.setData({
        guangao: index,
        condition: condition
      })
    },
    // 天数/金额 
    change_bor: function(e) {
      var index = e.target.dataset.index;
      var condition = this.changeCondition('unitPrice', e.target.dataset.unitprice)
      this.setData({
        tianshu: index,
        condition: condition
      })
    },
    // 销量 sellerVolume
    change_border: function(e) {
      var index = e.target.dataset.index;
      var condition = this.changeCondition('sellerVolume', e.target.dataset.sellervolume)
      this.setData({
        liuliang: index,
        condition: condition,
        firstinput: '',
        secondinput: ''
      })
    },
    //销量输入框事件
    firstinput: function(e) {
      this.data.condition.sellerVolume = null;
      if (e.detail.value != '') {
        this.setData({
          firstinput: e.detail.value,
          liuliang: 0
        })
      }


    },
    secondinput: function(e) {
      this.data.condition.sellerVolume = null;
      if (e.detail.value != '') {
        this.setData({
          secondinput: e.detail.value,
          liuliang: 0
        })
      }
    },


    changeCondition: function(propert, value) {
      var condition = this.data.condition;
      if (value == '不限') {
        value = null;
      }
      condition[propert] = value;
      return condition;
    }
  }
})