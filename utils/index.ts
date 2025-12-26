import { Decimal } from 'decimal.js'

export const times = (num1: number, num2: number) => {
  return new Decimal(num1).times(new Decimal(num2))
}

export const getToken = () => uni.getStorageSync('token')

export const parseTime = (time: number, cFormat: string) => {
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  // 时间戳改为日期格式
  let date: Date
  if (typeof time === 'object') {
    date = time
  }
  else {
    date = new Date(parseInt(time))
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a')
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10)
      value = `0${value}`
    return value || 0
  })
  return time_str
}

export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return ""
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

export function checkRole(data: []) {
  let result = []
  const token = uni.getStorageSync('token')
  if (!token) return
  const roles = uni.getStorageSync('roles')
  data.forEach(i => {
    if(i.role) {
      if(roles.includes(i.role)){
        result.push(i)
      }
    } else {
      result.push(i)
    }
  })
  return result
}

export function randomRgbColor() {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

const PI = 3.1415926535897932384626
const a = 6378245.0 //卫星椭球坐标投影到平面地图坐标系的投影因子。
const ee = 0.00669342162296594323 //椭球的偏心率。


//转化经度
function transformlng(lng, lat) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0
  return ret
}

//转化纬度
function transformlat(lng, lat) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0
  return ret
}
//判断时候在国内还是国外
function out_of_china(lon, lat) {
  if (lon < 72.004 || lon > 137.8347) {
    return true
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true
  }
  return false
}
//wgs84 to gcj02   地球坐标系 转 火星坐标系
export function wgs84togcj02(lng, lat) {
  let dlat = transformlat(lng - 105.0, lat - 35.0)
  let dlng = transformlng(lng - 105.0, lat - 35.0)
  let radlat = (lat / 180.0) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  let sqrtmagic = Math.sqrt(magic)
  dlat =
    (dlat * 180.0) /
    (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
  dlng =
    (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
  let mglat = lat + dlat
  let mglng = lng + dlng

  return [mglng, mglat]
}

//gcj02 to wgs84  火星坐标系 转 地球坐标系
export function gcj02towgs84(lng, lat) {
  const originalLngSign = Math.sign(lng)
  const originalLatSign = Math.sign(lat)
  lat = Math.abs(lat)
  lng = Math.abs(lng)
  let dlat = transformlat(lng - 105.0, lat - 35.0)
  let dlng = transformlng(lng - 105.0, lat - 35.0)
  let radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  let sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
  let mglat = lat + dlat
  let mglng = lng + dlng
  let lngs = lng * 2 - mglng
  let lats = lat * 2 - mglat
  let finalLng = originalLngSign * lngs
  let finalLat = originalLatSign * lats

  return [finalLng, finalLat]
}

export function formatDateTime(timestamp) {
  let date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需加1并补零
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function getTodayTimestampRange() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0,  0, 0, 0);

  const end = new Date(now);
  end.setHours(23,  59, 59, 999);

  return [start.getTime(), end.getTime()]
}

/**
* 计算目标日期是多少天前（或几天后）
* @param {string|Date} targetDate - 目标日期（支持字符串如"2025-07-01"或Date对象）
* @returns {string} 友好提示（如"9天前"、"今天"、"1天后"）
*/
export function getDaysAgo(targetDate) {
  // 1. 获取当前日期的日起点（00:00:00）
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // 2. 解析目标日期（处理字符串或Date对象）
  const target = new Date(targetDate)
  if (isNaN(target.getTime())) { // 验证日期有效性
    return "无效的日期格式，请输入如'2025-07-01'的ISO格式"
  }
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate())  // 目标日期的日起点

  // 3. 计算时间差（毫秒）并转换为天数
  const timeDiff = today.getTime() - targetDay.getTime()
  const daysDiff = Math.floor(timeDiff / 86400000) // 86400000 = 24×60×60×1000

  // 4. 返回友好结果
  if (daysDiff > 0) {
    return `${daysDiff}天前`
  } else if (daysDiff === 0) {
    return "今天"
  } else {
    return `${Math.abs(daysDiff)} 天后` // 处理未来日期
  }
}

/**
 * 计算距离
 * @param lat1 纬度1
 * @param lng1 经度1
 * @param lat2 纬度2
 * @param lng2 经度2
 * @returns 距离（单位：米）
 */
function rad(d) {
  return d * Math.PI / 180.0
}


// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function getDistance(lat1, lng1, lat2, lng2) {

  var radLat1 = rad(lat1)
  var radLat2 = rad(lat2)
  var a = radLat1 - radLat2
  var b = rad(lng1) - rad(lng2)
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // EARTH_RADIUS;
  // 输出为公里
  s = Math.round(s * 10000) / 10000

  var distance = s
  var distance_str = ""

  if (parseInt(distance) >= 1) {
    // distance_str = distance.toFixed(1) + "km";
    distance_str = distance.toFixed(2) + "km"
  } else {
    // distance_str = distance * 1000 + "m";
    distance_str = (distance * 1000).toFixed(2) + "m"
  }

  //s=s.toFixed(4);

  // console.info('距离是', s);
  // console.info('距离是', distance_str);
  // return s;

  //小小修改，这里返回对象
  let objData = {
    distance: distance,
    distance_str: distance_str
  }
  return objData.distance_str
}
