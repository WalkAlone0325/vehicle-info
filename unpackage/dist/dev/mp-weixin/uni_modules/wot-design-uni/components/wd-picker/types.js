"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const pickerProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * label 外部自定义样式
   */
  customLabelClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * value 外部自定义样式
   */
  customValueClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * pickerView 外部自定义样式
   */
  customViewClass: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 选择器左侧文案
   */
  label: String,
  /**
   * 选择器占位符
   */
  placeholder: String,
  /**
   * 是否禁用
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否只读
   */
  readonly: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载中
   */
  loading: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载中颜色
   */
  loadingColor: uni_modules_wotDesignUni_components_common_props.makeStringProp("#4D80F0"),
  /* popup */
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 是否必填
   */
  required: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 尺寸
   */
  size: String,
  /**
   * 标签宽度
   */
  labelWidth: String,
  /**
   * 使用默认插槽
   */
  useDefaultSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 使用标签插槽
   */
  useLabelSlot: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 错误状态
   */
  error: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 右对齐
   */
  alignRight: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数
   */
  beforeConfirm: Function,
  /**
   * 点击蒙层关闭
   */
  closeOnClickModal: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 底部安全区域内
   */
  safeAreaInsetBottom: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 文本溢出显示省略号
   */
  ellipsis: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 选项总高度
   */
  columnsHeight: uni_modules_wotDesignUni_components_common_props.makeNumberProp(217),
  /**
   * 选项值对应的键名
   */
  valueKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("value"),
  /**
   * 选项文本对应的键名
   */
  labelKey: uni_modules_wotDesignUni_components_common_props.makeStringProp("label"),
  /**
   * 选中项，如果为多列选择器，则其类型应为数组
   */
  modelValue: {
    type: [String, Number, Array],
    default: ""
  },
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   */
  columns: {
    type: Array,
    default: () => []
  },
  /**
   * 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源。
   */
  columnChange: Function,
  /**
   * 自定义展示文案的格式化函数，返回一个字符串
   */
  displayFormat: Function,
  /**
   * 自定义层级
   */
  zIndex: uni_modules_wotDesignUni_components_common_props.makeNumberProp(15),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: uni_modules_wotDesignUni_components_common_props.makeArrayProp(),
  /**
   * 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 显示清空按钮
   */
  clearable: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.pickerProps = pickerProps;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/wd-picker/types.js.map
