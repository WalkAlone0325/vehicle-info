<script setup>
import { ref } from 'vue';
import { onShow, onUnload } from '@dcloudio/uni-app';

const scale = ref(18)
const markers = ref([])
const data = ref({})
// 初始位置
const initLocation = ref({
  latitude: '',
  longitude: ''
})
const currentData = ref({})
const minAccuracy = ref(0)

// const initMap = () => {
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
// }

// 点击控件
const clickControl = () => {
  console.log(currentData.value, 'current')
  initLocation.value.latitude = currentData.value.latitude
  initLocation.value.longitude = currentData.value.longitude
}

// 实时定位
const localChange = () => {
  uni.onLocationChange((res) => {
    console.log(res.accuracy.toFixed(2)*100, minAccuracy.value * 100,res.accuracy.toFixed(2)*100 < minAccuracy.value * 100, '实时数据')
    
    if(!minAccuracy.value || (res.accuracy.toFixed(2)*100 < minAccuracy.value * 100)) {
      minAccuracy.value = res.accuracy.toFixed(2)
      
      console.log(minAccuracy.value, 666)
      
      data.value = [
        {label: '精确度', value: minAccuracy.value, unit: ''},
        {label: '速度', value: res.speed.toFixed(2), unit: 'm/s'}
      ]
      currentData.value = res
        
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
  })
}

onShow(() => {
  uni.startLocationUpdate({
    success: res => {
      console.log('开启应用接收位置消息成功')
      
      localChange()
    },
    fail: err => console.error('开启应用接收位置消息失败：', err),
    complete: msg => console.log('调用开启应用接收位置消息 API 完成')
  })
})
onUnload(() => {
  uni.stopLocationUpdate({})
})
</script>

<template>
  <view class="map-con">
    <map
      id="map"
      show-location
      show-compass
      enable-zoom
      enable-scroll
      :scale="scale"
      :longitude="initLocation.longitude"
      :latitude="initLocation.latitude"
      :markers="markers">

      <view class="local-con" @click="clickControl">
        <image class="local-img" src="/static/local.png"></image>
      </view>

      <view class="data-con">
        <view class="data-item" v-for="i in data" :key="i.label">
          <view class="label">{{i.label}}：</view>
          <view class="value">{{i.value + i.unit}}</view>
        </view>
      </view>
    </map>

  </view>
</template>

<style lang="scss" scoped>
  .map-con, #map {
    width: 100%;
    height: 100%;
  }

  .local-con {
    .local-img {
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
