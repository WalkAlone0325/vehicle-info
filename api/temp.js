//   uni.getLocation({
//     type: 'gcj02', // 'wgs84', 返回可以用于wx.openLocation的经纬度
//     isHighAccuracy: true,
//     success: (res) => {
//       console.log(res, 'res')
//       data.value = [
//         {label: '精确度', value: res.accuracy.toFixed(2), unit: ''},
//         {label: '速度', value: res.speed.toFixed(2), unit: 'm/s'}
//       ]
//       initLocation.value.latitude = res.latitude
//       initLocation.value.longitude = res.longitude

//       markers.value = [
//         {
//           id: 1,
//           latitude: res.latitude,
//           longitude: res.longitude,
//           iconPath: '../../static/current.png',
//           width: 30,
//           height: 30
//         }
//       ]
//     },
//     fail: (err) => {
//       console.log(err, 'err')
//     }
//   })