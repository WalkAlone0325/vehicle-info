"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  (_easycom_wd_message_box2 + _easycom_wd_toast2 + _easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2)();
}
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_wd_toast + _easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "edit-password",
  setup(__props) {
    const form = common_vendor.ref();
    const model = common_vendor.ref({
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    });
    const rules = {
      oldPassword: [{ required: true, message: "请填写旧密码" }],
      newPassword: [{ required: true, message: "请填写新密码" }],
      newPassword2: [{ required: true, message: "请再次输入新密码" }]
    };
    const handleSubmit = () => {
      form.value.validate().then(async ({
        valid,
        errors
      }) => {
        if (valid) {
          const res = await api_common.updatePwd(model.value);
          if (res.code === 200) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("user");
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/mine/edit-password.vue:37", error, "error");
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => model.value.oldPassword = $event),
        b: common_vendor.p({
          showPassword: true,
          label: "旧密码",
          ["label-width"]: "80px",
          prop: "oldPassword",
          clearable: true,
          placeholder: "请输入旧密码",
          modelValue: model.value.oldPassword
        }),
        c: common_vendor.o(($event) => model.value.newPassword = $event),
        d: common_vendor.p({
          showPassword: true,
          label: "新密码",
          ["label-width"]: "80px",
          prop: "newPassword",
          clearable: true,
          placeholder: "请输入新密码",
          modelValue: model.value.newPassword
        }),
        e: common_vendor.o(($event) => model.value.newPassword2 = $event),
        f: common_vendor.p({
          showPassword: true,
          label: "确认密码",
          ["label-width"]: "80px",
          prop: "newPassword2",
          clearable: true,
          placeholder: "请再次输入新密码",
          modelValue: model.value.newPassword2
        }),
        g: common_vendor.p({
          border: true
        }),
        h: common_vendor.o(handleSubmit),
        i: common_vendor.p({
          type: "primary",
          block: true
        }),
        j: common_vendor.sr(form, "f167a4c3-2", {
          "k": "form"
        }),
        k: common_vendor.p({
          model: model.value,
          rules,
          errorType: "toast"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f167a4c3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/edit-password.js.map
