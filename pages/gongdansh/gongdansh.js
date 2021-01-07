var app = getApp();

var domain = 'http://3b32dcea.nat1.s100.vip/';

Page({
  data: {
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
    result:[]
  },
  onLoad() {
    var that = this;
    this.setData({
      userId: '280743040626432846',
    })

    dd.httpRequest({
      url: domain + '/queryTicketByApprover',
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
            duration: 2000,
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
          result:res.data.result,
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
});
