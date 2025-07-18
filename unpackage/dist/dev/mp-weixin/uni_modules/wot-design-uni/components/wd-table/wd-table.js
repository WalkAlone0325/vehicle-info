"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdTable_types = require("./types.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
if (!Math) {
  (wdSortButton + wdTableCol)();
}
const wdTableCol = () => "../wd-table-col/wd-table-col.js";
const wdSortButton = () => "../wd-sort-button/wd-sort-button.js";
const __default__ = {
  name: "wd-table",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTable_types.tableProps,
  emits: ["sort-method", "row-click"],
  setup(__props, { emit: __emit }) {
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("tableCol");
    const props = __props;
    const emit = __emit;
    const state = common_vendor.reactive({
      scrollLeft: 0
    });
    const { linkChildren, children } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdTable_types.TABLE_KEY);
    linkChildren({ props, state, rowClick, getIsLastFixed, getFixedStyle });
    const indexUUID = uni_modules_wotDesignUni_components_common_util.uuid();
    const indexColumn = common_vendor.ref({
      prop: indexUUID,
      label: translate("indexLabel"),
      width: "100rpx",
      sortable: false,
      fixed: false,
      align: "left",
      ...uni_modules_wotDesignUni_components_common_util.isObj(props.index) ? props.index : {}
    });
    const scroll = uni_modules_wotDesignUni_components_common_util.debounce(handleScroll, 100, { leading: false });
    const tableStyle = common_vendor.computed(() => {
      const style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.height)) {
        style["max-height"] = uni_modules_wotDesignUni_components_common_util.addUnit(props.height);
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}${props.customStyle}`;
    });
    const realWidthStyle = common_vendor.computed(() => {
      const style = {
        display: "flex"
      };
      let width = "";
      children.forEach((child) => {
        width = width ? `${width} + ${uni_modules_wotDesignUni_components_common_util.addUnit(child.width)}` : uni_modules_wotDesignUni_components_common_util.addUnit(child.width);
      });
      style["width"] = `calc(${width})`;
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const bodyStyle = common_vendor.computed(() => {
      const style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(props.height)) {
        style["height"] = uni_modules_wotDesignUni_components_common_util.isDef(props.rowHeight) ? `calc(${props.data.length} * ${uni_modules_wotDesignUni_components_common_util.addUnit(props.rowHeight)})` : `calc(${props.data.length} * 50px)`;
      }
      return `${uni_modules_wotDesignUni_components_common_util.objToStyle(style)}`;
    });
    function getIsLastFixed(column) {
      let isLastFixed = false;
      if (column.fixed && uni_modules_wotDesignUni_components_common_util.isDef(children)) {
        const columns = children.filter((child) => {
          return child.fixed;
        });
        if (columns.length && columns[columns.length - 1].prop === column.prop) {
          isLastFixed = true;
        }
      }
      return isLastFixed;
    }
    function getCellStyle(columnIndex) {
      let style = {};
      if (uni_modules_wotDesignUni_components_common_util.isDef(children[columnIndex].width)) {
        style["width"] = uni_modules_wotDesignUni_components_common_util.addUnit(children[columnIndex].width);
      }
      if (children[columnIndex].fixed) {
        style = getFixedStyle(columnIndex, style);
      }
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    }
    function getFixedStyle(columnIndex, style) {
      if (columnIndex > 0) {
        let left = "";
        children.forEach((column, index) => {
          if (index < columnIndex) {
            left = left ? `${left} + ${uni_modules_wotDesignUni_components_common_util.addUnit(column.width)}` : uni_modules_wotDesignUni_components_common_util.addUnit(column.width);
          }
        });
        style["left"] = `calc(${left})`;
      } else {
        style["left"] = 0;
      }
      return style;
    }
    function handleSortChange(value, index) {
      children[index].$.exposed.sortDirection.value = value;
      children.forEach((col, i) => {
        if (index != i) {
          col.$.exposed.sortDirection.value = 0;
        }
      });
      const column = {
        // 列对应字段
        prop: children[index].prop,
        // 列对应字段标题
        label: children[index].label,
        // 列宽度
        width: children[index].width,
        // 是否开启列排序
        sortable: children[index].sortable,
        // 列的对齐方式，可选值left,center,right
        align: children[index].align,
        // 列的排序方向
        sortDirection: value,
        // 是否i固定列
        fixed: children[index].fixed
      };
      emit("sort-method", column);
    }
    function handleScroll(event) {
      state.scrollLeft = event.detail.scrollLeft;
    }
    function rowClick(index) {
      emit("row-click", { rowIndex: index });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.fixedHeader
      }, _ctx.fixedHeader ? common_vendor.e({
        b: _ctx.showHeader
      }, _ctx.showHeader ? {
        c: common_vendor.f(common_vendor.unref(children), (column, index, i0) => {
          return common_vendor.e({
            a: column.sortable
          }, column.sortable ? {
            b: common_vendor.o(({
              value
            }) => handleSortChange(value, index), index),
            c: "323200c2-0-" + i0,
            d: common_vendor.o(($event) => column.$.exposed.sortDirection.value = $event, index),
            e: common_vendor.p({
              ["allow-reset"]: true,
              line: false,
              title: column.label,
              modelValue: column.$.exposed.sortDirection.value
            })
          } : {
            f: common_vendor.t(column.label),
            g: common_vendor.n(`wd-table__value ${_ctx.ellipsis ? "is-ellipsis" : ""}`)
          }, {
            h: common_vendor.n(`wd-table__cell ${_ctx.border ? "is-border" : ""} ${column.fixed ? "is-fixed" : ""} ${_ctx.stripe ? "is-stripe" : ""} is-${column.align} ${getIsLastFixed(column) && state.scrollLeft ? "is-shadow" : ""}`),
            i: common_vendor.s(getCellStyle(index)),
            j: index
          });
        }),
        d: common_vendor.s(realWidthStyle.value),
        e: state.scrollLeft,
        f: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(scroll) && common_vendor.unref(scroll)(...args)
        )
      } : {}, {
        g: _ctx.index !== false
      }, _ctx.index !== false ? {
        h: common_vendor.w(({
          index
        }, s0, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: i0,
            c: s0
          };
        }, {
          name: "value",
          path: "h",
          vueId: "323200c2-1"
        }),
        i: common_vendor.p({
          prop: indexColumn.value.prop,
          label: indexColumn.value.label,
          width: indexColumn.value.width,
          sortable: indexColumn.value.sortable,
          fixed: indexColumn.value.fixed,
          align: indexColumn.value.align
        })
      } : {}, {
        j: common_vendor.s(realWidthStyle.value),
        k: common_vendor.s(bodyStyle.value),
        l: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(scroll) && common_vendor.unref(scroll)(...args)
        ),
        m: state.scrollLeft
      }) : common_vendor.e({
        n: _ctx.showHeader
      }, _ctx.showHeader ? {
        o: common_vendor.f(common_vendor.unref(children), (column, index, i0) => {
          return common_vendor.e({
            a: column.sortable
          }, column.sortable ? {
            b: common_vendor.o(({
              value
            }) => handleSortChange(value, index), index),
            c: "323200c2-2-" + i0,
            d: common_vendor.o(($event) => column.$.exposed.sortDirection.value = $event, index),
            e: common_vendor.p({
              ["allow-reset"]: true,
              line: false,
              title: column.label,
              modelValue: column.$.exposed.sortDirection.value
            })
          } : {
            f: common_vendor.t(column.label),
            g: common_vendor.n(`wd-table__value ${_ctx.ellipsis ? "is-ellipsis" : ""}`)
          }, {
            h: index,
            i: common_vendor.n(`wd-table__cell ${_ctx.border ? "is-border" : ""} ${column.fixed ? "is-fixed" : ""} ${_ctx.stripe ? "is-stripe" : ""} is-${column.align} ${getIsLastFixed(column) && state.scrollLeft ? "is-shadow" : ""}`),
            j: common_vendor.s(getCellStyle(index))
          });
        })
      } : {}, {
        p: _ctx.index !== false
      }, _ctx.index !== false ? {
        q: common_vendor.w(({
          index
        }, s0, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: i0,
            c: s0
          };
        }, {
          name: "value",
          path: "q",
          vueId: "323200c2-3"
        }),
        r: common_vendor.p({
          prop: indexColumn.value.prop,
          label: indexColumn.value.label,
          width: indexColumn.value.width,
          sortable: indexColumn.value.sortable,
          fixed: indexColumn.value.fixed,
          align: indexColumn.value.align
        })
      } : {}, {
        s: common_vendor.s(bodyStyle.value),
        t: common_vendor.s(realWidthStyle.value),
        v: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(scroll) && common_vendor.unref(scroll)(...args)
        ),
        w: state.scrollLeft
      }), {
        x: common_vendor.n(`wd-table ${_ctx.border ? "is-border" : ""} ${_ctx.customClass}`),
        y: common_vendor.s(tableStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-323200c2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-table/wd-table.js.map
