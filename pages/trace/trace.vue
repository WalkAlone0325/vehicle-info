<script setup>
import { ref } from 'vue'
import { getLocationApi, getDeptApi, getTraceApi } from '@/api'
import { useQueue } from '@/uni_modules/wot-design-uni'
import { onShow } from '@dcloudio/uni-app'
import { randomRgbColor, wgs84togcj02, formatDateTime } from '@/utils'

const { closeOutside } = useQueue()

const curIdx = ref(0)

const dropRef = ref(null)
const dropRef2 = ref(null)
const scale = ref(7)
const plateNumber = ref()
const deptId = ref()
const markerList = ref([])
const data = ref({})
const markers = ref([])

const getData = async () => {
  const res = await getLocationApi({
    deptId: deptId.value,
    plateNumber: plateNumber.value,
  })
  if (deptId.value) {
    scale.value = 8
  } else {
    scale.value = 7
  }
  data.value = res.data
  markerList.value = res.data.carVehicleInfoList.map((i, idx) => ({
    iconPath: '/static/location.png',
    latitude: i.latitude,
    longitude: i.longitude,
    id: idx + 1,
    width: 20,
    height: 20,
    label: {
      content: i.plateNumber,
      borderWidth: 1,
      borderColor: '#999',
      bgColor: '#fff',
      borderRadius: 2,
      padding: 3
    }
  }))

  markers.value = markerList.value
}

const traceData = ref({})
const polyline = ref([]) // 路线
const getTraceData = async () => {
  const now = new Date()
  const twoHourAgo = new Date(now)
  twoHourAgo.setHours(new Date().getHours() - 2)
  const res = await getTraceApi({
    deptId: deptId.value,
    plateNumber: plateNumber.value,
    startDate: formatDateTime(twoHourAgo),
    endDate: formatDateTime(new Date())
  })
  if(res.code === 200) {
    traceData.value = res.data
    polyline.value = res.data.queryRecordLocationListOutBeanList.map((i, idx) => {
      return {
        width: 3,
        arrowLine: true,
        color: randomRgbColor(),
        points: handlePoints(i, idx)
      }
    })

    markers.value = []
    markers.value = allStopPoints.value.map((i, idx) => ({
      iconPath: '/static/stop.png',
      latitude: i.latitude,
      longitude: i.longitude,
      id: idx + 1,
      width: 20,
      height: 20,
      label: {
        content: getDay(i.time),
        borderWidth: 1,
        borderColor: '#999',
        bgColor: '#fff',
        borderRadius: 2,
        padding: 3
      }
    }))
  }
}

const getDay = (timestemp) => {
  const day = Math.floor(timestemp / (24*3600*1000))
  const hour = Math.floor(timestemp / (3600*1000) % 24)
  const minute = Math.floor(timestemp / (60*1000) % 60)
  const second = Math.floor(timestemp / 1000 % 60)
  const dayStr = day ? `${day}天` : ''
  const hourStr = hour ? `${hour}时` : ''
  const minuteStr = minute ? `${minute}分` : ''
  const secondStr = second ? `${second}秒` : ''
  return `${dayStr}${hourStr}${minuteStr}${secondStr}`
}

const allStopPoints = ref([])
const handlePoints = (i, idx) => {
  const arr = []
  let setArr = []
  const res = JSON.parse(i.locations).map(j => {
    const res = wgs84togcj02(j[0], j[1])
    arr.push({str: '' + res[0] + res[1], date: j[4], latitude: res[1], longitude: res[0],})
    return {latitude: res[1], longitude: res[0], str: '' + res[0] + res[1], date: j[4]}
  })
  setArr = [...new Set(arr.map(i => i.str))]
  const start = arr.find(i => i.str == setArr[0])
  const end = arr.findLast(i => i.str == setArr[0])

  function getTimestemp(date) {
    return new Date(date.replace(' ', 'T')).getTime()
  }

  // 大于 5 分钟，停止
  const time = getTimestemp(end.date) - getTimestemp(start.date)
  if(time >= 300000) {
    allStopPoints.value.push({...end, time})
  }

  return res
}

const search = () => {
  if(curIdx.value === 0) {
    markerList.value = []
    data.value = {}
    markers.value = []
    getData()
    dropRef.value.close()
  } else if(curIdx.value === 1) {
    markers.value = []
    traceData.value = {}
    polyline.value = []
    allStopPoints.value = []
    getTraceData()
    dropRef2.value.close()
  }
}
const reset = () => {
  if (!deptId.value && !plateNumber.value) return
  plateNumber.value = undefined
  deptId.value = undefined
  search()
}

const deptOptions = ref([])
const getDept = async () => {
  const res = await getDeptApi()
  deptOptions.value = res.data.filter((i) => i.pId != '0').map((i) => ({
    label: i.name,
    value: i.id
  }))
}

// 改变drop
const clickDrop = (item, idx) => {
  if(curIdx.value === idx) return
  curIdx.value = idx
  plateNumber.value = undefined
  deptId.value = undefined
  markerList.value = []
  data.value = {}
  markers.value = []

  traceData.value = {}
  polyline.value = []
  search()
}

onShow(() => {
  getData()
  getDept()
})
</script>

<template>
  <view class="trace-page">
    <view @click="closeOutside">
      <wd-drop-menu @click="clickDrop" :idx="curIdx">
        <wd-drop-menu-item title="车辆位置" ref="dropRef">
          <view class="drop-con">
            <wd-search v-model="plateNumber" placeholder-left cancel-txt="重置" @cancel="reset" placeholder="请输入车牌号进行搜索"
              @search="search" />
            <wd-radio-group v-model="deptId" shape="button" @change="search">
              <view class="radio-con">
                <view class="radio-item" v-for="i in deptOptions" :key="i.value">
                  <wd-radio :value="i.value">{{ i.label }}</wd-radio>
                </view>
              </view>
            </wd-radio-group>
          </view>
        </wd-drop-menu-item>
        <wd-drop-menu-item title="车辆轨迹" ref="dropRef2">
          <view class="drop-con">
            <wd-search v-model="plateNumber" placeholder-left cancel-txt="重置" @cancel="reset" placeholder="请输入车牌号进行搜索"
              @search="search" />
            <wd-radio-group v-model="deptId" shape="button" @change="search">
              <view class="radio-con">
                <view class="radio-item" v-for="i in deptOptions" :key="i.value">
                  <wd-radio :value="i.value">{{ i.label }}</wd-radio>
                </view>
              </view>
            </wd-radio-group>
          </view>
        </wd-drop-menu-item>
      </wd-drop-menu>
    </view>
    <map id="map" :polyline="polyline" :scale="scale" :longitude="data.longitude" :latitude="data.latitude" :markers="markers"></map>
  </view>
</template>

<style scoped lang="scss">
.trace-page,
map {
  width: 100%;
  height: 100%;
}

.radio-con {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .radio-item {
    margin-bottom: 20rpx;

    &:nth-child(3n+1) {
      margin-left: 30rpx;
    }

    &:nth-child(3n+2) {
      margin: 0 30rpx;
    }
  }
}

.title-con {
  display: flex;
  justify-content: space-between;
}
</style>
