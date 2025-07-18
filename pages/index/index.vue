<script setup lang="ts">
  import { ref } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { getOilTankApi, getCarCountApi, getCarTableApi } from '@/api'

  const swiperList = ref(['/static/swiper1.jpg'])

  const list = ref([])
  const dataList = ref([])
  const chartData = ref({})
  const opts = ref({
    color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
    padding: [15, 10, 0, 15],
    enableScroll: false,
    pixelRatio: 3,
    legend: {},
    xAxis: {
      disableGrid: true,
      marginTop: 8,
      rotateLabel: true,
      rotateAngle: 45
    },
    yAxis: {
      gridType: "dash",
      dashLength: 2
    },
    extra: {
      line: {
        type: "straight",
        width: 2,
        activeType: "hollow"
      }
    }
  })

  const getLineData = async () => {
    const res = await getCarCountApi({})
    if(res.code == 200) {
      chartData.value = {
        ...res.data,
        categories: res.data.xaxisDataList
      }
    }
  }
  const getTableData = async () => {
    const res = await getCarTableApi({})
    if(res.code == 200) {
      list.value = res.data
    }
  }

  const clickItem = (type) => {
    uni.navigateTo({
      url: type === 1 ? '/pages/index/car' : '/pages/index/driver'
    })
  }

  // 油机数据统计
  const getOilTank = async () => {
    const res = await getOilTankApi({})
    if(res.code == 200) {
      dataList.value = [
        { lab1: '正在发电设备', val1: res.data.jobStatusGeneratingCount, lab2: '总设备', val2: res.data.deviceCount, unit: '台' },
        { lab1: '空载设备统计', val1: res.data.jobStatusIdleCount, lab2: '总设备', val2: res.data.deviceCount, unit: '台' },
        { lab1: '在线设备统计', val1: res.data.onoffStatusOnCount, lab2: '总设备', val2: res.data.deviceCount, unit: '台' },
        { lab1: '离线设备统计', val1: res.data.onoffStatusOffCount, lab2: '总设备', val2: res.data.deviceCount, unit: '台' },
        { lab1: '发电次数统计', val1: res.data.recordMonthNowCount, lab2: '总次数', val2: res.data.recordCount, unit: '本月' },
        { lab1: '开机时长统计', val1: res.data.bootTimeMonthNowCount, lab2: '总时长', val2: res.data.bootTimeCount + ' 分钟', unit: '本月' },
      ]
    }
  }

  onShow(() => {
    getOilTank()
    getLineData()
    getTableData()
  })

  const goMap = () => {
    uni.navigateTo({
      url: '/pages/index/map'
    })
  }
</script>

<template>
  <view class="index-page">
    <wd-swiper :list="swiperList" autoplay></wd-swiper>
    <wd-grid clickable hover-class=" ">
      <wd-grid-item use-icon-slot use-text-slot text="车辆信息" @itemclick="clickItem(1)">
        <template #icon>
          <image class="slot-img" src="/static/car.png" />
        </template>
        <template #text>
          <view class="text">车辆信息</view>
        </template>
      </wd-grid-item>
      <wd-grid-item use-icon-slot use-text-slot text="司机信息" @itemclick="clickItem(2)">
        <template #icon>
          <image class="slot-img" src="/static/driver.png" />
        </template>
        <template #text>
          <view class="text">司机信息</view>
        </template>
      </wd-grid-item>
    </wd-grid>

    <!-- <button type="primary" @click="goMap">地图</button> -->

    <BaseTitle title="油机数据统计">
      <view class="oil-con">
        <view class="oil-item" v-for="i in dataList" :key="i.lab1">
          <view style="display: flex;align-items: center;justify-content: space-between;">
            <view class="label">{{ i.lab1 }}</view>
            <view class="unit">{{ i.unit }}</view>
          </view>
          <view class="num">{{ i.val1 }}</view>
          <view style="display: flex;align-items: center;justify-content: space-between;">
            <view class="label">{{i.lab2}}</view>
            <view class="val">{{ i.val2 }}</view>
          </view>
        </view>
      </view>
    </BaseTitle>

    <BaseTitle title="车辆数据统计" />
      <!-- <BaseStatistics /> -->
      <!-- <view class="content">
        <view class="content-item" :style="{backgroundColor: i.color}" v-for="i in dataList" :key="i.label">
          <view style="display: flex;align-items: center;">
            <view class="label">{{ i.label }}</view>
          </view>
          <view class="icon">{{i.val}}</view>
        </view>
      </view> -->
    <view class="chart-box">
      <qiun-data-charts type="line" :opts="opts" :chartData="chartData" canvas2d canvasId="uid123" />
    </view>

    <view class="table-con">
      <wd-table :data="list" :height="800" :rowHeight="40" :stripe="false">
        <wd-table-col prop="cityName" label="归属地市" width="105" align="center"></wd-table-col>
        <wd-table-col prop="vehicleCount" label="车辆总数" width="90" align="center"></wd-table-col>
        <wd-table-col prop="registerCount" label="上线车辆" width="90" align="center"></wd-table-col>
        <wd-table-col prop="logoutCount" label="离线车辆" width="90" align="center"></wd-table-col>
      </wd-table>
    </view>
  </view>
</template>


<style lang="scss" scoped>
  .index-page {
    width: 100%;
    background: #f7fbfb;
    min-height: 100vh;

    .slot-img {
      height: 72rpx;
      width: 72rpx;
      margin-left: -10rpx;
    }

    .text {
      padding-top: 24rpx;
      text-align: center;
      font-size: 13px;
    }

    .content {
      // display: flex;
      // justify-content: space-between;
      // flex-wrap: wrap;
      // margin: 8rpx;

      .content-item {
        box-shadow: 0 0 20rpx #eee;
        padding: 20rpx 30rpx;
        background-color: #fff;
        border-radius: 14rpx;
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;

        .icon {
          width: 80rpx;
          height: 80rpx;
          // background-color: #eee;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30rpx;
          font-size: 46rpx;
          color: #333;
        }

        .val {
          font-size: 46rpx;
          color: #000;
        }

        .label {
          font-size: 28rpx;
          color: #333;
        }
      }
    }

    .oil-con {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .oil-item {
        width: 40%;
        background-color: #e6f1fe;
        border-radius: 20rpx;
        margin-bottom: 24rpx;
        padding: 20rpx 30rpx;
        font-size: 28rpx;

        .num {
          font-size: 42rpx;
          font-weight: 500;
          margin: 8rpx 0;
        }

        .label {
          color: #666;
        }

        .val {
          font-weight: 500;
        }

        .unit {
          padding: 6rpx 12rpx;
          background-color: #3f72af;
          font-size: 24rpx;
          color: #fff;
          border-radius: 10rpx;
        }
      }
    }
    .charts-box {
      width: 100%;
      height: 400rpx;
    }

    .table-con {
      padding: 20rpx;
      margin-left: -8rpx;
    }
  }
</style>
