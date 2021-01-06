var app = getApp();
function getDatetime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  var clock = year + "-";
  if (month < 10)
    clock += "0";
  clock += month + "-";
  if (day < 10)
    clock += "0";
  clock += day + " ";
  if (hh < 10)
    clock += "0";
  clock += hh + ":";
  if (mm < 10) clock += '0';
  clock += mm + ":";
  if (ss < 10) clock += '0';
  clock += ss;
  return clock;
}


Page({
  data: {
    orderType: "任务工单",
    orderName: "",
    orderContent: "",
    imgPath: '',
    shenpiren: "",
    date: "",
    userName: '',
    userId: "",
    imgUrl: [],

  },
  onLoad() { },
  onItemClick() {
    dd.hideLoading();

    var that = this;
    dd.complexChoose({
      title: "选择审核人",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了限定人数",          //超过限定人数返回提示
      maxUsers: 1,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "GLOBAL",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false,        //返回人，或者返回人和部门
      success: function (res) {
        that.setData({
          shenpiren: res.users,
        })
      },
      fail: function (err) {
        that.setData({
          shenpiren: [],
        })
      },

    });
  },
  chooseImage() {
    dd.chooseImage({
      count: 2,
      success: (res) => {
        console.log(res.filePaths);
        this.setData({
          imgPath: res.filePaths,
        })
      },
    });

  },
  myPreviewImage() {
    dd.previewImage({
      current: 0,
      urls: this.data.imgPath,
    });
  },
  onSubmit(e) {

    if (this.isEmpty(e.detail.value.orderName) || this.isEmpty(e.detail.value.orderContent) || this.isEmpty(this.data.date) || this.isEmpty(this.data.shenpiren)) {
      dd.alert({
        content: "请先填写完必填项",
      })
      return;
    } else {
      this.setData({
        orderName: e.detail.value.orderName,
        orderContent: e.detail.value.orderContent
      })
    }
    const promise = new Promise((resolve) => {
      if (this.data.imgPath != 0) {
        dd.showLoading({
          content: '上传图片中...',
        });
        this.setData({
          imgUrl: []
        })
        var count = 0;
        this.data.imgPath.forEach(path => {
          dd.uploadFile({
            url: 'http://3b32dcea.nat1.s100.vip/fileUpload',
            fileType: 'image',
            fileName: 'file',
            filePath: path,
            success: (res) => {
              var data = JSON.parse(res.data);
              dd.hideLoading();
              if (data.success) {
                console.log(res);
                // dd.alert({
                //   content: '上传成功'
                // });
                count++;
                this.data.imgUrl.push(data.data)
                if (count == this.data.imgPath.length) {
                  dd.alert({
                    content: '上传成功'
                  });
                  resolve();
                }
              } else {
                console.log(res);
                // dd.alert({
                //   content: '上传失败 '
                // });
                if (count == this.data.imgPath.length) {
                  dd.alert({
                    content: '上传失败，请重新上传'
                  });
                }
              }
            },
            complete: function () {
              dd.hideLoading();
            }
          });
        });
      } else {
        resolve();
      }

    });

    //图片上传完后再上传表单内容
    promise.then(() => {
      // Content-Type为application/x-www-form-urlencoded即默认的接口请求方式
      dd.httpRequest({
        url: 'http://3b32dcea.nat1.s100.vip/saveOrder',
        method: 'POST',
        data: {
          orderType: this.data.orderType,
          orderName: this.data.orderName,
          orderContent: this.data.orderContent,
          orderTime: this.data.date,
          approver: this.data.shenpiren[0].userId,
          imgUrl: JSON.stringify(this.data.imgUrl),
          orderStatus: 0,
          userName: app.globalData.userName,
          userId: app.globalData.userId,
          createTime: getDatetime(),
        },
        dataType: 'json',
        success: function (res) {
         
        },
        fail: function (res) {
          dd.alert({ content: 'fail' });
        },
        complete: function (res) {
          console.log(res);
           dd.navigateBack({
            delta: 1
          })
        }
      });
    })
  },
  onChooseDate() {
    var that = this;
    var d = getDatetime();
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: d,
      success: (res) => {
        this.setData({
          date: res.date,
        })
      },
      fail: function () {
      }
    });
  },
  //判断字符是否为空的方法
  isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }
});
