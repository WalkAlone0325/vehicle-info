<script setup>
import { ref } from 'vue'
import { checkRole } from '@/utils'
import { onShow } from '@dcloudio/uni-app'

const carOrder = ref([])
const carVehicle = ref([])
const order = ref([])

onShow(() => {
  const v1 = [
    { id: 1, text: '申请', icon: 'apply', url: '/pages/order/form' },
    { id: 3, text: '待审批', icon: 'wait', url: '/pages/order/list?type=pending' },
    { id: 2, text: '已审批', icon: 'draft', url: '/pages/order/list?type=done' },
    // { id: 4, text: '已通过', icon: 'pass', url: '/pages/order/list?type=pass' },
    // { id: 5, text: '已驳回', icon: 'reject', url: '/pages/order/list?type=reject' },
    { id: 6, text: '审批', icon: 'pending', url: '/pages/order/list?type=approve', role: 'car:vehicleUseCarApplicationOrder' },
    { id: 4, text: '审批记录', icon: 'pass', url: '/pages/order/list?type=history', role: 'car:vehicleUseCarApplicationOrder' },
  ]

  const v2 = [
    { id: 1, text: '告警配置', icon: 'setting', url: '/pages/order/devOps/config', role: 'car:vehicleMaintenanceWarningCycle:list' },
    { id: 2, text: '运维计划', icon: 'plan', url: '/pages/order/devOps/plan', role: 'car:vehicleMaintenancePlan:list' },
    { id: 3, text: '运维记录', icon: 'record', url: '/pages/order/devOps/record', role: 'car:vehicleMaintenanceRecord:list' },
    { id: 4, text: '运维告警', icon: 'gaojin', url: '/pages/order/devOps/warning', role: 'car:vehicleMaintenanceWarningCycle:list' },
    { id: 5, text: '保养申报', icon: 'maintain', url: '/pages/order/devOps/maintain?type=maintenance', role: 'car:vehicleUpkeepWorkOrder:list' },
    { id: 6, text: '维修申报', icon: '维修', url: '/pages/order/devOps/maintain?type=repairing', role: 'car:vehicleUpkeepWorkOrder:list' },
    { id: 7, text: '保养审批', icon: 'pending', url: '/pages/order/devOps/maintainApply?type=maintenance', role: 'car:vehicleUpkeepWorkOrder:approve' },
    { id: 8, text: '维修审批', icon: '待审批', url: '/pages/order/devOps/maintainApply?type=repairing', role: 'car:vehicleUpkeepWorkOrder:approve' },
  ]

  const v3 = [
    { id: 1, text: '用车工单', icon: 'apply', url: '/pages/order/cars/list' },
    { id: 2, text: '加油申报', icon: 'oil', max: true, url: '/pages/order/oil/list', role: 'car:vehicleRefuelWorkOrder:list' },
    { id: 3, text: '加油审批', icon: 'pending', url: '/pages/order/oil/listApply', role: 'car:vehicleRefuelWorkOrder:approve' },
    { id: 4, text: '里程上报', icon: 'mile', max: true, url: '/pages/order/mileReport/list', role: 'reportforms:vehicleReportformsReimbursementMileageInfo:list' }
  ]
  carOrder.value = checkRole(v1)
  carVehicle.value = checkRole(v2)
  order.value = checkRole(v3)
  console.log(order.value)
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
              <image class="slot-img" :style="{width: i.max ? '60rpx' : '50rpx', height: i.max ? '60rpx' : '50rpx'}" :src="`/static/order/${i.icon}.png`" />
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
  
  .mile-icon {
    width: 80rpx !important;
    height: 80rpx !important;
  }
}
</style>
