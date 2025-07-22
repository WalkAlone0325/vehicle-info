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
    common_vendor.ref({});
    const initLocation = common_vendor.ref({
      latitude: "",
      longitude: ""
    });
    const currentData = common_vendor.ref({});
    common_vendor.ref(0);
    const markOrPolylineId = common_vendor.ref(1);
    const curPolyline = common_vendor.ref({});
    const handleClickMap = async (e, type) => {
      switch (type) {
        case "addMark":
          common_vendor.index.showModal({
            title: "提示",
            content: "是否确认在此处标点？",
            success: async (res) => {
              if (res.confirm) {
                const { latitude, longitude } = e;
                addMarker(latitude, longitude, markOrPolylineId.value++);
              }
            },
            fail: (err) => {
              common_vendor.index.__f__("log", "at pages/index/map.vue:38", err, "err");
            }
          });
          break;
      }
    };
    const markerPoint = common_vendor.ref({});
    const addMarker = (latitude, longitude, id) => {
      const lastPoint = markerPoint.value.latitude ? common_vendor.toRaw(markerPoint.value) : {
        latitude: initLocation.value.latitude,
        longitude: initLocation.value.longitude
      };
      markerPoint.value = {
        latitude,
        longitude
      };
      polyline.value.push({
        id,
        points: [
          lastPoint,
          { latitude, longitude }
        ],
        width: 5,
        clickable: true,
        arrowLine: true,
        color: utils_index.randomRgbColor()
      });
      markers.value.push({
        id,
        latitude,
        longitude,
        iconPath: "../../static/current.png",
        width: 30,
        height: 30
        // label: {
        //   content: getDistance(lastPoint.latitude, lastPoint.longitude, latitude, longitude),
        //   borderWidth: 1,
        //   borderColor: '#999',
        //   bgColor: '#fff',
        //   borderRadius: 2,
        //   padding: 3
        // }
      });
    };
    const o = common_vendor.ref(-1);
    const clickControl = async (type) => {
      common_vendor.index.__f__("log", "at pages/index/map.vue:92", "🚀:>> ", polyline.value);
      const res = await getCurLocation();
      if (type === "local") {
        common_vendor.index.__f__("log", "at pages/index/map.vue:96", res, "current");
        initLocation.value.latitude = res.latitude;
        initLocation.value.longitude = res.longitude;
      } else if (type === "mark") {
        const arr = [
          { latitude: 37.78155385785984, longitude: 112.56031978420128 },
          { latitude: 37.78304276611586, longitude: 112.5613987268813 },
          { latitude: 37.78167095013985, longitude: 112.55824860145844 }
        ];
        o.value = o.value + 1;
        common_vendor.index.__f__("log", "at pages/index/map.vue:108", "🚀:>> ", arr[o.value], o.value);
        handleClickMap(arr[o.value], "addMark");
      }
    };
    const getCurLocation = () => {
      return new Promise((resolve) => {
        common_vendor.index.getLocation({
          type: "gcj02",
          isHighAccuracy: true,
          success: (res) => {
            currentData.value = res;
            if (!markers.value.length) {
              initLocation.value.latitude = res.latitude;
              initLocation.value.longitude = res.longitude;
              markers.value = [
                {
                  id: 1,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  iconPath: "../../static/current.png",
                  width: 30,
                  height: 30
                }
              ];
            }
            resolve(res);
          },
          fail: (err) => common_vendor.index.__f__("log", "at pages/index/map.vue:139", err, "err")
        });
      });
    };
    const clickPolyline = (e) => {
      const { latitude, longitude, polylineId } = e.detail;
      curPolyline.value = polyline.value.find((item) => item.id === polylineId);
      createHiddenMarker(latitude, longitude, curPolyline.value);
    };
    const hiddenMarkId = common_vendor.ref(1e3);
    const createHiddenMarker = (latitude, longitude, curPolyline2) => {
      const arr = curPolyline2.points;
      markers.value.push({
        id: hiddenMarkId.value++,
        latitude,
        longitude,
        iconPath: "",
        width: 0,
        height: 0,
        title: utils_index.getDistance(arr[0].latitude, arr[0].longitude, arr[1].latitude, arr[1].longitude)
      });
    };
    const clickMarker = (e) => {
    };
    common_vendor.onShow(async () => {
      await getCurLocation();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.stopLocationUpdate({});
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => clickControl("mark")),
        c: common_assets._imports_1$1,
        d: common_vendor.o(($event) => clickControl("local")),
        e: scale.value,
        f: initLocation.value.longitude,
        g: initLocation.value.latitude,
        h: markers.value,
        i: polyline.value,
        j: common_vendor.o(handleClickMap),
        k: common_vendor.o(clickMarker),
        l: common_vendor.o(clickPolyline)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de8b6376"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/map.js.map
