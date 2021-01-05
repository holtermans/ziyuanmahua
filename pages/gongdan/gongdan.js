
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
    userId: "",

  },
  onLoad() { },
  onItemClick() {
    var that = this;
    dd.complexChoose({
      title: "选择审核人",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了限定人数",          //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
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
      }
    });
  },
  uploadImage() {
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
    console.log(`数据：${JSON.stringify(e.detail.value)}` + this.data.date + this.data.shenpiren[0].name);
    dd.showLoading({
      content: '上传图片中...',
    });
    dd.uploadFile({
      url: 'http://de92568a.nat1.s100.vip/fileUpload',
      fileType: 'image',
      fileName: 'file',
      filePath: this.data.imgPath[0],
      success: (res) => {
        dd.hideLoading();
        dd.alert({
          content: '上传成功'
        });
      },
    });
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
    });
  }
});
