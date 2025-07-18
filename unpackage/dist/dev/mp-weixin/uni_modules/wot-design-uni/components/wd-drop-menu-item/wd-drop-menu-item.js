"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_clickoutside = require("../common/clickoutside.js");
const uni_modules_wotDesignUni_components_composables_useQueue = require("../composables/useQueue.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdDropMenu_types = require("../wd-drop-menu/types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdDropMenuItem_types = require("./types.js");
if (!Math) {
  (wdIcon + wdPopup)();
}
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-drop-menu-item",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdDropMenuItem_types.dorpMenuItemProps,
  emits: ["change", "update:modelValue", "open", "opened", "closed", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const queue = common_vendor.inject(uni_modules_wotDesignUni_components_composables_useQueue.queueKey, null);
    const showWrapper = common_vendor.ref(false);
    const showPop = common_vendor.ref(false);
    const position = common_vendor.ref();
    const zIndex = common_vendor.ref(12);
    const modal = common_vendor.ref(true);
    const duration = common_vendor.ref(0);
    const { parent: dropMenu } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdDropMenu_types.DROP_MENU_KEY);
    const { proxy } = common_vendor.getCurrentInstance();
    const positionStyle = common_vendor.computed(() => {
      let style = "";
      if (showWrapper.value && dropMenu) {
        style = dropMenu.props.direction === "down" ? `top: calc(var(--window-top) + ${dropMenu.offset.value}px); bottom: 0;` : `top: 0; bottom: calc(var(--window-bottom) + ${dropMenu.offset.value}px)`;
      } else {
        style = "";
      }
      return style;
    });
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        if (uni_modules_wotDesignUni_components_common_util.isDef(newValue) && typeof newValue !== "number" && typeof newValue !== "string") {
          common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-drop-menu-item/wd-drop-menu-item.vue:99", "[wot-design] warning(wd-drop-menu-item): the type of value should be a number or a string.");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.onBeforeMount(() => {
      if (queue && queue.pushToQueue) {
        queue.pushToQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.pushToQueue(proxy);
      }
    });
    common_vendor.onBeforeUnmount(() => {
      if (queue && queue.removeFromQueue) {
        queue.removeFromQueue(proxy);
      } else {
        uni_modules_wotDesignUni_components_common_clickoutside.removeFromQueue(proxy);
      }
    });
    function getShowPop() {
      return showPop.value;
    }
    function choose(index) {
      if (props.disabled)
        return;
      const { valueKey } = props;
      const item = props.options[index];
      const newValue = item[valueKey] !== void 0 ? item[valueKey] : item;
      emit("update:modelValue", newValue);
      emit("change", {
        value: newValue,
        selectedItem: item
      });
      close();
    }
    function close() {
      if (!showPop.value) {
        return;
      }
      if (uni_modules_wotDesignUni_components_common_util.isFunction(props.beforeToggle)) {
        props.beforeToggle({
          status: false,
          resolve: (isPass) => {
            isPass && handleClose();
          }
        });
      } else {
        handleClose();
      }
    }
    function handleClose() {
      if (showPop.value) {
        showPop.value = false;
      }
    }
    function open() {
      if (showPop.value) {
        return;
      }
      if (uni_modules_wotDesignUni_components_common_util.isFunction(props.beforeToggle)) {
        props.beforeToggle({
          status: true,
          resolve: (isPass) => {
            isPass && handleOpen();
          }
        });
      } else {
        handleOpen();
      }
    }
    function handleOpen() {
      showWrapper.value = true;
      showPop.value = true;
      if (dropMenu) {
        modal.value = Boolean(dropMenu.props.modal);
        duration.value = Number(dropMenu.props.duration);
        position.value = dropMenu.props.direction === "down" ? "top" : "bottom";
      }
    }
    function toggle() {
      if (showPop.value) {
        close();
      } else {
        open();
      }
    }
    function afterLeave() {
      showWrapper.value = false;
      emit("closed");
    }
    function beforeEnter() {
      emit("open");
    }
    function afterEnter() {
      emit("opened");
    }
    function beforeLeave() {
      emit("close");
    }
    __expose({ getShowPop, open, close, toggle });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showWrapper.value
      }, showWrapper.value ? common_vendor.e({
        b: _ctx.options.length
      }, _ctx.options.length ? {
        c: common_vendor.f(_ctx.options, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item[_ctx.labelKey] ? item[_ctx.labelKey] : item),
            b: item[_ctx.tipKey]
          }, item[_ctx.tipKey] ? {
            c: common_vendor.t(item[_ctx.tipKey])
          } : {}, {
            d: (item[_ctx.valueKey] !== "" ? item[_ctx.valueKey] : item) === _ctx.modelValue
          }, (item[_ctx.valueKey] !== "" ? item[_ctx.valueKey] : item) === _ctx.modelValue ? {
            e: common_vendor.n(`wd-drop-item__icon ${_ctx.customIcon}`),
            f: "d46e2d3a-1-" + i0 + ",d46e2d3a-0",
            g: common_vendor.p({
              name: _ctx.iconName,
              size: "20px"
            })
          } : {}, {
            h: index,
            i: common_vendor.o(($event) => choose(index), index),
            j: common_vendor.n(`wd-drop-item__option ${(item[_ctx.valueKey] !== "" ? item[_ctx.valueKey] : item) === _ctx.modelValue ? "is-active" : ""}`)
          });
        }),
        d: common_vendor.n(`wd-drop-item__title ${_ctx.customTitle}`)
      } : {}, {
        e: common_vendor.o(beforeEnter),
        f: common_vendor.o(afterEnter),
        g: common_vendor.o(beforeLeave),
        h: common_vendor.o(afterLeave),
        i: common_vendor.o(($event) => showPop.value = $event),
        j: common_vendor.p({
          ["z-index"]: zIndex.value,
          duration: duration.value,
          position: position.value,
          ["custom-style"]: `position: absolute; pointer-events: auto; max-height: 80%;${_ctx.customPopupStyle}`,
          ["custom-class"]: _ctx.customPopupClass,
          modal: false,
          ["close-on-click-modal"]: false,
          modelValue: showPop.value
        }),
        k: common_vendor.n(`wd-drop-item  ${_ctx.customClass}`),
        l: common_vendor.s(`pointer-events: none; z-index: ${zIndex.value}; ${positionStyle.value};${_ctx.customStyle}`)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d46e2d3a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-drop-menu-item/wd-drop-menu-item.js.map
