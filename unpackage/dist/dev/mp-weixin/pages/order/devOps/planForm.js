"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/request.js");
const api_order = require("../../../api/order.js");
if (!Array) {
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_input2 + _easycom_wd_datetime_picker2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_input = () => "../../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_datetime_picker = () => "../../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_cell_group = () => "../../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_input + _easycom_wd_datetime_picker + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = {
  __name: "planForm",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const form = common_vendor.ref(null);
    const model = common_vendor.ref({
      vehicleId: "",
      plateNumber: "",
      // 车拍
      remark: "",
      lastMaintenance: "",
      // 上次保养日期
      nextMaintenance: "",
      // 下次保养日期
      lastInspection: "",
      // 上次年检日期
      nextInspection: "",
      // 下次年检日期
      lastInsurance: "",
      // 上次保险日期
      nextInsurance: ""
      // 下次保险日期
    });
    const rules = common_vendor.ref({
      vehicleId: [
        { required: true, message: "请选择车辆车牌" }
      ]
      // lastMaintenance: [
      //   { required: true, message: '请选择上次保养日期' }
      // ], // 上次保养日期
      // nextMaintenance: [
      //   { required: true, message: '请选择下次保养日期' }
      // ], // 下次保养日期
      // lastInspection: [
      //   { required: true, message: '请选择上次年检日期' }
      // ], // 上次年检日期
      // nextInspection: [
      //   { required: true, message: '请选择下次年检日期' }
      // ], // 下次年检日期
      // lastInsurance: [
      //   { required: true, message: '请选择上次保险日期' }
      // ], // 上次保险日期
      // nextInsurance: [
      //   { required: true, message: '请选择下次保险日期' }
      // ] // 下次保险日期
    });
    const getDetail = async (id) => {
      const res = await api_order.getPlanDetail(id);
      model.value = res.data;
    };
    const handleSubmit = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          loading.value = true;
          const res = await api_order.updatePlan(model.value);
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
        common_vendor.index.__f__("log", "at pages/order/devOps/planForm.vue:76", error, "error");
      });
    };
    common_vendor.onLoad((param) => {
      if (param.id) {
        getDetail(param.id);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => model.value.plateNumber = $event),
        b: common_vendor.p({
          label: "车辆车牌",
          ["label-width"]: "100px",
          prop: "plateNumber",
          disabled: true,
          placeholder: "请输入备注",
          modelValue: model.value.plateNumber
        }),
        c: common_vendor.o(($event) => model.value.lastMaintenance = $event),
        d: common_vendor.p({
          label: "上次保养日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "lastMaintenance",
          modelValue: model.value.lastMaintenance
        }),
        e: common_vendor.o(($event) => model.value.nextMaintenance = $event),
        f: common_vendor.p({
          label: "下次保养日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "nextMaintenance",
          modelValue: model.value.nextMaintenance
        }),
        g: common_vendor.o(($event) => model.value.lastInspection = $event),
        h: common_vendor.p({
          label: "上次年检日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "lastInspection",
          modelValue: model.value.lastInspection
        }),
        i: common_vendor.o(($event) => model.value.nextInspection = $event),
        j: common_vendor.p({
          label: "下次年检日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "nextInspection",
          modelValue: model.value.nextInspection
        }),
        k: common_vendor.o(($event) => model.value.lastInsurance = $event),
        l: common_vendor.p({
          label: "上次保险日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "lastInsurance",
          modelValue: model.value.lastInsurance
        }),
        m: common_vendor.o(($event) => model.value.nextInsurance = $event),
        n: common_vendor.p({
          label: "下次保险日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "nextInsurance",
          modelValue: model.value.nextInsurance
        }),
        o: common_vendor.o(($event) => model.value.remark = $event),
        p: common_vendor.p({
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        q: common_vendor.p({
          border: true
        }),
        r: common_vendor.o(handleSubmit),
        s: common_vendor.p({
          type: "primary",
          loading: loading.value,
          block: true
        }),
        t: common_vendor.sr(form, "1b3e4a2c-1,1b3e4a2c-0", {
          "k": "form"
        }),
        v: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b3e4a2c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/devOps/planForm.js.map
