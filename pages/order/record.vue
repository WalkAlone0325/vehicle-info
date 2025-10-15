<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getApproveRecordApi } from '@/api'

const loading = ref(false)
const recordList = ref([])
const getList = async (id) => {
  loading.value = true
  const res = await getApproveRecordApi({
    useCarApplicationOrderId: id
  })
  loading.value = false
  recordList.value = res.data
}

onLoad((param) => {
  getList(param.id)
})

const getColor = ({ approvalResultCode }) => {
  const MAP_TYPE = {
    refuse: '#e75356',
    pass: '#69cea0',
    draft: '#e28d4b'
  }
  return MAP_TYPE[approvalResultCode] || '#69cea0'
}
</script>

<template>
  <view class="record-page">
    <BaseLoading v-if="loading" />
    <view class="list-con" v-else>
      <wd-card v-for="i in recordList" :key="i.historyApproverUserId">
        <template #title>
          <view class="title">
            <view>{{ `任务名称：${i.taskName || ''}` }}</view>
            <view class="title-tip" v-if="i.approvalResultName" :style="{ background: getColor(i) }">
              {{ i.approvalResultName }}
            </view>
          </view>
        </template>

        <view style="display: flex; justify-content: space-between;">
          <view style="display: flex">
            <view class="label">申请人名称：</view>
            <view class="value">{{ i.approverUserName }}</view>
          </view>
          <view style="display: flex">
            <view class="label">审批部门：</view>
            <view class="value">{{ i.applicantDeptName }}</view>
          </view>
        </view>

        <view style="display: flex; margin-top: 10rpx;">
          <view class="label">审批公司：</view>
          <view class="value">{{ i.applicantCompanyDeptName }}</view>
        </view>

        <view style="display: flex; margin-top: 10rpx;">
          <view class="label">审批时间：</view>
          <view class="value">{{ i.approvalTime }}</view>
        </view>

        <view style="display: flex; margin-top: 10rpx; padding-bottom: 20rpx;">
          <view class="label">审批原因：</view>
          <view class="value">{{ i.approvalCause }}</view>
        </view>
      </wd-card>
    </view>
    <wd-status-tip v-if="!loading && !recordList.length" image="/static/content.png" tip="暂无列表" />
  </view>
</template>

<style lang="scss" scoped>
.record-page {
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

    ::v-deep .wd-card__footer {
      padding: 24rpx 0 14rpx;
    }

    ::v-deep .wd-tag {
      font-size: 12px;
    }
  }
}
</style>
