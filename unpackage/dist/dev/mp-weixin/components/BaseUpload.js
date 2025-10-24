"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const utils_index = require("../utils/index.js");
const uni_modules_wotDesignUni_components_wdToast_index = require("../uni_modules/wot-design-uni/components/wd-toast/index.js");
require("../uni_modules/wot-design-uni/locale/index.js");
if (!Array) {
  const _easycom_wd_upload2 = common_vendor.resolveComponent("wd-upload");
  _easycom_wd_upload2();
}
const _easycom_wd_upload = () => "../uni_modules/wot-design-uni/components/wd-upload/wd-upload.js";
if (!Math) {
  _easycom_wd_upload();
}
const _sfc_main = {
  __name: "BaseUpload",
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:fileList", "remove"],
  setup(__props, { emit: __emit }) {
    const toast = uni_modules_wotDesignUni_components_wdToast_index.useToast();
    const emit = __emit;
    const removeUpload = (file) => {
      emit("remove", file);
    };
    const customUpload = (file, formData, options) => {
      const uploadTask = common_vendor.index.uploadFile({
        url: utils_request.http.config.baseURL + "system/local/file/upload",
        header: {
          ...options.header,
          Authorization: `Bearer ${utils_index.getToken()}`,
          "Content-Type": "multipart/form-data"
        },
        name: "file",
        fileName: "file",
        fileType: "image",
        formData,
        filePath: file.url,
        success: async (res) => {
          const e = JSON.parse(res.data);
          if (e.code == 200) {
            options.onSuccess(e, file, formData);
            emit("update:fileList", [e.data]);
            toast.show("上传成功");
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
        a: common_vendor.o(removeUpload),
        b: common_vendor.p({
          disabled: __props.disabled,
          ["file-list"]: __props.fileList,
          limit: 1,
          ["upload-method"]: customUpload
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BaseUpload.js.map
