<script setup>
import { ref } from 'vue'
import { getPlanDetail, updatePlan } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const loading = ref(false)
const form = ref(null)
const model = ref({
  vehicleId: '',
  plateNumber: '', // 车拍
  remark: '',
  lastMaintenance: '', // 上次保养日期
  nextMaintenance: '', // 下次保养日期
  lastInspection: '', // 上次年检日期
  nextInspection: '', // 下次年检日期
  lastInsurance: '', // 上次保险日期
  nextInsurance: '' // 下次保险日期
})
const rules = ref({
  vehicleId: [
    { required: true, message: '请选择车辆车牌' }
  ],
  // lastMaintenance: [
  //   { required: true, message: '请选择上次保养日期' }
  // ], // 上次保养日期
  // nextMaintenance: [
  //   { required: true, message: '请选择下次保养日期' }
  // ], // 下次保养日期
  // lastInspection: [
  //   { required: true, message: '请选择上次年检日期' }
  // ], // 上次年检日期
  // nextInspection: [
  //   { required: true, message: '请选择下次年检日期' }
  // ], // 下次年检日期
  // lastInsurance: [
  //   { required: true, message: '请选择上次保险日期' }
  // ], // 上次保险日期
  // nextInsurance: [
  //   { required: true, message: '请选择下次保险日期' }
  // ] // 下次保险日期
})

const getDetail = async (id) => {
  const res = await getPlanDetail(id)
  model.value = res.data
}


const handleSubmit = () => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        const res = await updatePlan(model.value)
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
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <wd-cell-group border>
          <wd-input clearable label="车辆车牌" label-width="100px" prop="plateNumber" :disabled="true" v-model="model.plateNumber" placeholder="请输入备注" />

          <wd-datetime-picker clearable label="上次保养日期" type="date" label-width="100px" placeholder="请选择日期" prop="lastMaintenance" v-model="model.lastMaintenance" />
          <wd-datetime-picker clearable label="下次保养日期" type="date" label-width="100px" placeholder="请选择日期" prop="nextMaintenance" v-model="model.nextMaintenance" />

          <wd-datetime-picker clearable label="上次年检日期" type="date" label-width="100px" placeholder="请选择日期" prop="lastInspection" v-model="model.lastInspection" />
          <wd-datetime-picker clearable label="下次年检日期" type="date" label-width="100px" placeholder="请选择日期" prop="nextInspection" v-model="model.nextInspection" />

          <wd-datetime-picker clearable label="上次保险日期" type="date" label-width="100px" placeholder="请选择日期" prop="lastInsurance" v-model="model.lastInsurance" />
          <wd-datetime-picker clearable label="下次保险日期" type="date" label-width="100px" placeholder="请选择日期" prop="nextInsurance" v-model="model.nextInsurance" />

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
