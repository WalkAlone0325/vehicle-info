"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_jsencrypt = require("../../utils/jsencrypt.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_navbar2 = common_vendor.resolveComponent("wd-navbar");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  (_easycom_wd_navbar2 + _easycom_wd_button2 + _easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_form2)();
}
const _easycom_wd_navbar = () => "../../uni_modules/wot-design-uni/components/wd-navbar/wd-navbar.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
if (!Math) {
  (_easycom_wd_navbar + _easycom_wd_button + _easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_form)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const model = common_vendor.reactive({
      username: "",
      password: "",
      xcxCode: ""
    });
    const form = common_vendor.ref();
    const loading = common_vendor.ref(false);
    const oneLoading = common_vendor.ref(false);
    const oneLogin = common_vendor.ref(true);
    function handleSubmit() {
      form.value.validate().then(async ({
        valid,
        errors
      }) => {
        if (valid) {
          loading.value = true;
          model.xcxCode = await getWxCode();
          const data = {
            username: model.username,
            password: utils_jsencrypt.encrypt(model.password),
            xcxCode: model.xcxCode
          };
          common_vendor.index.__f__("log", "at pages/login/login.vue:30", "🚀:>> data: ", data);
          const res = await api_common.loginApi(data);
          if (res.code === 200) {
            common_vendor.index.setStorageSync("token", res.data.token);
            const info = await api_common.getInfoApi();
            common_vendor.index.setStorageSync("user", info.data.user);
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }
          loading.value = false;
        }
      }).catch((error) => {
        common_vendor.index.__f__("log", "at pages/login/login.vue:44", error, "error");
        loading.value = false;
      });
    }
    const getWxCode = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          onlyAuthorize: true,
          success: (res) => {
            if (res.code) {
              common_vendor.index.__f__("log", "at pages/login/login.vue:56", "🚀:>> code: ", res.code);
              resolve(res.code);
            } else {
              common_vendor.index.__f__("log", "at pages/login/login.vue:59", "登录失败！" + res.errMsg);
              reject(res.errMsg);
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("log", "at pages/login/login.vue:64", err);
            reject(err);
          }
        });
      });
    };
    const handleOneLogin = async () => {
      oneLoading.value = true;
      model.xcxCode = await getWxCode();
      const resD = await api_common.oneLoginApi(model.xcxCode);
      if (resD.code === 200) {
        common_vendor.index.setStorageSync("token", resD.data.token);
        const info = await api_common.getInfoApi();
        common_vendor.index.setStorageSync("user", info.data.user);
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
        oneLoading.value = false;
      } else {
        oneLogin.value = false;
        common_vendor.index.showToast({
          title: "微信授权失败",
          icon: "none"
        });
        oneLoading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.p({
          bordered: false,
          fixed: true,
          placeholder: true,
          safeAreaInsetTop: true
        }),
        c: oneLogin.value
      }, oneLogin.value ? {
        d: common_vendor.o(handleOneLogin),
        e: common_vendor.p({
          loading: oneLoading.value,
          ["custom-class"]: "one-login-btn"
        })
      } : {}, {
        f: !oneLogin.value
      }, !oneLogin.value ? {
        g: common_assets._imports_1$2,
        h: common_vendor.o(($event) => model.username = $event),
        i: common_vendor.p({
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
        j: common_vendor.o(($event) => model.password = $event),
        k: common_vendor.p({
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
        l: common_vendor.p({
          border: true
        }),
        m: common_vendor.o(handleSubmit),
        n: common_vendor.p({
          type: "primary",
          loading: loading.value,
          block: true
        }),
        o: common_vendor.sr(form, "e4e4508d-2", {
          "k": "form"
        }),
        p: common_vendor.p({
          model,
          errorType: "toast"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
