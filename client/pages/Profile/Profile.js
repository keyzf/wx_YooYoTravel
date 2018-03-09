// pages/Profile/Profile.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: null,
      yooyo_sessid: '',
      avatarUrl: '',
      mobile: '',
      partner: '',//渠道
      hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.data.userInfo = res.data.member;
        that.data.yooyo_sessid = res.data.yooyo_sessid;
        that.setData({
          hasUserInfo: true,
          avatarUrl: "https:" + that.data.userInfo.avatar_rsurl,
          mobile: that.data.userInfo.mobile,
          partner: that.data.userInfo.partner_name
        });
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

  onRegister: function () {
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function(res) {
    //     const user = res.data.member;
    //     console.log("mobile:"+user.mobile);
    //   },
    // })

      // wx.removeStorage({
      //   key: 'userInfo',
      //   success: function(res) {},
      // })

  },

  logout: function () {
    wx.removeStorage({
      key: 'userInfo'
    })
    wx.reLaunch({
      url: '../Profile/Profile',
    })
  },

  toOrderList: function (e) {

    // console.log("state:" + e.currentTarget.dataset.state);
    var state = e.currentTarget.dataset.state;

    if (this.data.yooyo_sessid === "") {
      wx.navigateTo({
        url: 'login',
      })
    }else {
      wx.navigateTo({
        url: 'order/orderList?state=' + state,
      })
    }
  }
})