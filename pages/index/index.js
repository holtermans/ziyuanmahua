var app = getApp();
let domain = "http://3b32dcea.nat1.s100.vip/";
let url = domain + '/login';

Page({

  data: {
    corpId: '',
    authCode: '',
    userId: '',
    userName: '',
    is_sys: false,
    gridList: [
      { icon: 'https://lterweima.oss-cn-shenzhen.aliyuncs.com/wangwo/shenhe.png', text: '工单审核', },
      { icon: 'https://lterweima.oss-cn-shenzhen.aliyuncs.com/wangwo/gongdan.png', text: '我的工单', },
    ]
  },
  onLoad(query) {
    // 页面加载
    this.loginSystem();
  },
  onReady() {
    // 页面加载完成

  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉

  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  loginSystem() {
    dd.showLoading();
    dd.getAuthCode({
      success: (res) => {

        this.setData({
          authCode: res.authCode,
        })
        console.log(res.authCode);
        //dd.alert({content: "step1"});
        dd.httpRequest({
          url: url,
          method: 'POST',
          data: {
            authCode: res.authCode
          },
          dataType: 'json',
          success: (res) => {
            // dd.alert({content: "step2"});
            console.log('success----', res)
            let userId = res.data.result.userId;
            let userName = res.data.result.userName;
            let is_sys = res.data.result.is_sys;

            app.globalData.userId = userId;
            app.globalData.userName = userName;//全局注册
            app.globalData.is_sys = is_sys;
            this.setData({
              userName: userName
            })
            // dd.navigateTo({
            //   url: '/page/run/run?userId=' + userId + '&userName=' + userName
            // });
          },
          fail: (res) => {
            console.log("httpRequestFail---", res)
            dd.alert({ content: "开始" + JSON.stringify(res) });
          },
          complete: (res) => {
            dd.hideLoading();
          }

        });
      },
      fail: (err) => {
        // dd.alert({content: "step3"});
        dd.alert({
          content: "开始" + JSON.stringify(err)
        })
      }
    })
  },
  onItemClick(ev) {
    my.alert({
      content: ev.detail.index,
    });
  },
});
