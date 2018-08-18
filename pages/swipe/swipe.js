// pages/swipe/swipe.js
Page({
  data: {
    slider: [{
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533107340334&di=650042314e389f18c67aeab8b69b69ab&imgtype=0&src=http%3A%2F%2Fold.bz55.com%2Fuploads%2Fallimg%2F140706%2F138-140F6111421.jpg'
      },
       {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533107318811&di=0bcd8ba47acee1e0f682293a5f609ddc&imgtype=0&src=http%3A%2F%2Fold.bz55.com%2Fuploads%2Fallimg%2F140706%2F138-140F6111422-50.jpg'
      },
      {
        picUrl: 'https://www.chuanshoucs.com/ServerImg/2018-07-24/49dbb33a-5151-4149-bc1b-e41d13c9bd87.png'
      }
    ],
    swiperCurrent: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    mode: 'aspectFill',
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})