"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    common_vendor.ref(null);
    common_vendor.ref(null);
    const scale = common_vendor.ref(20);
    const markers = common_vendor.ref([]);
    const polyline = common_vendor.ref([]);
    const data = common_vendor.ref({});
    const initLocation = common_vendor.ref({
      latitude: "",
      longitude: ""
    });
    const currentData = common_vendor.ref({});
    const minAccuracy = common_vendor.ref(0);
    const clickMap = (e) => {
      common_vendor.index.__f__("log", "at pages/index/map.vue:21", e, "e");
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认在此处标点？",
        success: async (res) => {
          if (res.confirm) {
            const { latitude, longitude } = e.detail;
            addMarker(latitude, longitude, e.timeStamp);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/index/map.vue:32", err, "err");
        }
      });
    };
    const markerPoint = common_vendor.ref({});
    const addMarker = (latitude, longitude, timeStamp) => {
      const lastPoint = markerPoint.value.latitude ? common_vendor.toRaw(markerPoint.value) : {
        latitude: initLocation.value.latitude,
        longitude: initLocation.value.longitude
      };
      markerPoint.value = {
        latitude,
        longitude
      };
      polyline.value.push({
        id: timeStamp,
        points: [
          lastPoint,
          { latitude, longitude }
        ],
        width: 3,
        arrowLine: true,
        color: utils_index.randomRgbColor()
      });
      markers.value.push({
        id: timeStamp,
        latitude,
        longitude,
        iconPath: "../../static/current.png",
        width: 20,
        height: 20,
        label: {
          content: utils_index.getDistance(lastPoint.latitude, lastPoint.longitude, latitude, longitude),
          borderWidth: 1,
          borderColor: "#999",
          bgColor: "#fff",
          borderRadius: 2,
          padding: 3
        }
      });
    };
    const clickControl = () => {
      common_vendor.index.__f__("log", "at pages/index/map.vue:81", currentData.value, "current");
      initLocation.value.latitude = currentData.value.latitude;
      initLocation.value.longitude = currentData.value.longitude;
    };
    const localChange = (res) => {
      common_vendor.index.__f__("log", "at pages/index/map.vue:88", res.accuracy.toFixed(2) * 100, minAccuracy.value * 100, res.accuracy.toFixed(2) * 100 < minAccuracy.value * 100, "实时数据");
      if (!minAccuracy.value || res.accuracy.toFixed(2) * 100 < minAccuracy.value * 100) {
        minAccuracy.value = res.accuracy.toFixed(2);
        common_vendor.index.__f__("log", "at pages/index/map.vue:91", minAccuracy.value, 666);
        data.value = [
          { label: "精确度", value: minAccuracy.value, unit: "" },
          { label: "速度", value: res.speed.toFixed(2), unit: "m/s" }
        ];
        currentData.value = res;
        initLocation.value.latitude = res.latitude;
        initLocation.value.longitude = res.longitude;
        markers.value = [
          {
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../../static/current.png",
            width: 20,
            height: 20
          }
        ];
      }
    };
    common_vendor.onShow(() => {
      common_vendor.index.startLocationUpdate({
        success: () => {
          common_vendor.index.__f__("log", "at pages/index/map.vue:117", "开启应用接收位置消息成功");
          common_vendor.index.onLocationChange((res) => {
            localChange(res);
            if (res.accuracy.toFixed(2) * 100 < 2e3) {
              common_vendor.index.stopLocationUpdate({
                success: () => common_vendor.index.__f__("log", "at pages/index/map.vue:123", "关闭应用接收位置消息成功"),
                fail: (err) => common_vendor.index.__f__("error", "at pages/index/map.vue:124", "关闭应用接收位置消息失败：", err),
                complete: (msg) => common_vendor.index.__f__("log", "at pages/index/map.vue:125", "调用关闭应用接收位置消息 API 完成")
              });
            }
          });
        },
        fail: (err) => common_vendor.index.__f__("error", "at pages/index/map.vue:130", "开启应用接收位置消息失败：", err),
        complete: (msg) => common_vendor.index.__f__("log", "at pages/index/map.vue:131", "调用开启应用接收位置消息 API 完成")
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.stopLocationUpdate({});
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(clickControl),
        c: common_vendor.f(data.value, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.label),
            b: common_vendor.t(i.value + i.unit),
            c: i.label
          };
        }),
        d: scale.value,
        e: initLocation.value.longitude,
        f: initLocation.value.latitude,
        g: markers.value,
        h: polyline.value,
        i: common_vendor.o(clickMap)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de8b6376"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/map.js.map
