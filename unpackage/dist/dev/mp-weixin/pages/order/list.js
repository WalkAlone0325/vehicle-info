"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_order = require("../../api/order.js");
if (!Array) {
  const _easycom_BaseLoading2 = common_vendor.resolveComponent("BaseLoading");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_status_tip2 = common_vendor.resolveComponent("wd-status-tip");
  (_easycom_BaseLoading2 + _easycom_wd_tag2 + _easycom_wd_button2 + _easycom_wd_card2 + _easycom_wd_status_tip2)();
}
const _easycom_BaseLoading = () => "../../components/BaseLoading.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_card = () => "../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_status_tip = () => "../../uni_modules/wot-design-uni/components/wd-status-tip/wd-status-tip.js";
if (!Math) {
  (_easycom_BaseLoading + _easycom_wd_tag + _easycom_wd_button + _easycom_wd_card + _easycom_wd_status_tip)();
}
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const MAP_TITLE = {
      draft: "草稿",
      pending: "待审批",
      // pass: '已通过',
      // reject: '已驳回',
      history: "审批历史",
      approve: "审批"
    };
    const curType = common_vendor.ref("");
    common_vendor.onLoad((param) => {
      curType.value = param.type;
      common_vendor.index.setNavigationBarTitle({ title: MAP_TITLE[param.type] + "列表" });
    });
    const list = common_vendor.ref([
      { expectedVehicleId: 1, applicantTime: "2025-05-19 18:38:00", vehicleTypeName: "货车", destination: "116.434446,39.90816长沙市地址", expectedDriverName: "刘洋", expectedPlateNumber: "晋A9NG08" }
    ]);
    const total = common_vendor.ref(0);
    const clickDetail = (i) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/form?id=${i.useCarApplicationOrderId}&type=${curType.value}`
      });
    };
    const clickApply = (i) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/form-apply?id=${i.useCarApplicationOrderId}`
      });
    };
    const MAP_TYPE = {
      // 历史
      history: () => api_order.getHistoryApi(),
      // 审批
      approve: () => api_order.getApproveApi(),
      // 列表
      draft: (query) => api_order.getApproveListApi({ ...query, orderStatusCode: curType.value }),
      pending: (query) => api_order.getApproveListApi({ ...query, orderStatusCode: curType.value })
    };
    const loading = common_vendor.ref(false);
    const getList = async () => {
      loading.value = true;
      const res = await MAP_TYPE[curType.value]({
        pageNum: 1,
        pageSize: 10
      });
      list.value = res.rows;
      total.value = res.total;
      loading.value = false;
    };
    common_vendor.onShow(() => {
      getList();
    });
    const getColor = ({ orderStatusCode }) => {
      const MAP_TYPE2 = {
        refuse: "#e75356",
        pass: "#69cea0",
        draft: "#e28d4b"
      };
      return MAP_TYPE2[orderStatusCode] || "#69cea0";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {
        b: common_vendor.f(list.value, (i, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(`时间：${i.applicantTime || ""}`),
            b: i.orderStatusName
          }, i.orderStatusName ? {
            c: common_vendor.t(i.orderStatusName),
            d: getColor(i)
          } : {}, {
            e: common_vendor.t(i.expectedPlateNumber),
            f: common_vendor.t(i.expectedDriverName),
            g: common_vendor.t(i.destination),
            h: common_vendor.t(i.vehicleTypeName),
            i: "456ecf67-2-" + i0 + "," + ("456ecf67-1-" + i0)
          }, curType.value === "pass" ? {
            j: common_vendor.o(($event) => clickApply(i), i.expectedVehicleId),
            k: "456ecf67-3-" + i0 + "," + ("456ecf67-1-" + i0),
            l: common_vendor.p({
              size: "small",
              plain: true,
              type: "success"
            })
          } : {}, {
            m: common_vendor.o(($event) => clickDetail(i), i.expectedVehicleId),
            n: "456ecf67-4-" + i0 + "," + ("456ecf67-1-" + i0),
            o: i.expectedVehicleId,
            p: "456ecf67-1-" + i0
          });
        }),
        c: common_vendor.p({
          type: "primary",
          mark: true
        }),
        d: curType.value === "pass",
        e: common_vendor.p({
          size: "small",
          plain: true
        })
      }, {
        f: !loading.value && !total.value
      }, !loading.value && !total.value ? {
        g: common_vendor.p({
          image: "/static/content.png",
          tip: "暂无列表"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-456ecf67"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/list.js.map
