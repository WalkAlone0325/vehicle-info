"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  _easycom_wd_loading2();
}
const _easycom_wd_loading = () => "../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
if (!Math) {
  _easycom_wd_loading();
}
const _sfc_main = {
  __name: "BaseLoading",
  props: {
    loading: Boolean
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.loading
      }, __props.loading ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-137c9918"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BaseLoading.js.map
