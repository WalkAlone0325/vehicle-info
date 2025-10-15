"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
require("../../utils/request.js");
const api_order = require("../../api/order.js");
const api_common = require("../../api/common.js");
const hooks_useColPickerData = require("../../hooks/useColPickerData.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_col_picker2 = common_vendor.resolveComponent("wd-col-picker");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_wd_select_picker2 = common_vendor.resolveComponent("wd-select-picker");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_message_box2 + _easycom_wd_toast2 + _easycom_wd_input2 + _easycom_wd_picker2 + _easycom_wd_col_picker2 + _easycom_wd_datetime_picker2 + _easycom_wd_textarea2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_wd_select_picker2 + _easycom_BaseForm2)();
}
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_picker = () => "../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_col_picker = () => "../../uni_modules/wot-design-uni/components/wd-col-picker/wd-col-picker.js";
const _easycom_wd_datetime_picker = () => "../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_textarea = () => "../../uni_modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_wd_select_picker = () => "../../uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.js";
const _easycom_BaseForm = () => "../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_wd_toast + _easycom_wd_input + _easycom_wd_picker + _easycom_wd_col_picker + _easycom_wd_datetime_picker + _easycom_wd_textarea + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_wd_select_picker + _easycom_BaseForm)();
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
      applicantNickName: "",
      // 申请人
      applicantUserId: "",
      // 申请人账号
      applicantUserName: "",
      applicantDeptId: "",
      // 申请人公司
      applicantDeptName: "",
      applicantCompanyDeptId: "",
      // 申请人部门
      applicantCompanyDeptName: "",
      applicantPostId: "",
      // 申请人岗位
      applicantStartRegionCode: "",
      // 开始地点
      name1: "",
      name2: "",
      code1: [],
      code2: [],
      applicantEndRegionCode: "",
      // 目标地点
      applicantIsIntermarketCityCode: "",
      // 是否跨市
      applicantPassengersNumber: "",
      // 乘车人数
      planStartTime: "",
      // 计划开始时间
      planEndTime: "",
      // 计划结束时间
      applicantContent: ""
      // 申请内容
    });
    const rules = common_vendor.ref({
      applicantContent: [{ required: true, message: "请输入申请内容" }],
      planStartTime: [{ required: true, message: "请选择用车开始时间" }],
      planEndTime: [{ required: true, message: "请选择用车结束时间" }],
      applicantPassengersNumber: [{ required: true, message: "请输入乘车人数" }],
      applicantStartRegionCode: [{ required: true, message: "请选择开始地点" }],
      applicantEndRegionCode: [{ required: true, message: "请选择目标地点" }],
      applicantIsIntermarketCityCode: [{ required: true, message: "请选择是否跨市" }]
    });
    const approveModel = common_vendor.ref({
      approvalCause: void 0,
      approvalResultCode: void 0,
      approveDriverId: void 0,
      approveDriverName: void 0,
      approvePlateNumber: void 0,
      approveDriverMobile: void 0,
      approveVehicleId: void 0,
      useCarApplicationOrderId: void 0
    });
    const approveRules = common_vendor.ref({
      approvalCause: [{ required: true, message: "请输入审批原因" }]
      // approveDriverId: [{ required: true, message: '请选择审批司机' }],
      // approveVehicleId: [{ required: true, message: '请选择审批车辆' }],
    });
    common_vendor.ref([]);
    const carOptions = common_vendor.ref([]);
    const driverOptions = common_vendor.ref([]);
    const handleDraft = () => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          const res = await api_order.postOrderApplyApi({
            ...model.value,
            planStartTime: utils_index.formatDate(model.value.planStartTime),
            planEndTime: utils_index.formatDate(model.value.planEndTime),
            orderStatusCode: "draft"
          });
          if (res.code === 200) {
            common_vendor.index.showToast({ title: "草稿保存成功", icon: "success" });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form.vue:89", error, "error");
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
        common_vendor.index.__f__("log", "at pages/order/form.vue:125", error, "error");
      });
    };
    const canEdit = common_vendor.computed(() => !(curType.value !== "history" && curType.value !== "approve"));
    const getInfo = async () => {
      const res = await api_order.getApplyInfoApi();
      model.value.applicantNickName = res.data.nickName;
      model.value.applicantUserId = res.data.userId;
      model.value.applicantDeptId = res.data.deptId;
      model.value.applicantCompanyDeptId = res.data.companyDeptId;
      model.value.applicantPostId = res.data.postId;
      model.value.applicantUserName = res.data.username;
      model.value.applicantDeptName = res.data.deptName;
      model.value.applicantCompanyDeptName = res.data.companyDeptName;
    };
    common_vendor.ref([]);
    const ynOptions = common_vendor.ref([]);
    const getDict = async (key, option) => {
      const res = await api_common.getDictApi(key);
      option.value = res.data;
    };
    const area = common_vendor.ref([[]]);
    const area2 = common_vendor.ref([[]]);
    const areaOptions = common_vendor.ref([]);
    const getRegion = async (payload) => {
      const res = await api_order.getRegionApi(payload);
      area.value[0] = res.data;
      area2.value[0] = res.data;
      areaOptions.value = res.data;
    };
    const columnChange = async ({ selectedItem, index, resolve, finish }) => {
      if (index < 2) {
        const res = await api_order.getRegionApi({ code: selectedItem.code });
        const areaData = hooks_useColPickerData.findChildrenByCode(area.value[index], selectedItem.code, res.data);
        if (index == 0) {
          area.value = [areaOptions.value];
        }
        if (areaData && areaData.length) {
          area.value[index + 1] = areaData;
          resolve(areaData);
        } else {
          finish();
        }
      } else {
        finish();
      }
    };
    const columnChange2 = async ({ selectedItem, index, resolve, finish }) => {
      if (index < 2) {
        const res = await api_order.getRegionApi({ code: selectedItem.code });
        const areaData = hooks_useColPickerData.findChildrenByCode(area2.value[index], selectedItem.code, res.data);
        if (index == 0) {
          area2.value = [areaOptions.value];
        }
        if (areaData && areaData.length) {
          area2.value[index + 1] = areaData;
          resolve(areaData);
        } else {
          finish();
        }
      } else {
        finish();
      }
    };
    const handleConfirm = ({ value, selectedItems }) => {
      model.value.code1 = value;
      model.value.applicantStartRegionCode = value[2];
    };
    const handleConfirm2 = ({ value, selectedItems }) => {
      model.value.code2 = value;
      model.value.applicantEndRegionCode = value[2];
    };
    common_vendor.watchEffect(() => {
      var _a, _b;
      if (!model.value.applicantStartRegionCode || !model.value.applicantEndRegionCode) {
        model.value.applicantIsIntermarketCityCode = "";
        return;
      }
      const v1 = (_a = model.value.applicantStartRegionCode) == null ? void 0 : _a.substring(0, 4);
      const v2 = (_b = model.value.applicantEndRegionCode) == null ? void 0 : _b.substring(0, 4);
      model.value.applicantIsIntermarketCityCode = v1 === v2 ? "N" : "Y";
    });
    const postOptions = common_vendor.ref([]);
    const getPost = async () => {
      const res = await api_order.getPostApi();
      postOptions.value = res.data;
      if (res.data.length) {
        model.value.applicantPostId = res.data[0].postId;
      }
    };
    const getOrderDetail = async (id) => {
      const res = await api_order.getOrderDetailApi(id);
      model.value = {
        ...res.data,
        code1: [res.data.applicantStartProvinceCode, res.data.applicantStartCityCode, res.data.applicantStartCountyCode],
        code2: [res.data.applicantEndProvinceCode, res.data.applicantEndCityCode, res.data.applicantEndCountyCode]
      };
      approveModel.value = {
        ...approveModel.value,
        approveDriverId: model.value.approveDriverId,
        approveVehicleId: model.value.approveVehicleId,
        approveDriverMobile: model.value.approveDriverMobile,
        approvalCause: model.value.approvalCause
      };
      handleConfirm({ value: model.value.code1 });
      handleConfirm2({ value: model.value.code2 });
    };
    const openDatePicker = (type) => {
      defaultValueDate.value = model.value[type === 1 ? "planStartTime" : "planEndTime"] || Date.now();
    };
    common_vendor.onMounted(() => {
      getInfo();
      getPost();
      getDict("sys_yes_no", ynOptions);
    });
    common_vendor.onLoad(async (param) => {
      common_vendor.index.__f__("log", "at pages/order/form.vue:265", param);
      curType.value = param.type;
      curId.value = param.id;
      await getRegion();
      if (curId.value) {
        await getOrderDetail(curId.value);
        if (curType.value === "approve" || curType.value === "history") {
          await getCar();
          await getDriver();
        }
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
          if (model.value.taskName === "车辆管理员") {
            if (!approveModel.value.approveVehicleId) {
              common_vendor.index.showToast({ title: "请选择车辆", icon: "none" });
              return;
            }
            if (!approveModel.value.approveDriverId) {
              common_vendor.index.showToast({ title: "请选择司机", icon: "none" });
              return;
            }
            common_vendor.index.__f__("log", "at pages/order/form.vue:303", approveModel.value.approveDriverMobile);
            if (!approveModel.value.approveDriverMobile) {
              common_vendor.index.showToast({ title: "请输入司机手机号", icon: "none" });
              return;
            }
          }
          const res = await api_order.postApprove({
            ...approveModel.value,
            approvalResultCode: status,
            taskId: model.value.taskId,
            taskName: model.value.taskName,
            useCarApplicationOrderId: model.value.useCarApplicationOrderId
          });
          if (res.code === 200) {
            common_vendor.index.showToast({ title: "审批成功", icon: "success" });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/order/form.vue:325", error, "error");
      });
    };
    const getCar = async () => {
      const res = await api_order.getCarApi({ isIncludeCompany: "N", deptId: model.value.applicantCompanyDeptId });
      carOptions.value = res.rows.map((item) => ({
        ...item,
        label: `${item.plateNumber}（${item.brandModel}）${item.vehicleTypeName}`
      }));
    };
    const getDriver = async () => {
      const res = await api_order.getDriverApi({ isIncludeCompany: "N", deptId: model.value.applicantCompanyDeptId });
      driverOptions.value = res.rows.map((item) => ({
        ...item,
        label: `${item.driverName}（${item.driverSexName}）${item.licenseTypeName}`
      }));
    };
    const clickImg = (i) => {
      common_vendor.index.previewImage({
        urls: [`data:image/jpg;base64,${model.value.flowChart}`]
        // 单张图片的 URL 数组
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => model.value.applicantNickName = $event),
        b: common_vendor.p({
          label: "申请人",
          ["label-width"]: "100px",
          prop: "applicantNickName",
          clearable: true,
          placeholder: "请输入申请人",
          readonly: true,
          modelValue: model.value.applicantNickName
        }),
        c: common_vendor.o(($event) => model.value.applicantUserName = $event),
        d: common_vendor.p({
          label: "申请人账号",
          ["label-width"]: "100px",
          prop: "applicantUserId",
          clearable: true,
          placeholder: "请输入申请人账号",
          readonly: true,
          modelValue: model.value.applicantUserName
        }),
        e: common_vendor.o(($event) => model.value.applicantCompanyDeptName = $event),
        f: common_vendor.p({
          label: "申请人公司",
          ["label-width"]: "100px",
          prop: "applicantDeptId",
          clearable: true,
          placeholder: "请输入申请人公司",
          readonly: true,
          modelValue: model.value.applicantCompanyDeptName
        }),
        g: common_vendor.o(($event) => model.value.applicantDeptName = $event),
        h: common_vendor.p({
          label: "申请人部门",
          ["label-width"]: "100px",
          prop: "applicantCompanyDeptId",
          clearable: true,
          placeholder: "请输入申请人部门",
          readonly: true,
          modelValue: model.value.applicantDeptName
        }),
        i: common_vendor.o(($event) => model.value.applicantPostId = $event),
        j: common_vendor.p({
          readonly: canEdit.value,
          label: "申请人岗位",
          placeholder: "请选择申请人岗位",
          ["value-key"]: "postId",
          ["label-key"]: "postName",
          ["label-width"]: "100px",
          prop: "applicantPostId",
          columns: postOptions.value,
          modelValue: model.value.applicantPostId
        }),
        k: common_vendor.o(handleConfirm),
        l: common_vendor.o(($event) => model.value.code1 = $event),
        m: common_vendor.p({
          ["auto-complete"]: true,
          ["label-width"]: "100px",
          label: "开始地点",
          prop: "applicantStartRegionCode",
          columns: area.value,
          ["column-change"]: columnChange,
          readonly: canEdit.value,
          ["value-key"]: "code",
          ["label-key"]: "name",
          modelValue: model.value.code1
        }),
        n: common_vendor.o(handleConfirm2),
        o: common_vendor.o(($event) => model.value.code2 = $event),
        p: common_vendor.p({
          ["auto-complete"]: true,
          ["label-width"]: "100px",
          label: "目标地点",
          prop: "applicantEndRegionCode",
          columns: area2.value,
          ["column-change"]: columnChange2,
          readonly: canEdit.value,
          ["value-key"]: "code",
          ["label-key"]: "name",
          modelValue: model.value.code2
        }),
        q: common_vendor.o(($event) => model.value.applicantIsIntermarketCityCode = $event),
        r: common_vendor.p({
          readonly: canEdit.value,
          label: "是否跨市",
          placeholder: "请选择是否跨市",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "applicantIsIntermarketCityCode",
          columns: ynOptions.value,
          modelValue: model.value.applicantIsIntermarketCityCode
        }),
        s: common_vendor.o(($event) => model.value.applicantPassengersNumber = $event),
        t: common_vendor.p({
          label: "乘车人数",
          type: "number",
          readonly: canEdit.value,
          ["label-width"]: "100px",
          prop: "applicantPassengersNumber",
          clearable: true,
          placeholder: "请输入乘车人数",
          modelValue: model.value.applicantPassengersNumber
        }),
        v: common_vendor.o(openDatePicker),
        w: common_vendor.o(($event) => model.value.planStartTime = $event),
        x: common_vendor.p({
          readonly: canEdit.value,
          ["default-value"]: defaultValueDate.value,
          label: "计划开始时间",
          ["label-width"]: "100px",
          placeholder: "请选择时间",
          prop: "planStartTime",
          modelValue: model.value.planStartTime
        }),
        y: common_vendor.o(($event) => openDatePicker(2)),
        z: common_vendor.o(($event) => model.value.planEndTime = $event),
        A: common_vendor.p({
          readonly: canEdit.value,
          ["default-value"]: defaultValueDate.value,
          label: "计划结束时间",
          ["label-width"]: "100px",
          placeholder: "请选择时间",
          prop: "planEndTime",
          modelValue: model.value.planEndTime
        }),
        B: common_vendor.o(($event) => model.value.applicantContent = $event),
        C: common_vendor.p({
          readonly: canEdit.value,
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
        D: common_vendor.p({
          title: "基础信息",
          border: true
        }),
        E: curType.value === "draft" || !curType.value
      }, curType.value === "draft" || !curType.value ? common_vendor.e({
        F: curType.value !== "draft"
      }, curType.value !== "draft" ? {
        G: common_vendor.o(handleDraft),
        H: common_vendor.p({
          type: "warning"
        })
      } : {}, {
        I: common_vendor.o(handlePublish),
        J: common_vendor.p({
          type: "primary"
        })
      }) : {}, {
        K: common_vendor.sr(form, "efa79250-3,efa79250-2", {
          "k": "form"
        }),
        L: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        }),
        M: curType.value === "approve" || curType.value === "history"
      }, curType.value === "approve" || curType.value === "history" ? common_vendor.e({
        N: common_vendor.o(clickImg),
        O: model.value.taskName
      }, model.value.taskName ? {
        P: common_vendor.o(($event) => model.value.taskName = $event),
        Q: common_vendor.p({
          label: "任务节点",
          ["label-width"]: "100px",
          prop: "taskName",
          clearable: true,
          placeholder: "请输入任务节点",
          readonly: true,
          modelValue: model.value.taskName
        })
      } : {}, {
        R: common_vendor.o(handleApproveCarChange),
        S: common_vendor.o(($event) => approveModel.value.approveVehicleId = $event),
        T: common_vendor.p({
          readonly: curType.value === "history",
          type: "radio",
          ["value-key"]: "vehicleId",
          ["label-key"]: "label",
          ["label-width"]: "100px",
          prop: "approveVehicleId",
          label: "派发车辆",
          placeholder: "请选择派发车辆",
          columns: carOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: approveModel.value.approveVehicleId
        }),
        U: common_vendor.o(handleApproveDriverChange),
        V: common_vendor.o(($event) => approveModel.value.approveDriverId = $event),
        W: common_vendor.p({
          readonly: curType.value === "history",
          type: "radio",
          ["value-key"]: "driverId",
          ["label-key"]: "label",
          ["label-width"]: "100px",
          prop: "approveDriverId",
          label: "车辆司机",
          placeholder: "请选择车辆司机",
          columns: driverOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: approveModel.value.approveDriverId
        }),
        X: common_vendor.o(($event) => approveModel.value.approveDriverMobile = $event),
        Y: common_vendor.p({
          label: "联系电话",
          type: "tel",
          ["label-width"]: "100px",
          prop: "approveDriverMobile",
          clearable: true,
          placeholder: "请输入联系电话",
          readonly: curType.value === "history",
          modelValue: approveModel.value.approveDriverMobile
        }),
        Z: curType.value !== "history"
      }, curType.value !== "history" ? {
        aa: common_vendor.o(($event) => approveModel.value.approvalCause = $event),
        ab: common_vendor.p({
          readonly: curType.value === "history",
          label: "审批原因",
          ["label-width"]: "100px",
          prop: "approvalCause",
          clearable: true,
          placeholder: "请输入审批原因",
          maxlength: 200,
          ["auto-height"]: true,
          ["show-word-limit"]: true,
          type: "textarea",
          modelValue: approveModel.value.approvalCause
        })
      } : {}, {
        ac: curType.value === "history"
      }, curType.value === "history" ? {
        ad: common_vendor.o(($event) => model.value.orderStatusName = $event),
        ae: common_vendor.p({
          label: "审核状态",
          readonly: true,
          ["label-width"]: "100px",
          prop: "orderStatusName",
          clearable: true,
          placeholder: "",
          modelValue: model.value.orderStatusName
        })
      } : {}, {
        af: common_vendor.p({
          title: "审批信息",
          border: true,
          ["use-slot"]: true
        }),
        ag: curType.value === "approve"
      }, curType.value === "approve" ? {
        ah: common_vendor.o(($event) => handleApprove("pass")),
        ai: common_vendor.p({
          type: "warning"
        }),
        aj: common_vendor.o(($event) => handleApprove("refuse")),
        ak: common_vendor.p({
          type: "primary"
        })
      } : {}) : {}, {
        al: common_vendor.sr(approveForm, "efa79250-19,efa79250-2", {
          "k": "approveForm"
        }),
        am: common_vendor.p({
          model: approveModel.value,
          rules: approveRules.value,
          errorType: "toast"
        }),
        an: common_vendor.p({
          group: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-efa79250"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/form.js.map
