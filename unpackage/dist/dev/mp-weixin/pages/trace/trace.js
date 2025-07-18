"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../../uni_modules/wot-design-uni/components/composables/useQueue.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_radio2 = common_vendor.resolveComponent("wd-radio");
  const _easycom_wd_radio_group2 = common_vendor.resolveComponent("wd-radio-group");
  const _easycom_wd_drop_menu_item2 = common_vendor.resolveComponent("wd-drop-menu-item");
  const _easycom_wd_drop_menu2 = common_vendor.resolveComponent("wd-drop-menu");
  (_easycom_wd_search2 + _easycom_wd_radio2 + _easycom_wd_radio_group2 + _easycom_wd_drop_menu_item2 + _easycom_wd_drop_menu2)();
}
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_radio = () => "../../uni_modules/wot-design-uni/components/wd-radio/wd-radio.js";
const _easycom_wd_radio_group = () => "../../uni_modules/wot-design-uni/components/wd-radio-group/wd-radio-group.js";
const _easycom_wd_drop_menu_item = () => "../../uni_modules/wot-design-uni/components/wd-drop-menu-item/wd-drop-menu-item.js";
const _easycom_wd_drop_menu = () => "../../uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.js";
if (!Math) {
  (_easycom_wd_search + _easycom_wd_radio + _easycom_wd_radio_group + _easycom_wd_drop_menu_item + _easycom_wd_drop_menu)();
}
const _sfc_main = {
  __name: "trace",
  setup(__props) {
    const { closeOutside } = uni_modules_wotDesignUni_components_composables_useQueue.useQueue();
    const curIdx = common_vendor.ref(0);
    const dropRef = common_vendor.ref(null);
    const dropRef2 = common_vendor.ref(null);
    const scale = common_vendor.ref(7);
    const plateNumber = common_vendor.ref();
    const deptId = common_vendor.ref();
    const markerList = common_vendor.ref([]);
    const data = common_vendor.ref({});
    const markers = common_vendor.ref([]);
    const getData = async () => {
      const res = await api_common.getLocationApi({
        deptId: deptId.value,
        plateNumber: plateNumber.value
      });
      if (deptId.value) {
        scale.value = 8;
      } else {
        scale.value = 7;
      }
      data.value = res.data;
      markerList.value = res.data.carVehicleInfoList.map((i, idx) => ({
        iconPath: "/static/location.png",
        latitude: i.latitude,
        longitude: i.longitude,
        id: idx + 1,
        width: 20,
        height: 20,
        label: {
          content: i.plateNumber,
          borderWidth: 1,
          borderColor: "#999",
          bgColor: "#fff",
          borderRadius: 2,
          padding: 3
        }
      }));
      markers.value = markerList.value;
    };
    const traceData = common_vendor.ref({});
    const polyline = common_vendor.ref([]);
    const getTraceData = async () => {
      const now = /* @__PURE__ */ new Date();
      const twoHourAgo = new Date(now);
      twoHourAgo.setHours((/* @__PURE__ */ new Date()).getHours() - 2);
      const res = await api_common.getTraceApi({
        deptId: deptId.value,
        plateNumber: plateNumber.value,
        startDate: utils_index.formatDateTime(twoHourAgo),
        endDate: utils_index.formatDateTime(/* @__PURE__ */ new Date())
      });
      if (res.code === 200) {
        traceData.value = res.data;
        polyline.value = res.data.queryRecordLocationListOutBeanList.map((i, idx) => {
          return {
            width: 3,
            arrowLine: true,
            color: utils_index.randomRgbColor(),
            points: handlePoints(i)
          };
        });
        markers.value = [];
        markers.value = allStopPoints.value.map((i, idx) => ({
          iconPath: "/static/stop.png",
          latitude: i.latitude,
          longitude: i.longitude,
          id: idx + 1,
          width: 20,
          height: 20,
          label: {
            content: getDay(i.time),
            borderWidth: 1,
            borderColor: "#999",
            bgColor: "#fff",
            borderRadius: 2,
            padding: 3
          }
        }));
      }
    };
    const getDay = (timestemp) => {
      const day = Math.floor(timestemp / (24 * 3600 * 1e3));
      const hour = Math.floor(timestemp / (3600 * 1e3) % 24);
      const minute = Math.floor(timestemp / (60 * 1e3) % 60);
      const second = Math.floor(timestemp / 1e3 % 60);
      const dayStr = day ? `${day}天` : "";
      const hourStr = hour ? `${hour}时` : "";
      const minuteStr = minute ? `${minute}分` : "";
      const secondStr = second ? `${second}秒` : "";
      return `${dayStr}${hourStr}${minuteStr}${secondStr}`;
    };
    const allStopPoints = common_vendor.ref([]);
    const handlePoints = (i, idx) => {
      const arr = [];
      let setArr = [];
      const res = JSON.parse(i.locations).map((j) => {
        const res2 = utils_index.wgs84togcj02(j[0], j[1]);
        arr.push({ str: "" + res2[0] + res2[1], date: j[4], latitude: res2[1], longitude: res2[0] });
        return { latitude: res2[1], longitude: res2[0], str: "" + res2[0] + res2[1], date: j[4] };
      });
      setArr = [...new Set(arr.map((i2) => i2.str))];
      const start = arr.find((i2) => i2.str == setArr[0]);
      const end = arr.findLast((i2) => i2.str == setArr[0]);
      function getTimestemp(date) {
        return new Date(date.replace(" ", "T")).getTime();
      }
      const time = getTimestemp(end.date) - getTimestemp(start.date);
      if (time >= 3e5) {
        allStopPoints.value.push({ ...end, time });
      }
      return res;
    };
    const search = () => {
      if (curIdx.value === 0) {
        markerList.value = [];
        data.value = {};
        markers.value = [];
        getData();
        dropRef.value.close();
      } else if (curIdx.value === 1) {
        markers.value = [];
        traceData.value = {};
        polyline.value = [];
        allStopPoints.value = [];
        getTraceData();
        dropRef2.value.close();
      }
    };
    const reset = () => {
      if (!deptId.value && !plateNumber.value)
        return;
      plateNumber.value = void 0;
      deptId.value = void 0;
      search();
    };
    const deptOptions = common_vendor.ref([]);
    const getDept = async () => {
      const res = await api_common.getDeptApi();
      deptOptions.value = res.data.filter((i) => i.pId != "0").map((i) => ({
        label: i.name,
        value: i.id
      }));
    };
    const clickDrop = (item, idx) => {
      if (curIdx.value === idx)
        return;
      curIdx.value = idx;
      plateNumber.value = void 0;
      deptId.value = void 0;
      markerList.value = [];
      data.value = {};
      markers.value = [];
      traceData.value = {};
      polyline.value = [];
      search();
    };
    common_vendor.onShow(() => {
      getData();
      getDept();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(reset),
        b: common_vendor.o(search),
        c: common_vendor.o(($event) => plateNumber.value = $event),
        d: common_vendor.p({
          ["placeholder-left"]: true,
          ["cancel-txt"]: "重置",
          placeholder: "请输入车牌号进行搜索",
          modelValue: plateNumber.value
        }),
        e: common_vendor.f(deptOptions.value, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.label),
            b: "14c2661d-4-" + i0 + ",14c2661d-3",
            c: common_vendor.p({
              value: i.value
            }),
            d: i.value
          };
        }),
        f: common_vendor.o(search),
        g: common_vendor.o(($event) => deptId.value = $event),
        h: common_vendor.p({
          shape: "button",
          modelValue: deptId.value
        }),
        i: common_vendor.sr(dropRef, "14c2661d-1,14c2661d-0", {
          "k": "dropRef"
        }),
        j: common_vendor.p({
          title: "车辆位置"
        }),
        k: common_vendor.o(reset),
        l: common_vendor.o(search),
        m: common_vendor.o(($event) => plateNumber.value = $event),
        n: common_vendor.p({
          ["placeholder-left"]: true,
          ["cancel-txt"]: "重置",
          placeholder: "请输入车牌号进行搜索",
          modelValue: plateNumber.value
        }),
        o: common_vendor.f(deptOptions.value, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.label),
            b: "14c2661d-8-" + i0 + ",14c2661d-7",
            c: common_vendor.p({
              value: i.value
            }),
            d: i.value
          };
        }),
        p: common_vendor.o(search),
        q: common_vendor.o(($event) => deptId.value = $event),
        r: common_vendor.p({
          shape: "button",
          modelValue: deptId.value
        }),
        s: common_vendor.sr(dropRef2, "14c2661d-5,14c2661d-0", {
          "k": "dropRef2"
        }),
        t: common_vendor.p({
          title: "车辆轨迹"
        }),
        v: common_vendor.o(clickDrop),
        w: common_vendor.p({
          idx: curIdx.value
        }),
        x: common_vendor.o((...args) => common_vendor.unref(closeOutside) && common_vendor.unref(closeOutside)(...args)),
        y: polyline.value,
        z: scale.value,
        A: data.value.longitude,
        B: data.value.latitude,
        C: markers.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-14c2661d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/trace/trace.js.map
