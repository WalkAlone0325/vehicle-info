"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_home = require("../../api/home.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_wd_grid_item2 = common_vendor.resolveComponent("wd-grid-item");
  const _easycom_wd_grid2 = common_vendor.resolveComponent("wd-grid");
  const _easycom_BaseTitle2 = common_vendor.resolveComponent("BaseTitle");
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  const _easycom_wd_table_col2 = common_vendor.resolveComponent("wd-table-col");
  const _easycom_wd_table2 = common_vendor.resolveComponent("wd-table");
  (_easycom_wd_swiper2 + _easycom_wd_grid_item2 + _easycom_wd_grid2 + _easycom_BaseTitle2 + _easycom_qiun_data_charts2 + _easycom_wd_table_col2 + _easycom_wd_table2)();
}
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_wd_grid_item = () => "../../uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.js";
const _easycom_wd_grid = () => "../../uni_modules/wot-design-uni/components/wd-grid/wd-grid.js";
const _easycom_BaseTitle = () => "../../components/BaseTitle.js";
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
const _easycom_wd_table_col = () => "../../uni_modules/wot-design-uni/components/wd-table-col/wd-table-col.js";
const _easycom_wd_table = () => "../../uni_modules/wot-design-uni/components/wd-table/wd-table.js";
if (!Math) {
  (_easycom_wd_swiper + _easycom_wd_grid_item + _easycom_wd_grid + _easycom_BaseTitle + _easycom_qiun_data_charts + _easycom_wd_table_col + _easycom_wd_table)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperList = common_vendor.ref(["/static/swiper1.jpg"]);
    const list = common_vendor.ref([]);
    const dataList = common_vendor.ref([]);
    const chartData = common_vendor.ref({});
    const opts = common_vendor.ref({
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 10, 0, 15],
      enableScroll: false,
      pixelRatio: 3,
      legend: {},
      xAxis: {
        disableGrid: true,
        marginTop: 8,
        rotateLabel: true,
        rotateAngle: 45
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2
      },
      extra: {
        line: {
          type: "straight",
          width: 2,
          activeType: "hollow"
        }
      }
    });
    const getLineData = async () => {
      const res = await api_home.getCarCountApi({});
      if (res.code == 200) {
        chartData.value = {
          ...res.data,
          categories: res.data.xaxisDataList
        };
      }
    };
    const getTableData = async () => {
      const res = await api_home.getCarTableApi({});
      if (res.code == 200) {
        list.value = res.data;
      }
    };
    const clickItem = (type) => {
      common_vendor.index.navigateTo({
        url: type === 1 ? "/pages/index/car" : "/pages/index/driver"
      });
    };
    const getOilTank = async () => {
      const res = await api_home.getOilTankApi({});
      if (res.code == 200) {
        dataList.value = [
          { lab1: "正在发电设备", val1: res.data.jobStatusGeneratingCount, lab2: "总设备", val2: res.data.deviceCount, unit: "台" },
          { lab1: "空载设备统计", val1: res.data.jobStatusIdleCount, lab2: "总设备", val2: res.data.deviceCount, unit: "台" },
          { lab1: "在线设备统计", val1: res.data.onoffStatusOnCount, lab2: "总设备", val2: res.data.deviceCount, unit: "台" },
          { lab1: "离线设备统计", val1: res.data.onoffStatusOffCount, lab2: "总设备", val2: res.data.deviceCount, unit: "台" },
          { lab1: "发电次数统计", val1: res.data.recordMonthNowCount, lab2: "总次数", val2: res.data.recordCount, unit: "本月" },
          { lab1: "开机时长统计", val1: res.data.bootTimeMonthNowCount, lab2: "总时长", val2: res.data.bootTimeCount + " 分钟", unit: "本月" }
        ];
      }
    };
    common_vendor.onShow(() => {
      getOilTank();
      getLineData();
      getTableData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: swiperList.value,
          autoplay: true
        }),
        b: common_assets._imports_0,
        c: common_vendor.o(($event) => clickItem(1)),
        d: common_vendor.p({
          ["use-icon-slot"]: true,
          ["use-text-slot"]: true,
          text: "车辆信息"
        }),
        e: common_assets._imports_1,
        f: common_vendor.o(($event) => clickItem(2)),
        g: common_vendor.p({
          ["use-icon-slot"]: true,
          ["use-text-slot"]: true,
          text: "司机信息"
        }),
        h: common_vendor.p({
          clickable: true,
          ["hover-class"]: " "
        }),
        i: common_vendor.f(dataList.value, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.lab1),
            b: common_vendor.t(i.unit),
            c: common_vendor.t(i.val1),
            d: common_vendor.t(i.lab2),
            e: common_vendor.t(i.val2),
            f: i.lab1
          };
        }),
        j: common_vendor.p({
          title: "油机数据统计"
        }),
        k: common_vendor.p({
          title: "车辆数据统计"
        }),
        l: common_vendor.p({
          type: "line",
          opts: opts.value,
          chartData: chartData.value,
          canvas2d: true,
          canvasId: "uid123"
        }),
        m: common_vendor.p({
          prop: "cityName",
          label: "归属地市",
          width: "105",
          align: "center"
        }),
        n: common_vendor.p({
          prop: "vehicleCount",
          label: "车辆总数",
          width: "90",
          align: "center"
        }),
        o: common_vendor.p({
          prop: "registerCount",
          label: "上线车辆",
          width: "90",
          align: "center"
        }),
        p: common_vendor.p({
          prop: "logoutCount",
          label: "离线车辆",
          width: "90",
          align: "center"
        }),
        q: common_vendor.p({
          data: list.value,
          height: 800,
          rowHeight: 40,
          stripe: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
