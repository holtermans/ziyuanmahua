Page({
  data: {},
  onLoad() { },
  uploadFile() {

    dd.uploadAttachmentToDingTalk({
      image: { multiple: true, compress: false, max: 9, spaceId: "4352746739" },
      space: { spaceId: "4352746739", isCopy: 1, max: 9 },
      file: { spaceId: "4352746739", max: 1 },
      types: ["file", "space"],//PC端仅支持["photo","file","space"]
      success: (res) => {
        dd.alert({
          content: res,
        });
        dd.previewFileInDingTalk({
          corpId: "dingb50395b1c5c54c6bf5bf40eda33b7ba0",
          spaceId: "4352746739",
          fileId: res.data[0].fileId,
          fileName: res.data[0].fileName,
          fileSize: res.data[0].fileSize,
          fileType: res.data[0].fileType,
        })

        /*
        {
           type:'', // 用户选择了哪种文件类型 ，image（图片）、file（手机文件）、space（钉盘文件）
           data: [
              {
                spaceId: "232323",
                fileId: "DzzzzzzNqZY",
                fileName: "审批流程.docx",
                fileSize: 1024,
                fileType: "docx"
             },
             {
                spaceId: "232323",
                fileId: "DzzzzzzNqZY",
                fileName: "审批流程1.pdf",
                fileSize: 1024,
                fileType: "pdf"
             },
             {
                spaceId: "232323",
                fileId: "DzzzzzzNqZY",
                fileName: "审批流程3.pptx",
                fileSize: 1024,
                fileType: "pptx"
              }
           ]

        }
         */
      },
      fail: (err) => {
        dd.alert({
          content: JSON.stringify(err)
        })
      }
    })
  },


});
