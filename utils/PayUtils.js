import MD5 from 'MD5.js'
/** 
 * 暴露接口给小程序 因为export default，所以引入的时候可以自定义方法名称 
 * +--------------------
 * @param {prepay_id}   统一下单接口返回的 prepay_id 参数值
 */
export default function WXUnifiedOrder(prepay_id, calbackUrl, calbackdata,navigateTo) {
  //获取当前时间的时间戳
  var timeStamp = new Date().getTime() + '';
  timeStamp = timeStamp.substring(0, timeStamp.length - 3)
  //生成随机字符串
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456790';
  var nonceStr = '';
  for (var i = 0; i < 32; i++) {
    nonceStr += str.charAt(Math.floor(Math.random() * str.length));
  }
  //生成签名
  var paySign = MD5('appId=wxfbe5b59f9aef6f4f&nonceStr=' + nonceStr + '&package=prepay_id=' + prepay_id + '&signType=MD5&timeStamp=' + timeStamp + '&key=Shanghaishensuchuanshoux57630970').toUpperCase();
  //调起支付api
  wx.requestPayment({
    'timeStamp': timeStamp,
    'nonceStr': nonceStr,
    'package': 'prepay_id=' + prepay_id,
    'signType': 'MD5',
    'paySign': paySign,
    'success': function (res) {
      wx.request({
        url: calbackUrl,
        data: calbackdata,
        success:function(){
           wx.redirectTo({
             url: 'navigateTo',
           })
        }
      })
    },
    'fail': function (res) {
      console.log(res)
    }
  })

}