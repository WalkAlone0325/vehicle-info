<script setup>
import { ref } from 'vue'
import { checkRole } from '@/utils'
import { onShow } from '@dcloudio/uni-app'

const carOrder = ref([])
const carVehicle = ref([])
const order = ref([
  { id: 1, text: '用车工单', icon: 'apply', url: '/pages/order/cars/list' },
  { id: 2, text: '加油工单', icon: 'apply', url: '/pages/order/cars/list' },
])

onShow(() => {
  const arr1 = [
    { id: 1, text: '申请', icon: 'apply', url: '/pages/order/form' },
    { id: 2, text: '草稿', icon: 'draft', url: '/pages/order/list?type=draft' },
    { id: 3, text: '待审批', icon: 'wait', url: '/pages/order/list?type=pending' },
  ]
  const arr2 = [
    { id: 1, text: '申请', icon: 'apply', url: '/pages/order/form' },
    { id: 2, text: '草稿', icon: 'draft', url: '/pages/order/list?type=draft' },
    { id: 3, text: '待审批', icon: 'wait', url: '/pages/order/list?type=pending' },
    { id: 4, text: '审批历史', icon: 'pass', url: '/pages/order/list?type=history', needRole: true },
    // { id: 4, text: '已通过', icon: 'pass', url: '/pages/order/list?type=pass' },
    // { id: 5, text: '已驳回', icon: 'reject', url: '/pages/order/list?type=reject' },
    { id: 6, text: '审批', icon: 'pending', url: '/pages/order/list?type=approve', needRole: true },
  ]

  const v1 = [
    { id: 1, text: '告警配置', icon: 'setting', url: '/pages/order/devOps/config' },
    { id: 2, text: '运维计划', icon: 'plan', url: '/pages/order/devOps/plan' },
    { id: 3, text: '运维记录', icon: 'record', url: '/pages/order/devOps/record' },
    { id: 4, text: '运维告警', icon: 'gaojin', url: '/pages/order/devOps/warning' },
    { id: 5, text: '保养记录', icon: 'maintain', url: '/pages/order/devOps/maintain' },
  ]
  const v2 = []
  carOrder.value = checkRole('driver') ? arr1 : arr2
  carVehicle.value = checkRole('driver') ? v2 : v1
})

const clickItem = (item) => {
  uni.navigateTo({
    url: item.url
  })
}
</script>

<template>
  <view class="order-page">
    <wd-card title="用车工单申请">
      <wd-grid clickable border hover-class=" " :column="3">
        <view class="" v-for="i in carOrder" :key="i.id" @click="clickItem(i)">
          <wd-grid-item use-icon-slot :text="i.text">
            <template #icon>
              <image class="slot-img" :src="`/static/order/${i.icon}.png`" />
            </template>
          </wd-grid-item>
        </view>
      </wd-grid>
    </wd-card>

    <wd-card title="工单">
      <wd-grid clickable border hover-class=" " :column="3">
        <view class="" v-for="i in order" :key="i.id" @click="clickItem(i)">
          <wd-grid-item use-icon-slot :text="i.text">
            <template #icon>
              <image class="slot-img" :src="`/static/order/${i.icon}.png`" />
            </template>
          </wd-grid-item>
        </view>
      </wd-grid>
    </wd-card>

    <wd-card title="车辆运维管理" v-if="carVehicle.length">
      <wd-grid clickable hover-class=" " :column="3">
        <wd-grid-item use-icon-slot :text="i.text" v-for="i in carVehicle" :key="i.id" @itemclick="clickItem(i)">
          <template #icon>
            <image class="slot-img" :src="`/static/order/${i.icon}.png`" />
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
  </view>
</template>

<style scoped lang="scss">
.order-page {
  .slot-img {
    height: 50rpx;
    width: 50rpx;
  }
}
</style>
