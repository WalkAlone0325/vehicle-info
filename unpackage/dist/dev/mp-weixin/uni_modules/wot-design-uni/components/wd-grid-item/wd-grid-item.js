"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdGrid_types = require("../wd-grid/types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdGridItem_types = require("./types.js");
if (!Math) {
  (wdIcon + wdBadge)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdBadge = () => "../wd-badge/wd-badge.js";
const __default__ = {
  name: "wd-grid-item",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdGridItem_types.gridItemProps,
  emits: ["itemclick"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const style = common_vendor.ref("");
    const gutterContentStyle = common_vendor.ref("");
    const itemClass = common_vendor.ref("");
    const gutter = common_vendor.ref(0);
    const square = common_vendor.ref(false);
    const border = common_vendor.ref(true);
    const { parent: grid } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdGrid_types.GRID_KEY);
    const childCount = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(grid) && uni_modules_wotDesignUni_components_common_util.isDef(grid.children)) {
        return grid.children.length;
      } else {
        return 0;
      }
    });
    const customBadgeProps = common_vendor.computed(() => {
      const badgeProps = uni_modules_wotDesignUni_components_common_util.deepAssign(
        uni_modules_wotDesignUni_components_common_util.isDef(props.badgeProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(props.badgeProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {},
        uni_modules_wotDesignUni_components_common_util.omitBy(
          {
            max: props.max,
            isDot: props.isDot,
            modelValue: props.value,
            type: props.type
          },
          uni_modules_wotDesignUni_components_common_util.isUndefined
        )
      );
      return badgeProps;
    });
    common_vendor.watch(
      () => childCount.value,
      () => {
        if (!grid)
          return;
        const width = grid.props.column ? 100 / grid.props.column + "%" : 100 / (childCount.value || 1) + "%";
        const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : "";
        const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : "";
        style.value = `width: ${width}; ${squareStyle || gutterStyle}`;
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.onMounted(() => {
      init();
    });
    function init() {
      if (!grid)
        return;
      const children = grid.children;
      const width = grid.props.column ? 100 / grid.props.column + "%" : 100 / children.length + "%";
      const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : "";
      const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : "";
      gutterContentStyle.value = grid.props.gutter && grid.props.square ? `right: ${grid.props.gutter}px; bottom:${grid.props.gutter}px;height: auto; background-color: ${grid.props.bgColor}` : `background-color: ${grid.props.bgColor}`;
      border.value = Boolean(grid.props.border);
      square.value = Boolean(grid.props.square);
      gutter.value = Number(grid.props.gutter);
      style.value = `width: ${width}; ${squareStyle || gutterStyle}`;
    }
    function click() {
      if (grid && !grid.props.clickable)
        return;
      const { url, linkType } = props;
      emit("itemclick");
      if (url) {
        switch (linkType) {
          case "navigateTo":
            common_vendor.index.navigateTo({
              url
            });
            break;
          case "reLaunch":
            common_vendor.index.reLaunch({
              url
            });
            break;
          case "redirectTo":
            common_vendor.index.redirectTo({
              url
            });
            break;
          case "switchTab":
            common_vendor.index.switchTab({
              url
            });
            break;
          default:
            common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.vue:148", `[wot-design] warning(wd-grid-item): linkType can not be ${linkType}`);
            break;
        }
      }
    }
    function setiIemClass(classes) {
      itemClass.value = classes;
    }
    const hoverClass = common_vendor.computed(() => {
      if (grid == null ? void 0 : grid.props.clickable) {
        return grid.props.hoverClass ? grid.props.hoverClass : "wd-grid-item__content--hover";
      }
      return "none";
    });
    __expose({
      setiIemClass,
      itemClass,
      init
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.useSlot
      }, _ctx.useSlot ? {} : common_vendor.e({
        b: _ctx.useIconSlot
      }, _ctx.useIconSlot ? {} : {
        c: common_vendor.p({
          name: _ctx.icon,
          size: _ctx.iconSize,
          ["custom-class"]: _ctx.customIcon
        })
      }, {
        d: common_vendor.p({
          ["custom-class"]: "badge",
          ...customBadgeProps.value
        }),
        e: common_vendor.s("width:" + _ctx.iconSize + "; height: " + _ctx.iconSize),
        f: _ctx.useTextSlot
      }, _ctx.useTextSlot ? {} : {
        g: common_vendor.t(_ctx.text)
      }), {
        h: common_vendor.n(`wd-grid-item__content ${square.value ? "is-square" : ""} ${border.value && gutter.value > 0 ? "is-round" : ""}`),
        i: common_vendor.s(gutterContentStyle.value),
        j: hoverClass.value,
        k: common_vendor.n(`wd-grid-item ${border.value && !gutter.value ? itemClass.value : ""} ${_ctx.customClass}`),
        l: common_vendor.o(click),
        m: common_vendor.s(`${style.value};${_ctx.customStyle}`)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8ad0f7d6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.js.map
