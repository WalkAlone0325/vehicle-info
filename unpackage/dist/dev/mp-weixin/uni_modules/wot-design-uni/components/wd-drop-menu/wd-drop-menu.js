"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_clickoutside = require("../common/clickoutside.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../composables/useQueue.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdDropMenu_types = require("./types.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../wd-icon/wd-icon.js";
if (!Math) {
  (wdOverlay + _easycom_wd_icon)();
}
const wdOverlay = () => "../wd-overlay/wd-overlay.js";
const __default__ = {
  name: "wd-drop-menu",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: {
    idx: 0,
    ...uni_modules_wotDesignUni_components_wdDropMenu_types.dropMenuProps
  },
  setup(__props) {
    const props = __props;
    const queue = common_vendor.inject(uni_modules_wotDesignUni_components_composables_useQueue.queueKey, null);
    const dropMenuId = common_vendor.ref(`dropMenuId${uni_modules_wotDesignUni_components_common_util.uuid()}`);
    const offset = common_vendor.ref(0);
    const windowHeight = common_vendor.ref(0);
    const modalStyle = common_vendor.computed(() => {
      return props.direction === "down" ? `top: calc(var(--window-top) + ${offset.value}px); bottom: 0;` : `top: 0; bottom: calc(var(--window-bottom) + ${offset.value}px)`;
    });
    const { proxy } = common_vendor.getCurrentInstance();
    const { linkChildren, children } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdDropMenu_types.DROP_MENU_KEY);
    const showOverlay = common_vendor.computed(() => {
      return children.some((child) => child.$.exposed.getShowPop());
    });
    const overlayVisible = common_vendor.ref(false);
    let overlayTimer;
    common_vendor.watch(showOverlay, (newVal) => {
      if (overlayTimer) {
        clearTimeout(overlayTimer);
      }
      if (newVal) {
        overlayVisible.value = true;
      } else {
        overlayTimer = setTimeout(() => {
          overlayVisible.value = false;
          overlayTimer = null;
        }, 16);
      }
    });
    linkChildren({ props, fold, offset });
    common_vendor.watch(
      () => props.direction,
      (newValue) => {
        if (!["up", "down"].includes(newValue)) {
          common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.vue:95", "[wot design] warning(wd-drop-menu): direction must be 'up' or 'down'");
        }
      },
      { deep: true, immediate: true }
    );
    common_vendor.onBeforeMount(() => {
      windowHeight.value = common_vendor.index.getSystemInfoSync().windowHeight;
    });
    function noop() {
    }
    function getDisplayTitle(child) {
      const { title, modelValue, options, valueKey, labelKey } = child;
      if (title) {
        return title;
      }
      for (let i = 0, len = options.length; i < len; i++) {
        if (modelValue === options[i][valueKey]) {
          return options[i][labelKey];
        }
      }
      common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.vue:118", "[wot-design] warning(wd-drop-menu-item): no value is matched in the options option.");
    }
    function toggle(child) {
      if (child && !child.disabled) {
        if (queue && queue.closeOther) {
          queue.closeOther(child);
        } else {
          uni_modules_wotDesignUni_components_common_clickoutside.closeOther(child);
        }
        fold(child);
      }
    }
    function fold(child) {
      uni_modules_wotDesignUni_components_common_util.getRect(`#${dropMenuId.value}`, false, proxy).then((rect) => {
        if (!rect)
          return;
        const { top, bottom } = rect;
        if (props.direction === "down") {
          offset.value = Number(bottom);
        } else {
          offset.value = windowHeight.value - Number(top);
        }
        child.$.exposed.toggle();
      });
    }
    function handleClickOverlay() {
      if (props.closeOnClickModal) {
        children.forEach((child) => {
          child.$.exposed.close();
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClickOverlay),
        b: common_vendor.o(noop),
        c: common_vendor.p({
          show: overlayVisible.value,
          duration: _ctx.duration,
          ["z-index"]: 12,
          ["custom-style"]: modalStyle.value
        }),
        d: common_vendor.f(common_vendor.unref(children), (child, index, i0) => {
          return {
            a: common_vendor.t(getDisplayTitle(child)),
            b: common_vendor.s(index == __props.idx ? {
              fontWeight: 600,
              color: "#597fe8"
            } : {}),
            c: "26b08949-1-" + i0,
            d: common_vendor.p({
              name: child.icon,
              size: child.iconSize,
              ["custom-class"]: "wd-drop-menu__arrow"
            }),
            e: common_vendor.o(($event) => _ctx.$emit("click", child, index), index),
            f: index,
            g: common_vendor.o(($event) => toggle(child), index),
            h: common_vendor.n(`wd-drop-menu__item ${child.disabled ? "is-disabled" : ""} ${child.$.exposed.getShowPop() ? "is-active" : ""}`)
          };
        }),
        e: common_vendor.s(_ctx.customStyle),
        f: common_vendor.n(`wd-drop-menu ${_ctx.customClass}`),
        g: common_vendor.o(noop),
        h: dropMenuId.value
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26b08949"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.js.map
