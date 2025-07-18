"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const DROP_MENU_KEY = Symbol("wd-drop-menu");
const dropMenuProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 弹框层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(12),
  /**
   * 菜单展开方向，可选值为up 或 down
   */
  direction: uni_modules_wotDesignUni_components_common_props.makeStringProp("down"),
  /**
   * 是否展示蒙层
   */
  modal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 是否点击蒙层时关闭
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 菜单展开收起动画时间，单位 ms
   */
  duration: uni_modules_wotDesignUni_components_common_props.makeNumberProp(200)
};
exports.DROP_MENU_KEY = DROP_MENU_KEY;
exports.dropMenuProps = dropMenuProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-drop-menu/types.js.map
