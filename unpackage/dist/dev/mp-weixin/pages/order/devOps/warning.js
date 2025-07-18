"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/request.js");
const api_order = require("../../../api/order.js");
if (!Array) {
  const _easycom_BaseLoading2 = common_vendor.resolveComponent("BaseLoading");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  (_easycom_BaseLoading2 + _easycom_wd_tag2 + _easycom_wd_card2 + _easycom_wd_loadmore2 + _easycom_wd_fab2)();
}
const _easycom_BaseLoading = () => "../../../components/BaseLoading.js";
const _easycom_wd_tag = () => "../../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_card = () => "../../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_loadmore = () => "../../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
const _easycom_wd_fab = () => "../../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
if (!Math) {
  (_easycom_BaseLoading + _easycom_wd_tag + _easycom_wd_card + _easycom_wd_loadmore + _easycom_wd_fab)();
}
const _sfc_main = {
  __name: "warning",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      order: "asc"
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
      const res = await api_order.getWarningList(queryParams);
      list.value = [...list.value, ...res.rows];
      total.value = res.total;
      loading.value = false;
    };
    const clickToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/devOps/warningForm${id ? `?id=${id}` : ""}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value && !list.value.length
      }, loading.value && !list.value.length ? {
        b: common_vendor.p({
          loading: loading.value
        })
      } : {
        c: common_vendor.f(list.value, (i, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(i.maintenanceRecordTypeName),
            b: i.plateNumber
          }, i.plateNumber ? {
            c: common_vendor.t(i.plateNumber),
            d: "fc06cf97-2-" + i0 + "," + ("fc06cf97-1-" + i0),
            e: common_vendor.p({
              type: "primary"
            })
          } : {}, {
            f: common_vendor.t(i.maintenanceStatusName),
            g: "fc06cf97-3-" + i0 + "," + ("fc06cf97-1-" + i0),
            h: common_vendor.p({
              type: i.maintenanceStatusCode == "0" ? "success" : "warning",
              mark: true
            }),
            i: common_vendor.t(i.deptName),
            j: common_vendor.t(i.maintenanceDate),
            k: "fc06cf97-1-" + i0,
            l: i.maintenanceWarningId,
            m: common_vendor.o(($event) => clickToDetail(i.maintenanceWarningId), i.maintenanceWarningId)
          });
        }),
        d: common_vendor.o(loadmore),
        e: common_vendor.p({
          state: state.value
        })
      }, {
        f: common_vendor.o(clickToDetail),
        g: common_vendor.p({
          activeIcon: "add",
          expandable: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fc06cf97"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/devOps/warning.js.map
