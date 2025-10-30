<script setup>
import { ref } from 'vue'
import { getCarListApi, getRecordDetail, putRecord, postRecord, getDictApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const carOptions = ref([])
const dict = ref({})
const loading = ref(false)
const form = ref(null)
const model = ref({
  vehicleId: '',
  plateNumber: '', // 车拍
  maintenanceRecordTypeCode: '', // 保养类型
  maintenanceDate: '', // 保养日期
  maintenanceValidDate: '', // 有效日期（月）
  maintenanceContent: '', // 保养内容
  remark: '',
})
const rules = ref({
  vehicleId: [
    { required: true, message: '请选择车辆车牌' }
  ],
  maintenanceRecordTypeCode: [
    { required: true, message: '请选择保养类型' }
  ],
  maintenanceDate: [
    { required: true, message: '请选择保养日期' }
  ],
  maintenanceValidDate: [
    { required: true, message: '请输入有效日期（月）' }
  ],
  maintenanceContent: [
    { required: true, message: '请输入保养内容' }
  ]
})

const getCar = async () => {
  const res = await getCarListApi({ vehicleStatusCode: 'NORMAL' })
  carOptions.value = res.rows
}
const handleCarChange = ({ value }) => {
  const car = carOptions.value.find(item => item.vehicleId === value)
  model.value.plateNumber = car.plateNumber
}

const getDetail = async (id) => {
  const res = await getRecordDetail(id)
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
        if (model.value.maintenanceRecordId) {
          res = await putRecord(model.value)
        } else {
          res = await postRecord(model.value)
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
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <wd-cell-group border>
          <wd-select-picker clearable type="radio" value-key="vehicleId" label-key="plateNumber"
            label-width="100px" prop="vehicleId" label="车辆车牌" placeholder="请选择车辆车牌"
            v-model="model.vehicleId" :columns="carOptions" @change="handleCarChange" filterable
            :show-confirm="false" />
          <wd-picker clearable label="保养类型" placeholder="请选择保养类型" value-key="dictValue" label-key="dictLabel" label-width="100px"
            prop="maintenanceRecordTypeCode" v-model="model.maintenanceRecordTypeCode" :columns="dict.vehicle_maintenance_record_type" />
          <wd-datetime-picker clearable label="保养日期" type="date" label-width="100px" placeholder="请选择日期" prop="maintenanceDate" v-model="model.maintenanceDate" />
          <wd-input clearable type="number" label-width="120px" label="有效日期（月）" v-model="model.maintenanceValidDate" placeholder="请输入有效日期（月）" prop="maintenanceValidDate" />
          <wd-textarea label="保养内容" label-width="100px" type="textarea" v-model="model.maintenanceContent" :maxlength="300" show-word-limit placeholder="请输入保养内容" clearable prop="maintenanceContent" />
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
