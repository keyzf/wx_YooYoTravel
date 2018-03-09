// pages/Profile/login.js
//获取应用实例
var app = getApp();
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      isShow: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      isShow: false,
      lastTime: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",//手机
    QrCodeUrl: "",//验证码图片url
    vCode: "",//验证码
    signValue: "",
    loadQrCode: false,
    isShow: true,//获取验证码按钮
    lastTime: '',
    yooyoSessid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVerificationImage();
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

  /**
   * 获取验证码图片
   */
  getVerificationImage: function () {

    var that = this;
    // var url = app.globalData.urlBase + "?app_key=yooyo_weekend&method=emall.captcha.image&bg_color=50,60,70&width=140&length=4&version=5&timestamp=1519887311290&height=50";
    wx.request({
      url: app.globalData.urlBase,
      data: {
        version: '5',
        app_key: 'yooyo_weekend',
        method: 'emall.captcha.image',
        bg_color: '50,60,70',
        width: '140',
        height: '50',
        length: '4',
        timestamp: Date.now()
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        // console.log("成功请求数据");
        // console.log(res);

        that.setImage(res.data)
      },
      fail: function (res) {
        // fail

      },
      complete: function (res) {
        // complete

      }
    })
  },

  setImage: function (data) {
    const base64 = data.data.image;
    // const base64 = wx.arrayBufferToBase64(data.data.image);
    // const png = wx.base64ToArrayBuffer(data.data.image);
    this.setData({
      QrCodeUrl: "data:image/png;base64," + base64,
      signValue: data.data.sign_value,
      loadQrCode: true
    });
  },

  reloadVerificationImage: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlBase,
      data: {
        version: '5',
        app_key: 'yooyo_weekend',
        method: 'emall.captcha.image',
        bg_color: '50,60,70',
        width: '140',
        height: '50',
        length: '4',
        timestamp: Date.now()
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        // console.log("成功请求数据");
        // console.log(res);

        that.setImage(res.data)
      },
      fail: function (res) {
        // fail

      },
      complete: function (res) {
        // complete

      }
    })
  },

  setMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  setVCode: function (e) {
    this.setData({
      vCode: e.detail.value
    });
  },

  getCode: function () {
    // var url = "https://open.yooyo.com/rtapi/outer/router.json?app_key=yooyo_weekend&method=emall.member.quicklogin&captcha_sign=057b2a350e4b887e270aadea5322c51b054ceefd&mobile=15820268278&captcha_value=NW4G&version=5&app_id=2&timestamp=1519980989878"

    if (this.isNull(this.data.mobile)) {
      wx.showToast({
        title: "请输入手机",
      })
      return;
    }

    if (this.isNull(this.data.vCode)) {
      wx.showToast({
        title: "请输入验证码",
      })
      return;
    }

    var that = this;

    wx.request({
      url: app.globalData.urlBase,
      data: {
        app_key: 'yooyo_weekend',
        method: 'emall.member.quicklogin',
        version: '5',
        app_id: '2',
        timestamp: Date.now(),
        captcha_sign: this.data.signValue,
        mobile: this.data.mobile,
        captcha_value: this.data.vCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log("成功请求数据");
        console.log(res);


        that.clickVerify(res.data);

      },
      fail: function (res) {
        // fail

      },
      complete: function (res) {
        // complete

      }
    })

  },

  clickVerify: function (data) {

    var that = this;
    var sessid = data.data.yooyo_sessid;
    that.data.yooyoSessid = sessid;
    console.log("yooyoSessid:" + sessid);
    that.setData({
      isShow: (!that.data.isShow)
    })
    settime(that);
  },

  /**
   * 登录
   */
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)

    // wx.showToast({
    //   title: e.detail.value.sign,
    // })

    // var url = "http://open.yooyo.com/rtapi/outer/router.json?app_key=yooyo_weekend&method=emall.member.quicklogin&captcha_sign=bc5eb4d5877c3a1197a438d5466f8569770d1444&sms_code=3973&mobile=15820268278&yooyo_sessid=a613cada-8d70-4841-9a92-514ee18d83cb&captcha_value=C4Dc&version=5&app_id=2&timestamp=1520237667459";

    var smsCode = e.detail.value.smsCode;
    var that = this;
    wx.request({
      url: app.globalData.urlBase,
      data: {
        app_key: 'yooyo_weekend',
        method: 'emall.member.quicklogin',
        version: '5',
        app_id: '2',
        timestamp: Date.now(),
        captcha_sign: this.data.signValue,
        mobile: this.data.mobile,
        captcha_value: this.data.vCode,
        sms_code: smsCode,
        yooyo_sessid: this.data.yooyoSessid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log("成功请求数据");
        console.log(res);
        that.saveUserInfo(res.data);

      },
      fail: function (res) {
        // fail

      },
      complete: function (res) {
        // complete

      }
    })

  },

  saveUserInfo: function (data) {
    var userInfo = data.data;
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    })
    app.globalData.userInfo = userInfo;
    wx.reLaunch({
      url: '../Profile/Profile?id=123',
    })
      // wx.navigateTo({
      //   url: '../logs/logs'
      // })
  },

  /**
   * 判断输入字符串是否为空或者全部都是空格
   */
  isNull: function (str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }

})