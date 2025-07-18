"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/request.js");
const api_order = require("../../../api/order.js");
if (!Array) {
  const _easycom_BaseLoading2 = common_vendor.resolveComponent("BaseLoading");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  (_easycom_BaseLoading2 + _easycom_wd_card2 + _easycom_wd_fab2)();
}
const _easycom_BaseLoading = () => "../../../components/BaseLoading.js";
const _easycom_wd_card = () => "../../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_fab = () => "../../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
if (!Math) {
  (_easycom_BaseLoading + _easycom_wd_card + _easycom_wd_fab)();
}
const _sfc_main = {
  __name: "config",
  setup(__props) {
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const loading = common_vendor.ref(true);
    const getList = async () => {
      loading.value = true;
      const res = await api_order.getConfigList({
        pageSize: 10,
        pageNum: 1,
        order: "asc"
      });
      list.value = res.rows;
      total.value = res.total;
      loading.value = false;
    };
    const clickToEdit = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/devOps/configForm${id ? "?id=" + id : ""}`
      });
    };
    common_vendor.onShow(() => {
      loading.value = true;
      list.value = [];
      total.value = 0;
      getList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.p({
          loading: loading.value
        })
      } : {
        c: common_vendor.f(list.value, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.maintenanceRecordTypeName),
            b: common_vendor.t(i.maintenanceWarningFrontDay || 0),
            c: common_vendor.t(i.updateTime),
            d: "9b0fa262-1-" + i0,
            e: i.maintenanceWarningCycleId,
            f: common_vendor.o(($event) => clickToEdit(i.maintenanceWarningCycleId), i.maintenanceWarningCycleId)
          };
        })
      }, {
        d: common_vendor.o(clickToEdit),
        e: common_vendor.p({
          activeIcon: "add",
          expandable: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b0fa262"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/devOps/config.js.map
