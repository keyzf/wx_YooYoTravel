// pages/Home/Detail/HomeDetail.js
import Common from '../../../utils/common.js'
var WxParse = require('../../../vendor/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data)
    this.getDetail(data.id)
   
  },
  getDetail (id){
    let params = Common.sameParams
    params["id"] = id
    params["method"] = 'emall.product.get'
    var that = this
    wx.showLoading({
      title: 'Loading',
    })
    wx.request({
      url: Common.apiUrl,
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          product: res.data.data
        })
        console.log(that.data.product)
        
        WxParse.wxParse('buy_know', 'html', that.data.product.buy_know, that, 5);
        WxParse.wxParse('warm_prompt', 'html', that.data.product.warm_prompt, that, 5);

      }
    })
  }

  
})