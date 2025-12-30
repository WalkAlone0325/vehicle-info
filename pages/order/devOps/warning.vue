<script setup>
import { ref, reactive } from 'vue'
import { getWarningList } from '@/api'
import { onShow, onReachBottom } from '@dcloudio/uni-app'

const loading = ref(false)
const list = ref([])
const total = ref(0)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  order: 'asc'
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
  const res = await getWarningList(queryParams)
  list.value = [...list.value, ...res.rows]
  total.value = res.total
  loading.value = false
}

// 详情
const clickToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/order/devOps/warningForm${id ? `?id=${id}` : ''}`
  })
}
</script>


<template>
  <view class="warning-page">
    <BaseLoading :loading="loading" v-if="loading && !list.length" />
    <view class="list-con" v-else>
      <view class="list-item" v-for="i in list" :key="i.maintenanceWarningId" @click="clickToDetail(i.maintenanceWarningId)">
        <wd-card>
          <template #title>
            <view style="display: flex; text-align: right;">
              <view class="flex-col-c">
                <view class="name">{{ i.maintenanceRecordTypeName }}</view>
                <view class="sex">
                  <wd-tag type="primary" v-if="i.plateNumber">{{ i.plateNumber }}</wd-tag>
                </view>
              </view>
              <view class="right">
                <wd-tag :type="i.maintenanceStatusCode == '0' ? 'success' : 'warning'" mark>{{i.maintenanceStatusName}}</wd-tag>
              </view>
            </view>
          </template>
          <view class="content">
            <view class="content-item pd">
              <view class="label">单位：</view>
              <view class="value">{{ i.deptName }}</view>
            </view>
            <view class="content-item pd">
              <view class="label">待保养日期：</view>
              <view class="value">{{ i.maintenanceDate }}</view>
            </view>
          </view>
        </wd-card>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>

    <wd-status-tip v-if="!loading && total == 0" image="/static/content.png" tip="暂无列表" />

    <wd-fab activeIcon="add" :expandable="false" @click="clickToDetail" />
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
    margin-top: 30rpx;

    .name {
      color: #597fe8;
    }

    .sex {
      margin-left: 12rpx;
    }

    .content {
      .content-item {
        display: flex;
        margin-top: 8rpx;

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
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
