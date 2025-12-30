<script setup>
import { ref, reactive } from 'vue'
import { getOrderApi, deleteOrder } from '@/api'
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
  } else if (list.value.length === total.value) {
    state.value = 'finished'
  } else if (list.value.length < total.value) {
    loadmore()
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
  const res = await getOrderApi(queryParams)
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
const clickToDetail = (id, workOrdeStatusCode) => {
  const queryStr = `?id=${id}&type=${workOrdeStatusCode}`
  uni.navigateTo({
    url: `/pages/order/cars/form${id && workOrdeStatusCode ? queryStr : ''}`
  })
}

// 重置
const resetPlan = (i) => {
  message.confirm({
    title: '提示信息',
    msg: '是否确认删除此项记录信息？'
  }).then(async () => {
    const res = await deleteOrder(i.useCarWorkOrderId)
    if(res.code == 200) {
      queryParams.pageNum = 1
      getData()
      uni.showToast({
        title: '删除成功',
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

// 提交
const handleSubmit = (id, type) => {
  uni.navigateTo({
    url: `/pages/order/cars/formCollect?id=${id}&type=${type}`
  })
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
    <view class="list-con" style="padding-top: 20rpx;" v-else>

      <!-- <wd-sticky>
        <view style="margin-bottom: 30rpx; width: 100vw;">
          <wd-search v-model.trim="queryParams.plateNumber" @search="getData" @cancel="cancel" />
        </view>
      </wd-sticky> -->

      <view class="list-item" v-for="i in list" :key="i.useCarWorkOrderId" @click.stop="clickToDetail(i.useCarWorkOrderId, i.workOrdeStatusCode)">
        <wd-card>
          <template #title>
            <view style="display: flex; justify-content: space-between; align-items: center">
              <view class="flex-col-c">
                <view class="plate-number" v-if="i.collectPlateNumber">{{ i.collectPlateNumber }}</view>
              </view>
              <view class="right">
                <view class="label">工单状态：</view>
                <view class="value">{{ i.workOrdeStatusName }}</view>
              </view>
            </view>
          </template>
          <view class="main">
            <view class="content">
              <view class="content-item pd">
                <view class="label">归属部门：</view>
                <view class="value">{{ i.deptName }}</view>
              </view>
              <view class="content-item pd">
                <view class="label">申请人名称：</view>
                <view class="value">{{ i.applicantUserName}}</view>
              </view>
              <view class="content-item pd">
                <view class="label">领车司机：</view>
                <view class="value">{{i.collectDriverName}}</view>
              </view>
              <view class="content-item pd" v-if="i.workOrdeStatusCode === 'returned'">
                <view class="label">还车司机：</view>
                <view class="value">{{i.returnedDriverName}}</view>
              </view>
              <view class="content-item pd" v-if="i.workOrdeStatusCode === 'returned'">
                <view class="label">还车时间：</view>
                <view class="value">{{i.returnedTime}}</view>
              </view>
            </view>

            <view style="display: flex; align-items: flex-end;">
              <view @click.stop="handleSubmit(i.useCarWorkOrderId, 'returned')" v-if="i.workOrdeStatusCode === 'collect'">
                <wd-button size="small" type="success">还车</wd-button>
              </view>
              <view @click.stop="handleSubmit(i.useCarWorkOrderId, 'collect')" v-if="i.workOrdeStatusCode === 'waiting_collect'">
                <wd-button size="small" type="warning">领车</wd-button>
              </view>
            </view>
          </view>
        </wd-card>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>

    <!-- <wd-fab activeIcon="add" draggable :gap="{right: 30, bottom: 30}" :expandable="false" @click="clickToDetail" /> -->
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
