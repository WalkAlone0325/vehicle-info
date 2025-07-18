"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useCell = require("../composables/useCell.js");
const uni_modules_wotDesignUni_components_wdPickerView_types = require("../wd-picker-view/types.js");
const uni_modules_wotDesignUni_components_wdForm_types = require("../wd-form/types.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdPicker_types = require("./types.js");
if (!Math) {
  (wdIcon + wdPickerView + wdPopup)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdPopup = () => "../wd-popup/wd-popup.js";
const wdPickerView = () => "../wd-picker-view/wd-picker-view.js";
const __default__ = {
  name: "wd-picker",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdPicker_types.pickerProps,
  emits: ["confirm", "open", "cancel", "clear", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("picker");
    const props = __props;
    const emit = __emit;
    const pickerViewWd = common_vendor.ref(null);
    const cell = uni_modules_wotDesignUni_components_composables_useCell.useCell();
    const innerLoading = common_vendor.ref(false);
    const popupShow = common_vendor.ref(false);
    const showValue = common_vendor.ref("");
    const pickerValue = common_vendor.ref("");
    const displayColumns = common_vendor.ref([]);
    const resetColumns = common_vendor.ref([]);
    const isPicking = common_vendor.ref(false);
    const hasConfirmed = common_vendor.ref(false);
    const isLoading = common_vendor.computed(() => {
      return props.loading || innerLoading.value;
    });
    common_vendor.watch(
      () => props.displayFormat,
      (fn) => {
        if (fn && !uni_modules_wotDesignUni_components_common_util.isFunction(fn)) {
          common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-picker/wd-picker.vue:125", "The type of displayFormat must be Function");
        }
        if (pickerViewWd.value && pickerViewWd.value.getSelectedIndex().length !== 0) {
          handleShowValueUpdate(props.modelValue);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        pickerValue.value = newValue;
        handleShowValueUpdate(newValue);
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.columns,
      (newValue) => {
        displayColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(newValue);
        resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(newValue);
        if (newValue.length === 0) {
          pickerValue.value = uni_modules_wotDesignUni_components_common_util.isArray(props.modelValue) ? [] : "";
          showValue.value = "";
        } else {
          handleShowValueUpdate(props.modelValue);
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.columnChange,
      (newValue) => {
        if (newValue && !uni_modules_wotDesignUni_components_common_util.isFunction(newValue)) {
          common_vendor.index.__f__("error", "at uni_modules/wot-design-uni/components/wd-picker/wd-picker.vue:174", "The type of columnChange must be Function");
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const { parent: form } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdForm_types.FORM_KEY);
    const errorMessage = common_vendor.computed(() => {
      if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
        return form.errorMessages[props.prop];
      } else {
        return "";
      }
    });
    const isRequired = common_vendor.computed(() => {
      let formRequired = false;
      if (form && form.props.rules) {
        const rules = form.props.rules;
        for (const key in rules) {
          if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
            formRequired = rules[key].some((rule) => rule.required);
          }
        }
      }
      return props.required || props.rules.some((rule) => rule.required) || formRequired;
    });
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      handleShowValueUpdate(props.modelValue);
    });
    common_vendor.onBeforeMount(() => {
      displayColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.columns);
      resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(props.columns);
    });
    function handleShowValueUpdate(value) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(value) && value.length > 0 || uni_modules_wotDesignUni_components_common_util.isDef(value) && !uni_modules_wotDesignUni_components_common_util.isArray(value) && value !== "") {
        if (pickerViewWd.value) {
          common_vendor.nextTick$1(() => {
            setShowValue(pickerViewWd.value.getSelects());
          });
        } else {
          setShowValue(getSelects(value));
        }
      } else {
        showValue.value = "";
      }
    }
    function getSelects(value) {
      const formatColumns = uni_modules_wotDesignUni_components_wdPickerView_types.formatArray(props.columns, props.valueKey, props.labelKey);
      if (props.columns.length === 0)
        return;
      if (value === "" || !uni_modules_wotDesignUni_components_common_util.isDef(value) || uni_modules_wotDesignUni_components_common_util.isArray(value) && value.length === 0) {
        return;
      }
      const valueType = uni_modules_wotDesignUni_components_common_util.getType(value);
      const type = ["string", "number", "boolean", "array"];
      if (type.indexOf(valueType) === -1)
        return [];
      value = uni_modules_wotDesignUni_components_common_util.isArray(value) ? value : [value];
      value = value.slice(0, formatColumns.length);
      if (value.length === 0) {
        value = formatColumns.map(() => 0);
      }
      let selected = [];
      value.forEach((target, col) => {
        let row = formatColumns[col].findIndex((row2) => {
          return row2[props.valueKey].toString() === target.toString();
        });
        row = row === -1 ? 0 : row;
        selected.push(row);
      });
      const selects = selected.map((row, col) => formatColumns[col][row]);
      if (selects.length === 1) {
        return selects[0];
      }
      return selects;
    }
    function open() {
      showPopup();
    }
    function close() {
      onCancel();
    }
    function showPopup() {
      if (props.disabled || props.readonly)
        return;
      emit("open");
      popupShow.value = true;
      pickerValue.value = props.modelValue;
      displayColumns.value = resetColumns.value;
    }
    function onCancel() {
      popupShow.value = false;
      emit("cancel");
      let timmer = setTimeout(() => {
        clearTimeout(timmer);
        uni_modules_wotDesignUni_components_common_util.isDef(pickerViewWd.value) && pickerViewWd.value.resetColumns(resetColumns.value);
      }, 300);
    }
    function onConfirm() {
      if (isLoading.value)
        return;
      if (isPicking.value) {
        hasConfirmed.value = true;
        return;
      }
      const { beforeConfirm } = props;
      if (beforeConfirm && uni_modules_wotDesignUni_components_common_util.isFunction(beforeConfirm)) {
        beforeConfirm(
          pickerValue.value,
          (isPass) => {
            isPass && handleConfirm();
          },
          proxy.$.exposed
        );
      } else {
        handleConfirm();
      }
    }
    function handleConfirm() {
      if (isLoading.value || props.disabled) {
        popupShow.value = false;
        return;
      }
      const selects = pickerViewWd.value.getSelects();
      const values = pickerViewWd.value.getValues();
      const columns = pickerViewWd.value.getColumnsData();
      popupShow.value = false;
      resetColumns.value = uni_modules_wotDesignUni_components_common_util.deepClone(columns);
      emit("update:modelValue", values);
      setShowValue(selects);
      emit("confirm", {
        value: values,
        selectedItems: selects
      });
    }
    function pickerViewChange({ value }) {
      pickerValue.value = value;
    }
    function setShowValue(items) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(items) && !items.length || !items)
        return;
      const { valueKey, labelKey } = props;
      showValue.value = (props.displayFormat || uni_modules_wotDesignUni_components_common_util.defaultDisplayFormat)(items, { valueKey, labelKey });
    }
    function noop() {
    }
    function onPickStart() {
      isPicking.value = true;
    }
    function onPickEnd() {
      isPicking.value = false;
      if (hasConfirmed.value) {
        hasConfirmed.value = false;
        onConfirm();
      }
    }
    function setLoading(loading) {
      innerLoading.value = loading;
    }
    const showClear = common_vendor.computed(() => {
      return props.clearable && !props.disabled && !props.readonly && showValue.value.length;
    });
    function handleClear() {
      const clearValue = uni_modules_wotDesignUni_components_common_util.isArray(pickerValue.value) ? [] : "";
      emit("update:modelValue", clearValue);
      emit("clear");
    }
    const showArrow = common_vendor.computed(() => {
      return !props.disabled && !props.readonly && !showClear.value;
    });
    __expose({
      close,
      open,
      setLoading
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.useDefaultSlot
      }, _ctx.useDefaultSlot ? {} : common_vendor.e({
        b: _ctx.label || _ctx.useLabelSlot
      }, _ctx.label || _ctx.useLabelSlot ? common_vendor.e({
        c: _ctx.label
      }, _ctx.label ? {
        d: common_vendor.t(_ctx.label)
      } : {}, {
        e: common_vendor.n(`wd-picker__label ${_ctx.customLabelClass}  ${isRequired.value ? "is-required" : ""}`),
        f: common_vendor.s(_ctx.labelWidth ? "min-width:" + _ctx.labelWidth + ";max-width:" + _ctx.labelWidth + ";" : "")
      }) : {}, {
        g: common_vendor.t(showValue.value ? showValue.value : _ctx.placeholder || common_vendor.unref(translate)("placeholder")),
        h: common_vendor.n(`wd-picker__value ${_ctx.ellipsis && "is-ellipsis"} ${_ctx.customValueClass} ${showValue.value ? "" : "wd-picker__placeholder"}`),
        i: showArrow.value
      }, showArrow.value ? {
        j: common_vendor.p({
          ["custom-class"]: "wd-picker__arrow",
          name: "arrow-right"
        })
      } : showClear.value ? {
        l: common_vendor.p({
          ["custom-class"]: "wd-picker__clear",
          name: "error-fill"
        }),
        m: common_vendor.o(handleClear)
      } : {}, {
        k: showClear.value,
        n: errorMessage.value
      }, errorMessage.value ? {
        o: common_vendor.t(errorMessage.value)
      } : {}), {
        p: common_vendor.o(showPopup),
        q: common_vendor.t(_ctx.cancelButtonText || common_vendor.unref(translate)("cancel")),
        r: common_vendor.o(onCancel),
        s: _ctx.title
      }, _ctx.title ? {
        t: common_vendor.t(_ctx.title)
      } : {}, {
        v: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("done")),
        w: common_vendor.n(`wd-picker__action ${isLoading.value ? "is-loading" : ""}`),
        x: common_vendor.o(onConfirm),
        y: common_vendor.o(noop),
        z: common_vendor.sr(pickerViewWd, "e228acd5-3,e228acd5-2", {
          "k": "pickerViewWd"
        }),
        A: common_vendor.o(pickerViewChange),
        B: common_vendor.o(onPickStart),
        C: common_vendor.o(onPickEnd),
        D: common_vendor.o(($event) => pickerValue.value = $event),
        E: common_vendor.p({
          ["custom-class"]: _ctx.customViewClass,
          columns: displayColumns.value,
          loading: isLoading.value,
          ["loading-color"]: _ctx.loadingColor,
          ["columns-height"]: _ctx.columnsHeight,
          ["value-key"]: _ctx.valueKey,
          ["label-key"]: _ctx.labelKey,
          ["immediate-change"]: _ctx.immediateChange,
          ["column-change"]: _ctx.columnChange,
          modelValue: pickerValue.value
        }),
        F: common_vendor.o(onCancel),
        G: common_vendor.o(($event) => popupShow.value = $event),
        H: common_vendor.p({
          position: "bottom",
          ["hide-when-close"]: false,
          ["close-on-click-modal"]: _ctx.closeOnClickModal,
          ["z-index"]: _ctx.zIndex,
          ["safe-area-inset-bottom"]: _ctx.safeAreaInsetBottom,
          ["custom-class"]: "wd-picker__popup",
          modelValue: popupShow.value
        }),
        I: common_vendor.n(`wd-picker ${_ctx.disabled ? "is-disabled" : ""} ${_ctx.size ? "is-" + _ctx.size : ""}  ${common_vendor.unref(cell).border.value ? "is-border" : ""} ${_ctx.alignRight ? "is-align-right" : ""} ${_ctx.error ? "is-error" : ""} ${_ctx.customClass}`),
        J: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e228acd5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-picker/wd-picker.js.map
