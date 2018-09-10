// pages/me/jie/message.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取用户选择的地址
    SellerAddress: '',
    //控制logo的默认上传按钮显示
    state: true,
    //控制广告类型的选择
    guang: true,
    //控制执照的默认上传按钮显示
    zhizhao: true,
    //上传logo显示的图片
    logo: '',
    //上传执照显示的图片
    license: '',
    //用户选择位置的纬度
    latitude: '',
    //用户选择位置的经度
    longitude: '',
    //控制广告类型选中颜色
    shu: -1,
    //广告类型列表
    advertiseTypeList: [],
    //选中显示的广告类型
    advertiseType: '',
    //用户选择的广告类型的id
    advertiseTypeId: 0,
    //上传服务器转好的logo
    advertiseLogo: '',
    //上传服务器转好的执照
    businessLicense: '',
    //用户上传轮播图
    numberarray: [{
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      },
      {
        lun: false,
        lunbo: "",
        src1: "https://www.chuanshoucs.com/ServerImg/2018-08-03/1315ec51-dd11-4b33-b844-78c287cd6b60.png",
        src2: "https://www.chuanshoucs.com/ServerImg/2018-08-03/f1980bdc-78cd-46ef-9af8-f4615800b2f8.png"
      }
    ],
    //用户上传轮播图1
    hou0: '',
    //用户上传轮播图2
    hou1: '',
    //用户上传轮播图3
    hou2: '',
    //用户上传轮播图4
    hou3: '',
    //用户上传轮播图5
    hou4: '',
    //商户轮播图
    advertiseImgs: [],
    //查询的商户信息
    sellerInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //查询全部广告类型start
    wx.request({
      url: app.globalData.appUrl + 'WXAdvertiseType/findAllAdvertiseType',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询全部广告类型返回的结果：")
        console.info(res)
        console.info(res.data)
        if (res.data.AdvertiseType.length > 0) {
          var advertiseTypeList = that.data.advertiseTypeList
          for (var i = 0; i < res.data.AdvertiseType.length; i++) {
            advertiseTypeList.push(res.data.AdvertiseType[i])
          }
          console.info(advertiseTypeList);
          that.setData({
            advertiseTypeList: advertiseTypeList
          })
        }
      }
    })
    //查询全部广告哦类型end

    //查询卖家商户信息start
    wx.request({
      url: app.globalData.appUrl + 'WXSellerInfo/findSellerInfoMsg',
      data: {
        openId: app.returnOpenId()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function(res) {
        console.info("下面是查询商家信息返回的结果：")
        console.info(res)
        if (res.data.SellerInfo) {
          res.data.SellerInfo.advertiseImgs = JSON.parse(res.data.SellerInfo.advertiseImgs);
          if (res.data.SellerInfo.advertiseImgs.length > 0) {
            for (var i = 0; i < res.data.SellerInfo.advertiseImgs.length; i++) {
              that.data.numberarray[i].lunbo = res.data.SellerInfo.advertiseImgs[i]
              that.data.numberarray[i].lun = true
            }
            that.setData({
              numberarray: that.data.numberarray,
            })
          }
          that.setData({
            sellerInfo: res.data.SellerInfo,
            logo: res.data.SellerInfo.advertiseLogo,
            license: res.data.SellerInfo.businessLicense,
            SellerAddress: res.data.SellerInfo.sellerAddress,
            state: false,
            zhizhao: false,
            advertiseType: res.data.SellerInfo.advertiseType.advertiseTypeName,
            advertiseTypeId: res.data.SellerInfo.advertiseType.advertiseTypeId,
          })
        } else {

        }


      }
    })
    //查询卖家商户信息end
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

  // 广告类型选择
  qian: function(e) {
    console.info(e)
    console.info(e.currentTarget.dataset.lid)
    var id = e.currentTarget.dataset.index;
    this.setData({
      advertiseTypeId: e.currentTarget.dataset.lid,
      shu: id,
      advertiseType: this.data.advertiseTypeList[id].advertiseTypeName
    })
  },

  // 控制广告类型展开和关闭
  guang: function() {
    this.setData({
      guang: (!this.data.guang)
    })
  },

  //获取用户选择的地址
  dizhi: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.info(res)
        that.setData({
          SellerAddress: res.address,
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
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.logo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              advertiseLogo: data.SellerInfoPath,
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
        console.info(res)
        that.setData({
          zhizhao: false,
          license: res.tempFilePaths[0]
        });
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        console.info(that.data.license)
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.license,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              businessLicense: data.SellerInfoPath,
            })
          },
        })
      }
    })
  },

  // 轮播
  hou0: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[0].lun': true,
          'numberarray[0].lunbo': res.tempFilePaths[0]
        })
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.numberarray[0].lunbo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              hou0: data.SellerInfoPath,
            })
            that.data.advertiseImgs.push(data.SellerInfoPath);
          },
        })
      }
    })
  },
  hou1: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[1].lun': true,
          'numberarray[1].lunbo': res.tempFilePaths[0]
        })
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.numberarray[1].lunbo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              hou1: data.SellerInfoPath,
            })
            that.data.advertiseImgs.push(data.SellerInfoPath);
          },
        })
      }
    })
  },
  hou2: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[2].lun': true,
          'numberarray[2].lunbo': res.tempFilePaths[0]
        })
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.numberarray[2].lunbo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              hou2: data.SellerInfoPath,
            })
            that.data.advertiseImgs.push(data.SellerInfoPath);
          },
        })
      }
    })
  },
  hou3: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[3].lun': true,
          'numberarray[3].lunbo': res.tempFilePaths[0]
        })
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.numberarray[3].lunbo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              hou3: data.SellerInfoPath,
            })
            that.data.advertiseImgs.push(data.SellerInfoPath);
          },
        })
      }
    })
  },
  hou4: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'numberarray[4].lun': true,
          'numberarray[4].lunbo': res.tempFilePaths[0]
        })
        //将图片转成网络路径
        console.info(res.tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.appUrl + 'WXSellerInfo/filePathUpload',
          filePath: that.data.numberarray[4].lunbo,
          name: 'file',
          success: function(res) {
            var data = res.data;
            data = JSON.parse(data);
            console.log(data.SellerInfoPath);
            that.setData({
              hou4: data.SellerInfoPath,
            })
            that.data.advertiseImgs.push(data.SellerInfoPath);
          },
        })
      }
    })
  },

  //用户信息提交
  formSubmit: function(e) {
    var that = this;
    console.info(e)
    console.info(that.data.sellerInfo.sellerInfoId)
    console.info(that.data.sellerInfo.advertiseImgs)
    if (!that.data.sellerInfo.sellerInfoId) {
      console.info("没有数据")
      var sellerInfo = e.detail.value;
      sellerInfo.SellerAddress = that.data.SellerAddress;
      sellerInfo.sellerLongitude = that.data.longitude;
      sellerInfo.sellerLatitude = that.data.latitude;
      sellerInfo.formId = e.detail.formId;
      sellerInfo.openId = app.returnOpenId();
      sellerInfo.advertiseTypeId = that.data.advertiseTypeId;
      sellerInfo.advertiseLogo = that.data.advertiseLogo;
      sellerInfo.businessLicense = that.data.businessLicense;
      sellerInfo.advertiseImgs = that.data.advertiseImgs;

      //表单验证
      function check(sellerInfo) {
        if (sellerInfo.sellerName == '') {
          wx.showToast({
            title: '商家名称不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.advertiseTypeId == 0) {
          wx.showToast({
            title: '请选择广告类型',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.sellerUserName == '') {
          wx.showToast({
            title: '联系人姓名不能为空',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.sellerPhone == '') {
          wx.showToast({
            title: '请填写联系电话',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(sellerInfo.sellerPhone)) {
            wx.showToast({
              title: '请按照正确联系方式填写',
              icon: 'none',
              duration: 1000
            })
            return false;
          }
        }
        if (sellerInfo.SellerAddress == '') {
          wx.showToast({
            title: '请选择联系地址',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.advertiseIntro == '') {
          wx.showToast({
            title: '请填写广告位简介',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.advertiseLogo == '') {
          wx.showToast({
            title: '请上传Logo',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.businessLicense == '') {
          wx.showToast({
            title: '请上传执照',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        if (sellerInfo.advertiseImgs.length == 0) {
          wx.showToast({
            title: '请至少上传一张轮播图',
            icon: 'none',
            duration: 1000
          })
          return false;
        } else {
          return true;
        }
      }
      //添加商家信息
      if (check(sellerInfo)) {
        //验证通过
        wx.request({
          url: app.globalData.appUrl + 'WXSellerInfo/addSellerInfoMsg',
          data: sellerInfo,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            xcxuser_name: "xcxuser_name"
          },
          success: function(res) {
            console.info("下面是提交商家信息返回的结果：")
            console.info(res)
            if (res.data.addSellerInfoMsg == true) {
              //提交成功
              wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
                }),
                setTimeout(function() {
                  wx.navigateTo({
                    url: '/pages/me/jie/tijiaoSuccess',
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
            var sellerInfo = e.detail.value;
            sellerInfo.SellerAddress = that.data.SellerAddress;
            sellerInfo.sellerLongitude = that.data.longitude;
            sellerInfo.sellerLatitude = that.data.latitude;
            sellerInfo.formId = e.detail.formId;
            sellerInfo.openId = app.returnOpenId();
            sellerInfo.advertiseTypeId = that.data.advertiseTypeId;
            sellerInfo.advertiseLogo = that.data.advertiseLogo;
            sellerInfo.businessLicense = that.data.businessLicense;
            sellerInfo.advertiseImgs = that.data.advertiseImgs;
            sellerInfo.sellerInfoId = that.data.sellerInfo.sellerInfoId;
            //表单验证
            function check(sellerInfo) {
              if (sellerInfo.sellerName == '') {
                wx.showToast({
                  title: '商家名称不能为空',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.advertiseTypeId == 0) {
                wx.showToast({
                  title: '请选择广告类型',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.sellerUserName == '') {
                wx.showToast({
                  title: '联系人姓名不能为空',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.sellerPhone == '') {
                wx.showToast({
                  title: '请填写联系电话',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              } else {
                if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(sellerInfo.sellerPhone)) {
                  wx.showToast({
                    title: '请按照正确联系方式填写',
                    icon: 'none',
                    duration: 1000
                  })
                  return false;
                }
              }
              if (sellerInfo.SellerAddress == '') {
                wx.showToast({
                  title: '请选择联系地址',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.advertiseIntro == '') {
                wx.showToast({
                  title: '请填写广告位简介',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.advertiseLogo == '') {
                wx.showToast({
                  title: '请上传Logo',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.businessLicense == '') {
                wx.showToast({
                  title: '请上传执照',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              }
              if (sellerInfo.advertiseImgs.length == 0) {
                wx.showToast({
                  title: '请至少上传一张轮播图',
                  icon: 'none',
                  duration: 1000
                })
                return false;
              } else {
                return true;
              }
            }

            if (check(sellerInfo)) {
              //验证通过，添加商户数据
              wx.request({
                url: app.globalData.appUrl + 'WXSellerInfo/modifySellerInfoMsg',
                data: sellerInfo,
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  xcxuser_name: "xcxuser_name"
                },
                success: function (res) {
                  console.info("下面是修改商家信息返回的结果：")
                  console.info(res)
                  if (res.data.SellerInfoUpdate == true) {
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