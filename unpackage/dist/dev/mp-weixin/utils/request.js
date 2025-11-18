"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_luchRequest_core_Request = require("../uni_modules/luch-request/core/Request.js");
const utils_index = require("./index.js");
const http = new uni_modules_luchRequest_core_Request.Request({
  // baseURL: 'http://220.194.140.28:8086/oilenginemonitoringservice/',
  baseURL: "https://gps.sxtdwb.com:4043/oilenginemonitoringservice/"
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
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("user");
      common_vendor.index.removeStorageSync("roles");
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    }
    if (data.code !== 200 && data.code != 401) {
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
