<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getApproveApi, getHistoryApi, getApproveListApi, getDoneListApi } from '@/api'

const MAP_TITLE = {
  done: '已审批',
  pending: '待审批',
  // pass: '已通过',
  // reject: '已驳回',
  history: '审批记录',
  approve: '审批'
}
const btnText = ref('查看')
const curType = ref('')
// 加载
onLoad((param) => {
  curType.value = param.type
  btnText.value = param.type == 'approve' ? '审批' : '查看'
  console.log(btnText.value, param.type)
  uni.setNavigationBarTitle({ title: MAP_TITLE[param.type] + '列表' })
})

const list = ref([
  { expectedVehicleId: 1, applicantTime: '2025-05-19 18:38:00', vehicleTypeName: '货车', destination: '116.434446,39.90816长沙市地址', expectedDriverName: '刘洋', expectedPlateNumber: '晋A9NG08' }
])
const total = ref(0)

const clickDetail = (i) => {
  uni.navigateTo({
    url: `/pages/order/form?id=${i.useCarApplicationOrderId}&type=${curType.value}`
  })
}
const clickRecord = (i) => {
  uni.navigateTo({
    url: `/pages/order/record?id=${i.useCarApplicationOrderId}&type=${curType.value}`
  })
}

const clickApply = (i) => {
  uni.navigateTo({
    url: `/pages/order/form-apply?id=${i.useCarApplicationOrderId}`
  })
}

const MAP_TYPE = {
  // 历史
  history: () => getHistoryApi(),
  // 审批
  approve: () => getApproveApi(),
  // 列表
  done: (query) => getDoneListApi({...query, orderStatusCode: curType.value}),
  pending: (query) => getApproveListApi({...query, orderStatusCode: curType.value})
}
const loading = ref(false)
const getList = async () => {
  loading.value = true
  const res = await MAP_TYPE[curType.value]({
    pageNum: 1,
    pageSize: 10
  })
  list.value = res.rows
  total.value = res.total
  loading.value = false
}

onShow(() => {
  getList()
})

const getColor = ({orderStatusCode}) => {
  const MAP_TYPE = {
    refuse: '#e75356',
    pass: '#69cea0',
    draft: '#e28d4b'
  }
  return MAP_TYPE[orderStatusCode] || '#69cea0'
}
</script>

<template>
  <view class="order-list-page">
    <BaseLoading v-if="loading" />
    <view class="list-con" v-else>
      <wd-card v-for="i in list" :key="i.expectedVehicleId">
        <template #title>
          <view class="title">
            <view>{{ `时间：${i.applicantTime || ''}` }}</view>
            <view class="title-tip" v-if="i.orderStatusName" :style="{background: getColor(i)}">
              {{ i.orderStatusName }}
            </view>
          </view>
        </template>

        <view style="display: flex; justify-content: space-between;">
          <view style="display: flex">
            <view class="label">申请人账号：</view>
            <view class="value">{{ i.applicantUserName }}</view>
          </view>
          <view style="display: flex">
            <view class="label">申请人姓名：</view>
            <view class="value">{{ i.applicantNickName }}</view>
          </view>
        </view>

        <view style="display: flex; margin-top: 10rpx;">
          <view class="label">申请人公司：</view>
          <view class="value">{{ i.applicantDeptName }}</view>
        </view>

        <view style="display: flex; margin-top: 10rpx;">
          <view class="label">申请人部门：</view>
            <view class="value">{{ i.applicantCompanyDeptName }}</view>
        </view>


        <view style="display: flex; justify-content: space-between; margin-top: 10rpx;">
          <view style="display: flex">
            <view class="label">是否跨市：</view>
            <view class="value">{{ i.applicantIsIntermarketCityName }}</view>
          </view>
          <view style="display: flex">
            <view class="label">乘车人数：</view>
            <view class="value">{{ i.applicantPassengersNumber }}</view>
          </view>
        </view>

        <view style="display: flex; margin-top: 10rpx;">
          <view class="label">申请内容：</view>
          <view class="value">{{ i.applicantContent }}</view>
        </view>
        <template #footer>
          <view class="footer">
            <view style="display: flex">
              <wd-tag type="primary" mark v-if="i.vehicleTypeName">{{ i.vehicleTypeName }}</wd-tag>
            </view>
            <view style="display: flex;">
              <wd-button v-if="curType === 'pass'" size="small" plain type="success"
                @click="clickApply(i)">申请费用</wd-button>
              <view style="margin-right: 20rpx;"></view>
              <!-- <wd-button size="small" plain @click="clickImg(i)">流程图</wd-button>
              <view style="margin-right: 20rpx;"></view> -->
              <wd-button size="small" plain @click="clickDetail(i)">{{btnText}}</wd-button>
              <view style="margin-right: 20rpx;"></view>
              <wd-button size="small" plain @click="clickRecord(i)">审批记录</wd-button>
            </view>
          </view>
        </template>
      </wd-card>
    </view>
    <wd-status-tip v-if="!loading && total == 0" image="/static/content.png" tip="暂无列表" />
  </view>
</template>

<style lang="scss" scoped>
.order-list-page {
  .list-con {
    padding-top: 30rpx;

    .title {
      display: flex;
      justify-content: space-between;

      .title-tip {
        padding: 8rpx 6rpx;
        border-radius: 6rpx;
        color: #fff;
        font-size: 24rpx;
      }
    }

    .value {
      color: #333;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    ::v-deep .wd-card__footer {
      padding: 24rpx 0 14rpx;
    }

    ::v-deep .wd-tag {
      font-size: 12px;
    }
  }
}
</style>
