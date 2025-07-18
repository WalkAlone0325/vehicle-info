"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
const uni_modules_wotDesignUni_components_wdMessageBox_index = require("../../uni_modules/wot-design-uni/components/wd-message-box/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_BaseLoading2 = common_vendor.resolveComponent("BaseLoading");
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_sticky2 = common_vendor.resolveComponent("wd-sticky");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  (_easycom_wd_message_box2 + _easycom_BaseLoading2 + _easycom_wd_search2 + _easycom_wd_sticky2 + _easycom_wd_tag2 + _easycom_wd_card2 + _easycom_wd_loadmore2)();
}
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_BaseLoading = () => "../../components/BaseLoading.js";
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_sticky = () => "../../uni_modules/wot-design-uni/components/wd-sticky/wd-sticky.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_card = () => "../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_loadmore = () => "../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_BaseLoading + _easycom_wd_search + _easycom_wd_sticky + _easycom_wd_tag + _easycom_wd_card + _easycom_wd_loadmore)();
}
const _sfc_main = {
  __name: "notice",
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
      const res = await api_common.getNoticeApi(queryParams);
      list.value = [...list.value, ...res.rows];
      total.value = res.total;
      loading.value = false;
      if (!list.value.length) {
        state.value = "error";
      } else if (list.value.length === total.value) {
        state.value = "finished";
      }
    };
    const search = () => {
      if (queryParams.plateNumber) {
        state.value = "loading";
        queryParams.pageNum = 1;
        queryParams.order = "asc";
        list.value = [];
        total.value = 0;
        getData();
      }
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
        c: common_vendor.o(search),
        d: common_vendor.o(cancel),
        e: common_vendor.o(common_vendor.m(($event) => queryParams.plateNumber = $event, {
          trim: true
        }, true)),
        f: common_vendor.p({
          placeholder: "请输入车牌号",
          modelValue: queryParams.plateNumber
        }),
        g: common_vendor.f(list.value, (i, k0, i0) => {
          return common_vendor.e({
            a: i.maintenanceRecordTypeName
          }, i.maintenanceRecordTypeName ? {
            b: common_vendor.t(i.maintenanceRecordTypeName + "到期告警")
          } : {}, {
            c: common_vendor.t(i.maintenanceStatusName),
            d: "d410a70a-5-" + i0 + "," + ("d410a70a-4-" + i0),
            e: common_vendor.p({
              ["custom-class"]: "space",
              type: i.maintenanceStatusName === "正常" ? "success" : "danger"
            }),
            f: common_vendor.t(i.deptName),
            g: common_vendor.t(i.plateNumber || "无"),
            h: common_vendor.t(i.maintenanceDate),
            i: common_vendor.t(common_vendor.unref(utils_index.getDaysAgo)(i.maintenanceDate)),
            j: "d410a70a-4-" + i0,
            k: i.maintenanceWarningId
          });
        }),
        h: common_vendor.o(loadmore),
        i: common_vendor.p({
          state: state.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d410a70a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/notice.js.map
