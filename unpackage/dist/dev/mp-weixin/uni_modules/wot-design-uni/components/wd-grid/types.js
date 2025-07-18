"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const GRID_KEY = Symbol("wd-grid");
const gridProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 是否开启格子点击反馈
   */
  clickable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否将格子固定为正方形
   */
  square: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 列数
   */
  column: Number,
  /**
   * 是否显示边框
   */
  border: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 背景颜色
   */
  bgColor: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 格子之间的间距，默认单位为px
   */
  gutter: Number,
  /**
   * 自定义内容区域hover-class
   */
  hoverClass: String
};
exports.GRID_KEY = GRID_KEY;
exports.gridProps = gridProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-grid/types.js.map
