// components/getPhone/getPhone.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  
  /**
   * 组件的初始数据
   */
  data: {
    getphone: Boolean(app.globalData.phone_number),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber: function (e) {
      if (!e.detail.encryptedData) {
        return;
      };
      var that = this;
      app.getPhoneNumber(e, that, '');
    },
    getPhoneNumber(e) {
      var that = this;
      var MSG = e.detail.errMsg;
      var IV = e.detail.iv;
      var DAta = e.detail.encryptedData
      wx.request({
        url: app.globalData.url_test + 'api/WechatUserInfo/GetWeChatUserPhoneNumber',
        method: "post",
        data: {
          openid: app.globalData.openid,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: function (res) {
          console.log('授权操作',res.data.data)
          console.log(res.data.data.PhoneNumber)
          var value = wx.getStorageSync('phone_number');
          if (res.data.code != 0) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.msg,
              success: function (res) {

              }
            });
            return;
          };
          wx.setStorageSync('phone_number', res.data.data.PhoneNumber)
          wx.setStorageSync('HYID', res.data.data.HYID)
          app.globalData.phone_number = res.data.data.PhoneNumber;
          app.globalData.HYID = res.data.data.HYID;
          wx.showTabBar()
          that.setData({
            getphone: true,
            phone_number: res.data.data.PhoneNumber
          });
          that.setData({
            aa20180625: 1
          });
          // callback(e, that)
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: "获取失败",
            success: function (res) {

            }
          });
          return;
        }
      })
    },
  }
})
