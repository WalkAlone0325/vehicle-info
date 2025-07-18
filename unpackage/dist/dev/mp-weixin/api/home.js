"use strict";
const utils_request = require("../utils/request.js");
const getDriverListApi = (params) => utils_request.http.get(`/car/driverInfo/list/page`, { params });
const getCarListApi = (params) => utils_request.http.get(`/car/vehicleInfo/list/page`, { params });
const getOilTankApi = (params) => utils_request.http.get(`/pc/main/countData`, { params });
const getCarCountApi = (params) => utils_request.http.get("/op/statistics/car/vehicle/cityCount/line ", { params });
const getCarTableApi = (params) => utils_request.http.get("/op/statistics/car/vehicle/cityCount/list ", { params });
exports.getCarCountApi = getCarCountApi;
exports.getCarListApi = getCarListApi;
exports.getCarTableApi = getCarTableApi;
exports.getDriverListApi = getDriverListApi;
exports.getOilTankApi = getOilTankApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/home.js.map
