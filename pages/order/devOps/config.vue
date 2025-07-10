<script setup>
import { ref } from 'vue'
import { getConfigList } from '@/api'
import { onShow } from '@dcloudio/uni-app'

const list = ref([])
const total = ref(0)
const loading = ref(true)
const getList = async () => {
  loading.value = true
  const res = await getConfigList({
    pageSize: 10,
    pageNum: 1,
    order: 'asc'
  })
  list.value = res.rows
  total.value = res.total
  loading.value = false
}

const clickToEdit = (id) => {
  uni.navigateTo({
    url: `/pages/order/devOps/configForm${id ? '?id=' + id : ''}`
  })
}

onShow(() => {
  loading.value = true
  list.value = []
  total.value = 0
  getList()
})
</script>

<template>
  <view class="config-page">
    <BaseLoading :loading="loading" v-if="loading" />
    <view class="config-list" v-else>
      <view v-for="i in list" :key="i.maintenanceWarningCycleId" @click="clickToEdit(i.maintenanceWarningCycleId)">
        <wd-card>
          <template #title>
            <view class="card-title">{{ i.maintenanceRecordTypeName }}</view>
          </template>
          <view style="display: flex;">
            <view class="label">提前告警时间（日)： </view>
            <view class="value">{{ i.maintenanceWarningFrontDay || 0 }} 天</view>
          </view>
          <view style="display: flex; padding-bottom: 20rpx; padding-top: 10rpx;">
            <view class="label">更新时间： </view>
            <view class="value">{{ i.updateTime }}</view>
          </view>
        </wd-card>
      </view>
    </view>

    <wd-fab activeIcon="add" :expandable="false" @click="clickToEdit"></wd-fab>
  </view>
</template>

<style lang="scss" scoped>
.config-page {
  .config-list {
    .card-title {
      font-size: 16px;
      color: #3065eb;
      font-weight: 500;
    }

    .label {
      color: #666;
    }

    .value {
      color: #333;
      flex: 1;
    }
  }
}
</style>
