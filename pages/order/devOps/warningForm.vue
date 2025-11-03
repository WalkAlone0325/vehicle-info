<script setup>
import { ref } from 'vue'
import { getWarningDetail, getDictApi, putWarning, postWarning, getCarListApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const carOptions = ref([])
const dict = ref({})
const loading = ref(false)
const form = ref(null)
const model = ref({
  vehicleId: '',
  plateNumber: '', // 车拍
  maintenanceRecordTypeCode: '',
  maintenanceDate: '', // 保养日期
  maintenanceStatusCode: '', // 状态
  remark: '',
  maintenanceWarningCycleId: ''
})
const rules = ref({
  maintenanceRecordTypeCode: [
    { required: true, message: '请选择保养类型' },
  ],
  maintenanceDate: [
    { required: true, message: '请选择待保养日期' }
  ],
  maintenanceStatusCode: [
    { required: true, message: '请选择告警状态' }
  ],
  vehicleId: [
    { required: true, message: '请选择车辆车牌' }
  ]
})

const getCar = async () => {
  const res = await getCarListApi({ order: 'asc' })
  carOptions.value = res.rows
}
const handleCarChange = ({ value }) => {
  const car = carOptions.value.find(item => item.vehicleId === value)
  model.value.plateNumber = car.plateNumber
}

const getDetail = async (id) => {
  const res = await getWarningDetail(id)
  model.value = res.data
}

const getDict = async (code) => {
  const res = await getDictApi(code)
  dict.value[code] = res.data
}

const handleSubmit = () => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        let res
        if (model.value.maintenanceWarningId) {
          res = await putWarning(model.value)
        } else {
          res = await postWarning(model.value)
        }
        if (res.code == 200) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000,
            success: () => {
              setTimeout(() => {
                loading.value = false
                uni.navigateBack({
                  delta: 1
                })
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

onLoad((param) => {
  if (param.id) {
    getDetail(param.id)
  }
  getCar()
  getDict('vehicle_maintenance_record_type')
  getDict('sys_notice_status')
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <wd-cell-group border>
          <wd-select-picker type="radio" value-key="vehicleId" label-key="plateNumber"
            label-width="100px" prop="vehicleId" label="车辆车牌" placeholder="请选择车辆车牌"
            v-model="model.vehicleId" :columns="carOptions" @change="handleCarChange" filterable
            :show-confirm="false" />
          <wd-picker label="保养类型" placeholder="请选择保养类型" value-key="dictValue" label-key="dictLabel" label-width="100px"
            prop="maintenanceRecordTypeCode" v-model="model.maintenanceRecordTypeCode" :columns="dict.vehicle_maintenance_record_type" />
          <wd-datetime-picker label="待保养日期" type="date" label-width="100px" placeholder="请选择待保养日期" prop="maintenanceDate" v-model="model.maintenanceDate" />
          <wd-picker label="告警状态" placeholder="请选择告警状态" value-key="dictValue" label-key="dictLabel" label-width="100px"
            prop="maintenanceStatusCode" v-model="model.maintenanceStatusCode" :columns="dict.sys_notice_status" />
          <wd-input label="备注" label-width="100px" prop="remark" clearable v-model="model.remark" placeholder="请输入备注" />

        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" :loading="loading" block @click="handleSubmit">保存</wd-button>
        </view>
      </wd-form>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  .footer {
    padding: 30rpx;
  }
}
</style>
