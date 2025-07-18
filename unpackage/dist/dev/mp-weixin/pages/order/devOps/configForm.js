"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/request.js");
const api_order = require("../../../api/order.js");
const api_common = require("../../../api/common.js");
if (!Array) {
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_picker2 + _easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_picker = () => "../../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_input = () => "../../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_picker + _easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = {
  __name: "configForm",
  setup(__props) {
    const options = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const form = common_vendor.ref(null);
    const model = common_vendor.ref({
      maintenanceRecordTypeCode: "",
      maintenanceWarningFrontDay: "",
      remark: "",
      maintenanceWarningCycleId: ""
    });
    const rules = common_vendor.ref({
      maintenanceRecordTypeCode: [
        { required: true, message: "请选择保养类型" }
      ],
      maintenanceWarningFrontDay: [
        { required: true, message: "请输入提前告警时间（日）" },
        { min: 1, message: "提前告警时间（日）不能小于1" },
        { max: 365, message: "提前告警时间（日）不能大于365" }
      ]
    });
    const getDetail = async (id) => {
      const res = await api_order.getConfigDetail(id);
      model.value = res.data;
    };
    const getDict = async (code) => {
      const res = await api_common.getDictApi(code);
      options.value = res.data;
    };
    const handleSubmit = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          loading.value = true;
          let res;
          if (model.value.maintenanceWarningCycleId) {
            res = await api_order.putConfigDetail(model.value);
          } else {
            res = await api_order.postConfigDetail(model.value);
          }
          if (res.code == 200) {
            common_vendor.index.showToast({
              title: "提交成功",
              icon: "success",
              duration: 1e3,
              success: () => {
                setTimeout(() => {
                  loading.value = false;
                  common_vendor.index.navigateBack({
                    delta: 1
                  });
                }, 1e3);
              }
            });
          }
          loading.value = false;
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/devOps/configForm.vue:67", error, "error");
      });
    };
    common_vendor.onLoad((param) => {
      if (param.id) {
        getDetail(param.id);
      }
      getDict("vehicle_maintenance_record_type");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => model.value.maintenanceRecordTypeCode = $event),
        b: common_vendor.p({
          label: "保养类型",
          placeholder: "请选择保养类型",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "120px",
          prop: "maintenanceRecordTypeCode",
          columns: options.value,
          modelValue: model.value.maintenanceRecordTypeCode
        }),
        c: common_vendor.o(($event) => model.value.maintenanceWarningFrontDay = $event),
        d: common_vendor.p({
          type: "number",
          label: "提前告警时间(日)",
          ["label-width"]: "120px",
          prop: "maintenanceWarningFrontDay",
          required: true,
          placeholder: "请输入提前告警时间（日）",
          modelValue: model.value.maintenanceWarningFrontDay
        }),
        e: common_vendor.o(($event) => model.value.remark = $event),
        f: common_vendor.p({
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        g: common_vendor.p({
          border: true
        }),
        h: common_vendor.o(handleSubmit),
        i: common_vendor.p({
          type: "primary",
          loading: loading.value,
          block: true
        }),
        j: common_vendor.sr(form, "5a96358a-1,5a96358a-0", {
          "k": "form"
        }),
        k: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a96358a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/devOps/configForm.js.map
