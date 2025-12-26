<script setup>
import { ref, nextTick } from 'vue'
import { onShow, onLoad, onUnload } from '@dcloudio/uni-app'
import { getCarListApi } from '@/api'

const scale = ref(14)
const markers = ref([])

const data = ref([])
const carInfo = ref({
  plateNumber: '',
  longitude: 113.324520,
  latitude: 23.099994
})

onLoad(param => {
  carInfo.value.plateNumber = param.plateNumber
})

const getData = async (plateNumber) => {
  const res = await getCarListApi({ plateNumber })
  carInfo.value = res.rows[0]
  data.value = [
    {label: '定位时间', value: carInfo.value.locationUpdateTime},
    {label: '联网时间', value: carInfo.value.terminalFirstOfflineTime},
  ]
  
  markers.value = [{
    id: 1,
    latitude: carInfo.value.latitude,
    longitude: carInfo.value.longitude,
    rotate: carInfo.value.direction,
    // rotate: 180,
    // title: '车辆位置',
    iconPath: '/static/car-marker.png',
    width: 26,
    height: 52,
    anchor: {x:.5, y:.6},
    callout: {
      content: carInfo.value.plateNumber,
      color: '#000000',
      fontSize: 14,
      borderRadius: 4,
      bgColor: '#ffffff',
      padding: 4,
      display: 'ALWAYS',
      // anchorX: 0,
      anchorY: 6
    }
  }]
}

let isInit = true
let timer = null
const updateMap = () => {
  if(isInit) {
    timer = setInterval(() => {
      getData(carInfo.value.plateNumber)
    }, 1000)
    isInit = false
  }
}

onUnload(() => {
  clearInterval(timer)
})

</script>

<template>
  <view class="map-con">
    <map id="map" ref="map" show-location enable-overlooking show-compass enable-zoom enable-scroll :scale="scale"
      :longitude="carInfo.longitude" :latitude="carInfo.latitude" :markers="markers" :polyline="polyline"
      @tap="handleClickMap" @markertap="clickMarker" @updated="updateMap">

      <!-- 控件 -->
      <!-- <view class="control-con">
        <view class="mark-con" @click="clickControl('mark')">
          <image class="mark-img" src="/static/mark.png"></image>
          <view class="mark-img">标点</view>
        </view>
        <view class="local-con" @click="clickControl('local')">
          <image class="local-img" src="/static/local.png"></image>
        </view>
      </view> -->

      <!-- 实时数据 -->
      <view class="data-con">
        <view class="header-con">
          <view class="num">{{carInfo.plateNumber}}</view>
          <view class="speed">行驶中：{{carInfo.speed}} km/h</view>
        </view>
        <view class="address">{{carInfo.provinceName || ''}}{{carInfo.cityName || ''}}{{carInfo.countyName || ''}}</view>
        <view class="data-item" v-for="i in data" :key="i.label">
          <view class="label">{{ i.label }}：</view>
          <view class="value">{{ i.value }}</view>
        </view>
        <view style="margin-bottom: env(safe-area-inset-bottom);"></view>
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

.info-con {
  position: absolute;
  padding: 12rpx;
  background-color: #fff;
  border-radius: 8rpx;
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
  padding: 20rpx 20rpx 10rpx;
  border-radius: 20rpx;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  min-height: 340rpx;
  
  .header-con {
    display: flex;
    justify-content: space-between;
    .num {
      font-weight: bold;
      font-size: 32rpx;
    }
    .speed {
      color: #88B279;
    }
  }
  
  .address {
    margin: 20rpx 0;
    padding-bottom: 10rpx;
    border-bottom: 1rpx solid #f5f5f5;
  }

  .data-item {
    display: flex;

    .label {
      color: #666;
    }
  }
}
</style>
