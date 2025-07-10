<script setup>
import { ref } from 'vue'
import { getConfigDetail, getDictApi, putConfigDetail, postConfigDetail } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const options = ref([])
const loading = ref(false)
const form = ref(null)
const model = ref({
  maintenanceRecordTypeCode: '',
  maintenanceWarningFrontDay: '',
  remark: '',
  maintenanceWarningCycleId: ''
})
const rules = ref({
  maintenanceRecordTypeCode: [
    { required: true, message: '请选择保养类型' },
  ],
  maintenanceWarningFrontDay: [
    { required: true, message: '请输入提前告警时间（日）' },
    { min: 1, message: '提前告警时间（日）不能小于1' },
    { max: 365, message: '提前告警时间（日）不能大于365' }
  ]
})
const getDetail = async (id) => {
  const res = await getConfigDetail(id)
  model.value = res.data
}

const getDict = async (code) => {
  const res = await getDictApi(code)
  options.value = res.data
}

const handleSubmit = () => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        let res
        if (model.value.maintenanceWarningCycleId) {
          res = await putConfigDetail(model.value)
        } else {
          res = await postConfigDetail(model.value)
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
  getDict('vehicle_maintenance_record_type')
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <view class="form-con">
        <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
          <wd-cell-group border>
            <wd-picker label="保养类型" placeholder="请选择保养类型" value-key="dictValue" label-key="dictLabel" label-width="120px"
              prop="maintenanceRecordTypeCode" v-model="model.maintenanceRecordTypeCode" :columns="options" />
            <wd-input type="number" label="提前告警时间(日)" label-width="120px" prop="maintenanceWarningFrontDay" required
              v-model="model.maintenanceWarningFrontDay" placeholder="请输入提前告警时间（日）" />
            <wd-input label="备注" label-width="100px" prop="remark" clearable v-model="model.remark" placeholder="请输入备注" />
          </wd-cell-group>
          <view class="footer">
            <wd-button type="primary" :loading="loading" block @click="handleSubmit">保存</wd-button>
          </view>
        </wd-form>
      </view>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  .footer {
    padding: 30rpx;
    margin-top: 30rpx;
  }

  .form-con {
    height: 30vh;
    background-color: #fff;
  }
}
</style>
