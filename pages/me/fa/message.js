// pages/me/fa/message.js
var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    //获取用户选择的地址
    address: '',
    //用户选择位置的纬度
    latitude: '',
    //用户选择位置的经度
    longitude: '',
    //控制logo的默认上传按钮显示
    state: true,
    //控制zhizhao的默认上传按钮显示
    zhizhao: true,
    //上传logo显示的图片
    logo: '',
    //上传执照显示的图片
    license: '',
    //用户商家信息
    buyerInfo:{},
    //上传服务器转好的logo
    advertiseLogo:'',
    //上传服务器转好的执照
    businessLicense:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //查询用户商户信息start
    wx.request({
      url: app.globalData.appUrl + 'WXBuyerInfo/findBuyerInfoMsg',
      data: { openId: app.returnOpenId() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询商家信息返回的结果：")
        console.info(res)
        if (res.data.BuyerInfoMsg){
          that.setData({
            buyerInfo: res.data.BuyerInfoMsg,
            logo: res.data.BuyerInfoMsg.advertiseLogo,
            license: res.data.BuyerInfoMsg.businessLicense,
            address: res.data.BuyerInfoMsg.buyerAddress,
            state: false,
            zhizhao: false,
          })
        }else{

        }
      

      }
    })
    //查询用户商户信息end
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //获取用户选择的地址
  dizhi: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.info(res)
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
  },

  //获取用户选择的logo
  logo: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          state: false,
          logo: res.tempFilePaths[0]
        });
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        console.info(that.data.logo)
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXBuyerInfo/filePathUpload',
          filePath: that.data.logo,
          name: 'file',
          success: function (res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.BuyerInfoPath);
            that.setData({
              advertiseLogo: data.BuyerInfoPath,
            })
          },
        })
      }
    })

  },

  //获取用户选择的营业执照
  zhizhao: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          zhizhao: false,
          license: res.tempFilePaths[0]
        });
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        console.info(that.data.license)
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXBuyerInfo/filePathUpload',
          filePath: that.data.license,
          name: 'file',
          success: function (res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.BuyerInfoPath);
            that.setData({
              businessLicense: data.BuyerInfoPath,
            })
          },
        })
      }
    })
  },

  //提交信息
  formSubmit: function(e) {
    console.info(this.data.buyerInfo.buyerInfoId)
    var that = this;
    if (!that.data.buyerInfo.buyerInfoId){
      console.info("没有数据")
      var buyerInfo = e.detail.value;
      buyerInfo.openId = app.returnOpenId();
      buyerInfo.buyerAddress = that.data.address;
      buyerInfo.advertiseLogo = that.data.advertiseLogo;
      buyerInfo.businessLicense = that.data.businessLicense;
      buyerInfo.buyerLongitude = that.data.longitude;
      buyerInfo.buyerLatitude = that.data.latitude;
      buyerInfo.formId = e.detail.formId;
      console.info("***************************************")
      console.info(buyerInfo.buyerAddress)
      console.info(buyerInfo.advertiseLogo)
      console.info(buyerInfo.businessLicense)
      console.info("***************************************")
      console.info(buyerInfo)

      //表单验证
      function check(buyerInfo) {
        if (buyerInfo.buyerName == '') {
          wx.showToast({
            title: '商家名称不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (buyerInfo.buyerUserName == '') {
          wx.showToast({
            title: '联系人姓名不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (buyerInfo.buyerPhone == '') {
          wx.showToast({
            title: '请填写联系电话',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(buyerInfo.buyerPhone)) {
            wx.showToast({
              title: '请按照正确联系方式填写',
              icon: 'none',
              duration: 1000
            })
            return false;
          }
        }
        if (buyerInfo.buyerAddress == '') {
          wx.showToast({
            title: '请选择联系地址',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (buyerInfo.advertiseLogo == '') {
          wx.showToast({
            title: '请上传Logo',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (buyerInfo.businessLicense == '') {
          wx.showToast({
            title: '请上传执照',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          return true;
        }
      }

      if (check(buyerInfo)) {
        //验证通过，添加商户数据
        wx.request({
          url: app.globalData.appUrl + 'WXBuyerInfo/addBuyerInfoMsg',
          data: buyerInfo,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function (res) {
            console.info("下面是提交商家信息返回的结果：")
            console.info(res)
            if (res.data.addBuyerInfoMsg == true) {
              //提交成功
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000
              }),
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/me/fa/tijiaoSuccess',
                  })
                }, 1000)
            }
          }
        })
      }
    }else{
      console.info("有数据")
      wx.showModal({
        title: '提示',
        content: '修改信息，将会重新审核您的商户信息，期间您的账号将暂不能登陆。',
        success: function (res) {
          console.info(res)
          if (res.confirm) {
            console.log('用户点击确定')
            //修改用户商户信息
            var buyerInfo = e.detail.value;
            buyerInfo.openId = app.returnOpenId();
            buyerInfo.buyerAddress = that.data.address;
            buyerInfo.advertiseLogo = that.data.advertiseLogo;
            buyerInfo.businessLicense = that.data.businessLicense;
            buyerInfo.buyerLongitude = that.data.longitude;
            buyerInfo.buyerLatitude = that.data.latitude;
            buyerInfo.formId = e.detail.formId;
            buyerInfo.buyerInfoId = that.data.buyerInfo.buyerInfoId;
            console.info("***************************************")
            console.info(buyerInfo.buyerAddress)
            console.info(buyerInfo.advertiseLogo)
            console.info(buyerInfo.businessLicense)
            console.info("***************************************")
            console.info(buyerInfo)

            //表单验证
            function check(buyerInfo) {
              if (buyerInfo.buyerName == '') {
                wx.showToast({
                  title: '商家名称不能为空',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (buyerInfo.buyerUserName == '') {
                wx.showToast({
                  title: '联系人姓名不能为空',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (buyerInfo.buyerPhone == '') {
                wx.showToast({
                  title: '请填写联系电话',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              } else {
                if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(buyerInfo.buyerPhone)) {
                  wx.showToast({
                    title: '请按照正确联系方式填写',
                    icon: 'none',
                    duration: 1000
                  })
                  return false;
                }
              }
              if (buyerInfo.buyerAddress == '') {
                wx.showToast({
                  title: '请选择联系地址',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (buyerInfo.advertiseLogo == '') {
                wx.showToast({
                  title: '请上传Logo',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (buyerInfo.businessLicense == '') {
                wx.showToast({
                  title: '请上传执照',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              } else {
                return true;
              }
            }

            if (check(buyerInfo)) {
              //验证通过，添加商户数据
              wx.request({
                url: app.globalData.appUrl + 'WXBuyerInfo/modifyBuyerInfoMsg',
                data: buyerInfo,
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  xcxuser_name: "xcxuser_name"
                },
                success: function (res) {
                  console.info("下面是提交商家信息返回的结果：")
                  console.info(res)
                  if (res.data.addBuyerInfoMsg == true) {
                    //提交成功
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 1000
                    }),
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '/pages/me/fa/tijiaoSuccess',
                        })
                      }, 1000)
                  }
                }
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
 
  },
})