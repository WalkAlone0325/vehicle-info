"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_home = require("../../../api/home.js");
const api_order = require("../../../api/order.js");
const api_common = require("../../../api/common.js");
if (!Array) {
  const _easycom_wd_select_picker2 = common_vendor.resolveComponent("wd-select-picker");
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_select_picker2 + _easycom_wd_picker2 + _easycom_wd_datetime_picker2 + _easycom_wd_input2 + _easycom_wd_textarea2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_select_picker = () => "../../../uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.js";
const _easycom_wd_picker = () => "../../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_datetime_picker = () => "../../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_input = () => "../../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_textarea = () => "../../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_cell_group = () => "../../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_select_picker + _easycom_wd_picker + _easycom_wd_datetime_picker + _easycom_wd_input + _easycom_wd_textarea + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = {
  __name: "recordForm",
  setup(__props) {
    const carOptions = common_vendor.ref([]);
    const dict = common_vendor.ref({});
    const loading = common_vendor.ref(false);
    const form = common_vendor.ref(null);
    const model = common_vendor.ref({
      vehicleId: "",
      plateNumber: "",
      // 车拍
      maintenanceRecordTypeCode: "",
      // 保养类型
      maintenanceDate: "",
      // 保养日期
      maintenanceValidDate: "",
      // 有效日期（月）
      maintenanceContent: "",
      // 保养内容
      remark: ""
    });
    const rules = common_vendor.ref({
      vehicleId: [
        { required: true, message: "请选择车辆车牌" }
      ],
      maintenanceRecordTypeCode: [
        { required: true, message: "请选择保养类型" }
      ],
      maintenanceDate: [
        { required: true, message: "请选择保养日期" }
      ],
      maintenanceValidDate: [
        { required: true, message: "请输入有效日期（月）" }
      ],
      maintenanceContent: [
        { required: true, message: "请输入保养内容" }
      ]
    });
    const getCar = async () => {
      const res = await api_home.getCarListApi({ vehicleStatusCode: "NORMAL" });
      carOptions.value = res.rows;
    };
    const handleCarChange = ({ value }) => {
      const car = carOptions.value.find((item) => item.vehicleId === value);
      model.value.plateNumber = car.plateNumber;
    };
    const getDetail = async (id) => {
      const res = await api_order.getRecordDetail(id);
      model.value = res.data;
    };
    const getDict = async (code) => {
      const res = await api_common.getDictApi(code);
      dict.value[code] = res.data;
    };
    const handleSubmit = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          loading.value = true;
          let res;
          if (model.value.maintenanceRecordId) {
            res = await api_order.putRecord(model.value);
          } else {
            res = await api_order.postRecord(model.value);
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
        common_vendor.index.__f__("log", "at pages/order/devOps/recordForm.vue:88", error, "error");
      });
    };
    common_vendor.onLoad((param) => {
      if (param.id) {
        getDetail(param.id);
      }
      getCar();
      getDict("vehicle_maintenance_record_type");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCarChange),
        b: common_vendor.o(($event) => model.value.vehicleId = $event),
        c: common_vendor.p({
          type: "radio",
          ["value-key"]: "vehicleId",
          ["label-key"]: "plateNumber",
          ["label-width"]: "100px",
          prop: "vehicleId",
          label: "车辆车牌",
          placeholder: "请选择车辆车牌",
          columns: carOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.vehicleId
        }),
        d: common_vendor.o(($event) => model.value.maintenanceRecordTypeCode = $event),
        e: common_vendor.p({
          label: "保养类型",
          placeholder: "请选择保养类型",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "maintenanceRecordTypeCode",
          columns: dict.value.vehicle_maintenance_record_type,
          modelValue: model.value.maintenanceRecordTypeCode
        }),
        f: common_vendor.o(($event) => model.value.maintenanceDate = $event),
        g: common_vendor.p({
          label: "保养日期",
          type: "date",
          ["label-width"]: "100px",
          placeholder: "请选择日期",
          prop: "maintenanceDate",
          modelValue: model.value.maintenanceDate
        }),
        h: common_vendor.o(($event) => model.value.maintenanceValidDate = $event),
        i: common_vendor.p({
          type: "number",
          ["label-width"]: "120px",
          label: "有效日期（月）",
          placeholder: "请输入有效日期（月）",
          prop: "maintenanceValidDate",
          modelValue: model.value.maintenanceValidDate
        }),
        j: common_vendor.o(($event) => model.value.maintenanceContent = $event),
        k: common_vendor.p({
          label: "保养内容",
          ["label-width"]: "100px",
          type: "textarea",
          maxlength: 300,
          ["show-word-limit"]: true,
          placeholder: "请输入保养内容",
          clearable: true,
          prop: "maintenanceContent",
          modelValue: model.value.maintenanceContent
        }),
        l: common_vendor.o(($event) => model.value.remark = $event),
        m: common_vendor.p({
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        n: common_vendor.p({
          border: true
        }),
        o: common_vendor.o(handleSubmit),
        p: common_vendor.p({
          type: "primary",
          loading: loading.value,
          block: true
        }),
        q: common_vendor.sr(form, "dd803224-1,dd803224-0", {
          "k": "form"
        }),
        r: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd803224"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/devOps/recordForm.js.map
