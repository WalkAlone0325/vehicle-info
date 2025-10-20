<script setup>
import { ref } from 'vue'
import { getOilDetail, getDictApi, putOil, postOil, getEndOrderList, getCarListApi, getUserListApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'

const info = uni.getStorageSync('user')
const options = ref([])
const loading = ref(false)
const form = ref(null)
const defaultValueDate = ref(Date.now())
const model = ref({
  refuelVehicleId: '',
  refuelPlateNumber: '',
  refuelUserId: info.userId ||'',
  refuelUserName: info.userName || '',
  refuelDate: Date.now(),
  vehicleMileage: '',
  refuelFuelQuantity: '',
  refuelFuelPrice: '',
  refuelTotalPrice: '',
  refuelPaymentMethodCode: '',
  refuelPlateNumberPictureId: '',
  vehicleMileagePictureId: '',
  refuelMachinePictureId: '',
  files1: [],
  files2: [],
  files3: [],
})
const rules = ref({
  refuelVehicleId: [{ required: true, message: '请选择加油车辆' }],
  refuelPlateNumber: [{ required: true, message: '请输入加油车牌号' }],
  refuelUserId: [{ required: true, message: '请选择加油司机' }],
  refuelDate: [{ required: true, message: '请选择加油日期' }],
  vehicleMileage: [{ required: true, message: '请输入加油里程' }],
  refuelFuelQuantity: [{ required: true, message: '请输入加油量' }],
  refuelFuelPrice: [{ required: true, message: '请输入加油单价' }],
  refuelTotalPrice: [{ required: true, message: '请输入加油总价' }],
  refuelPaymentMethodCode: [{ required: true, message: '请选择加油支付方式' }],
  refuelPlateNumberPictureId: [{ required: true, message: '请上传加油车牌号图片' }],
  vehicleMileagePictureId: [{ required: true, message: '请上传加油里程图片' }],
  refuelMachinePictureId: [{ required: true, message: '请上传加油机器图片' }],
})
const getDetail = async (id) => {
  const res = await getOilDetail(id)
  model.value = {
    ...res.data,
    files1: res.data.refuelPlateNumberPictureId ? [{ ossId: res.data.refuelPlateNumberPictureId, url: res.data.refuelPlateNumberPictureUrl }] : [],
    files2: res.data.vehicleMileagePictureId ? [{ ossId: res.data.vehicleMileagePictureId, url: res.data.vehicleMileagePictureUrl }] : [],
    files3: res.data.refuelMachinePictureId ? [{ ossId: res.data.refuelMachinePictureId, url: res.data.refuelMachinePictureUrl }] : [],
  }
}

// 车辆
const carOptions = ref([])
const getCar = async () => {
  const res = await getCarListApi({ vehicleStatusCode: 'NORMAL', order: 'asc' }) // vehicleTypeCode: model.value.vehicleTypeCode
  carOptions.value = res.rows.map(i => ({ ...i, label: `${i.plateNumber} ${i.vehicleTypeName || ''} ${i.brandModel || ''} ${i.deptName || ''}` }))
}

// 申请人
const userOptions = ref([])
const getUser = async () => {
  const res = await getUserListApi({ order: 'asc' })
  userOptions.value = res.rows.map(i => ({ ...i, label: `${i.userName} (${i.nickName || ''}) ${i.phonenumber || ''}` }))
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
        if (model.value.refuelWorkOrderId) {
          res = await putOil({
            refuelVehicleId: model.value.refuelVehicleId,
            refuelPlateNumber: model.value.refuelPlateNumber,
            refuelUserId: model.value.refuelUserId,
            refuelUserName: model.value.refuelUserName,
            refuelDate: model.value.refuelDate,
            vehicleMileage: model.value.vehicleMileage,
            refuelFuelQuantity: model.value.refuelFuelQuantity,
            refuelFuelPrice: model.value.refuelFuelPrice,
            refuelTotalPrice: model.value.refuelTotalPrice,
            refuelPaymentMethodCode: model.value.refuelPaymentMethodCode,
            refuelPlateNumberPictureId: model.value.refuelPlateNumberPictureId,
            vehicleMileagePictureId: model.value.vehicleMileagePictureId,
            refuelMachinePictureId: model.value.refuelMachinePictureId,
            refuelWorkOrderId: model.value.refuelWorkOrderId,
          })
        } else {
          res = await postOil(model.value)
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

onLoad(async (param) => {
  if (param.id) {
    getDetail(param.id)
  }
  await getDict('refuel_payment_method')
  getCar()
  getUser()
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <view class="form-con">
        <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
          <wd-cell-group border>
            <wd-select-picker type="radio" value-key="vehicleId" label-key="label" label-width="100px"
              prop="refuelVehicleId" label="加油车辆" placeholder="请选择加油车辆"
              v-model="model.refuelVehicleId" :columns="carOptions" filterable :show-confirm="false" />
            <wd-select-picker type="radio" value-key="userId" label-key="label" label-width="100px" prop="refuelUserId"
              label="加油用户" placeholder="请选择加油用户" v-model="model.refuelUserId" :columns="userOptions" filterable
              :show-confirm="false" />
            <wd-datetime-picker label="加油时间" label-width="100px" placeholder="请选择加油时间" prop="refuelDate"
              v-model="model.refuelDate" @open="openDatePicker" />
            <wd-input type="number" label="车辆公里数" label-width="100px" prop="vehicleMileage"
              v-model="model.vehicleMileage" placeholder="请输入车辆公里数" />
            <wd-input type="number" label="车辆加油量（升）" label-width="100px" prop="refuelFuelQuantity"
              v-model="model.refuelFuelQuantity" placeholder="请输入车辆加油量（升）" />
            <wd-input type="number" label="油站单价（元）" label-width="100px" prop="refuelFuelPrice"
              v-model="model.refuelFuelPrice" placeholder="请输入油站单价（元）" />
            <wd-input type="number" label="加油总价（元）" label-width="100px" prop="refuelTotalPrice"
              v-model="model.refuelTotalPrice" placeholder="请输入加油总价（元）" />
            <wd-picker label="支付方式" placeholder="请选择支付方式" value-key="dictValue" label-key="dictLabel"
              label-width="100px" prop="refuelPaymentMethodCode" v-model="model.refuelPaymentMethodCode"
              :columns="options" />
            <wd-cell title="加油车辆图片" title-width="100px" prop="fileList">
              <BaseUpload :file-list="model.files1"
                @remove="removeUpload('refuelPlateNumberPictureId')"
                @update:fileList="(...args) => changeUpload(...args, 'refuelPlateNumberPictureId')" />
            </wd-cell>
            <wd-cell title="车辆公里数图片" title-width="100px" prop="fileList">
              <BaseUpload :file-list="model.files2"
                @remove="removeUpload('vehicleMileagePictureId')"
                @update:fileList="(...args) => changeUpload(...args, 'vehicleMileagePictureId')" />
            </wd-cell>
            <wd-cell title="加油机图片" title-width="100px" prop="fileList">
              <BaseUpload :file-list="model.files3"
                @remove="removeUpload('refuelMachinePictureId')"
                @update:fileList="(...args) => changeUpload(...args, 'refuelMachinePictureId')" />
            </wd-cell>
          </wd-cell-group>
          <view class="footer">
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
  }

  .form-con {
    height: 30vh;
    background-color: #fff;
  }
}
</style>
