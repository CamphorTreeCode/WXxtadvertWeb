//动态查询广告位
/**
 * that用于动态修改页面上的属性值  that.setData();
 * data传入的参数
 * app全局变量 
 */
export default function dynamicSearch(that, data, app) {
  console.info("hahahahahahahahahahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.info(that.data.latitude1)
  console.info(that.data.longitude1)
  wx.getLocation({
    success: function(res) {
      if (that.data.latitude1 != '') {
        data.sellerLatitude = that.data.latitude1;
        data.sellerLongitude = that.data.longitude1;
      } else {
        data.sellerLatitude = res.latitude,
          data.sellerLongitude = res.longitude
      }
      wx.request({
        url: app.globalData.appUrl + 'WXSellerAdvertise/findPage',
        data: data,
        success: function(res) {
          console.info("下面是广告位列表返回的数据：")
          console.info(res)
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              //循环设定广告位对应的广告位信息的第一张图片
              res.data[i].sellerInfo.advertiseImgs = JSON.parse(res.data[i].sellerInfo.advertiseImgs)
              //循环设定广告位距用户的距离
              res.data[i].distances = (res.data[i].distances / 1000).toFixed(1)
              //比对广告位是否在购物车中  
              if (app.globalData.shopCarAdvertise.indexOf(res.data[i].sellerAdvertiseId) != -1) {
                res.data[i].hide = 'block'
                res.data[i].quantity = 1
                res.data[i].plus = '/img/detail/hjia.png'
                res.data[i].subtract = '/img/detail/yjian.png'
              }
              //如果广告屏不在购物车中不显示减号和数量为
              else {
                res.data[i].plus = '/img/detail/yjia.png'
                res.data[i].subtract = '/img/detail/yjian.png'
                res.data[i].hide = 'none'
                res.data[i].quantity = 0
              }

            }
            console.info("刷新了")
            that.setData({
              listbox: res.data
            })
            console.info(that.data.listbox)
          }

        }
      })



    }
  })



}