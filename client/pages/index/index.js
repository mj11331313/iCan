var util = require('../../utils/util.js'); 
const temId = 'B5z-ysXc6aH3IkvOfxa-ErsdhF5IW9ETiCfAvHUAdM0';
Page({
  formSubmit:function(e){
    // 获取其他参数
    var formId = e.detail.formId;    
    var openid = wx.getStorageSync('openid');
    var access_token = wx.getStorageSync('access_token');
    // 发送模板消息
      wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`,
          method: 'POST',
          header: {
            "content-type": "application/json"
          },
          data: {
            "touser": openid,
            "template_id": temId,
            "form_id": formId,
            "data": {
              "keyword1": {
                "value": "iCan小工具"
              },
              "keyword2": {
                "value": "野生pai"
              },
              "keyword3": {
                "value": "你看，成功了!"
              },
              "keyword4": {
                "value": util.formatTime(new Date())
              },
              "keyword5": {
                "value": "第一个推送，能成功吗？"
              }
            }
          },
          success: function (res) {
            if (res.data.errcode == 0){  // 模板消息发送成功
              wx.showToast({
                title: '推送成功!',
                icon: 'success',
                duration: 1000
              })
            }
          }
        })
     }
})
