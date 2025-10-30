"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_home = require("../../../api/home.js");
const api_order = require("../../../api/order.js");
const api_common = require("../../../api/common.js");
require("../../../utils/request.js");
if (!Array) {
  const _easycom_wd_select_picker2 = common_vendor.resolveComponent("wd-select-picker");
  const _easycom_BaseUpload2 = common_vendor.resolveComponent("BaseUpload");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_datetime_picker2 = common_vendor.resolveComponent("wd-datetime-picker");
  const _easycom_wd_picker2 = common_vendor.resolveComponent("wd-picker");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  const _easycom_BaseForm2 = common_vendor.resolveComponent("BaseForm");
  (_easycom_wd_select_picker2 + _easycom_BaseUpload2 + _easycom_wd_cell2 + _easycom_wd_input2 + _easycom_wd_datetime_picker2 + _easycom_wd_picker2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2 + _easycom_BaseForm2)();
}
const _easycom_wd_select_picker = () => "../../../uni_modules/wot-design-uni/components/wd-select-picker/wd-select-picker.js";
const _easycom_BaseUpload = () => "../../../components/BaseUpload.js";
const _easycom_wd_cell = () => "../../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_input = () => "../../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_datetime_picker = () => "../../../uni_modules/wot-design-uni/components/wd-datetime-picker/wd-datetime-picker.js";
const _easycom_wd_picker = () => "../../../uni_modules/wot-design-uni/components/wd-picker/wd-picker.js";
const _easycom_wd_cell_group = () => "../../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
const _easycom_BaseForm = () => "../../../components/BaseForm.js";
if (!Math) {
  (_easycom_wd_select_picker + _easycom_BaseUpload + _easycom_wd_cell + _easycom_wd_input + _easycom_wd_datetime_picker + _easycom_wd_picker + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form + _easycom_BaseForm)();
}
const _sfc_main = {
  __name: "form",
  setup(__props) {
    const user = common_vendor.index.getStorageSync("user");
    const options = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const form = common_vendor.ref(null);
    const model = common_vendor.ref({
      collectDriverId: "",
      collectDriverName: "",
      collectVehicleId: "",
      returnedDriverId: "",
      collectPlateNumber: "",
      returnedDriverName: "",
      workOrdeStatusCode: "waiting_collect",
      useCarApplicationOrderId: "",
      applicantUserId: user.userId,
      applicantUserName: user.userName,
      collectMileage: "",
      returnedMileage: "",
      returnedTime: "",
      collectMileagePictureId: "",
      collectPlateNumberPictureId: "",
      remark: "",
      files1: [],
      files2: [],
      files3: []
    });
    const rules = common_vendor.ref({
      useCarApplicationOrderId: [{ required: true, message: "请选择用车申请工单" }]
    });
    const getDetail = async (id) => {
      const res = await api_order.getOrderDetail(id);
      model.value = {
        ...res.data,
        files1: res.data.collectPlateNumberPictureId ? [{ ossId: res.data.collectPlateNumberPictureId, url: res.data.collectPlateNumberPictureUrl }] : [],
        files2: res.data.collectMileagePictureId ? [{ ossId: res.data.collectMileagePictureId, url: res.data.collectMileagePictureUrl }] : [],
        files3: res.data.returnedMileagePictureId ? [{ ossId: res.data.returnedMileagePictureId, url: res.data.returnedMileagePictureUrl }] : []
      };
      handleCode({ value: model.value.useCarApplicationOrderId });
    };
    const list = common_vendor.ref([]);
    const getList = async () => {
      const res = await api_order.getEndOrderList({ pageNum: 1, pageSize: 9999, order: "asc" });
      list.value = res.rows.map((i) => ({ ...i, str: `${i.expectedPlateNumber} ${i.expectedDriverName} / ${i.approvePlateNumber || ""} ${i.approveDriverName || ""}` }));
    };
    const handleCode = ({ value }) => {
      const find = list.value.find((item) => item.useCarApplicationOrderId == value);
      common_vendor.index.__f__("log", "at pages/order/cars/form.vue:54", "🚀:>> ", list.value, find);
      model.value.collectDriverId = find.expectedDriverId;
      model.value.collectDriverName = find.expectedDriverName;
      model.value.collectVehicleId = find.expectedVehicleId;
      model.value.collectPlateNumber = find.expectedPlateNumber;
      model.value.returnedDriverId = find.approveDriverId;
      model.value.returnedDriverName = find.approveDriverName;
      model.value.applicantUserId = find.applicantUserId;
      model.value.applicantUserName = find.applicantUserName;
    };
    const carOptions = common_vendor.ref([]);
    const getCar = async () => {
      const res = await api_home.getCarListApi({ vehicleStatusCode: "NORMAL", vehicleTypeCode: model.value.vehicleTypeCode });
      carOptions.value = res.rows;
    };
    const driverOptions = common_vendor.ref([]);
    const getDriver = async () => {
      const res = await api_home.getDriverListApi();
      driverOptions.value = res.rows;
    };
    const userOptions = common_vendor.ref([]);
    const getUser = async () => {
      const res = await api_order.getUserListApi();
      userOptions.value = res.rows;
    };
    const getDict = async (code) => {
      const res = await api_common.getDictApi(code);
      options.value = res.data;
    };
    const handleSubmit = (type2) => {
      form.value.validate().then(async ({ valid, errors }) => {
        if (valid) {
          loading.value = true;
          let res;
          if (model.value.useCarWorkOrderId) {
            if (type2 === "collect") {
              model.value.workOrdeStatusCode = "collect";
            } else if (type2 === "returned") {
              model.value.workOrdeStatusCode = "returned";
            }
            res = await api_order.putOrder({
              useCarWorkOrderId: model.value.useCarWorkOrderId,
              useCarApplicationOrderId: model.value.useCarApplicationOrderId,
              collectVehicleId: model.value.collectVehicleId,
              collectPlateNumber: model.value.collectPlateNumber,
              collectPlateNumberPictureId: model.value.collectPlateNumberPictureId,
              collectDriverId: model.value.collectDriverId,
              collectDriverName: model.value.collectDriverName,
              collectMileage: model.value.collectMileage,
              collectMileagePictureId: model.value.collectMileagePictureId,
              returnedDriverId: model.value.returnedDriverId,
              returnedDriverName: model.value.returnedDriverName,
              returnedMileage: model.value.returnedMileage,
              returnedMileagePictureId: model.value.returnedMileagePictureId,
              returnedTime: model.value.returnedTime,
              workOrdeStatusCode: model.value.workOrdeStatusCode,
              applicantUserId: model.value.applicantUserId,
              applicantUserName: model.value.applicantUserName
            });
          } else {
            res = await api_order.postOrder(model.value);
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
        common_vendor.index.__f__("log", "at pages/order/cars/form.vue:147", error, "error");
      });
    };
    const changeUpload = (fileList, key) => {
      model.value[key] = fileList[0].ossId;
    };
    const type = common_vendor.ref("");
    common_vendor.onLoad(async (param) => {
      await getList();
      type.value = param.type;
      if (param.id) {
        getDetail(param.id);
      }
      getDict("work_orde_status");
      getCar();
      getDriver();
      getUser();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleCode),
        b: common_vendor.o(($event) => model.value.useCarApplicationOrderId = $event),
        c: common_vendor.p({
          clearable: true,
          type: "radio",
          ["value-key"]: "useCarApplicationOrderId",
          ["label-key"]: "str",
          ["label-width"]: "100px",
          prop: "useCarApplicationOrderId",
          label: "申请工单编号",
          placeholder: "请选择用车申请工单编号",
          columns: list.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.useCarApplicationOrderId
        }),
        d: common_vendor.o(($event) => model.value.collectVehicleId = $event),
        e: common_vendor.p({
          clearable: true,
          type: "radio",
          ["value-key"]: "vehicleId",
          ["label-key"]: "plateNumber",
          ["label-width"]: "100px",
          prop: "collectVehicleId",
          label: "领取车辆",
          placeholder: "请选择领取车辆",
          columns: carOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.collectVehicleId
        }),
        f: common_vendor.o((...args) => changeUpload(...args, "collectPlateNumberPictureId")),
        g: common_vendor.p({
          ["file-list"]: model.value.files1
        }),
        h: common_vendor.p({
          title: "领取车辆照片",
          ["title-width"]: "100px",
          prop: "fileList"
        }),
        i: common_vendor.o(($event) => model.value.collectDriverId = $event),
        j: common_vendor.p({
          clearable: true,
          type: "radio",
          ["value-key"]: "driverId",
          ["label-key"]: "driverName",
          ["label-width"]: "100px",
          prop: "collectDriverId",
          label: "领车司机",
          placeholder: "请选择领车司机",
          columns: driverOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.collectDriverId
        }),
        k: common_vendor.o(($event) => model.value.collectMileage = $event),
        l: common_vendor.p({
          clearable: true,
          type: "number",
          label: "实际起始里程",
          ["label-width"]: "100px",
          prop: "collectMileage",
          placeholder: "请输入实际起始里程",
          modelValue: model.value.collectMileage
        }),
        m: common_vendor.o((...args) => changeUpload(...args, "collectMileagePictureId")),
        n: common_vendor.p({
          ["file-list"]: model.value.files2
        }),
        o: common_vendor.p({
          title: "实际起始里程照片",
          ["title-width"]: "100px",
          prop: "fileList"
        }),
        p: common_vendor.o(($event) => model.value.returnedDriverId = $event),
        q: common_vendor.p({
          clearable: true,
          type: "radio",
          ["value-key"]: "driverId",
          ["label-key"]: "driverName",
          ["label-width"]: "100px",
          prop: "returnedDriverId",
          label: "还车司机",
          placeholder: "请选择还车司机",
          columns: driverOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.returnedDriverId
        }),
        r: common_vendor.o(($event) => model.value.returnedMileage = $event),
        s: common_vendor.p({
          clearable: true,
          type: "number",
          label: "实际结束里程",
          ["label-width"]: "100px",
          prop: "returnedMileage",
          placeholder: "请输入实际结束里程",
          modelValue: model.value.returnedMileage
        }),
        t: common_vendor.o(($event) => model.value.returnedTime = $event),
        v: common_vendor.p({
          clearable: true,
          label: "还车时间",
          ["label-width"]: "100px",
          placeholder: "请选择还车时间",
          prop: "returnedTime",
          modelValue: model.value.returnedTime
        }),
        w: common_vendor.o((...args) => changeUpload(...args, "returnedMileagePictureId")),
        x: common_vendor.p({
          ["file-list"]: model.value.files3
        }),
        y: common_vendor.p({
          title: "实际结束里程照片",
          ["title-width"]: "100px",
          prop: "fileList"
        }),
        z: common_vendor.o(($event) => model.value.workOrdeStatusCode = $event),
        A: common_vendor.p({
          clearable: true,
          label: "工单状态",
          placeholder: "请选择工单状态",
          ["value-key"]: "dictValue",
          ["label-key"]: "dictLabel",
          ["label-width"]: "100px",
          prop: "workOrdeStatusCode",
          columns: options.value,
          modelValue: model.value.workOrdeStatusCode
        }),
        B: common_vendor.o(($event) => model.value.applicantUserId = $event),
        C: common_vendor.p({
          clearable: true,
          type: "radio",
          ["value-key"]: "userId",
          ["label-key"]: "userName",
          ["label-width"]: "100px",
          prop: "applicantUserId",
          label: "申请人",
          placeholder: "请选择申请人",
          columns: userOptions.value,
          filterable: true,
          ["show-confirm"]: false,
          modelValue: model.value.applicantUserId
        }),
        D: common_vendor.o(($event) => model.value.remark = $event),
        E: common_vendor.p({
          label: "备注",
          ["label-width"]: "100px",
          prop: "remark",
          clearable: true,
          placeholder: "请输入备注",
          modelValue: model.value.remark
        }),
        F: common_vendor.p({
          border: true
        }),
        G: type.value !== "returned"
      }, type.value !== "returned" ? {
        H: common_vendor.o(handleSubmit),
        I: common_vendor.p({
          type: "primary",
          loading: loading.value
        })
      } : {}, {
        J: common_vendor.sr(form, "1260d45c-1,1260d45c-0", {
          "k": "form"
        }),
        K: common_vendor.p({
          model: model.value,
          rules: rules.value,
          errorType: "toast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1260d45c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/cars/form.js.map
