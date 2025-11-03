<script setup>
import { computed, onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils'
import { getCarListApi, getDictApi, getDriverListApi, putOrderDraftApi, postOrderApplyApi, postApprove, getOrderDetailApi } from '@/api'

const curType = ref('')
const defaultValueDate = ref(Date.now())
const curId = ref('')
const form = ref(null)
const approveForm = ref(null)
const model = ref({
  vehicleTypeCode: '',
  vehicleTypeName: '', // 车辆类型
  expectedVehicleId: '', // 车辆id
  expectedPlateNumber: '', // 车牌
  expectedDriverName: '', // 司机
  expectedDriverId: '',
  destination: '', // 目的地信息
  applicantContent: '', // 申请内容
  planStartTime: '',
  planEndTime: '',
  remark: '',
  orderStatusCode: 'pending',
})
const rules = ref({
  vehicleTypeCode: [{ required: true, message: '请选择车辆类型' }],
  expectedDriverName: [{ required: true, message: '请选择期望司机' }],
  expectedPlateNumber: [{ required: true, message: '请选择期望车辆' }],
  destination: [{ required: true, message: '请输入目的地信息' }],
  applicantContent: [{ required: true, message: '请输入申请内容' }],
  planStartTime: [{ required: true, message: '请选择用车开始时间' }],
  planEndTime: [{ required: true, message: '请选择用车结束时间' }],
})

  // 审批
const approveModel = ref({
  approvalCause: undefined,
  approvalResultCode: undefined,
  approveDriverId: undefined,
  approveDriverName: undefined,
  approvePlateNumber: undefined,
  approveVehicleId: undefined,
  useCarApplicationOrderId: undefined
})

const approveRules = ref({
  approvalCause: [{ required: true, message: '请输入审批原因' }],
  approveDriverId: [{ required: true, message: '请选择审批司机' }],
  approveVehicleId: [{ required: true, message: '请选择审批车辆' }],
})

// 数据
const typeOptions = ref([])
const carOptions = ref([])
const driverOptions = ref([])

// 存为草稿
const handleDraft = () => {
  form.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const res = await postOrderApplyApi({ ...model.value, orderStatusCode: 'draft' })
      if (res.code === 200) {
        uni.showToast({ title: '草稿保存成功', icon: 'success' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}
const handlePublish = () => {
  form.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      if(model.value.useCarApplicationOrderId) {
        const res = await putOrderDraftApi({
          ...model.value,
          planStartTime: formatDate(model.value.planStartTime),
          planEndTime: formatDate(model.value.planEndTime),
          orderStatusCode: 'pending'
        })
        if(res.code === 200) {
          uni.showToast({ title: '提交成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      } else {
        const res = await postOrderApplyApi({
          ...model.value,
          planStartTime: formatDate(model.value.planStartTime),
          planEndTime: formatDate(model.value.planEndTime),
          orderStatusCode: 'pending'
        })
        if (res.code === 200) {
          uni.showToast({ title: '提交成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}

// 可编辑
const canEdit = computed(() => !(curType.value !== 'history' && curType.value !== 'approve'))

const getDict = async () => {
  const res = await getDictApi('vehicle_type')
  typeOptions.value = res.data
}
// 车辆
const getCar = async () => {
  const res = await getCarListApi({ order: 'asc', vehicleTypeCode: model.value.vehicleTypeCode })
  carOptions.value = res.rows
}
// 司机
const getDriver = async () => {
  const res = await getDriverListApi()
  driverOptions.value = res.rows
}

// 改变车辆类型
const changeCarType = ({ value }) => {
  const find = typeOptions.value.find(item => item.dictValue == value)
  model.value.vehicleTypeName = find ? find.dictLabel : ''
  getCar()
}

const handleDriverChange = ({ value }) => {
  const driver = driverOptions.value.find(item => item.driverId === value)
  model.value.expectedDriverName = driver.driverName
}
const handleCarChange = ({ value }) => {
  const car = carOptions.value.find(item => item.vehicleId === value)
  model.value.expectedPlateNumber = car.plateNumber
  model.value.expectedDriverName = car.driverName
  model.value.expectedDriverId = car.driverId
}

// 获取详情
const getOrderDetail = async (id) => {
  const res = await getOrderDetailApi(id)
  model.value = res.data
  approveModel.value.useCarApplicationOrderId = res.data.useCarApplicationOrderId
  approveModel.value.approveDriverId = res.data.expectedDriverId
  approveModel.value.approveVehicleId = res.data.expectedVehicleId
  approveModel.value.approveDriverName = res.data.expectedDriverName
  approveModel.value.approvePlateNumber = res.data.expectedPlateNumber
  changeCarType({value: res.data.vehicleTypeCode})
}

// 时间
const openDatePicker = (type) => {
  defaultValueDate.value = model.value[type === 1 ? 'planStartTime' : 'planEndTime'] || Date.now()
  console.log(defaultValueDate.value)
}

onMounted(() => {
  getDict()
  getDriver()
})

// 加载
onLoad((param) => {
  console.log(param)
  curType.value = param.type
  curId.value = param.id
  if (curId.value) {
    getOrderDetail(curId.value)
  }
})


// 审批
const handleApproveDriverChange = ({ value }) => {
  const driver = driverOptions.value.find(item => item.driverId === value)
  approveModel.value.approveDriverName = driver.driverName
}
const handleApproveCarChange = ({ value }) => {
  const car = carOptions.value.find(item => item.vehicleId === value)
  approveModel.value.approvePlateNumber = car.plateNumber
  approveModel.value.approveDriverName = car.driverName
  approveModel.value.approveDriverId = car.driverId
}

const handleApprove = (status) => {
  approveForm.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const res = await postApprove({
        ...approveModel.value,
        approvalResultCode: status,
      })
      if (res.code === 200) {
        uni.showToast({ title: '审批成功', icon: 'success' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<template>
  <view class="order-form-page">
    <wd-message-box />
    <wd-toast />
    <view style="height: 2rpx;"></view>
    <BaseForm group>
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <view class="group-con">
          <wd-cell-group title="基础信息" border>
            <wd-picker @confirm="changeCarType" :disabled="canEdit" label="车辆类型" placeholder="请选择车辆类型" value-key="dictValue"
              label-key="dictLabel" label-width="100px" prop="vehicleTypeCode" v-model="model.vehicleTypeCode"
              :columns="typeOptions" />
            <wd-select-picker :disabled="canEdit" type="radio" value-key="vehicleId" label-key="plateNumber"
              label-width="100px" prop="expectedPlateNumber" label="期望车辆" placeholder="请选择期望车辆"
              v-model="model.expectedVehicleId" :columns="carOptions" @change="handleCarChange" filterable
              :show-confirm="false" />
            <wd-select-picker :disabled="canEdit" type="radio" value-key="driverId" label-key="driverName"
              label-width="100px" prop="expectedPlateNumber" label="期望司机" placeholder="请选择期望司机"
              v-model="model.expectedDriverId" :columns="driverOptions" @change="handleDriverChange" filterable
              :show-confirm="false" />

            <wd-datetime-picker @open="openDatePicker" :disabled="canEdit" :default-value="defaultValueDate" label="用车开始时间"
              label-width="100px" placeholder="请选择时间" prop="planStartTime" v-model="model.planStartTime" />
            <wd-datetime-picker @open="openDatePicker(2)" :disabled="canEdit" :default-value="defaultValueDate"
              label="用车结束时间" label-width="100px" placeholder="请选择时间" prop="planEndTime" v-model="model.planEndTime" />

            <wd-input label="目的地信息" :disabled="canEdit" label-width="100px" prop="destination" clearable
              v-model="model.destination" placeholder="请输入目的地信息" />
            <wd-textarea :disabled="canEdit" label="申请内容" label-width="100px" prop="applicantContent" clearable
              v-model="model.applicantContent" placeholder="请输入申请内容" :maxlength="200" auto-height show-word-limit
              type="textarea" />
            <wd-input :disabled="canEdit" label="备注" label-width="100px" prop="remark" clearable v-model="model.remark"
              placeholder="请输入备注" />
          </wd-cell-group>
        </view>

        <view class="footer" v-if="curType === 'draft' || !curType">
          <wd-button type="warning" v-if="curType !== 'draft'" @click="handleDraft">保存草稿</wd-button>
          <view class="mg"></view>
          <wd-button type="primary" @click="handlePublish">保存发布</wd-button>
        </view>
      </wd-form>

      <wd-form ref="approveForm" :model="approveModel" :rules="approveRules" errorType="toast">
        <view class="group-con" v-if="curType === 'approve' || curType === 'history'">
          <wd-cell-group title="审批信息" border>
            <wd-select-picker :disabled="curType === 'history'" type="radio" value-key="vehicleId" label-key="plateNumber" label-width="100px"
              prop="approveVehicleId" label="审批车辆" placeholder="请选择审批车辆" v-model="approveModel.approveVehicleId"
              :columns="carOptions" @change="handleApproveCarChange" filterable :show-confirm="false" />
            <wd-select-picker :disabled="curType === 'history'" type="radio" value-key="driverId" label-key="driverName" label-width="100px"
              prop="approveDriverId" label="审批司机" placeholder="请选择审批司机" v-model="approveModel.approveDriverId"
              :columns="driverOptions" @change="handleApproveDriverChange" filterable :show-confirm="false" />
            <wd-textarea :disabled="curType === 'history'" label="审批内容" label-width="100px" prop="approvalCause" clearable v-model="approveModel.approvalCause"
              placeholder="请输入审批内容" :maxlength="200" auto-height show-word-limit type="textarea" />
            <wd-input v-if="curType === 'history'" label="审核状态" :disabled="true" label-width="100px" prop="orderStatusName" clearable
              v-model="model.orderStatusName" placeholder="" />
          </wd-cell-group>

          <view class="footer" v-if="curType === 'approve'">
            <wd-button type="warning" @click="handleApprove('pass')">通过</wd-button>
            <view class="mg"></view>
            <wd-button type="primary" @click="handleApprove('refuse')">拒绝</wd-button>
          </view>
        </view>
      </wd-form>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
.order-form-page {

  .group-con {
    border-radius: 20rpx;
    padding: 20rpx 10rpx;
    background-color: #fff;
    margin-bottom: 30rpx;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;

    .mg {
      width: 40rpx;
    }
  }
}
</style>
