"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_wd_grid_item2 = common_vendor.resolveComponent("wd-grid-item");
  const _easycom_wd_grid2 = common_vendor.resolveComponent("wd-grid");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  (_easycom_wd_grid_item2 + _easycom_wd_grid2 + _easycom_wd_card2)();
}
const _easycom_wd_grid_item = () => "../../uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.js";
const _easycom_wd_grid = () => "../../uni_modules/wot-design-uni/components/wd-grid/wd-grid.js";
const _easycom_wd_card = () => "../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
if (!Math) {
  (_easycom_wd_grid_item + _easycom_wd_grid + _easycom_wd_card)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const carOrder = common_vendor.ref([]);
    const carVehicle = common_vendor.ref([]);
    const order = common_vendor.ref([
      { id: 1, text: "用车工单", icon: "apply", url: "/pages/order/cars/list" },
      { id: 2, text: "加油工单", icon: "oil", max: true, url: "/pages/order/oil/list" }
    ]);
    common_vendor.onShow(() => {
      const arr1 = [
        { id: 1, text: "申请", icon: "apply", url: "/pages/order/form" },
        { id: 2, text: "草稿", icon: "draft", url: "/pages/order/list?type=draft" },
        { id: 3, text: "待审批", icon: "wait", url: "/pages/order/list?type=pending" }
      ];
      const arr2 = [
        { id: 1, text: "申请", icon: "apply", url: "/pages/order/form" },
        { id: 2, text: "草稿", icon: "draft", url: "/pages/order/list?type=draft" },
        { id: 3, text: "待审批", icon: "wait", url: "/pages/order/list?type=pending" },
        { id: 4, text: "审批历史", icon: "pass", url: "/pages/order/list?type=history", needRole: true },
        // { id: 4, text: '已通过', icon: 'pass', url: '/pages/order/list?type=pass' },
        // { id: 5, text: '已驳回', icon: 'reject', url: '/pages/order/list?type=reject' },
        { id: 6, text: "审批", icon: "pending", url: "/pages/order/list?type=approve", needRole: true }
      ];
      const v1 = [
        { id: 1, text: "告警配置", icon: "setting", url: "/pages/order/devOps/config" },
        { id: 2, text: "运维计划", icon: "plan", url: "/pages/order/devOps/plan" },
        { id: 3, text: "运维记录", icon: "record", url: "/pages/order/devOps/record" },
        { id: 4, text: "运维告警", icon: "gaojin", url: "/pages/order/devOps/warning" }
        // { id: 5, text: '保养记录', icon: 'maintain', url: '/pages/order/devOps/maintain' },
      ];
      const v2 = [];
      carOrder.value = utils_index.checkRole("driver") ? arr1 : arr2;
      carVehicle.value = utils_index.checkRole("driver") ? v2 : v1;
    });
    const clickItem = (item) => {
      common_vendor.index.navigateTo({
        url: item.url
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(carOrder.value, (i, k0, i0) => {
          return {
            a: `/static/order/${i.icon}.png`,
            b: "93207a4f-2-" + i0 + ",93207a4f-1",
            c: common_vendor.p({
              ["use-icon-slot"]: true,
              text: i.text
            }),
            d: i.id,
            e: common_vendor.o(($event) => clickItem(i), i.id)
          };
        }),
        b: common_vendor.p({
          clickable: true,
          border: true,
          ["hover-class"]: " ",
          column: 3
        }),
        c: common_vendor.p({
          title: "用车工单申请"
        }),
        d: common_vendor.f(order.value, (i, k0, i0) => {
          return {
            a: i.max ? "60rpx" : "50rpx",
            b: i.max ? "60rpx" : "50rpx",
            c: `/static/order/${i.icon}.png`,
            d: "93207a4f-5-" + i0 + ",93207a4f-4",
            e: common_vendor.p({
              ["use-icon-slot"]: true,
              text: i.text
            }),
            f: i.id,
            g: common_vendor.o(($event) => clickItem(i), i.id)
          };
        }),
        e: common_vendor.p({
          clickable: true,
          border: true,
          ["hover-class"]: " ",
          column: 3
        }),
        f: common_vendor.p({
          title: "工单"
        }),
        g: carVehicle.value.length
      }, carVehicle.value.length ? {
        h: common_vendor.f(carVehicle.value, (i, k0, i0) => {
          return {
            a: `/static/order/${i.icon}.png`,
            b: i.id,
            c: common_vendor.o(($event) => clickItem(i), i.id),
            d: "93207a4f-8-" + i0 + ",93207a4f-7",
            e: common_vendor.p({
              ["use-icon-slot"]: true,
              text: i.text
            })
          };
        }),
        i: common_vendor.p({
          clickable: true,
          ["hover-class"]: " ",
          column: 3
        }),
        j: common_vendor.p({
          title: "车辆运维管理"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map
