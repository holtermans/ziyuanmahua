Page({
  data: {
    orderType: "任务工单",
    orderName: "",
    orderContent: "",
    imgPath: '',
    shenpiren: "",

  },
  onLoad() { },
  onItemClick() {
    var that = this;
    dd.complexChoose({
      title: "测试标题",            //标题
      multiple: true,            //是否多选
      limitTips: "超出了",          //超过限定人数返回提示
      maxUsers: 1000,            //最大可选人数
      pickedUsers: [],            //已选用户
      pickedDepartments: [],          //已选部门
      disabledUsers: [],            //不可选用户
      disabledDepartments: [],        //不可选部门
      requiredUsers: [],            //必选用户（不可取消选中状态）
      requiredDepartments: [],        //必选部门（不可取消选中状态）
      permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
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
        console.log(res.filePaths[0]);
        this.setData({
          imgPath: res.filePaths[0],
        })
      },
    });
  },
  myPreviewImage() {
    dd.previewImage({
      current: 0,
      urls: [
        this.data.imgPath
      ],
    });
  },
  onSubmit(e) {
    dd.alert({
      content: `数据：${JSON.stringify(e.detail.value)}`,
    });
  },
  onChooseDate() {
     var d = new Date();
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate:'2020-12-25 5:52',
      success: (res) => {
        dd.alert({
          content: res.date,
        });
      },
    });
  }
});
