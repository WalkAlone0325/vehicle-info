<script setup>
import { ref, reactive } from 'vue'
import { getOilListApi, deleteOil } from '@/api'
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
  refuelPlateNumber: ''
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
  queryParams.refuelPlateNumber = ''
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
  const res = await getOilListApi(queryParams)
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
const clickToDetail = (i, isApply = false) => {
  const type = i.statusCode === 'pending' ? 'apply' : 'view'
  const queryStr = i.refuelWorkOrderId ? `?id=${i.refuelWorkOrderId}&type=${type}` : ''
  uni.navigateTo({
    url: `/pages/order/oil/form${queryStr}`
  })
}

// 重置
const resetPlan = (i) => {
  message.confirm({
    title: '提示信息',
    msg: '是否确认删除此项记录信息？'
  }).then(async () => {
    const res = await deleteOil(i.refuelWorkOrderId)
    if(res.code == 200) {
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      })
      state.value = 'loading'
      queryParams.refuelPlateNumber = ''
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
  if(queryParams.refuelPlateNumber) {
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
  if(queryParams.refuelPlateNumber) {
    state.value = 'loading'
    queryParams.refuelPlateNumber = ''
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
          <wd-search v-model.trim="queryParams.refuelPlateNumber" @search="search" @cancel="cancel" />
        </view>
      </wd-sticky>

      <view class="list-item" v-for="i in list" :key="i.refuelWorkOrderId" @click.stop="clickToDetail(i)">
          <wd-card>
          <template #title>
            <view style="display: flex; justify-content: space-between; align-items: center">
              <view class="flex-col-c">
                <view class="plate-number" v-if="i.refuelPlateNumber">{{ i.refuelPlateNumber }}</view>
              </view>
              <view class="right">
                <view class="value" :class="{'status-pending': i.statusCode == 'pending', 'status-pass': i.statusCode == 'pass', 'status-error': i.statusCode == 'refuse'}">{{ i.statusCode == 'pending' ? '待审批' : (i.statusCode == 'pass' ? '已通过' : '已拒绝') }}</view>
              </view>
            </view>
          </template>
          <view class="main">
            <view class="content">
               <view style="display: flex; justify-content: space-between; align-items: center;">
                <view class="content-item">
                  <view class="label">加油用户：</view>
                  <view class="value">{{ i.refuelNickName }}</view>
                </view>
                <view class="content-item">
                  <view class="label">支付方式：</view>
                  <view class="value">{{i.refuelPaymentMethodName}}</view>
                </view>
              </view>
              <view class="content-item pd">
                <view class="label">加油时间：</view>
                <view class="value">{{ i.refuelDate}}</view>
              </view>
              <view style="display: flex; justify-content: space-between; align-items: center;">
                <view class="content-item">
                  <view class="label">车辆公里数：</view>
                  <view class="value">{{i.vehicleMileage}}</view>
                </view>
                <view class="content-item">
                  <view class="label">车辆加油量：</view>
                  <view class="value">{{i.refuelFuelQuantity}}</view>
                </view>
              </view>
              <view style="display: flex; justify-content: space-between; align-items: center;">
                <view class="content-item">
                  <view class="label">油站单价：</view>
                  <view class="value">{{i.refuelFuelPrice}}</view>
                </view>
                <view class="content-item">
                  <view class="label">加油总价：</view>
                  <view class="value">{{i.refuelTotalPrice}}</view>
                </view>
              </view>
              <view class="content-item pd">
                <view class="label">公司名称：</view>
                <view class="value">{{i.companyDeptName}}</view>
              </view>
              <view class="content-item pd" :style="{'margin-bottom': i.approveCause ? '6rpx' : '20rpx'}">
                <view class="label">部门名称：</view>
                <view class="value">{{i.deptName}}</view>
              </view>
              <view v-if="i.approveCause" class="content-item pd" style="margin-bottom: 20rpx;">
                <view class="label">审批原因：</view>
                <view class="value">{{i.approveCause}}</view>
              </view>
            </view>

            <view style="display: flex; align-items: center; margin-bottom: 4rpx;">
              <view @click.stop="clickToDetail(i, true)" v-if="i.statusCode == 'pending'">
                <wd-button size="small" type="warning">审批</wd-button>
              </view>
              <view @click.stop="resetPlan(i)" v-if="i.statusCode == 'refuse'">
                <wd-button size="small" type="error">删除</wd-button>
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
      align-items: flex-end;
    }

    .content {
      flex: 1;
      .content-item {
        display: flex;
        margin-bottom: 8rpx;

        // &:last-child {
        //   padding-bottom: 12rpx;
        // }

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

.status-pending {
  color: #ff9900;
}

.status-pass {
  color: #009933;
}

.status-error {
  color: #cc0000;
}
</style>
