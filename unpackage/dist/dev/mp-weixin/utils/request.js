"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_luchRequest_core_Request = require("../uni_modules/luch-request/core/Request.js");
const utils_index = require("./index.js");
const http = new uni_modules_luchRequest_core_Request.Request({
  baseURL: "http://220.194.140.28:8086/oilenginemonitoringservice/"
});
http.interceptors.request.use(
  (config) => {
    config.header.Authorization = `Bearer ${utils_index.getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let flag = false;
http.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 401 && !flag) {
      flag = true;
      common_vendor.index.showModal({
        title: "提示",
        content: "登录已过期，请重新登录",
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.cancel) {
            common_vendor.index.__f__("log", "at utils/request.js:36", "用户点击取消");
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at utils/request.js:43", err);
        }
      });
    }
    if (data.code !== 200) {
      common_vendor.index.showToast({ title: data.msg, icon: "none" });
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
