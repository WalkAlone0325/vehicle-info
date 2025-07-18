"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../../uni_modules/wot-design-uni/locale/index.js");
const utils_index = require("../../utils/index.js");
const utils_request = require("../../utils/request.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_message_box2 = common_vendor.resolveComponent("wd-message-box");
  const _easycom_wd_toast2 = common_vendor.resolveComponent("wd-toast");
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_input2 = common_vendor.resolveComponent("wd-input");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_wd_form2 = common_vendor.resolveComponent("wd-form");
  (_easycom_wd_message_box2 + _easycom_wd_toast2 + _easycom_wd_upload2 + _easycom_wd_cell2 + _easycom_wd_input2 + _easycom_wd_cell_group2 + _easycom_wd_form2)();
}
const _easycom_wd_message_box = () => "../../uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.js";
const _easycom_wd_toast = () => "../../uni_modules/wot-design-uni/components/wd-toast/wd-toast.js";
const _easycom_wd_upload = () => "../../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_input = () => "../../uni_modules/wot-design-uni/components/wd-input/wd-input.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_wd_form = () => "../../uni_modules/wot-design-uni/components/wd-form/wd-form.js";
if (!Math) {
  (_easycom_wd_message_box + _easycom_wd_toast + _easycom_wd_upload + _easycom_wd_cell + _easycom_wd_input + _easycom_wd_cell_group + _easycom_wd_form)();
}
const _sfc_main = {
  __name: "info",
  setup(__props) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const model = common_vendor.ref({
      userName: "",
      avatar: "",
      fileList: []
    });
    common_vendor.onLoad(() => {
      const info = common_vendor.index.getStorageSync("user");
      model.value.userName = info.userName;
      model.value.fileList = [{ url: info.avatar }];
    });
    const customUpload = (file, formData, options) => {
      const uploadTask = common_vendor.index.uploadFile({
        url: utils_request.http.config.baseURL + "system/user/profile/avatar",
        // url: 'https://sxnmggz.com:8448/prod-api/system/oss/upload',
        header: {
          ...options.header,
          Authorization: `Bearer ${utils_index.getToken()}`,
          "Content-Type": "multipart/form-data"
        },
        name: "avatarfile",
        fileName: "avatarfile",
        fileType: "image",
        formData,
        filePath: file.url,
        success: async (res) => {
          const e = JSON.parse(res.data);
          if (e.code == 200) {
            options.onSuccess(e, file, formData);
            model.value.fileList = [{ url: e.data.imgUrl }];
            toast.show("上传成功");
            const info = await api_common.getInfoApi();
            common_vendor.index.setStorageSync("user", info.data.user);
          } else {
            options.onError({ ...e, errMsg: e.errMsg || "" }, file, formData);
            toast.show("上传失败");
          }
        },
        fail(err) {
          options.onError(err, file, formData);
        }
      });
      uploadTask.onProgressUpdate((res) => {
        options.onProgress(res, file);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => model.value.fileList = $event),
        b: common_vendor.p({
          limit: 1,
          ["upload-method"]: customUpload,
          ["file-list"]: model.value.fileList
        }),
        c: common_vendor.p({
          title: "头像",
          ["title-width"]: "100px",
          prop: "fileList",
          rules: [{
            required: true,
            message: "请上传头像"
          }]
        }),
        d: common_vendor.o(($event) => model.value.userName = $event),
        e: common_vendor.p({
          label: "用户名",
          ["label-width"]: "100px",
          prop: "userName",
          readonly: true,
          clearable: true,
          placeholder: "请输入用户名",
          rules: [{
            required: true,
            message: "请填写用户名"
          }],
          modelValue: model.value.userName
        }),
        f: common_vendor.p({
          border: true
        }),
        g: common_vendor.sr("form", "d8e5dcab-2"),
        h: common_vendor.p({
          model: model.value,
          errorType: "toast"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d8e5dcab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/info.js.map
