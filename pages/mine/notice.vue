<script setup>
import { ref, reactive } from 'vue'
import { getNoticeApi } from '@/api'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { useMessage } from '@/uni_modules/wot-design-uni'
import { getDaysAgo } from '@/utils'
const message = useMessage()

const loading = ref(false)
const list = ref([])
const total = ref(0)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
  plateNumber: ''
})

const state = ref('loading')

onReachBottom(() => {
  if (!list.value.length) {
    state.value = 'error'
  } else if (list.value.length < total.value) {
    loadmore()
  } else if (list.value.length === total.value) {
    state.value = 'finished'
  }
})

onShow(() => {
  state.value = 'loading'
  queryParams.plateNumber = ''
  queryParams.pageNum = 1
  queryParams.order = 'asc'
  list.value = []
  total.value = 0
  getData()
})

function loadmore() {
  queryParams.pageNum++
  getData()
  state.value = 'loading'
}

const getData = async () => {
  loading.value = true
  const res = await getNoticeApi(queryParams)
  list.value = [...list.value, ...res.rows]
  total.value = res.total
  loading.value = false
  if (!list.value.length) {
    state.value = 'error'
  } else if (list.value.length === total.value) {
    state.value = 'finished'
  }
}

// 详情
const clickToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/order/devOps/planForm${id ? `?id=${id}` : ''}`
  })
}

// 搜索
const search = () => {
  if(queryParams.plateNumber) {
    state.value = 'loading'
    queryParams.pageNum = 1
    queryParams.order = 'asc'
    list.value = []
    total.value = 0
    getData()
  }
}
// 取消搜索
const cancel = () => {
  if(queryParams.plateNumber) {
    state.value = 'loading'
    queryParams.plateNumber = ''
    queryParams.pageNum = 1
    queryParams.order = 'asc'
    list.value = []
    total.value = 0
    getData()
  }
}
</script>


<template>
  <view class="warning-page">
    <wd-message-box />
    <BaseLoading :loading="loading" v-if="loading && !list.length" />
    <view class="list-con" v-else>

      <wd-sticky>
        <view style="margin-bottom: 30rpx; width: 100vw;">
          <wd-search v-model.trim="queryParams.plateNumber" placeholder="请输入车牌号" @search="search" @cancel="cancel" />
        </view>
      </wd-sticky>

      <view class="list-item" v-for="i in list" :key="i.maintenanceWarningId">
        <wd-card>
          <template #title>
            <view style="display: flex; justify-content: space-between; align-items: center">
              <view class="flex-col-c">
                <view class="plate-number" v-if="i.maintenanceRecordTypeName">{{ i.maintenanceRecordTypeName + '到期告警' }}</view>
              </view>
              <view class="right">
                <!-- <view class="label">状态：</view> -->
                <wd-tag custom-class="space" :type="i.maintenanceStatusName === '正常' ? 'success' : 'danger'">{{ i.maintenanceStatusName }}</wd-tag>
                <!-- <view class="value">{{ i.maintenanceStatusName }}</view> -->
              </view>
            </view>
          </template>
          <view class="main">
            <view class="content">
              <view class="content-item pd">
                <view class="label">单位：</view>
                <view class="value">{{ i.deptName }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">车牌号码：</view>
                <view class="value">{{ i.plateNumber || '无' }}</view>
              </view>
              <view style="display: flex; justify-content: space-between;">
                <view class="content-item pd">
                  <view class="label">到期时间：</view>
                  <view class="value">{{ i.maintenanceDate }}</view>
                </view>
                <view class="content-item pd">
                  <view class="value">{{ getDaysAgo(i.maintenanceDate) }}</view>
                </view>
              </view>
            </view>
          </view>
        </wd-card>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
::v-deep(.wd-tag) {
  font-size: 14px;
}

.warning-page {
  ::v-deep .wd-card__title-content {
    padding: 20rpx 0;
  }

  .list-con {
    .plate-number {
      padding: 10rpx 10rpx;
      color: #fff;
      background-color: #597fe8;
      border-radius: 10rpx;
      font-size: 26rpx;
    }

    .main {
      display: flex;
    }

    .content {
      flex: 1;
      .content-item {
        display: flex;
        margin-bottom: 8rpx;

        &:last-child {
          padding-bottom: 12rpx;
        }

        .value {
          color: #333;
        }
      }
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
  display: flex;
}

.space {
  padding: 8rpx 8rpx;
  font-size: 28rpx;
}
</style>
