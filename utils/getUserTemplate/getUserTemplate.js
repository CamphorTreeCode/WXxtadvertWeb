// var app =getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    flag: true
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (option) {
      console.log(getApp().data.userInfo)
    },
    onGotUserInfo: function(e) {
      var that=this;
      console.log(e.detail.errMsg)
      // console.log(e.detail.userInfo)
      // console.log(e.detail.rawData)
      if (e.detail.errMsg == "getUserInfo:ok"){
          that.setData({
            flag: false
          })
      }
    },
  },

})