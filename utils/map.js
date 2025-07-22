/**
 * 检查点击坐标是否在折线上
 * @param lat 纬度
 * @param lng 经度
 * @param polyline 折线
 */
export async function checkPointOnPolyline(lat, lng, polyline, mapRef, centerLat) {
  let res = {
    isOnPolyline: false,
    index: -1,
  }
  for (let i = 0; i < polyline.length; i++) {
    const points = polyline[i].points
    const tolerance = 10
    const mapCtx = uni.createMapContext('map', mapRef)

    // 折线的起始点
    const p1 = points[0] // 线段起点
    const p2 = points[points.length - 1] // 线段终点

    // 计算点击点到线段 p1-p2 的最短距离（米）
    const distance = calculateDistanceToSegment({ latitude: lat, longitude: lng }, p1, p2)

    // 将米转换为像素（需结合地图缩放级别）
    const distanceInPx = await metersToPixels(distance, mapCtx, centerLat)

    console.log('🚀:>> ', distanceInPx)

    // 如果距离小于容差，判定为点击折线
    if (distanceInPx <= tolerance) {
      res = {
        isOnPolyline: true,
        index: i
      }
    }
  }
  return res
}

// Haversine 公式：计算地球表面两点距离（米）
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // 地球半径（米）
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // 距离（米）
}

// 计算点到线段的最短距离（米）：使用 Haversine 公式计算地球表面两点距离
function calculateDistanceToSegment(clickPoint, p1, p2) {
  // 点到线段的距离公式（简化版，假设地球为平面，适用于短距离计算）
  // 更精确需用球面几何公式，此处简化为平面坐标系计算
  const A = clickPoint.latitude - p1.latitude
  const B = clickPoint.longitude - p1.longitude
  const C = p2.latitude - p1.latitude
  const D = p2.longitude - p1.longitude

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1
  if (lenSq !== 0) param = dot / lenSq

  let xx, yy
  if (param < 0) {
    xx = p1.latitude
    yy = p1.longitude
  } else if (param > 1) {
    xx = p2.latitude
    yy = p2.longitude
  } else {
    xx = p1.latitude + param * C
    yy = p1.longitude + param * D
  }

  // 计算点击点到投影点的距离（米）
  return haversine(clickPoint.latitude, clickPoint.longitude, xx, yy)
}

// 将米转换为像素（需地图上下文获取缩放级别）
function metersToPixels(meters, mapCtx, centerLat) {
  // 获取当前地图缩放级别（需异步调用）
  return new Promise((resolve) => {
    mapCtx.getScale({
      success: (res) => {
        const scale = res.scale   // 地图缩放级别（如 16 级）
        console.log('🚀:>> ', res)
        // 1 像素 ≈ (156543.03392 * cos(lat) ) / (2^scale) 米（墨卡托投影公式）
        const lat = centerLat  // 中心点纬度（简化计算）
        const metersPerPixel = (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, scale)
        const pixels = meters / metersPerPixel
        resolve(pixels)
      },
      fail: (err) => {
        console.log(err, 'err')
      }
    })
  })
}
