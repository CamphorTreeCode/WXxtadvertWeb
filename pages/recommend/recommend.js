Page({

  /**
   * 页面的初始数据
   */
  data: {
    listbox: [{
      img: 'http://up.enterdesk.com/edpic_source/f5/34/83/f53483429ccc69d00ae98dd5f05317a4.jpg',
      lable: '水母田',
      title: '比奇堡水母田',
      flow: '人流量:95.5k/天',
      distance: '据您 100000km',
      unit: '500元/天',
      site: '美国 比奇堡',
      surplus: 235,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://fe.topitme.com/e/13/41/11315694278344113eo.jpg',
      lable: '四维空间',
      title: '哆啦A梦',
      flow: '人流量:2/天',
      distance: '据您 500km',
      unit: '20元/天',
      site: '日本 东京',
      surplus: 4244,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://pic.58pic.com/58pic/13/14/26/44Z58PICaEP_1024.jpg',
      lable: '足球场',
      title: '上海体育中心',
      flow: '人流量:30k/天',
      distance: '据您24.7km',
      unit: '230元/天',
      site: '上海 长宁',
      surplus: 781,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://uploads.5068.com/allimg/1806/189-1P613160353-50.jpg',
      lable: '手办馆',
      title: '杜莎蜡像馆',
      flow: '人流量:65k/天',
      distance: '据您44.5km',
      unit: '200元/天',
      site: '上海 徐汇区',
      surplus: 451,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://pic.ffpic.com/files/2013/0418/sj0419dmt05.jpg',
      lable: '臭脸服务员',
      title: '上海本帮菜酒店',
      flow: '人流量:2.3k/天',
      distance: '据您34km',
      unit: '5000元/天',
      site: '上海 浦东',
      surplus: 765,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://up.enterdesk.com/edpic_source/f5/34/83/f53483429ccc69d00ae98dd5f05317a4.jpg',
      lable: '水母田',
      title: '比奇堡水母田',
      flow: '人流量:95.5k/天',
      distance: '据您 100000km',
      unit: '500元/天',
      site: '美国 比奇堡',
      surplus: 455,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://fe.topitme.com/e/13/41/11315694278344113eo.jpg',
      lable: '四维空间',
      title: '哆啦A梦',
      flow: '人流量:2/天',
      distance: '据您 500km',
      unit: '20元/天',
      site: '日本 东京',
      surplus: 5440,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://pic.58pic.com/58pic/13/14/26/44Z58PICaEP_1024.jpg',
      lable: '足球场',
      title: '上海体育中心',
      flow: '人流量:30k/天',
      distance: '据您24.7km',
      unit: '230元/天',
      site: '上海 长宁',
      surplus: 454,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://uploads.5068.com/allimg/1806/189-1P613160353-50.jpg',
      lable: '手办馆',
      title: '杜莎蜡像馆',
      flow: '人流量:65k/天',
      distance: '据您44.5km',
      unit: '200元/天',
      site: '上海 徐汇区',
      surplus: 786,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    },
    {
      img: 'http://pic.ffpic.com/files/2013/0418/sj0419dmt05.jpg',
      lable: '臭脸服务员',
      title: '上海本帮菜酒店',
      flow: '人流量:2.3k/天',
      distance: '据您34km',
      unit: '5000元/天',
      site: '上海 浦东',
      surplus: 456,
      plus: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png',
      quantity: 0,
      subtract: 'https://www.chuanshoucs.com/ServerImg/2018-08-03/3ee6f420-95cc-4800-9ca1-15aa26c3b663.png',
      hide: 'none'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  // 加
  addition: function (e) {
    const that = this;
    const index = e.target.dataset.index;

    if (that.data.listbox[index].quantity < 1) {
      that.data.listbox[index].quantity++;
      that.data.listbox[index].hide = 'block'
      that.setData({
        listbox: that.data.listbox
      })
    }
    if (that.data.listbox[index].quantity >= 1) {
      that.data.listbox[index].plus = 'https://www.chuanshoucs.com/ServerImg/2018-08-03/f7c71b12-4149-4277-ad92-f334d3194f39.png'
      that.setData({
        listbox: that.data.listbox
      });
    }

  },

  // 减
  subtraction: function (e) {
    const that = this;
    const index = e.target.dataset.index;

    that.data.listbox[index].quantity--;
    that.setData({
      listbox: that.data.listbox
    })

    if (that.data.listbox[index].quantity < 1) {
      that.data.listbox[index].hide = 'none'
      that.data.listbox[index].plus = 'https://www.chuanshoucs.com/ServerImg/2018-08-03/becb94a2-2ac3-4947-927d-e54b94604017.png'
      that.setData({
        listbox: that.data.listbox
      })
    }
  }
})