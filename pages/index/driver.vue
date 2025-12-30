<script setup>
import {
  onLoad,
  onReachBottom
} from '@dcloudio/uni-app'
import {
  reactive,
  ref
} from 'vue'
import {
  getDriverListApi
} from '@/api'

const list = ref([])
const total = ref(0)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
  driverName: ''
})
const loading = ref(true)
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

onLoad(() => {
  getData()
})

function loadmore() {
  queryParams.pageNum++
  getData()
  state.value = 'loading'
}

const getData = async () => {
  loading.value = true
  const res = await getDriverListApi(queryParams)
  list.value = [...list.value, ...res.rows]
  total.value = res.total
  loading.value = false

  if (list.value.length === total.value) {
    state.value = 'finished'
  } else if (!list.value.length) {
    state.value = 'error'
  }
}
const search = ({ value }) => {
  if (!value) return
  queryParams.driverName = value
  queryParams.pageNum = 1
  list.value = []
  total.value = 0
  state.value = 'loading'
  getData()
}

const clear = () => {
  state.value = 'loading'
  queryParams.driverName = ''
  queryParams.pageNum = 1
  queryParams.order = 'asc'
  list.value = []
  total.value = 0
  getData()
}
const cancel = () => {
  clear()
}
</script>

<template>
  <view class="driver-page">
    <wd-sticky>
      <view style="width: 100vw;">
        <wd-search placeholder="请输入姓名搜索" placeholder-left v-model="queryParams.driverName" @search="search"
          @clear="clear" @cancel="cancel" :maxlength="10" />
      </view>
    </wd-sticky>
    <BaseLoading :loading="loading" v-if="loading && !list.length" />
    <view class="container" v-else>
      <view v-for="i in list" :key="i.driverId">
        <wd-card>
          <template #title>
            <view style="display: flex; text-align: right;">
              <view class="flex-col-c">
                <view class="name">{{ i.driverName }}</view>
                <view class="sex">
                  <wd-tag type="primary" v-if="i.driverSexName">{{ i.driverSexName }}</wd-tag>
                </view>
              </view>
              <view class="right">
                <!-- <wd-tag type="success" mark>在岗</wd-tag> -->
              </view>
            </view>
          </template>
          <view class="content">
            <view style="display: flex; justify-content: space-between;">
              <!-- <view class="content-item">
                <view class="label">准驾车型：</view>
                <view class="value">A1</view>
              </view> -->
              <view class="content-item">
                <view class="label">手机号码：</view>
                <view class="value">{{ i.mobile }}</view>
              </view>
            </view>
            <view class="content-item pd">
              <view class="label">单位：</view>
              <view class="value">{{ i.deptName }}</view>
            </view>
          </view>
        </wd-card>

      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>

    <wd-status-tip v-if="!loading && total == 0" image="/static/content.png" tip="暂无列表" />
  </view>
</template>

<style lang="scss" scoped>
.driver-page {
  ::v-deep .wd-card__title-content {
    padding: 20rpx 0;
  }

  .container {
    .name {
      color: #597fe8;
    }

    .sex {
      margin-left: 12rpx;
    }

    .content {
      .content-item {
        display: flex;

        .value {
          color: #333;
        }
      }
    }

    .pd {
      padding: 12rpx 0;
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
