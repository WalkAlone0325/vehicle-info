<script setup>
import { ref, reactive } from 'vue'
import { getPlanList, putPlan } from '@/api'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { useMessage } from '@/uni_modules/wot-design-uni'
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
  const res = await getPlanList(queryParams)
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

// 重置
const resetPlan = (i) => {
  const canReset = i.lastMaintenance || i.nextMaintenance || i.lastInspection || i.nextInspection || i.lastInsurance || i.nextInsurance

  if(!canReset) {
    uni.showToast({
      title: '请先完善保养信息',
      icon: 'none'
    })
    return
  }
  message.confirm({
    title: '提示信息',
    msg: '是否确认重置车辆保养信息？'
  }).then(async () => {
    const res = await putPlan(i.maintenancePlanId)
    if(res.code == 200) {
      queryParams.pageNum = 1
      getData()
      uni.showToast({
        title: '重置成功',
        icon: 'success'
      })
      state.value = 'loading'
      queryParams.plateNumber = ''
      queryParams.pageNum = 1
      queryParams.order = 'asc'
      list.value = []
      total.value = 0
      getData()
    }
  }).catch(() => {
      console.log('点击了取消按钮')
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
          <wd-search v-model.trim="queryParams.plateNumber" @search="search" @cancel="cancel" />
        </view>
      </wd-sticky>

      <view class="list-item" v-for="i in list" :key="i.vehicleId" @click.stop="clickToDetail(i.vehicleId)">
        <wd-card>
          <template #title>
            <view style="display: flex; justify-content: space-between; align-items: center">
              <view class="flex-col-c">
                <view class="plate-number" v-if="i.plateNumber">{{ i.plateNumber }}</view>
              </view>
              <view class="right">
                <view class="label">单位：</view>
                <view class="value">{{ i.deptName }}</view>
              </view>
            </view>
          </template>
          <view class="main">
            <view class="content">
              <view class="content-item pd">
                <view class="label">上次保养日期：</view>
                <view class="value">{{ i.lastMaintenance }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">下次保养日期：</view>
                <view class="value">{{ i.nextMaintenance }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">上次年检日期：</view>
                <view class="value">{{ i.lastInspection }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">下次年检日期：</view>
                <view class="value">{{ i.nextInspection }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">上次保险日期：</view>
                <view class="value">{{ i.lastInsurance }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">下次保险日期：</view>
                <view class="value">{{ i.nextInsurance }}</view>
              </view>
            </view>

            <view style="display: flex; align-items: center; margin-top: 100rpx;">
              <view @click.stop="resetPlan(i)">
                <wd-button size="small" type="warning">重置</wd-button>
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
</style>
