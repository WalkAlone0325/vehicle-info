"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const tableColumnProps = {
  /**
   * 列对应字段
   */
  prop: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  /**
   * 列对应字段标题
   */
  label: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  /**
   * 列宽度，单位px
   */
  width: uni_modules_wotDesignUni_components_common_props.makeNumericProp(100),
  /**
   * 是否开启列排序
   */
  sortable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否固定本列
   */
  fixed: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 列的对齐方式，可选值left,center,right
   */
  align: uni_modules_wotDesignUni_components_common_props.makeStringProp("left")
};
exports.tableColumnProps = tableColumnProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-table-col/types.js.map
