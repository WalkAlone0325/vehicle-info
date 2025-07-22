<script setup>
import { ref, toRaw } from 'vue'
import { onShow, onUnload } from '@dcloudio/uni-app'
import { randomRgbColor, getDistance } from '@/utils'
import { checkPointOnPolyline } from '@/utils/map'

const mapRef = ref(null)
const map = ref(null)
const scale = ref(20)
const markers = ref([])
const polyline = ref([])
const data = ref({})
// 初始位置
const initLocation = ref({
  latitude: '',
  longitude: ''
})
const currentData = ref({})
const minAccuracy = ref(0)

const markOrPolylineId = ref(1) // id

// map 点击
const handleClickMap = async (e, type) => {
  console.log(e, type, 'e,type')
  switch (type) {
    // 添加标点、线
    case 'addMark':
      uni.showModal({
        title: '提示',
        content: '是否确认在此处标点？',
        success: async (res) => {
          if (res.confirm) {
            const { latitude, longitude } = e
            addMarker(latitude, longitude, markOrPolylineId.value++)
          }
        },
        fail: (err) => {
          console.log(err, 'err')
        }
      })
      break
    // 点击线
    case undefined:
      const { latitude, longitude } = e.detail
      const { isOnPolyline, index, view } = await checkPointOnPolyline(latitude, longitude, polyline.value, mapRef.value, initLocation.value.latitude)
      console.log(isOnPolyline, view, 'isOnPolyline', index, polyline.value[index])
      if (isOnPolyline) {
        uni.showToast({
          title: '点击了线',
          icon: 'success'
        })
      }
      break
  }
}

// 添加标点、路线
const markerPoint = ref({})
const addMarker = (latitude, longitude, id) => {
  // 上一次的点
  const lastPoint = markerPoint.value.latitude ? toRaw(markerPoint.value) : {
    latitude: initLocation.value.latitude,
    longitude: initLocation.value.longitude
  }
  markerPoint.value = {
    latitude,
    longitude
  }
  // 线
  polyline.value.push({
    id,
    points: [
      lastPoint,
      { latitude, longitude }
    ],
    width: 5,
    clickable: true,
    arrowLine: true,
    color: randomRgbColor(),
    segmentTexts: [{name: '测试一下', startIndex: 0, endIndex: 1}]
  })

  // 标点
  markers.value.push({
    id,
    latitude,
    longitude,
    iconPath: '../../static/current.png',
    width: 30,
    height: 30,
    // label: {
    //   content: getDistance(lastPoint.latitude, lastPoint.longitude, latitude, longitude),
    //   borderWidth: 1,
    //   borderColor: '#999',
    //   bgColor: '#fff',
    //   borderRadius: 2,
    //   padding: 3
    // }
  })
}

const o = ref(-1)
// 点击控件
const clickControl = (type) => {
  // 更新定位
  if (type === 'local') {
    console.log(currentData.value, 'current')
    initLocation.value.latitude = currentData.value.latitude
    initLocation.value.longitude = currentData.value.longitude
  } else if (type === 'mark') {
    // 添加标记点、路线
    const arr = [
      { latitude: 37.78155385785984, longitude: 112.56031978420128 },
      { latitude: 37.78304276611586, longitude: 112.5613987268813 },
      { latitude: 37.78167095013985, longitude: 112.55824860145844 }
    ]
    // handleClickMap(currentData.value, 'addMark')
    o.value = o.value + 1
    console.log('🚀:>> ', arr[o.value], o.value)
    handleClickMap(arr[o.value], 'addMark')
  }
}

// 实时定位
const localChange = (res) => {
  // console.log(res.latitude, res.longitude, res, '实时数据')

  if (!minAccuracy.value || (res.accuracy.toFixed(2) * 100 < minAccuracy.value * 100)) {
    minAccuracy.value = res.accuracy.toFixed(2)
    // console.log(minAccuracy.value, '精度')
    data.value = [
      { label: '精确度', value: minAccuracy.value, unit: '' },
      { label: '速度', value: res.speed.toFixed(2), unit: 'm/s' }
    ]
    currentData.value = res

    if (!markers.value.length) {
      initLocation.value.latitude = res.latitude
      initLocation.value.longitude = res.longitude

      markers.value = [
        {
          id: 1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '../../static/current.png',
          width: 30,
          height: 30
        }
      ]
    }
  }
}

// 点击标点
const clickMarker = (e) => {
  console.log(e, 'e')
}

onShow(() => {
  uni.startLocationUpdate({
    success: () => {
      console.log('开启应用接收位置消息成功')
      uni.onLocationChange((res) => {
        localChange(res)
        // 精确度小于20米，关闭定位
        // if (res.accuracy.toFixed(2) * 100 < 2000) {
        //   uni.stopLocationUpdate({
        //     success: () => console.log('关闭应用接收位置消息成功'),
        //     fail: err => console.error('关闭应用接收位置消息失败：', err),
        //     complete: msg => console.log('调用关闭应用接收位置消息 API 完成')
        //   })
        // }
      })
    },
    fail: err => console.error('开启应用接收位置消息失败：', err),
    complete: msg => console.log('调用开启应用接收位置消息 API 完成')
  })
})
onUnload(() => {
  uni.stopLocationUpdate({})
})

const clickPolyline = (e) => {
  console.log(e, 'e')
}
</script>

<template>
  <view class="map-con">
    <map id="map" ref="map" show-location show-compass enable-zoom enable-scroll :scale="scale"
      :longitude="initLocation.longitude" :latitude="initLocation.latitude" :markers="markers" :polyline="polyline"
      @tap="handleClickMap" @markertap="clickMarker" @polyline-tap="clickPolyline">

      <!-- 控件 -->
      <view class="control-con">
        <view class="mark-con" @click="clickControl('mark')">
          <image class="mark-img" src="/static/mark.png"></image>
          <!-- <view class="mark-img">标点</view> -->
        </view>
        <view class="local-con" @click="clickControl('local')">
          <image class="local-img" src="/static/local.png"></image>
        </view>
      </view>

      <!-- 实时数据 -->
      <view class="data-con">
        <view class="data-item" v-for="i in data" :key="i.label">
          <view class="label">{{ i.label }}：</view>
          <view class="value">{{ i.value + i.unit }}</view>
        </view>
      </view>
    </map>

  </view>
</template>

<style lang="scss" scoped>
.map-con,
#map {
  width: 100%;
  height: 100%;
}

.control-con {
  .local-con {
    .local-img {
      width: 80rpx;
      height: 80rpx;
      background-color: #fff;
      padding: 12rpx;
      border-radius: 8rpx;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 120rpx;
      left: 60rpx;
      box-sizing: border-box;

      &:active {
        transform: scale(0.9);
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        background-color: #f5f5f5;
        padding: 14rpx;
      }
    }
  }

  .mark-con {
    .mark-img {
      width: 80rpx;
      height: 80rpx;
      background-color: #fff;
      padding: 12rpx;
      border-radius: 8rpx;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 220rpx;
      left: 60rpx;
      box-sizing: border-box;

      &:active {
        transform: scale(0.9);
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        background-color: #f5f5f5;
        padding: 14rpx;
      }
    }
  }
}

.data-con {
  background-color: #fff;
  padding: 10rpx;
  border-radius: 8rpx;
  position: absolute;
  bottom: 100rpx;
  right: 30rpx;

  .data-item {
    display: flex;

    .label {
      color: #666;
    }
  }
}
</style>
