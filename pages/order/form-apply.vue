<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getDictApi, postFeeApplyApi } from '@/api';

  const form = ref()
  const model = ref({
    amount: '',
    feeDate: '',
    feeDescribe: '',
    feeTypeCode: '',
    plateNumber: '',
    vehicleId: '',
    remark: '',
    applicantUserId: '',
    applicantUserName: ''
  })
  const rules = ref({})
  const typeOptions = ref([])

  const getDict = async () => {
    const res = await getDictApi('fee_type')
    typeOptions.value = res.data
  }

  const handleSubmit = () => {
    form.value
      .validate()
      .then(async ({ valid, errors }) => {
        console.log(valid, model)
        console.log(errors)
        await postFeeApplyApi(model.value)
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }

  onMounted(() => {
    getDict()
  })
</script>

<template>
  <!-- 费用申请 -->
  <view class="form-apply-page">
    <BaseForm>
      <wd-form ref="form" :model="model" :rules="rules">

        <wd-picker label="车辆" placeholder="请选择车辆" value-key="dictValue" label-key="dictLabel" label-width="100px"
          prop="vehicleId" v-model="model.vehicleId" :columns="typeOptions" />

        <wd-picker label="费用类型" placeholder="请选择费用类型" value-key="dictValue" label-key="dictLabel" label-width="100px"
          prop="feeTypeCode" v-model="model.feeTypeCode" :columns="typeOptions" />

        <wd-datetime-picker type="date" label="费用产生日期" label-width="100px" placeholder="请选择时间" prop="feeDate"
          v-model="model.feeDate" />

        <wd-input label="费用金额" label-width="100px" prop="amount" clearable v-model="model.amount"
          placeholder="请输入费用金额" />
        <wd-textarea label="费用描述" label-width="100px" prop="feeDescribe" clearable v-model="model.feeDescribe"
          placeholder="请输入费用描述" :maxlength="200" auto-height show-word-limit type="textarea" />
        <wd-input label="备注" label-width="100px" prop="remark" clearable v-model="model.remark" placeholder="请输入备注" />

        <view class="footer">
          <wd-button type="primary" block @click="handleSubmit">保存</wd-button>
        </view>
      </wd-form>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
</style>