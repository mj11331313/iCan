const appid = 'APPID';
const secret = 'SECRET';
App({
  onShow:function(){
    // 获取code
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取code成功');
          // 发起请求获取openid并保存
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${res.code}&grant_type=authorization_code`,
            success:res => {
              console.log('获取openid成功');
              wx.setStorageSync('openid',res.data.openid);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
    // 获取access_token并保存
    wx.request({
      url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      method:'GET',
      success:res => {
        console.log('获取access_token成功');
        console.log(res);
        wx.setStorageSync('access_token', res.data.access_token);
      }
    })
  }
})
