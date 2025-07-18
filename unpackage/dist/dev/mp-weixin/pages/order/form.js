"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const api_home = require("../../api/home.js");
const api_order = require("../../api/order.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_select_picker2 = common_vendor.resolveComponent("wd-select-picker");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_message_box2 + _easycom_wd_toast2 + _easycom_wd_picker2 + _easycom_wd_select_picker2 + _easycom_wd_datetime_picker2 + _easycom_wd_input2 + _easycom_wd_textarea2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_picker = () => "../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_select_picker = () => "../../uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.js";
const _easycom_wd_datetime_picker = () => "../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_wd_toast + _easycom_wd_picker + _easycom_wd_select_picker + _easycom_wd_datetime_picker + _easycom_wd_input + _easycom_wd_textarea + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = {
  __name: "form",
  setup(__props) {
    const curType = common_vendor.ref("");
    const defaultValueDate = common_vendor.ref(Date.now());
    const curId = common_vendor.ref("");
    const form = common_vendor.ref(null);
    const approveForm = common_vendor.ref(null);
    const model = common_vendor.ref({
      vehicleTypeCode: "",
      vehicleTypeName: "",
      // 车辆类型
      expectedVehicleId: "",
      // 车辆id
      expectedPlateNumber: "",
      // 车牌
      expectedDriverName: "",
      // 司机
      expectedDriverId: "",
      destination: "",
      // 目的地信息
      applicantContent: "",
      // 申请内容
      planStartTime: "",
      planEndTime: "",
      remark: "",
      orderStatusCode: "pending"
    });
    const rules = common_vendor.ref({
      vehicleTypeCode: [{ required: true, message: "请选择车辆类型" }],
      expectedDriverName: [{ required: true, message: "请选择期望司机" }],
      expectedPlateNumber: [{ required: true, message: "请选择期望车辆" }],
      destination: [{ required: true, message: "请输入目的地信息" }],
      applicantContent: [{ required: true, message: "请输入申请内容" }],
      planStartTime: [{ required: true, message: "请选择用车开始时间" }],
      planEndTime: [{ required: true, message: "请选择用车结束时间" }]
    });
    const approveModel = common_vendor.ref({
      approvalCause: void 0,
      approvalResultCode: void 0,
      approveDriverId: void 0,
      approveDriverName: void 0,
      approvePlateNumber: void 0,
      approveVehicleId: void 0,
      useCarApplicationOrderId: void 0
    });
    const approveRules = common_vendor.ref({
      approvalCause: [{ required: true, message: "请输入审批原因" }],
      approveDriverId: [{ required: true, message: "请选择审批司机" }],
      approveVehicleId: [{ required: true, message: "请选择审批车辆" }]
    });
    const typeOptions = common_vendor.ref([]);
    const carOptions = common_vendor.ref([]);
    const driverOptions = common_vendor.ref([]);
    const handleDraft = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          const res = await api_order.postOrderApplyApi({ ...model.value, orderStatusCode: "draft" });
          if (res.code === 200) {
            common_vendor.index.showToast({ title: "草稿保存成功", icon: "success" });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form.vue:72", error, "error");
      });
    };
    const handlePublish = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          if (model.value.useCarApplicationOrderId) {
            const res = await api_order.putOrderDraftApi({
              ...model.value,
              planStartTime: utils_index.formatDate(model.value.planStartTime),
              planEndTime: utils_index.formatDate(model.value.planEndTime),
              orderStatusCode: "pending"
            });
            if (res.code === 200) {
              common_vendor.index.showToast({ title: "提交成功", icon: "success" });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1e3);
            }
          } else {
            const res = await api_order.postOrderApplyApi({
              ...model.value,
              planStartTime: utils_index.formatDate(model.value.planStartTime),
              planEndTime: utils_index.formatDate(model.value.planEndTime),
              orderStatusCode: "pending"
            });
            if (res.code === 200) {
              common_vendor.index.showToast({ title: "提交成功", icon: "success" });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1e3);
            }
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form.vue:108", error, "error");
      });
    };
    const canEdit = common_vendor.computed(() => !(curType.value !== "history" && curType.value !== "approve"));
    const getDict = async () => {
      const res = await api_common.getDictApi("vehicle_type");
      typeOptions.value = res.data;
    };
    const getCar = async () => {
      const res = await api_home.getCarListApi({ vehicleStatusCode: "NORMAL", vehicleTypeCode: model.value.vehicleTypeCode });
      carOptions.value = res.rows;
    };
    const getDriver = async () => {
      const res = await api_home.getDriverListApi();
      driverOptions.value = res.rows;
    };
    const changeCarType = ({ value }) => {
      const find = typeOptions.value.find((item) => item.dictValue == value);
      model.value.vehicleTypeName = find ? find.dictLabel : "";
      getCar();
    };
    const handleDriverChange = ({ value }) => {
      const driver = driverOptions.value.find((item) => item.driverId === value);
      model.value.expectedDriverName = driver.driverName;
    };
    const handleCarChange = ({ value }) => {
      const car = carOptions.value.find((item) => item.vehicleId === value);
      model.value.expectedPlateNumber = car.plateNumber;
      model.value.expectedDriverName = car.driverName;
      model.value.expectedDriverId = car.driverId;
    };
    const getOrderDetail = async (id) => {
      const res = await api_order.getOrderDetailApi(id);
      model.value = res.data;
      approveModel.value.useCarApplicationOrderId = res.data.useCarApplicationOrderId;
      approveModel.value.approveDriverId = res.data.expectedDriverId;
      approveModel.value.approveVehicleId = res.data.expectedVehicleId;
      approveModel.value.approveDriverName = res.data.expectedDriverName;
      approveModel.value.approvePlateNumber = res.data.expectedPlateNumber;
      changeCarType({ value: res.data.vehicleTypeCode });
    };
    const openDatePicker = (type) => {
      defaultValueDate.value = model.value[type === 1 ? "planStartTime" : "planEndTime"] || Date.now();
      common_vendor.index.__f__("log", "at pages/order/form.vue:163", defaultValueDate.value);
    };
    common_vendor.onMounted(() => {
      getDict();
      getDriver();
    });
    common_vendor.onLoad((param) => {
      common_vendor.index.__f__("log", "at pages/order/form.vue:173", param);
      curType.value = param.type;
      curId.value = param.id;
      if (curId.value) {
        getOrderDetail(curId.value);
      }
    });
    const handleApproveDriverChange = ({ value }) => {
      const driver = driverOptions.value.find((item) => item.driverId === value);
      approveModel.value.approveDriverName = driver.driverName;
    };
    const handleApproveCarChange = ({ value }) => {
      const car = carOptions.value.find((item) => item.vehicleId === value);
      approveModel.value.approvePlateNumber = car.plateNumber;
      approveModel.value.approveDriverName = car.driverName;
      approveModel.value.approveDriverId = car.driverId;
    };
    const handleApprove = (status) => {
      approveForm.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          const res = await api_order.postApprove({
            ...approveModel.value,
            approvalResultCode: status
          });
          if (res.code === 200) {
            common_vendor.index.showToast({ title: "审批成功", icon: "success" });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form.vue:210", error, "error");
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeCarType),
        b: common_vendor.o(($event) => model.value.vehicleTypeCode = $event),
        c: common_vendor.p({
          disabled: canEdit.value,
          label: "车辆类型",
          placeholder: "请选择车辆类型",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "vehicleTypeCode",
          columns: typeOptions.value,
          modelValue: model.value.vehicleTypeCode
        }),
        d: common_vendor.o(handleCarChange),
        e: common_vendor.o(($event) => model.value.expectedVehicleId = $event),
        f: common_vendor.p({
          disabled: canEdit.value,
          type: "radio",
          ["value-key"]: "vehicleId",
          ["label-key"]: "plateNumber",
          ["label-width"]: "100px",
          prop: "expectedPlateNumber",
          label: "期望车辆",
          placeholder: "请选择期望车辆",
          columns: carOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.expectedVehicleId
        }),
        g: common_vendor.o(handleDriverChange),
        h: common_vendor.o(($event) => model.value.expectedDriverId = $event),
        i: common_vendor.p({
          disabled: canEdit.value,
          type: "radio",
          ["value-key"]: "driverId",
          ["label-key"]: "driverName",
          ["label-width"]: "100px",
          prop: "expectedPlateNumber",
          label: "期望司机",
          placeholder: "请选择期望司机",
          columns: driverOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.expectedDriverId
        }),
        j: common_vendor.o(openDatePicker),
        k: common_vendor.o(($event) => model.value.planStartTime = $event),
        l: common_vendor.p({
          disabled: canEdit.value,
          ["default-value"]: defaultValueDate.value,
          label: "用车开始时间",
          ["label-width"]: "100px",
          placeholder: "请选择时间",
          prop: "planStartTime",
          modelValue: model.value.planStartTime
        }),
        m: common_vendor.o(($event) => openDatePicker(2)),
        n: common_vendor.o(($event) => model.value.planEndTime = $event),
        o: common_vendor.p({
          disabled: canEdit.value,
          ["default-value"]: defaultValueDate.value,
          label: "用车结束时间",
          ["label-width"]: "100px",
          placeholder: "请选择时间",
          prop: "planEndTime",
          modelValue: model.value.planEndTime
        }),
        p: common_vendor.o(($event) => model.value.destination = $event),
        q: common_vendor.p({
          label: "目的地信息",
          disabled: canEdit.value,
          ["label-width"]: "100px",
          prop: "destination",
          clearable: true,
          placeholder: "请输入目的地信息",
          modelValue: model.value.destination
        }),
        r: common_vendor.o(($event) => model.value.applicantContent = $event),
        s: common_vendor.p({
          disabled: canEdit.value,
          label: "申请内容",
          ["label-width"]: "100px",
          prop: "applicantContent",
          clearable: true,
          placeholder: "请输入申请内容",
          maxlength: 200,
          ["auto-height"]: true,
          ["show-word-limit"]: true,
          type: "textarea",
          modelValue: model.value.applicantContent
        }),
        t: common_vendor.o(($event) => model.value.remark = $event),
        v: common_vendor.p({
          disabled: canEdit.value,
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        w: common_vendor.p({
          title: "基础信息",
          border: true
        }),
        x: curType.value === "draft" || !curType.value
      }, curType.value === "draft" || !curType.value ? common_vendor.e({
        y: curType.value !== "draft"
      }, curType.value !== "draft" ? {
        z: common_vendor.o(handleDraft),
        A: common_vendor.p({
          type: "warning"
        })
      } : {}, {
        B: common_vendor.o(handlePublish),
        C: common_vendor.p({
          type: "primary"
        })
      }) : {}, {
        D: common_vendor.sr(form, "efa79250-3,efa79250-2", {
          "k": "form"
        }),
        E: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        }),
        F: curType.value === "approve" || curType.value === "history"
      }, curType.value === "approve" || curType.value === "history" ? common_vendor.e({
        G: common_vendor.o(handleApproveCarChange),
        H: common_vendor.o(($event) => approveModel.value.approveVehicleId = $event),
        I: common_vendor.p({
          disabled: curType.value === "history",
          type: "radio",
          ["value-key"]: "vehicleId",
          ["label-key"]: "plateNumber",
          ["label-width"]: "100px",
          prop: "approveVehicleId",
          label: "审批车辆",
          placeholder: "请选择审批车辆",
          columns: carOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: approveModel.value.approveVehicleId
        }),
        J: common_vendor.o(handleApproveDriverChange),
        K: common_vendor.o(($event) => approveModel.value.approveDriverId = $event),
        L: common_vendor.p({
          disabled: curType.value === "history",
          type: "radio",
          ["value-key"]: "driverId",
          ["label-key"]: "driverName",
          ["label-width"]: "100px",
          prop: "approveDriverId",
          label: "审批司机",
          placeholder: "请选择审批司机",
          columns: driverOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: approveModel.value.approveDriverId
        }),
        M: common_vendor.o(($event) => approveModel.value.approvalCause = $event),
        N: common_vendor.p({
          disabled: curType.value === "history",
          label: "审批内容",
          ["label-width"]: "100px",
          prop: "approvalCause",
          clearable: true,
          placeholder: "请输入审批内容",
          maxlength: 200,
          ["auto-height"]: true,
          ["show-word-limit"]: true,
          type: "textarea",
          modelValue: approveModel.value.approvalCause
        }),
        O: curType.value === "history"
      }, curType.value === "history" ? {
        P: common_vendor.o(($event) => model.value.orderStatusName = $event),
        Q: common_vendor.p({
          label: "审核状态",
          disabled: true,
          ["label-width"]: "100px",
          prop: "orderStatusName",
          clearable: true,
          placeholder: "",
          modelValue: model.value.orderStatusName
        })
      } : {}, {
        R: common_vendor.p({
          title: "审批信息",
          border: true
        }),
        S: curType.value === "approve"
      }, curType.value === "approve" ? {
        T: common_vendor.o(($event) => handleApprove("pass")),
        U: common_vendor.p({
          type: "warning"
        }),
        V: common_vendor.o(($event) => handleApprove("refuse")),
        W: common_vendor.p({
          type: "primary"
        })
      } : {}) : {}, {
        X: common_vendor.sr(approveForm, "efa79250-15,efa79250-2", {
          "k": "approveForm"
        }),
        Y: common_vendor.p({
          model: approveModel.value,
          rules: approveRules.value,
          errorType: "toast"
        }),
        Z: common_vendor.p({
          group: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-efa79250"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/form.js.map
