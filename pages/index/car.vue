<script setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { getCarListApi } from '@/api'

const list = ref([])
const total = ref(0)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
  plateNumber: ''
})
const loading = ref(false)
const state = ref('loading')

onReachBottom(() => {
  if (list.value.length === total.value) {
    state.value = 'finished'
  } else if (!list.value.length) {
    state.value = 'error'
  } else if (list.value.length < total.value) {
    loadmore()
  }
})

onLoad(() => {
  getData()
})

function loadmore() {
  queryParams.pageNum++
  state.value = 'loading'
  getData()
}

const getData = async () => {
  loading.value = true
  const res = await getCarListApi(queryParams)
  list.value = [...list.value, ...res.rows]
  total.value = res.total
  loading.value = false

  if (list.value.length === total.value) {
    state.value = 'finished'
  } else if (!list.value.length) {
    state.value = 'error'
  }
}
const search = ({ value }) => {
  queryParams.plateNumber = value
  queryParams.pageNum = 1
  list.value = []
  total.value = 0
  state.value = 'loading'
  getData()
}
const clear = () => {
  state.value = 'loading'
  queryParams.plateNumber = ''
  queryParams.pageNum = 1
  queryParams.order = 'asc'
  list.value = []
  total.value = 0
  getData()
}
const cancel = () => {
  clear()
}

const clickToLocal = (i) => {
  uni.navigateTo({
    url: '/pages/index/localMap?plateNumber=' + i.plateNumber
  })
}
</script>

<template>
  <view class="driver-page">
    <wd-sticky>
      <view style="width: 100vw;">
        <wd-search placeholder-left placeholder="请输入车牌号码搜索" v-model="queryParams.plateNumber" @search="search"
          @clear="clear" @cancel="cancel" :maxlength="10" />
      </view>
    </wd-sticky>
    <BaseLoading :loading="loading" v-if="loading && !list.length" />
    <view class="container" v-else>
      <view v-for="i in list" :key="i.driverId">
        <wd-card>
          <template #title>
            <view style="display: flex; text-align: right;">
              <view class="flex-col-c">
                <view class="name">{{ i.plateNumber }}</view>
                <view class="sex">
                  <wd-tag type="primary" v-if="i.brandModel">{{ i.brandModel }}</wd-tag>
                </view>
              </view>
              <view class="right">
                <wd-tag type="success" mark v-if="i.vehicleStatusName">{{ i.vehicleStatusName }}</wd-tag>
              </view>
            </view>
          </template>
          <view style="display: flex; justify-content: space-between; align-items: flex-end;">
            <view class="content">
              <view style="display: flex; justify-content: space-between;">
                <!-- <view class="content-item">
                  <view class="label">准驾车型：</view>
                  <view class="value">A1</view>
                </view> -->
                <view class="content-item" v-if="i.driverName">
                  <view class="label">车辆司机：</view>
                  <view class="value">{{ i.driverName }}</view>
                </view>
              </view>
              <view class="content-item">
                <view class="label">部门名称：</view>
                <view class="value">{{ i.deptName }} {{ `(${i.cityName}${i.countyName || ''})` }}</view>
              </view>
              <view class="content-item">
                <view class="label">车辆用途：</view>
                <view class="value">{{ i.vehicleApplicationNames }}</view>
              </view>
              <view class="content-item">
                <view class="label">初次上线时间：</view>
                <view class="value">{{ i.terminalFirstOnlineTime }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">最近离线时间：</view>
                <view class="value">{{ i.terminalRecentOfflineTime }}</view>
              </view>
            </view>

            <image @click="clickToLocal(i)" class="img-local" :src="'/static/local.png'" mode=""></image>

          </view>
        </wd-card>

      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>

    <wd-status-tip v-if="!loading && total == 0" image="/static/content.png" tip="暂无列表" />
  </view>
</template>

<style lang="scss" scoped>
.driver-page {
  ::v-deep .wd-card__title-content {
    padding: 20rpx 0;
  }

  .container {
    .name {
      color: #597fe8;
    }

    .sex {
      margin-left: 12rpx;
    }

    .content {
      .content-item {
        display: flex;
        margin-bottom: 6rpx;

        .value {
          color: #333;
        }
      }
    }

    .pd {
      padding-bottom: 12rpx;
    }

    .img-local {
      width: 54rpx;
      height: 54rpx;
      margin-bottom: 20rpx;
      margin-right: 20rpx;
    }
  }
}


image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}

.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
