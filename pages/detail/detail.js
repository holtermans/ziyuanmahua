var app = getApp();

var domain = 'http://3b32dcea.nat1.s100.vip/';
var api = ["queryTicketByApprover", "queryTicketByUser", "queryTicketByUuid", "changeStatus"]

Page({
  data: {
    domain: 'http://3b32dcea.nat1.s100.vip/',
    imgUrl: [],
    ticketId: '',
    activeIndex: 2,
    failIndex: 0,
    size: 0,
    items: [{
      title: '申请',
    }, {
      title: '进行中',
    }, {
      title: '完成',
    }],
    tabs: [
      {
        title: '工单信息',
        subTitle: '描述文案',

      },

      {
        title: '附件',
        subTitle: '描述',
      },
    ],
    activeTab: 0,

    from:0,
    fromArray:[false,true],//true表示不显示审核按钮
  },

  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onLoad(query) {
    var that = this;
    console.log(query.ticketId);
    this.setData({
      ticketId: query.ticketId,
      from:query.from,
    })

    dd.httpRequest({
      url: domain + api[2],
      method: 'POST',
      data: {
        uuid: this.data.ticketId
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.success === true)
          dd.showToast({
            type: 'success',
            content: '查询成功',
            duration: 1000,
            success: () => {
            },
          });
        var imgUrl = JSON.parse(res.data.result.imgUrl)
        that.setData({
          // id: '',
          // uuid: res.data.result[0].uuid,
          // ticketType: res.data.result[0].ticketType,
          // ticketName: res.data.result[0].ticketName,
          // ticketContent: res.data.result[0].ticketContent,
          // ticketTime: res.data.result[0].ticketTime,
          // approver: res.data.result[0].approver,
          // imgUrl: res.data.result[0].imgUrl,
          // ticketStatus: res.data.result[0].ticketStatus,
          // userName: res.data.result[0].userName,
          // userId: res.data.result[0].userId,
          // createTime: res.data.result[0].createTime,
          result: res.data.result,
          imgUrl: imgUrl.map(x => domain + x),
        })
        console.log(res);

        console.log(that.data.imgUrl);
      },
      fail: function (res) {
        dd.alert({ content: '无法加载' });
      },
      complete: function (res) {

      }
    });
  },
  myPreviewImage() {
    dd.previewImage({
      current: 0,
      urls: this.data.imgUrl,
    });
  },
  onSubmit() {
    dd.httpRequest({
      url: domain + api[3],
      method: 'POST',
      data: {
        uuid: this.data.ticketId,
        ticketStatus: 2.
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.success === true)
          dd.showToast({
            type: 'success',
            content: '已通过',
            duration: 1000,
            success: () => {
            },
          });
        console.log(res);
        dd.navigateBack({
          delta: 2,
        })
      },
      fail: function (res) {
        dd.alert({ content: '无法加载' });
      },
      complete: function (res) {

      }
    });
  }
});
