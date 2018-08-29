// pages/swipe/swipe.js
var app = getApp();
Component({
  data: {
    slider: [],
    swiperCurrent: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    mode: 'aspectFill',
  },
  ready:function(){
   var that = this
   wx.request({
     url: app.globalData.appUrl +'WXSwiper/findAll',
     success:function(res){
       that.setData({
         slider: res.data
       })
     }
   })
   this.setData({
     slider:[]
   })
  },
  methods: {
    swiperChange: function(e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    detail: function (e) {
      console.info(e)
      wx.navigateTo({
        url: '/pages/Addetails/Addetails?sellerAdvertiseId=' + e.currentTarget.dataset.selleradvertiseid
      })
    }
  }
 
})