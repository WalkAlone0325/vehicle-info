"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdTableCol_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdTable_types = require("../wd-table/types.js");
const __default__ = {
  name: "wd-table-col",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTableCol_types.tableColumnProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { parent: table, index: columnIndex } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdTable_types.TABLE_KEY);
    const sortDirection = common_vendor.ref(0);
    const stripe = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(table)) {
        return table.props.stripe;
      } else {
        return false;
      }
    });
    const border = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(table)) {
        return table.props.border;
      } else {
        return false;
      }
    });
    const ellipsis = common_vendor.computed(() => {
      if (uni_modules_wotDesignUni_components_common_util.isDef(table)) {
        return table.props.ellipsis;
      } else {
        return false;
      }
    });
    const isLastFixed = common_vendor.computed(() => {
      let isLastFixed2 = false;
      if (props.fixed && uni_modules_wotDesignUni_components_common_util.isDef(table)) {
        isLastFixed2 = table.getIsLastFixed(props);
      }
      return isLastFixed2;
    });
    const columnStyle = common_vendor.computed(() => {
      let style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.width)) {
        style["width"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.width);
      }
      if (props.fixed && uni_modules_wotDesignUni_components_common_util.isDef(table) && uni_modules_wotDesignUni_components_common_util.isFunction(table.getFixedStyle)) {
        style = table.getFixedStyle(columnIndex.value, style);
      }
      return style;
    });
    const cellStyle = common_vendor.computed(() => {
      let style = {};
      const rowHeight = uni_modules_wotDesignUni_components_common_util.isDef(table) && uni_modules_wotDesignUni_components_common_util.isDef(table.props) ? table.props.rowHeight : 50;
      if (uni_modules_wotDesignUni_components_common_util.isDef(rowHeight)) {
        style["height"] = uni_modules_wotDesignUni_components_common_util.addUnit(rowHeight);
      }
      if (props.fixed && uni_modules_wotDesignUni_components_common_util.isDef(table) && uni_modules_wotDesignUni_components_common_util.isFunction(table.getFixedStyle)) {
        style = table.getFixedStyle(columnIndex.value, style);
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const column = common_vendor.computed(() => {
      if (!uni_modules_wotDesignUni_components_common_util.isDef(table) || !uni_modules_wotDesignUni_components_common_util.isDef(table.props) || !uni_modules_wotDesignUni_components_common_util.isDef(table.props.data) || !Array.isArray(table.props.data)) {
        return [];
      }
      const column2 = table.props.data.map((item) => {
        return item[props.prop];
      });
      return column2;
    });
    function handleRowClick(index) {
      if (!uni_modules_wotDesignUni_components_common_util.isDef(table)) {
        return;
      }
      uni_modules_wotDesignUni_components_common_util.isFunction(table.rowClick) && table.rowClick(index);
    }
    function getScope(index) {
      if (!uni_modules_wotDesignUni_components_common_util.isDef(table) || !uni_modules_wotDesignUni_components_common_util.isDef(table.props) || !uni_modules_wotDesignUni_components_common_util.isDef(table.props.data) || !Array.isArray(table.props.data)) {
        return {};
      }
      return table.props.data[index] || {};
    }
    __expose({ sortDirection });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(column.value, (row, index, i0) => {
          return common_vendor.e(_ctx.$slots.value ? {
            a: "value-" + i0,
            b: common_vendor.r("value", {
              row: getScope(index),
              index
            }, i0)
          } : {
            c: common_vendor.t(row),
            d: common_vendor.n(`wd-table__value ${ellipsis.value ? "is-ellipsis" : ""}`)
          }, {
            e: common_vendor.n(`wd-table__cell ${stripe.value && common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isOdd)(index) ? "is-stripe" : ""} ${border.value ? "is-border" : ""} is-${_ctx.align}`),
            f: index,
            g: common_vendor.o(($event) => handleRowClick(index), index)
          });
        }),
        b: _ctx.$slots.value,
        c: common_vendor.s(cellStyle.value),
        d: common_vendor.n(`wd-table-col ${_ctx.fixed ? "wd-table-col--fixed" : ""} ${isLastFixed.value && common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isDef)(common_vendor.unref(table)) && common_vendor.unref(table).state.scrollLeft ? "is-shadow" : ""}`),
        e: common_vendor.s(columnStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00c812c4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-table-col/wd-table-col.js.map
