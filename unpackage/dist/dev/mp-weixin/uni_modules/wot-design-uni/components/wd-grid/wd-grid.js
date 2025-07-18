"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdGrid_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  name: "wd-grid",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdGrid_types.gridProps,
  setup(__props) {
    const nextTick = () => new Promise((resolve) => setTimeout(resolve, 20));
    const props = __props;
    const { linkChildren, children } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdGrid_types.GRID_KEY);
    linkChildren({ props });
    common_vendor.watch(
      () => props.column,
      (val, oldVal) => {
        if (val === oldVal)
          return;
        if (!val || val <= 0) {
          common_vendor.index.__f__(
            "error",
            "at uni_modules/wot-design-uni/components/wd-grid/wd-grid.vue:37",
            "The number of columns attribute value is invalid. The attribute must be greater than 0 and it is not recommended to use a larger value attribute."
          );
        }
        oldVal && init();
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.border,
      (val) => {
        val && Promise.resolve().then(nextTick).then(() => {
          init();
        });
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => children,
      () => {
        handleChildrenChange();
      },
      {
        deep: true
      }
    );
    const rootStyle = common_vendor.computed(() => {
      return `${props.gutter ? "padding-left:" + props.gutter + "px;padding-bottom:" + props.gutter + "px;" : ""}${props.customStyle}`;
    });
    const handleChildrenChange = uni_modules_wotDesignUni_components_common_util.debounce(() => {
      init();
    }, 50);
    function init() {
      if (!children)
        return;
      children.forEach((item, index) => {
        if (props.border) {
          const { column } = props;
          if (column) {
            const isRightItem = children.length - 1 === index || (index + 1) % column === 0;
            const isFirstLine = index + 1 <= column;
            isFirstLine && item.$.exposed.setiIemClass("is-first");
            isRightItem && item.$.exposed.setiIemClass("is-right");
            !isFirstLine && item.$.exposed.setiIemClass("is-border");
          } else {
            item.$.exposed.setiIemClass("is-first");
          }
          children.length - 1 === index && item.$.exposed.setiIemClass(item.$.exposed.itemClass.value + " is-last");
        }
        item.$.exposed.init();
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-grid ${_ctx.customClass}`),
        b: common_vendor.s(rootStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6fdada2e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-grid/wd-grid.js.map
