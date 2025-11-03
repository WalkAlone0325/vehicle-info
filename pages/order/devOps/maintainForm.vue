<script setup>
import { ref } from 'vue'
import { getMaintainDetail, getDictApi, putMaintain, postMaintain, approveMaintainApi, getCarListApi, getUserListApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const info = uni.getStorageSync('user')
const options = ref([])
const loading = ref(false)
const form = ref(null)
const model = ref({
  upkeepVehicleId: '',
  upkeepPlateNumber: '',
  upkeepUserId: info.userId ||'',
  upkeepUserName: info.userName || '',
  upkeepDate: Date.now(),
  upkeepMileage: '',
  refuelTotalPrice: '',
  refuelPaymentMethodCode: '',
  upkeepPlateNumberPictureId: '',
  upkeepMileagePictureId: '',
  files1: [],
  files2: [],
})
const rules = ref({
  upkeepVehicleId: [{ required: true, message: '请选择保养车辆' }],
  upkeepPlateNumber: [{ required: true, message: '请输入保养车牌号' }],
  upkeepUserId: [{ required: true, message: '请选择保养司机' }],
  upkeepDate: [{ required: true, message: '请选择保养日期' }],
  upkeepMileage: [{ required: true, message: '请输入车辆公里数',  }],
  upkeepFuelPrice: [{ required: true, message: '请输入保养单价' }],
  upkeepTotalPrice: [{ required: true, message: '请输入保养总价' }],
  paymentMethodCode: [{ required: true, message: '请选择保养支付方式' }],
  upkeepPlateNumberPictureId: [{ required: true, message: '请上传保养车牌号图片' }],
  upkeepMileagePictureId: [{ required: true, message: '请上传保养机器图片' }],
})
const getDetail = async (id) => {
  const res = await getMaintainDetail(id)
  model.value = {
    ...res.data,
    files1: res.data.upkeepPlateNumberPictureId ? [{ ossId: res.data.upkeepPlateNumberPictureId, url: res.data.upkeepPlateNumberPictureUrl }] : [],
    files2: res.data.upkeepMileagePictureId ? [{ ossId: res.data.upkeepMileagePictureId, url: res.data.upkeepMileagePictureUrl }] : []
  }
}

// 车辆
const carOptions = ref([])
const getCar = async () => {
  const res = await getCarListApi({ order: 'asc' }) // vehicleTypeCode: model.value.vehicleTypeCode
  carOptions.value = res.rows.map(i => ({ ...i, label: `${i.plateNumber} ${i.vehicleTypeName || ''} ${i.brandModel || ''}` }))
}

// 申请人
const userOptions = ref([])
const getUser = async () => {
  const res = await getUserListApi({ order: 'asc' })
  userOptions.value = res.rows.map(i => ({ ...i, label: `${i.userName} (${i.nickName || ''})` }))
}

const getDict = async (code) => {
  const res = await getDictApi(code)
  options.value = res.data
  model.value.refuelPaymentMethodCode = model.value.refuelPaymentMethodCode || options.value[0].dictValue
}

const handleSubmit = (type) => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        let res
        if (model.value.upkeepWorkOrderId) {
          res = await putMaintain({
            upkeepVehicleId: model.value.upkeepVehicleId,
            upkeepPlateNumber: model.value.upkeepPlateNumber,
            upkeepUserId: model.value.upkeepUserId,
            upkeepUserName: model.value.upkeepUserName,
            upkeepDate: model.value.upkeepDate,
            upkeepMileage: model.value.upkeepMileage,
            upkeepFuelQuantity: model.value.upkeepFuelQuantity,
            upkeepFuelPrice: model.value.upkeepFuelPrice,
            upkeepTotalPrice: model.value.upkeepTotalPrice,
            paymentMethodCode: model.value.paymentMethodCode,
            upkeepPlateNumberPictureId: model.value.upkeepPlateNumberPictureId,
            upkeepMileagePictureId: model.value.upkeepMileagePictureId,
            upkeepWorkOrderId: model.value.upkeepWorkOrderId,
          })
        } else {
          res = await postMaintain(model.value)
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

const changeUpload = (fileList, key) => {
  model.value[key] = fileList[0].ossId
}

const removeUpload = (key) => {
  model.value[key] = ''
}

const openDatePicker = () => {
  model.value.refuelDate = new Date(model.value.refuelDate || Date.now())
}

const disabled = ref(false)
const type = ref('')
onLoad(async (param) => {
  disabled.value = param.disabled || false
  type.value = param.type || ''
  if (param.id) {
    getDetail(param.id)
  }
  await getDict('refuel_payment_method')
  getCar()
  getUser()
})

const approveForm = ref(null)
const approveModel = ref({
  approveCause: '',
})
const approveRules = {
  approveCause: [{ required: true, message: '请输入审批原因' }],
}
const handleApprove = async (statusCode) => {
  approveForm.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      loading.value = true
      const res = await approveMaintainApi({
        upkeepWorkOrderId: model.value.upkeepWorkOrderId,
        statusCode,
        ...approveModel.value,
      })
      if (res.code == 200) {
        uni.showToast({
          title: statusCode == 'pass' ? '审批通过' : '审批拒绝',
          icon: statusCode == 'pass' ? 'success' : 'error',
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
}
</script>

<template>
  <view class="info-page">
    <BaseForm group>
      <view class="form-con">
        <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
          <wd-cell-group border>
            <wd-select-picker clearable :disabled="disabled" type="radio" value-key="vehicleId" label-key="label" label-width="100px"
              prop="upkeepVehicleId" label="保养车辆" placeholder="请选择保养车辆"
              v-model="model.upkeepVehicleId" :columns="carOptions" filterable :show-confirm="false" />
            <wd-select-picker readonly :disabled="disabled" type="radio" value-key="userId" label-key="label" label-width="100px" prop="upkeepUserId"
              label="保养用户" placeholder="请选择保养用户" v-model="model.upkeepUserId" :columns="userOptions" filterable
              :show-confirm="false" />
            <wd-datetime-picker clearable :disabled="disabled" label="保养时间" label-width="100px" placeholder="请选择保养时间" prop="upkeepDate"
              v-model="model.upkeepDate" @open="openDatePicker" />
            <wd-input clearable :disabled="disabled" type="digit" label="车辆公里数" label-width="100px" prop="upkeepMileage"
              v-model="model.upkeepMileage" placeholder="请输入车辆公里数" />
            <wd-input clearable :disabled="disabled" type="digit" label="保养总价" label-width="100px" prop="upkeepTotalPrice"
              v-model="model.upkeepTotalPrice" placeholder="请输入保养总价（元）" />
            <wd-picker clearable :disabled="disabled" label="支付方式" placeholder="请选择支付方式" value-key="dictValue" label-key="dictLabel"
              label-width="100px" prop="paymentMethodCode" v-model="model.paymentMethodCode"
              :columns="options" />
            <wd-cell title="车辆车牌图片" title-width="100px" prop="upkeepPlateNumberPictureId">
              <BaseUpload :file-list="model.files1" :disabled="disabled"
                @remove="removeUpload('upkeepPlateNumberPictureId')"
                @update:fileList="(...args) => changeUpload(...args, 'upkeepPlateNumberPictureId')" />
            </wd-cell>
            <wd-cell title="车辆公里数图片" title-width="100px" prop="upkeepMileagePictureId">
              <BaseUpload :file-list="model.files2" :disabled="disabled"
                @remove="removeUpload('upkeepMileagePictureId')"
                @update:fileList="(...args) => changeUpload(...args, 'upkeepMileagePictureId')" />
            </wd-cell>
          </wd-cell-group>
          <view class="footer" style="padding-top: 10rpx;">
            <wd-button v-if="!disabled" type="primary" :loading="loading" @click="handleSubmit">保存</wd-button>
          </view>
        </wd-form>

        <wd-form v-if="type == 'apply'" ref="approveForm" :model="approveModel" :rules="approveRules" errorType="toast">
          <view class="group-con">
            <wd-cell-group title="审批信息" border use-slot>
              <wd-textarea label="审批原因" label-width="100px" prop="approveCause"
                clearable v-model="approveModel.approveCause" placeholder="请输入审批原因" :maxlength="200" auto-height
                show-word-limit type="textarea" :disabled="type == 'view'" />
            </wd-cell-group>

            <view class="footer">
              <wd-button type="warning" @click="handleApprove('pass')">通过</wd-button>
              <view class="mg"></view>
              <wd-button type="primary" @click="handleApprove('refuse')">拒绝</wd-button>
            </view>
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
