// pages/me/more.js
//表单验证
function yanzheng(applicantMiniProgram) {
  if (applicantMiniProgram.applicantName == '') {
    wx.showToast({
      title: '请填写姓名',
      icon: 'none',
      duration: 1000
    })
    return false;
  }
  if (applicantMiniProgram.applicantPhone == '') {
    wx.showToast({
      title: '请填写联系电话',
      icon: 'none',
      duration: 1000
    })
    return false;
  } else {
    if (!/^((\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(applicantMiniProgram.applicantPhone)) {
      wx.showToast({
        title: '请按照正确联系方式填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      return true;
    }
  }
}
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    region: ["请选择地区"],
    customItem: '全部',
    //全部小程序信息
    MiniProgram:[],
    //选择小程序id
    miniProgramTypeId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查询全部小程序类型列表信息start
    wx.request({
      url: app.globalData.appUrl + 'WXApplicantMiniProgram/findAllMiniProgram',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        xcxuser_name: "xcxuser_name"
      },
      success: function (res) {
        console.info("下面是查询全部小程序类型列表信息：")
        // console.info(res.data)
        if(res.data.length > 0){
          var MiniProgram = that.data.MiniProgram;
          for (var i = 0; i < res.data.length; i++){
            res.data[i].miniProgramIcon = JSON.parse(res.data[i].miniProgramIcon)[0];
            MiniProgram.push(res.data[i])
          }
          console.info(MiniProgram)
        }
        that.setData({
          MiniProgram: res.data,
        })
      }
    })
    //查询全部小程序类型列表信息end
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      imageUrl: app.globalData.shareImg,
    }
  },

  //出现弹框
  tan: function(e){
    console.info(e.currentTarget.dataset.lid)
    this.setData({
      state: true,
      miniProgramTypeId: e.currentTarget.dataset.lid,
    })
  },

  //返回按钮
  shanchu: function(){
    this.setData({
      state: false
    })
  },

  //提交申请开发小程序信息
  testSubmit:function(e){
    console.info(e)
    var formId = e.detail.formId;
    var miniProgramTypeId = this.data.miniProgramTypeId;
    var applicantMiniProgram = e.detail.value;
    applicantMiniProgram.applicantLocation = applicantMiniProgram.region.join('');
    applicantMiniProgram.miniProgramTypeId = miniProgramTypeId;
    applicantMiniProgram.openId = app.returnOpenId();
    applicantMiniProgram.formId = formId;
    console.info("********************************")
    console.info(applicantMiniProgram)

    if (yanzheng(applicantMiniProgram)){
      console.info("增加")
      var that = this;
      //数据验证正确
      wx.request({
        url: app.globalData.appUrl + 'WXApplicantMiniProgram/addApplicantMiniProgramMsg',
        data:  applicantMiniProgram,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          xcxuser_name: "xcxuser_name"
        },
        success: function (res) {
          that.setData({
            state: false
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
      wx.navigateTo({
        url: '/pages/me/wode',
      })
    }
    
  },

  //用户选择的地区信息
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
  
})