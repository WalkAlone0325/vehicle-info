<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { getMileReportDetail, putMileReport, postMileReport, getCarListApi, postMileReportInfoApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import { parseTime } from '@/utils'

const defaultValueDate = ref(new Date().getTime())
const loading = ref(false)
const form = ref(null)
const model = ref({
  plateNumber: '',
  vehicleId: '',
  startMileage: '',
  endMileage: '',
  startCreateDate: '',
  endCreateDate: '',
  reimbursementMonth: '',
  remark: ''
})
const rules = ref({
  vehicleId: [{ required: true, message: '请选择车辆车牌' }],
  reimbursementMonth: [{ required: true, message: '请选择上报月份' }],
  endMileage: [{ required: true, message: '请输入上报公里' }],
  endCreateDate: [{ required: true, message: '请选择上报时间' }],
  // plateNumber: [{ required: true, message: '请输入车牌号码' }],
  startMileage: [{ required: true, message: '请输入上报公里' }],
  startCreateDate: [{ required: true, message: '请选择上月上报时间' }],
})
const isInitDetail = ref(false)
const getDetail = async (id) => {
  const res = await getMileReportDetail(id)
  model.value = {
    ...res.data,
  }
}

// 车辆
const carOptions = ref([])
const getCar = async () => {
  const res = await getCarListApi({ order: 'asc' }) // vehicleTypeCode: model.value.vehicleTypeCode
  carOptions.value = res.rows.map(i => ({ ...i, label: `${i.plateNumber} ${i.vehicleTypeName || ''} ${i.brandModel || ''}` }))
}

const handleCarConfirm = async ({ value, selectedItems }) => {
  model.value.vehicleId = value
  model.value.plateNumber = selectedItems.plateNumber
}
const handleDateConfirm = async ({ value }, key, type) => {
  await nextTick()
  console.log('🚀:>> ', value, key)
  model.value[key] = parseTime(new Date(value), type === 'month' ? '{y}-{m}' : '{y}-{m}-{d}')
  console.log('🚀:>> ', model.value[key])
}

watchEffect(() => {
  if (model.value.vehicleId && model.value.reimbursementMonth) {
    if (!isInitDetail.value) {
      const params = {
        vehicleId: model.value.vehicleId,
        reimbursementMonth: model.value.reimbursementMonth
      }
      uni.showLoading({ title: '获取信息...' })
      postMileReportInfoApi(params).then(res => {
        uni.hideLoading()
        if(res && res.data) {
          model.value.startMileage = res.data.endMileage || ''
          model.value.startCreateDate = res.data.endCreateDate || ''
        }
      })
    } else {
      isInitDetail.value = false
    }
  }
})

const handleSubmit = (type) => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        let res
        if (model.value.reimbursementMileageId) {
          res = await putMileReport({
            plateNumber: model.value.plateNumber,
            vehicleId: model.value.vehicleId,
            startMileage: model.value.startMileage,
            endMileage: model.value.endMileage,
            startCreateDate: model.value.startCreateDate,
            endCreateDate: model.value.endCreateDate,
            reimbursementMonth: model.value.reimbursementMonth,
            remark: model.value.remark,
            reimbursementMileageId: model.value.reimbursementMileageId,
          })
        } else {
          res = await postMileReport({
            ...model.value
          })
        }
        if (res.code == 200) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
            success: () => {
              setTimeout(() => {
                loading.value = false
                uni.navigateBack({ delta: 1 })
              }, 1000)
            }
          })
        }
        loading.value = false
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const disabled = ref(false)
onLoad(async (param) => {
  try {
    disabled.value = param.disabled == 'view' ? true : false
    uni.showLoading({ title: '加载中...' })
    if (param.id) {
      isInitDetail.value = true
      getDetail(param.id)
    }
    await getCar()
    uni.hideLoading()
  } catch (e) {
    uni.hideLoading()
  }
})
</script>

<template>
  <view class="info-page">
    <BaseForm group>
      <view class="form-con">
        <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
          <wd-cell-group border>
            <wd-select-picker clearable :disabled="disabled" type="radio" value-key="vehicleId" label-key="label" label-width="100px"
              prop="vehicleId" label="车辆车牌" placeholder="请选择车辆车牌" @confirm="handleCarConfirm" v-model="model.vehicleId" :columns="carOptions" filterable :show-confirm="false" />
            <wd-datetime-picker :disabled="disabled" @confirm="handleDateConfirm($event,'reimbursementMonth', 'month')" :default-value="model.reimbursementMonth || defaultValueDate" clearable v-model="model.reimbursementMonth" label="上报月份" prop="reimbursementMonth" type="year-month" placeholder="请选择上报月份" label-width="100px" />
            <wd-datetime-picker :disabled="disabled" @confirm="handleDateConfirm($event,'startCreateDate')" :default-value="model.startCreateDate || defaultValueDate" clearable v-model="model.startCreateDate" label="上月上报时间" prop="startCreateDate" type="date" placeholder="请选择上月上报时间" label-width="100px" />
            <wd-input clearable :disabled="disabled" type="digit" label="上月上报公里" label-width="100px" prop="startMileage" v-model="model.startMileage" placeholder="请输入上月上报公里" />
            <wd-input clearable :disabled="disabled" type="digit" label="上报公里" label-width="100px" prop="endMileage" v-model="model.endMileage" placeholder="请输入上报公里" />
            <wd-datetime-picker :disabled="disabled" @confirm="handleDateConfirm($event, 'endCreateDate')" :default-value="model.endCreateDate || defaultValueDate " clearable v-model="model.endCreateDate" label="上报时间" prop="endCreateDate" type="date" placeholder="请选择上报时间" label-width="100px" />
            <wd-input label="备注" :disabled="disabled" label-width="100px" prop="remark" clearable v-model="model.remark" placeholder="请输入备注" />
          </wd-cell-group>
          <view class="footer" style="padding-top: 10rpx;" v-if="!disabled">
            <wd-button type="primary" :loading="loading" @click="handleSubmit">保存</wd-button>
          </view>
        </wd-form>
      </view>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  padding-bottom: env(safe-area-inset-bottom);

  .footer {
    display: flex;
    padding: 30rpx;

    margin-top: 10rpx;
    justify-content: center;

    .mg {
      width: 40rpx;
    }
  }

  .form-con {
    height: 30vh;
    background-color: #fff;
  }
}
</style>
