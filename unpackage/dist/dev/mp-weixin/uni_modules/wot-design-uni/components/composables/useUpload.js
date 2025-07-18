"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const UPLOAD_STATUS = {
  PENDING: "pending",
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail"
};
function useUpload() {
  let currentTask = null;
  const abort = (task) => {
    if (task) {
      task.abort();
    } else if (currentTask) {
      currentTask.abort();
      currentTask = null;
    }
  };
  const defaultUpload = (file, formData, options) => {
    if (options.abortPrevious) {
      abort();
    }
    const uploadTask = common_vendor.index.uploadFile({
      url: options.action,
      header: options.header,
      name: options.name,
      fileName: options.name,
      fileType: options.fileType,
      formData,
      filePath: file.url,
      success(res) {
        if (res.statusCode === options.statusCode) {
          options.onSuccess(res, file, formData);
        } else {
          options.onError({ ...res, errMsg: res.errMsg || "" }, file, formData);
        }
      },
      fail(err) {
        options.onError(err, file, formData);
      }
    });
    currentTask = uploadTask;
    uploadTask.onProgressUpdate((res) => {
      options.onProgress(res, file);
    });
    return uploadTask;
  };
  const startUpload = (file, options) => {
    const {
      uploadMethod,
      formData = {},
      action,
      name = "file",
      header = {},
      fileType = "image",
      statusCode = 200,
      statusKey = "status",
      abortPrevious = false
    } = options;
    file[statusKey] = UPLOAD_STATUS.LOADING;
    const uploadOptions = {
      action,
      header,
      name,
      fileName: name,
      fileType,
      statusCode,
      abortPrevious,
      onSuccess: (res, file2, formData2) => {
        var _a;
        file2[statusKey] = UPLOAD_STATUS.SUCCESS;
        currentTask = null;
        (_a = options.onSuccess) == null ? void 0 : _a.call(options, res, file2, formData2);
      },
      onError: (error, file2, formData2) => {
        var _a;
        file2[statusKey] = UPLOAD_STATUS.FAIL;
        file2.error = error.errMsg;
        currentTask = null;
        (_a = options.onError) == null ? void 0 : _a.call(options, error, file2, formData2);
      },
      onProgress: (res, file2) => {
        var _a;
        file2.percent = res.progress;
        (_a = options.onProgress) == null ? void 0 : _a.call(options, res, file2);
      }
    };
    if (uni_modules_wotDesignUni_components_common_util.isFunction(uploadMethod)) {
      return uploadMethod(file, formData, uploadOptions);
    } else {
      return defaultUpload(file, formData, uploadOptions);
    }
  };
  function formatImage(res) {
    if (uni_modules_wotDesignUni_components_common_util.isArray(res.tempFiles)) {
      return res.tempFiles.map((item) => ({
        path: item.path || "",
        name: item.name || "",
        size: item.size,
        type: "image",
        thumb: item.path || ""
      }));
    }
    return [
      {
        path: res.tempFiles.path || "",
        name: res.tempFiles.name || "",
        size: res.tempFiles.size,
        type: "image",
        thumb: res.tempFiles.path || ""
      }
    ];
  }
  function formatVideo(res) {
    return [
      {
        path: res.tempFilePath || res.filePath || "",
        name: res.name || "",
        size: res.size,
        type: "video",
        thumb: res.thumbTempFilePath || "",
        duration: res.duration
      }
    ];
  }
  function formatMedia(res) {
    return res.tempFiles.map((item) => ({
      type: item.fileType,
      path: item.tempFilePath,
      thumb: item.fileType === "video" ? item.thumbTempFilePath : item.tempFilePath,
      size: item.size,
      duration: item.duration
    }));
  }
  function chooseFile({
    multiple,
    sizeType,
    sourceType,
    maxCount,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  }) {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case "image":
          common_vendor.index.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1,
            // 默认9,最大9
            sizeType,
            sourceType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
          break;
        case "video":
          common_vendor.index.chooseVideo({
            sourceType,
            compressed,
            maxDuration,
            camera,
            success: (res) => resolve(formatVideo(res)),
            fail: reject
          });
          break;
        case "media":
          common_vendor.index.chooseMedia({
            count: multiple ? Math.min(maxCount || 9, 9) : 1,
            // 默认9,最大9
            sourceType,
            sizeType,
            camera,
            maxDuration,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          });
          break;
        case "file":
          common_vendor.index.chooseMessageFile({
            count: multiple ? Math.min(maxCount || 100, 100) : 1,
            // 默认100,最大100
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          });
          break;
        case "all":
          common_vendor.index.chooseMessageFile({
            count: multiple ? Math.min(maxCount || 100, 100) : 1,
            // 默认100,最大100
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          });
          break;
        default:
          common_vendor.index.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1,
            // 默认9,最大9
            sizeType,
            sourceType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          });
          break;
      }
    });
  }
  return {
    startUpload,
    abort,
    UPLOAD_STATUS,
    chooseFile
  };
}
exports.useUpload = useUpload;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/composables/useUpload.js.map
