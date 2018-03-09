// pages/Profile/order/orderList.js
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    yooyo_sessid: '',
    partner_id: '',
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("state:" + options.state);
    if (options.state === "undefined") {
      console.log("options.state === undefined");
    }else {
      this.data.state = options.state;
    }
    
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.data.yooyo_sessid = res.data.yooyo_sessid;
        that.data.partner_id = res.data.member.partner_id;
        that.getOrderList();
      },
    })
    
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

  getOrderList: function () {
    // String[] state = { "", "2", "1", "3" };{ "订单", "待出行订单", "待付款订单", "退款单" };
    /**
     * "":全部订单
     * 2:待出行
     * 1:待付款
     * 3:退款单
     */
    // var url = "http://open.yooyo.com/rtapi/outer/router.json?app_key=yooyo_weekend&method=emall.order.list&state_classify=&yooyo_sessid=51f7d45c-a377-4c61-83a8-406a5ee16174&page_no=1&version=5&app_id=2&timestamp=1520327655553&page_size=10&partner_id=16";
    wx.showLoading({
      title: '请稍等',
    });
    var that = this;
    wx.request({
      url: app.globalData.urlBase,
      data: {
        app_key: 'yooyo_weekend',
        method: 'emall.order.list',
        version: '5',
        app_id: '2',
        timestamp: Date.now(),
        state_classify: this.data.state,
        yooyo_sessid: this.data.yooyo_sessid,
        page_no: '1',
        page_size: '10',
        partner_id: '16'
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideLoading();
        console.log("getOrderList成功请求数据");
        console.log(res);
        that.processOrderListData(res.data);
      },
      fail: function (res) {
        // fail

      },
      complete: function (res) {
        // complete

      }
    })

  },

  processOrderListData: function (res) {

    var orderList_temps = [];
    var orderList_item_temp = {};

    for (var idx in res.data) {
      var item = res.data[idx];
      orderList_item_temp = {
        order_no: item.order_no,
        logo_rsurl: "https://" + item.logo_rsurl,
        order_name: item.order_name,
        base_type_label: item.base_type_label,
        pay_price: item.pay_price,
        state_label: item.state_label
        // file_rsurl: "https:" + item.file_rsurl,
        // content: item.content,
        // describe: item.describe
        // click_url:item.click_url
      }
      orderList_temps.push(orderList_item_temp); 
    }

    this.setData({
      orderList: orderList_temps
    });
  }

})