"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  _easycom_wd_button2();
}
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
if (!Math) {
  _easycom_wd_button();
}
const _sfc_main = {
  __name: "switch",
  setup(__props) {
    const click = (type) => {
      if (type === "map") {
        common_vendor.index.navigateTo({
          url: "/pages/index/map"
        });
      } else {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => click("map")),
        b: common_vendor.p({
          block: true,
          type: "primary"
        }),
        c: common_vendor.o(click),
        d: common_vendor.p({
          block: true,
          type: "success"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd1d0610"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/switch.js.map
