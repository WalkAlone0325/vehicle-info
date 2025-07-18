"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const gridItemProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * GridItem 下方文字样式
   */
  customText: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * GridItem 上方 icon 样式
   */
  customIcon: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 图标名称，可选值见 wd-icon 组件
   */
  icon: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: uni_modules_wotDesignUni_components_common_props.makeStringProp("26px"),
  /**
   * 文字
   */
  text: String,
  /**
   * 点击后跳转的链接地址
   */
  url: String,
  /**
   * 页面跳转方式, 参考微信小程序路由文档，可选值：navigateTo / switchTab / reLaunch
   */
  linkType: uni_modules_wotDesignUni_components_common_props.makeStringProp("navigateTo"),
  /**
   * 是否开启 GridItem 内容插槽
   */
  useSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否开启 GridItem icon 插槽
   */
  useIconSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否开启 GridItem text 内容插槽
   */
  useTextSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否显示图标右上角小红点
   */
  isDot: {
    type: Boolean,
    default: void 0
  },
  /**
   * 图标右上角显示的 badge 类型，可选值：primary / success / warning / danger / info
   */
  type: String,
  /**
   * 图标右上角 badge 显示值
   */
  value: uni_modules_wotDesignUni_components_common_props.numericProp,
  /**
   * 图标右上角 badge 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
   */
  max: Number,
  /**
   * 徽标属性，透传给 Badge 组件
   */
  badgeProps: Object
};
exports.gridItemProps = gridItemProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-grid-item/types.js.map
