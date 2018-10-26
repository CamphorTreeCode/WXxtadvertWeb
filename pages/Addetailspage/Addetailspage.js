// pages/Addetailspage/Addetailspage.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  
  /**
   * 页面的初始数据  
   */
  data: {
    optionaldays: 20,
    datelist: [
      {
        shopid: "4",
        dates: "2018-10-7",
        number: "5"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var datatime = util.formatTime(new Date());

    //获取屏幕对应的库存
    this.setData({
      optionaldays: options.daynum
    })
    var that= this
    var successList = {}
  
    
    // var s = '2018-7-28';
    // var b = new Date(Date.parse(s.replace(/\-/g, "/")));
    // var cc = b.getDay()
    // console.log(cc)

    // var l = ["日", "一", "二", "三", "四", "五", "六"];
    // var d = new Date().getDay();
    // var str = "今天是星期" + l[d];

    var data = new Date(datatime);
    console.log(data)
    var year = data.getFullYear(); //当前月份的年份
    var montha = data.getMonth() + 1; //当前月份
    var monthlist = []; //3个月份
    var month1, month2, month3;
    var year1, year2, year3; //3各月份对应的年份
    var day1 = [],
      day2 = [],
      day3 = []; //3各月份，每月第一天星期几
    year1 = year2 = year3 = year; //初始化都为同一年
    //循环加1，超过12月份变为1月，年份自动加1
    console.log(year,montha)
    for (var x = 0; x < 3; x++) {
      var mont = montha + x;
      if (mont > 12) {
        montha = 1;
        monthlist.push(1);
        if (x == 0) {
          year1 = year + 1;
        } else if (x == 1) {
          year2 = year + 1;
        } else if (x == 2) {
          year3 = year + 1;
        }
      } else {
        monthlist.push(montha + x);
      }
    }
    console.info("三个月的集合："+monthlist)
    //循环每月有多少天，放进每个月对应的数组里面
    var arr1 = [],
      arr2 = [],
      arr3 = [];
    for (var x = 0; x < monthlist.length; x++) {
      if (x == 0) {

        //根据星期几，循环几个空数据
        var s = year1 + "-" + monthlist[x] + "-" + "1";
        var b = new Date(Date.parse(s.replace(/\-/g, "/")));
        var cc = b.getDay()
        for (var i = 0; i < cc; i++) {
          day1.push("1");
        }

        //判断当前月份有多少天
        var month = monthlist[0];
        if (month < 10) {
          month = "0" + month
        }
        month1 = month;
        var monthDaySize;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          monthDaySize = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          monthDaySize = 30;
        } else if (month == 2) {
          // 计算是否是闰年,如果是二月份则是29天
          if ((data.getFullYear() - 2000) % 4 == 0) {
            monthDaySize = 29;
          } else {
            monthDaySize = 28;
          }
        }
        for (var y = 1; y <= monthDaySize; y++) {
          var datey = y;
          if (datey < 10) {
            datey = "0" + datey
          }
          arr1.push({
            day: y,
            state: 0,
            date: year1 + "." + month + "." + datey
          })
        }
      } else if (x == 1) {
        var s = year2 + "-" + monthlist[x] + "-" + "1";
        var b = new Date(Date.parse(s.replace(/\-/g, "/")));
        var cc = b.getDay()
        for (var i = 0; i < cc; i++) {
          day2.push("1");
        }
        var month = monthlist[1];
        if (month < 10) {
          month = "0" + month
        }
        month2 = month;
        var monthDaySize;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          monthDaySize = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          monthDaySize = 30;
        } else if (month == 2) {
          // 计算是否是闰年,如果是二月份则是29天
          if ((data.getFullYear() - 2000) % 4 == 0) {
            monthDaySize = 29;
          } else {
            monthDaySize = 28;
          }
        };
        for (var y = 1; y <= monthDaySize; y++) {
          var datey = y;
          if(datey < 10 ){
            datey = "0"+ datey  
          }
          arr2.push({
            day: y,
            state: 0,
            date: year2 + "." + month + "." + datey
          })
        }
      } else if (x == 2) {
        var s = year3 + "-" + monthlist[x] + "-" + "1";
        var b = new Date(Date.parse(s.replace(/\-/g, "/")));
        var cc = b.getDay()
        for (var i = 0; i < cc; i++) {
          day3.push("1");
        }
        var month = monthlist[2];
        if (month < 10){
          month = "0" + month
        }
        month3 = month;
        var monthDaySize;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          monthDaySize = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          monthDaySize = 30;
        } else if (month == 2) {
          // 计算是否是闰年,如果是二月份则是29天
          if ((data.getFullYear() - 2000) % 4 == 0) {
            monthDaySize = 29;
          } else {
            monthDaySize = 28;
          }
        };
        for (var y = 1; y <= monthDaySize; y++) {
          var datey = y;
          if (datey < 10) {
            datey = "0" + datey
          }
          arr3.push({
            day: y,
            state: 0,
            date: year3 + "." + month + "." + datey
          })
        }
      }
    }
    console.info("每个月的天数：")
    console.info(arr1)
    console.info(arr2)
    console.info(arr3)


    this.setData({
      date1: arr1,
      date2: arr2,
      date3: arr3,
      date01: arr1,
      date02: arr2,
      date03: arr3,
      year1,
      year2,
      year3,
      day1,
      day2,
      day3,
      month1,
      month2,
      month3
    })


    wx.request({
      url: app.globalData.appUrl + 'WXInventory/getBySellerAdvertiseId',
      data: {
        SellerAdvertiseId: options.sellerAdvertiseId,
        daynum: options.daynum
      },
      success: function (res) {
        wx.request({
          url: app.globalData.appUrl +'Index/showcurrenttime',
          success:function(req){
             
            console.info("下面是查找广告位库存返回的结果：")
            console.log(res)
            console.info("下面是查询当前服务器时间：")
            console.info(req)
            successList = res.data
            var datails = [];

            // dates: "2018-10-7",
            //   number: "5"
            var index;
            if (that.data.optionaldays == 1) {
              index = 3;
            } else if (that.data.optionaldays == 5) {
              index = 10;
            } else if (that.data.optionaldays == 10) {
              index = 20;
            } else if (that.data.optionaldays == 20) {
              index = 40;
            } else if (that.data.optionaldays == 30) {
              index = 60;
            }
            
           
            for (var x = 0; x < index; x++) {
              // var data = '2018-03-09 12:00:00'
              // var countDown = Date.parse(new Date(data))
              // var ddt = Date.parse(new Date(datatime));
              var dt = new Date(req.data.data);
              // console.log("时间")              
              // console.log(dt, datatime)
              dt.setDate(dt.getDate() + x + 4);
              // var dd
              // var riqi = dt.toLocaleDateString()
              console.log(dt.getDate())
              var datearr = []
              // datearr = riqi.split("/")
              var yearonly = dt.getUTCFullYear()
              var monthonly = dt.getMonth()+1
              var dayonly = dt.getDate()
              if (monthonly < 10) {
                monthonly = "0" + monthonly
              }
              if (dayonly < 10) {
                dayonly = "0" + dayonly
              }
              var riqi = yearonly + "." + monthonly + "." + dayonly;
              var kucun = successList[riqi]

              datails.push({
                dates: riqi,
                number: kucun
              })

            }

            console.log(datails)

            that.setData({
              datelist: datails
            })

            var datlist = datails;
            for (x = 0; x < datlist.length; x++) {
              if (datlist[x].number > 0) {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr1.length; t++) {
                  if (arr1[t].date == sta) {
                    arr1[t].state = 1;
                  }
                }
              } else {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr1.length; t++) {
                  if (arr1[t].date == sta) {
                    arr1[t].state = 0;
                  }
                }
              }
            }
            for (x = 0; x < datlist.length; x++) {
              if (datlist[x].number > 0) {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr2.length; t++) {
                  if (arr2[t].date == sta) {
                    arr2[t].state = 1;
                  }
                }
              } else {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr2.length; t++) {
                  if (arr2[t].date == sta) {
                    arr2[t].state = 0;
                  }
                }
              }
            }

            for (x = 0; x < datlist.length; x++) {
              if (datlist[x].number > 0) {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr3.length; t++) {
                  if (arr3[t].date == sta) {
                    arr3[t].state = 1;
                  }
                }
              } else {
                var sta = datlist[x].dates;
                for (var t = 0; t < arr3.length; t++) {
                  if (arr3[t].date == sta) {
                    arr3[t].state = 0;
                  }
                }
              }
            }
            that.setData({
              date1: arr1,
              date2: arr2,
              date3: arr3,
              date01: arr1,
              date02: arr2,
              date03: arr3,
              year1,
              year2,
              year3,
              day1,
              day2,
              day3,
              month1,
              month2,
              month3
            })



          }
        })


      }
    })
    // console.log(monthlist)
    // console.log(year1, year2, year3)

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
  xuanze: function(e) {
    var that = this;
    var dates = e.target.dataset.date;
    var current = e.target.dataset.dates;
    var index = this.data.optionaldays;
    var maxindex;
    if (this.data.optionaldays == 1) {
      maxindex = 3;
    } else if (this.data.optionaldays == 5) {
      maxindex = 10;
    } else if (this.data.optionaldays == 10) {
      maxindex = 20;
    } else if (this.data.optionaldays == 20) {
      maxindex = 40;
    } else if (this.data.optionaldays == 30) {
      maxindex = 60;
    }

    var datlist = this.data.datelist;
    var arr1 = this.data.date1;
    var arr2 = this.data.date2;
    var arr3 = this.data.date3;
    // 获取当前点击的坐标
    var current1 = 0,
      current2 = 0,
      current3 = 0;
    for (var x = 0; x < arr1.length; x++) {
      if (dates == arr1[x].date) {
        current1 = x;
      }
    }
    for (var x = 0; x < arr2.length; x++) {
      if (dates == arr2[x].date) {
        current2 = x;
      }
    }
    for (var x = 0; x < arr3.length; x++) {
      if (dates == arr3[x].date) {
        current3 = x;
      }
    }

    // if(arr1.length - current >= index){
    //   console.info("第一个日历")
    // }else if(arr1.length + arr2.length -  ){

    // }


    // 初始化
    for (var x = 0; x < arr1.length; x++) {
      if (arr1[x].state == 2) {
        arr1[x].state = 1
      }
    }
    for (var x = 0; x < arr2.length; x++) {
      if (arr2[x].state == 2) {
        arr2[x].state = 1
      }
    }
    for (var x = 0; x < arr3.length; x++) {
      if (arr3[x].state == 2) {
        arr3[x].state = 1
      }
    }
    // console.log(current1, current2, current3)
    that.setData({
      date1: arr1,
      date2: arr2,
      date3: arr3
    })
    // console.log(arr2)

    // 给预留三天，然后截取当前的数组长度，留下对应的长度
    // var datlist = this.data.datelist.slice(3);
    var datlist = this.data.datelist;
    // var datlist = this.data.datelist.slice(current1, index + current1);
    // arr1 = arr1.slice(0, index);
    // console.log(current1)


    if (current == 1) {
      var selected = 0;



      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr1.length; t++) {
            if (arr1[t].date == sta) {
              if (arr1[t].state == 1) {
                arr1[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr1.length; t++) {
            if (arr1[t].date == sta) {
              arr1[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          // console.log(sta)
          for (var t = 0; t < arr2.length; t++) {
            if (arr2[t].date == sta) {
              if (arr2[t].state == 1) {
                arr2[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
            if (selected >= index) {
              break;
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr2.length; t++) {
            if (arr2[t].date == sta) {
              arr2[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          // console.log(sta)
          for (var t = 0; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              if (arr3[t].state == 1) {
                arr3[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
            if (selected >= index) {
              break;
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              arr3[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      // console.log(maxindex,arr1, arr2);

      if (selected >= index) {
        that.setData({
          date1: arr1,
          date2: arr2,
          date3: arr3
        })
      }
    }

    if (current == 2) {
      var selected = 0;

      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          // console.log(sta)
          for (var t = current2; t < arr2.length; t++) {
            if (arr2[t].date == sta) {
              if (arr2[t].state == 1) {
                arr2[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
            if (selected >= index) {
              break;
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr2.length; t++) {
            if (arr2[t].date == sta) {
              arr2[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          // console.log(sta)
          for (var t = 0; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              if (arr3[t].state == 1) {
                arr3[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
            if (selected >= index) {
              break;
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              arr3[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      // console.log(maxindex,arr1, arr2);

      if (selected >= index) {
        that.setData({
          date1: arr1,
          date2: arr2,
          date3: arr3
        })
      }
    }

    if (current == 3) {
      var selected = 0;

      for (x = 0; x < datlist.length; x++) {
        if (datlist[x].number > 0) {
          var sta = datlist[x].dates;
          // console.log(sta)
          for (var t = current3; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              if (arr3[t].state == 1) {
                arr3[t].state = 2;
                selected++;
                if (selected >= index) {
                  break;
                }
              }
            }
            if (selected >= index) {
              break;
            }
          }
        } else {
          var sta = datlist[x].dates;
          for (var t = current1; t < arr3.length; t++) {
            if (arr3[t].date == sta) {
              arr3[t].state = 0;
            }
          }
        }
        if (selected >= index) {
          break;
        }
      }

      // console.log(maxindex,arr1, arr2);

      if (selected >= index) {
        that.setData({
          date1: arr1,
          date2: arr2,
          date3: arr3
        })
      }
    }
    


  },
  confirm:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      period: this.getchoosedate()
    })
    wx.navigateBack({
      delta: 1
    })
   
  },
  getchoosedate:function(){
      var arr1 = this.data.date1
      var arr2 = this.data.date2
      var arr3 = this.data.date3
      var arr1 = arr1.concat(arr2,arr3);
      console.info("下面是合并后的日期：")
      console.info(arr1)
    var arrdatelist = []
    var arrdate = []

    var startdate = ''
    var enddatae = ''
    var riqi = ''

    for (var x = 0; x < arr1.length;x++){
      // var startdate = ''
      // var enddatae = ''
      if (arr1[x].state == 2 && arr1[x - 1].state != 2) {
        startdate = arr1[x].date
      }
      if (arr1[x].state == 2 && arr1[x + 1].state != 2) {
        enddatae = arr1[x].date
         riqi = startdate + "-" + enddatae
        arrdate.push(riqi)
        startdate = ''
        enddatae = ''
        riqi = ''
      }
      

      if(arr1[x].state == 2){
        arrdatelist.push(arr1[x].date)
      }
    }
    console.info("下面是选择的日期列表：")
    console.info(arrdate)
    console.info(arrdatelist)

    // for (var x = 0; x < arr2.length; x++) {
    //   // var startdate = ''
    //   // var enddatae = ''

    //   if (x >= 1 && x < arr2.length-1){

     
    //   if (arr2[x].state == 2 && arr2[x - 1].state != 2) {
    //     startdate = arr2[x].date
    //   }
    //   if (arr2[x].state == 2 && arr2[x + 1].state != 2) {
    //     enddatae = arr2[x].date
    //     riqi = startdate + "-" + enddatae
    //     arrdate.push(riqi)
    //     startdate = ''
    //     enddatae = ''
    //     riqi = ''
    //   }

    //   }
    //   if (arr2[x].state == 2) {
    //     arrdatelist.push(arr2[x].date)
    //   }


    // }

    return { "orderDate": arrdate, "orderday": arrdatelist }
    // for (var x = 0; x < arr3.length; x++) {
    //   // var startdate = ''
    //   // var enddatae = ''
    //   if (x >= 1 && x < arr2.length - 1) {
    //   if (arr3[x].state == 2 && arr3[x - 1].state != 2) {
    //     startdate = arr3[x].date
    //   }
    //   if (arr3[x].state == 2 && arr3[x + 1].state != 2) {
    //     enddatae = arr3[x].date
    //      riqi = startdate + "-" + enddatae
    //     arrdate.push(riqi)
    //     startdate = ''
    //     enddatae = ''
    //     riqi = ''
    //   }
    //   }
      
    //   if (arr3[x].state == 2) {
    //     arrdatelist.push(arr3[x].date)
    //   }

    // }
  }
  
})

// 1-3
// 5-10
// 10-20
// 20-30
// 30-60