//index.js
//获取应用实例
var Util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    advers:[],
    sixItems:[],
    seasonItems:[],
    products:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    toastMessage:"",
    localImagesUrl: Util.localImageUrl
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // console.log('onLoad');

    this.test();

    var that = this;
    const adverUrl = app.globalData.urlBase+ "?app_key=yooyo_weekend&method=emall.adverts.list&app_id=2&ccodes=index_top_carousel%2Cindex_center_six%2Csearch_key_words&city=San%20Francisc&come_from=2&format=json&from=iOS&partner_id=100&timestamp=1493185433671&version=5";
    const mainSeasonUrl = app.globalData.urlBase +  "?app_key=yooyo_weekend&method=emall.content.list&app_id=2&city=San%20Francisc&format=json&from=iOS&partner_id=100&page_no=1&version=5&column_id=5710000&timestamp=1493189081378&come_from=2";
    const productUrl = app.globalData.urlBase + "?app_key=yooyo_weekend&method=emall.product.list&app_id=2&come_from=2&format=json&from=iOS&partner_id=100&tags=%E4%BC%98%E9%80%89%E8%A1%8C%E7%A8%8B&timestamp=1520308170311&version=5&yooyo_sessid=f99ba916-0b46-4ab6-a593-a0bea6a195e"

    //微信定位

    this.getLocal();



    //获取广告位
    this.getAdverData(adverUrl);
    //获取当季
    this.getMainSeasonData(mainSeasonUrl);

    this.getPrductList(productUrl);

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  getLocal:function(){
     wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // console.log(latitude)
        // console.log(longitude)
      }
    })
 },
  getAdverData:function(url){
    // wx.showNavigationBarLoading()
    wx.showLoading({
       title: '加载中',
    })

    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'content-type': 'json'
      }, // 设置请求的 header
      success: function(res){
        // success
        that.processAdverData(res);

      },
      fail: function(res) {
        // fail
        // console.log(res);

      },
      complete: function(res) {
        // complete
        wx.hideLoading()

      }
    })
  },
  getMainSeasonData(url){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'json'
      }, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res);
        that.processMainSeasonData(res);
      },
      fail: function(res) {
        // fail
        // console.log(res);
      },
      complete: function(res) {
        // complete
        wx.hideNavigationBarLoading();

      }
    })


  },
  getPrductList(url){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', 
      header: {
        'content-type': 'json'
      }, 
      success: function (res) {
        // success
        console.log("fangyukui");
        that.setData({
           products:res.data.data
        })
        console.log(that.data.products);
        
      },
      fail: function (res) {
        // fail
        console.log(res);
      },
      complete: function (res) {
        // complete
        wx.hideNavigationBarLoading();

      }
      
    })
  },
   

  processAdverData:function(resposeData){
    wx.hideNavigationBarLoading();
    // console.log("成功请求数据");
    // console.log(resposeData);
    var temps = [];
    var item_temp = {};
    for(var idx in resposeData.data.data.index_top_carousel){
      var item = resposeData.data.data.index_top_carousel[idx];
      item_temp = {
        file_rsurl:"https:" + item.file_rsurl
      }
      temps.push(item_temp); 
    }
    // console.log(temps);
    this.setData({
      advers:temps
    });

    var six_temps = [];
    var six_item_temp = {};
    for(var idx in resposeData.data.data.index_center_six){
      var item = resposeData.data.data.index_center_six[idx];
      six_item_temp = {
        file_rsurl:"https:" + item.file_rsurl,
        content:item.content,
        describe:item.describe
        // click_url:item.click_url
      }
      six_temps.push(six_item_temp); 
    }

    this.setData({
      sixItems:six_temps
    });
  },
  processMainSeasonData(resposeData){
    var temps = [];
    for(var idx in resposeData.data.data){
       var item = resposeData.data.data[idx];
       item.pic_rsurl = "https:" + item.pic_rsurl;
       item.keywords =  item.keywords +  "条线路";
       temps.push(item);
    }
    this.setData({
      seasonItems:temps

    });
    // console.log(this.data.seasonItems);
  
  },



  // click
  tapSixItemClick:function(e){
    // console.log(e);
    var six_item  = this.data.sixItems[e.currentTarget.dataset.idx];
    wx.navigateTo({
      url: '../Seacher/Seacher',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  toSmartTourist:function(){
    wx.navigateTo({
      url: '../SmartTourist/SmartTourist',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

  },
  toastHiddenChange:function(){
    this.setData({
        isHiddenToast:true
    });

  },
  test:function(){
    var data = {"package":"Sign= WXPay","appid":"wx51c0046e78e7d7fb","sign":"37285E73878DBBB9D09977597C67BE59","partnerid":"1237293602","prepayid":"wx201706011548337baaf4406c0641149943","noncestr":"5e7c7da6d3e60fe31bbfb567074e8e3e","timestamp":"1496303313"};

    // console.log(data["appid"]);

  },
  toDatail:function(e){
    console.log(e.currentTarget);

  }


})
