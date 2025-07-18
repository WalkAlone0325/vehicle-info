"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdCard_types = require("./types.js");
const __default__ = {
  name: "wd-card",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdCard_types.cardProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.title || _ctx.$slots.title
      }, _ctx.title || _ctx.$slots.title ? common_vendor.e({
        b: _ctx.title
      }, _ctx.title ? {
        c: common_vendor.t(_ctx.title)
      } : {}, {
        d: common_vendor.n(_ctx.customTitleClass)
      }) : {}, {
        e: common_vendor.n(`wd-card__content ${_ctx.customContentClass}`),
        f: _ctx.$slots.footer
      }, _ctx.$slots.footer ? {
        g: common_vendor.n(`wd-card__footer ${_ctx.customFooterClass}`)
      } : {}, {
        h: common_vendor.n(_ctx.type == "rectangle" ? "is-rectangle" : ""),
        i: common_vendor.n(_ctx.customClass),
        j: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-54deeaba"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-card/wd-card.js.map
