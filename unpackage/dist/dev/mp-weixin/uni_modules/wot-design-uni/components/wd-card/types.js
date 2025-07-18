"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const cardProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 卡片类型
   */
  type: String,
  /**
   * 卡片标题
   */
  title: String,
  /**
   * 标题自定义样式
   */
  customTitleClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 内容自定义样式
   */
  customContentClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 底部自定义样式
   */
  customFooterClass: uni_modules_wotDesignUni_components_common_props.makeStringProp("")
};
exports.cardProps = cardProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-card/types.js.map
