"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_jsencrypt = require("../../utils/jsencrypt.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  (_easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_button2 + _easycom_wd_form2)();
}
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
if (!Math) {
  (_easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_button + _easycom_wd_form)();
}
const _sfc_main = {
  __name: "form",
  setup(__props) {
    const model = common_vendor.reactive({
      username: "",
      password: ""
    });
    const form = common_vendor.ref();
    function handleSubmit() {
      form.value.validate().then(async ({
        valid,
        errors
      }) => {
        if (valid) {
          const res = await api_common.loginApi(
            {
              username: model.username,
              password: utils_jsencrypt.encrypt(model.password)
            }
            // { "username": "admin", "password": "PFZ37mn1+EB/3KV6P1zZt1usC0Ngckv2PZVkGEHf5YN+qSP+n4cXl00iCK1Q/zC1YAKAu4PFwTq0U4DVaq7FnCkHgdNJPFT1vOtOtcDWJgIKTcX1ga7bXSpRteJzdTMu/4EzFPfHrKyUw4KbqqwB/SospZsZquz7MQq9WuLTOO8=" }
            // {"username":"wangyuan","password":"XaBloRSRNcxUCfG+Ffd9ryJmXTrXhSMNZxJ2GAQeyGCR6m1obpxZgZvdMNb/CpS4Oe2WVabJ0vOiCCUrykuawMRz7jWbtxoyhWQANshcNQCnhRnYgAGrbfx2n4iBYUC4rakVv/LVib+i12T4cp7EESQv0MWmA634qsIY8FNqH5A="}
            // {"username":"tyjl01","password":"S65lxxcvyk7QrOvrdccrEKLiWUKI+pRJGLu1wvOQWcZyL5+BulcXothDLxKQwKHHLUp9WN6bKFRgFkgCQPXN1ANOTS+tlQ5xqKExzWaDugwQplbWzAvlEqOxGe71bjtJ9NYzIOWJ2jkgUzySbP+dzAkkfO8aYSinGWqfmH1+0Io="}
            // {"username":"tydz01","password":"gLY100N2xa3mQno4LispsyEzFYtGW2DPHxQWNZpznsIVJ/oKyqXKzydxzzPvPR5Tln0fLu5yZTTSNhsxLuW5iBne/Va/vCb5aR0Wi2593plssbPP3KtzaJXvcdIOsAkZsIh9d+HZU0KQT/mKl3f3TMMVWPxX+ProCZOAGLXr3tA="}
          );
          if (res.code === 200) {
            common_vendor.index.setStorageSync("token", res.data.token);
            const info = await api_common.getInfoApi();
            common_vendor.index.setStorageSync("user", info.data.user);
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/login/form.vue:42", error, "error");
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({}, {
        b: common_vendor.o(($event) => model.username = $event),
        c: common_vendor.p({
          label: "账号",
          ["label-width"]: "70px",
          prop: "username",
          clearable: true,
          placeholder: "请输入账号",
          rules: [{
            required: true,
            message: "请填写账号"
          }],
          modelValue: model.username
        }),
        d: common_vendor.o(($event) => model.password = $event),
        e: common_vendor.p({
          label: "密码",
          ["label-width"]: "70px",
          prop: "password",
          ["show-password"]: true,
          placeholder: "请输入密码",
          rules: [{
            required: true,
            message: "请填写密码"
          }],
          modelValue: model.password
        }),
        f: common_vendor.p({
          border: true
        }),
        g: common_vendor.o(handleSubmit),
        h: common_vendor.p({
          type: "primary",
          block: true
        }),
        i: common_vendor.sr(form, "6bec099d-0", {
          "k": "form"
        }),
        j: common_vendor.p({
          model,
          errorType: "toast"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bec099d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/form.js.map
