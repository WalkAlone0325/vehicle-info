"use strict";
const common_vendor = require("../common/vendor.js");
const getToken = () => common_vendor.index.getStorageSync("token");
function formatDate(cellValue) {
  if (cellValue == null || cellValue == "")
    return "";
  var date = new Date(cellValue);
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
function checkRole(roleKey) {
  const token = common_vendor.index.getStorageSync("token");
  if (!token)
    return;
  const roles = common_vendor.index.getStorageSync("user").roles;
  const roleKeys = roles.map((i) => i.roleKey);
  return !!roleKeys.includes(roleKey);
}
function randomRgbColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
const PI = 3.141592653589793;
const a = 6378245;
const ee = 0.006693421622965943;
function transformlng(lng, lat) {
  let ret = 300 + lng + 2 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2 / 3;
  ret += (20 * Math.sin(lng * PI) + 40 * Math.sin(lng / 3 * PI)) * 2 / 3;
  ret += (150 * Math.sin(lng / 12 * PI) + 300 * Math.sin(lng / 30 * PI)) * 2 / 3;
  return ret;
}
function transformlat(lng, lat) {
  let ret = -100 + 2 * lng + 3 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20 * Math.sin(6 * lng * PI) + 20 * Math.sin(2 * lng * PI)) * 2 / 3;
  ret += (20 * Math.sin(lat * PI) + 40 * Math.sin(lat / 3 * PI)) * 2 / 3;
  ret += (160 * Math.sin(lat / 12 * PI) + 320 * Math.sin(lat * PI / 30)) * 2 / 3;
  return ret;
}
function wgs84togcj02(lng, lat) {
  let dlat = transformlat(lng - 105, lat - 35);
  let dlng = transformlng(lng - 105, lat - 35);
  let radlat = lat / 180 * PI;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  let sqrtmagic = Math.sqrt(magic);
  dlat = dlat * 180 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
  dlng = dlng * 180 / (a / sqrtmagic * Math.cos(radlat) * PI);
  let mglat = lat + dlat;
  let mglng = lng + dlng;
  return [mglng, mglat];
}
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function getDaysAgo(targetDate) {
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(targetDate);
  if (isNaN(target.getTime())) {
    return "无效的日期格式，请输入如'2025-07-01'的ISO格式";
  }
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const timeDiff = today.getTime() - targetDay.getTime();
  const daysDiff = Math.floor(timeDiff / 864e5);
  if (daysDiff > 0) {
    return `${daysDiff}天前`;
  } else if (daysDiff === 0) {
    return "今天";
  } else {
    return `${Math.abs(daysDiff)} 天后`;
  }
}
function rad(d) {
  return d * Math.PI / 180;
}
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a2 = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a2 / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 1e4) / 1e4;
  var distance = s;
  var distance_str = "";
  if (parseInt(distance) >= 1) {
    distance_str = distance.toFixed(2) + "km";
  } else {
    distance_str = (distance * 1e3).toFixed(2) + "m";
  }
  let objData = {
    distance,
    distance_str
  };
  return objData.distance_str;
}
exports.checkRole = checkRole;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.getDaysAgo = getDaysAgo;
exports.getDistance = getDistance;
exports.getToken = getToken;
exports.randomRgbColor = randomRgbColor;
exports.wgs84togcj02 = wgs84togcj02;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/index.js.map
