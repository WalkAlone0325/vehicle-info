<script setup>
import { ref } from 'vue';
import { onShow, onUnload } from '@dcloudio/uni-app';

const scale = ref(18)
const markers = ref([])
const controls = ref([
  {
    id: 1,
    position: {
      left: 30,
      top: 600,
      width: 30,
      height: 30
    },
    iconPath: '../../static/local.png',
    clickable: true
  }
])
// 初始位置
const initLocation = ref({
  latitude: '37.857014',
  longitude: '112.549248'
})

const initMap = () => {
  uni.getLocation({
    type: 'gcj02', // 'wgs84', 返回可以用于wx.openLocation的经纬度
    isHighAccuracy: true,
    success: (res) => {
      console.log(res, 'res')
      // const latitude = res.latitude
      // const longitude = res.longitude
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
    },
    fail: (err) => {
      console.log(err, 'err')
    }
  })
}

// 点击控件
const clickControl = (e) => {
  initLocation.value.latitude = '37.857014'
  initLocation.value.longitude = '112.549248'
  initMap()
}

// 实时定位
const localChange = () => {
  uni.startLocationUpdate({
    success: res => {
      console.log(res, 'res1')
      console.log('开启应用接收位置消息成功')
      uni.onLocationChange((res) => {
        console.log(res, 'res2')
        // initLocation.value.latitude = res.latitude
        // initLocation.value.longitude = res.longitude
      })
    },
    fail: err => console.error('开启应用接收位置消息失败：', err),
    complete: msg => console.log('调用开启应用接收位置消息 API 完成')
  })
}

onShow(() => {
  initMap()
  // localChange()
})
onUnload(() => {
  // uni.stopLocationUpdate({})
})
</script>

<template>
  <view class="map-con">
    <map 
      id="map" 
      :controls="controls" 
      show-location 
      show-compass 
      enable-zoom 
      enable-scroll 
      :scale="scale" 
      :longitude="initLocation.longitude" 
      :latitude="initLocation.latitude" 
      :markers="markers" 
      @controltap="clickControl"></map>
  </view>
</template>

<style lang="scss" scoped>
  .map-con, #map {
    width: 100%;
    height: 100%;
  }
</style>