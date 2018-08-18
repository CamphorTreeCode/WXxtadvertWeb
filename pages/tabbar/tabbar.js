Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shouye:Boolean,
    faxian: Boolean,
    gouwuche: Boolean,
    wo: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigation: function (event) {
      var link = '';
      if (event.currentTarget.dataset.id == 0) {
        link = '../index/index';
      }
      else if (event.currentTarget.dataset.id == 1) {
        link = '../find/find';
      }
      else if (event.currentTarget.dataset.id == 2) {
        link = '../shoppingcart/shoppingcart';
      }
      else if (event.currentTarget.dataset.id == 3) {
        link = '../me/wode';
      }
      wx.redirectTo({
        url: link
      })
    }
  }
})