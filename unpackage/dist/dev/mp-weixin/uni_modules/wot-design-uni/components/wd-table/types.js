"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const tableProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 显示的数据
   */
  data: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(Array),
  /**
   * 是否带有边框
   */
  border: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否为斑马纹 table
   */
  stripe: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * Table 的高度
   */
  height: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 行高
   */
  rowHeight: uni_modules_wotDesignUni_components_common_props.makeNumericProp(50),
  /**
   * 是否显示表头
   */
  showHeader: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否超出2行隐藏
   */
  ellipsis: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否显示索引列
   */
  index: {
    type: [Object, Boolean],
    default: false
  },
  fixedHeader: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
const TABLE_KEY = Symbol("wd-table");
exports.TABLE_KEY = TABLE_KEY;
exports.tableProps = tableProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-table/types.js.map
