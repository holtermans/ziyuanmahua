Page({
  data: {
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
        title: '工单附件',
        subTitle: '描述',
      },
    ],
    activeTab: 0,
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
  onLoad() { },
});
