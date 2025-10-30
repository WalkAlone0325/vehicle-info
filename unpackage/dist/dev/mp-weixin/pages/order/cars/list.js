"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/request.js");
const api_order = require("../../../api/order.js");
const uni_modules_wotDesignUni_components_wdMessageBox_index = require("../../../uni_modules/wot-design-uni/components/wd-message-box/index.js");
require("../../../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_BaseLoading2 = common_vendor.resolveComponent("BaseLoading");
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_sticky2 = common_vendor.resolveComponent("wd-sticky");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  (_easycom_wd_message_box2 + _easycom_BaseLoading2 + _easycom_wd_search2 + _easycom_wd_sticky2 + _easycom_wd_button2 + _easycom_wd_card2 + _easycom_wd_loadmore2 + _easycom_wd_fab2)();
}
const _easycom_wd_message_box = () => "../../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_BaseLoading = () => "../../../components/BaseLoading.js";
const _easycom_wd_search = () => "../../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_sticky = () => "../../../uni_modules/wot-design-uni/components/wd-sticky/wd-sticky.js";
const _easycom_wd_button = () => "../../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_card = () => "../../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_loadmore = () => "../../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
const _easycom_wd_fab = () => "../../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_BaseLoading + _easycom_wd_search + _easycom_wd_sticky + _easycom_wd_button + _easycom_wd_card + _easycom_wd_loadmore + _easycom_wd_fab)();
}
const _sfc_main = {
  __name: "list",
  setup(__props) {
    uni_modules_wotDesignUni_components_wdMessageBox_index.useMessage();
    const loading = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      order: "asc",
      plateNumber: ""
    });
    const state = common_vendor.ref("loading");
    common_vendor.onReachBottom(() => {
      if (!list.value.length) {
        state.value = "error";
      } else if (list.value.length < total.value) {
        loadmore();
      } else if (list.value.length === total.value) {
        state.value = "finished";
      }
    });
    common_vendor.onShow(() => {
      state.value = "loading";
      queryParams.plateNumber = "";
      queryParams.pageNum = 1;
      queryParams.order = "asc";
      list.value = [];
      total.value = 0;
      getData();
    });
    function loadmore() {
      queryParams.pageNum++;
      getData();
      state.value = "loading";
    }
    const getData = async () => {
      loading.value = true;
      const res = await api_order.getOrderApi(queryParams);
      list.value = [...list.value, ...res.rows];
      total.value = res.total;
      loading.value = false;
      if (!list.value.length) {
        state.value = "error";
      } else if (list.value.length === total.value) {
        state.value = "finished";
      }
    };
    const clickToDetail = (id, workOrdeStatusCode) => {
      const queryStr = `?id=${id}&type=${workOrdeStatusCode}`;
      common_vendor.index.navigateTo({
        url: `/pages/order/cars/form${id && workOrdeStatusCode ? queryStr : ""}`
      });
    };
    const handleSubmit = (id, type) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/cars/formCollect?id=${id}&type=${type}`
      });
    };
    const cancel = () => {
      if (queryParams.plateNumber) {
        state.value = "loading";
        queryParams.plateNumber = "";
        queryParams.pageNum = 1;
        queryParams.order = "asc";
        list.value = [];
        total.value = 0;
        getData();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value && !list.value.length
      }, loading.value && !list.value.length ? {
        b: common_vendor.p({
          loading: loading.value
        })
      } : {
        c: common_vendor.o(_ctx.search),
        d: common_vendor.o(cancel),
        e: common_vendor.o(common_vendor.m(($event) => queryParams.plateNumber = $event, {
          trim: true
        }, true)),
        f: common_vendor.p({
          modelValue: queryParams.plateNumber
        }),
        g: common_vendor.f(list.value, (i, k0, i0) => {
          return common_vendor.e({
            a: i.collectPlateNumber
          }, i.collectPlateNumber ? {
            b: common_vendor.t(i.collectPlateNumber)
          } : {}, {
            c: common_vendor.t(i.workOrdeStatusName),
            d: common_vendor.t(i.deptName),
            e: common_vendor.t(i.applicantUserName),
            f: common_vendor.t(i.collectDriverName),
            g: i.workOrdeStatusCode === "returned"
          }, i.workOrdeStatusCode === "returned" ? {
            h: common_vendor.t(i.returnedDriverName)
          } : {}, {
            i: i.workOrdeStatusCode === "returned"
          }, i.workOrdeStatusCode === "returned" ? {
            j: common_vendor.t(i.returnedTime)
          } : {}, {
            k: i.workOrdeStatusCode === "collect"
          }, i.workOrdeStatusCode === "collect" ? {
            l: "1400ea86-5-" + i0 + "," + ("1400ea86-4-" + i0),
            m: common_vendor.p({
              size: "small",
              type: "success"
            }),
            n: common_vendor.o(($event) => handleSubmit(i.useCarWorkOrderId, "returned"), i.useCarWorkOrderId)
          } : {}, {
            o: i.workOrdeStatusCode === "waiting_collect"
          }, i.workOrdeStatusCode === "waiting_collect" ? {
            p: "1400ea86-6-" + i0 + "," + ("1400ea86-4-" + i0),
            q: common_vendor.p({
              size: "small",
              type: "warning"
            }),
            r: common_vendor.o(($event) => handleSubmit(i.useCarWorkOrderId, "collect"), i.useCarWorkOrderId)
          } : {}, {
            s: "1400ea86-4-" + i0,
            t: i.useCarWorkOrderId,
            v: common_vendor.o(($event) => clickToDetail(i.useCarWorkOrderId, i.workOrdeStatusCode), i.useCarWorkOrderId)
          });
        }),
        h: common_vendor.o(loadmore),
        i: common_vendor.p({
          state: state.value
        })
      }, {
        j: common_vendor.o(clickToDetail),
        k: common_vendor.p({
          activeIcon: "add",
          draggable: true,
          gap: {
            right: 30,
            bottom: 30
          },
          expandable: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1400ea86"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/cars/list.js.map
