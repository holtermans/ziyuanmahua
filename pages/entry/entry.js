var app = getApp();
Page({
  data: {
    is_sys:false,
  },
  onLoad() {
    this.setData({
      is_sys: app.globalData.is_sys,
    })
  },
  newOrder() {
    dd.navigateTo({
      url: '/pages/gongdan/gongdan'
    });
  },
  BindShenHe() {
    dd.navigateTo({
      url: '/pages/gongdansh/gongdansh'
    });
  },
  toTiaoQian(){
    dd.navigateTo({
      url: '/pages/tiaoqian/tiaoqian'
    });
  }
});
