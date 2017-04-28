//app.js
App({
    onLaunch: function() {
        var Bmob = require('utils/bmob.js');
         Bmob.initialize("b07f058d8f503ba46e728c1a6514d3f9", "448ea5c588cbb985ba5604f699801d08");
        if (!wx.getStorageSync('favlist')) {
            wx.setStorageSync('favlist', {
                '我喜欢的音乐': {
                    picurl: '',
                    list: []
                }
            });
        }
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})