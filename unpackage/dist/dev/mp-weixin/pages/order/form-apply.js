"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_order = require("../../api/order.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_picker2 + _easycom_wd_datetime_picker2 + _easycom_wd_input2 + _easycom_wd_textarea2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_picker = () => "../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_datetime_picker = () => "../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_picker + _easycom_wd_datetime_picker + _easycom_wd_input + _easycom_wd_textarea + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "form-apply",
  setup(__props) {
    const form = common_vendor.ref();
    const model = common_vendor.ref({
      amount: "",
      feeDate: "",
      feeDescribe: "",
      feeTypeCode: "",
      plateNumber: "",
      vehicleId: "",
      remark: "",
      applicantUserId: "",
      applicantUserName: ""
    });
    const rules = common_vendor.ref({});
    const typeOptions = common_vendor.ref([]);
    const getDict = async () => {
      const res = await api_common.getDictApi("fee_type");
      typeOptions.value = res.data;
    };
    const handleSubmit = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        common_vendor.index.__f__("log", "at pages/order/form-apply.vue:29", valid, model);
        common_vendor.index.__f__("log", "at pages/order/form-apply.vue:30", errors);
        await api_order.postFeeApplyApi(model.value);
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form-apply.vue:34", error, "error");
      });
    };
    common_vendor.onMounted(() => {
      getDict();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => model.value.vehicleId = $event),
        b: common_vendor.p({
          label: "车辆",
          placeholder: "请选择车辆",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "vehicleId",
          columns: typeOptions.value,
          modelValue: model.value.vehicleId
        }),
        c: common_vendor.o(($event) => model.value.feeTypeCode = $event),
        d: common_vendor.p({
          label: "费用类型",
          placeholder: "请选择费用类型",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "feeTypeCode",
          columns: typeOptions.value,
          modelValue: model.value.feeTypeCode
        }),
        e: common_vendor.o(($event) => model.value.feeDate = $event),
        f: common_vendor.p({
          type: "date",
          label: "费用产生日期",
          ["label-width"]: "100px",
          placeholder: "请选择时间",
          prop: "feeDate",
          modelValue: model.value.feeDate
        }),
        g: common_vendor.o(($event) => model.value.amount = $event),
        h: common_vendor.p({
          label: "费用金额",
          ["label-width"]: "100px",
          prop: "amount",
          clearable: true,
          placeholder: "请输入费用金额",
          modelValue: model.value.amount
        }),
        i: common_vendor.o(($event) => model.value.feeDescribe = $event),
        j: common_vendor.p({
          label: "费用描述",
          ["label-width"]: "100px",
          prop: "feeDescribe",
          clearable: true,
          placeholder: "请输入费用描述",
          maxlength: 200,
          ["auto-height"]: true,
          ["show-word-limit"]: true,
          type: "textarea",
          modelValue: model.value.feeDescribe
        }),
        k: common_vendor.o(($event) => model.value.remark = $event),
        l: common_vendor.p({
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        m: common_vendor.o(handleSubmit),
        n: common_vendor.p({
          type: "primary",
          block: true
        }),
        o: common_vendor.sr(form, "04769a5c-1,04769a5c-0", {
          "k": "form"
        }),
        p: common_vendor.p({
          model: model.value,
          rules: rules.value
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/form-apply.js.map
