"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const sortButtonProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 选中的箭头方向，1表示升序，0表示重置状态，-1表示降序。
   * 类型: number
   * 可选值: -1, 0, 1
   * 默认值: 0或-1（根据具体实现可能有所不同）
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeNumberProp(0),
  /**
   * 排序按钮展示的文案。
   * 类型: string
   * 默认值: ''
   */
  title: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 当展示双箭头时，是否允许手动重置按钮。
   * 类型: boolean
   * 默认值: false
   */
  allowReset: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否优先切换为降序，如果不开启则默认优先切换为升序。
   * 类型: boolean
   * 默认值: false
   */
  descFirst: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否展示下划线，当只有一个排序按钮时，通常不展示下划线。
   * 类型: boolean
   * 默认值: true
   */
  line: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true)
};
exports.sortButtonProps = sortButtonProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-sort-button/types.js.map
