var app = getApp();

var domain = 'http://3b32dcea.nat1.s100.vip/';
var api = ["queryTicketByApprover", "queryTicketByUser"]
Page({
  data: {
    paths: ["/pages/detail/detail"],
    userId: '',
    id: '',
    uuid: '',
    ticketType: '',
    ticketName: '',
    ticketContent: '',
    ticketTime: '',
    approver: '',
    imgUrl: [],
    ticketStatus: '',
    userName: '',
    userId: '',
    createTime: '',

    result: [],
    from: 0,
  },
  onLoad(query) {
    var that = this;
    this.setData({
      userId: app.globalData.userId,
      from: query.api,
    })
    console.log(query);
    dd.httpRequest({
      url: domain + api[this.data.from],
      method: 'POST',
      data: {
        userId: this.data.userId,
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
        })
        console.log(res);
      },
      fail: function (res) {
        dd.alert({ content: 'fail' });
      },
      complete: function (res) {

      }
    });
  },
  listTap(event) {
    dd.navigateTo({
      url: this.data.paths[0] + "?ticketId=" + event.target.dataset.ticketId,
    });
  }
});
