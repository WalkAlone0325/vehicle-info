<script setup>
import { ref } from 'vue'
import { getOrderDetail, getDictApi, putOrder, postOrder, getEndOrderList, getCarListApi, getDriverListApi, getUserListApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/utils/request'
import { getToken } from '@/utils'

const options = ref([])
const loading = ref(false)
const form = ref(null)
const model = ref({
  collectDriverId: '',
  collectDriverName: '',
  collectMileage: '',
  collectMileagePictureId: '',
  collectPlateNumber: '',
  collectPlateNumberPictureId: '',
  collectVehicleId: '',
  useCarWorkOrderId: '',
  workOrdeStatusCode: 'waiting_collect',
  returnedDriverId: '',
  returnedDriverName: '',
  returnedMileage: '',
  returnedMileagePictureId: '',

  files1: [],
  files2: [],
})
const rules = ref({
  collectDriverId: [{ required: true, message: '请选择取车司机', trigger: 'blur' }],
  collectDriverName: [{ required: true, message: '请输入取车司机姓名', trigger: 'blur' }],
  collectMileage: [{ required: true, message: '请输入取车里程', trigger: 'blur' }],
  collectMileagePictureId: [{ required: true, message: '请上传取车里程照片', trigger: 'blur' }],
  returnedDriverId: [{ required: true, message: '请选择还车司机', trigger: 'blur' }],
  returnedDriverName: [{ required: true, message: '请输入还车司机姓名', trigger: 'blur' }],
  returnedMileage: [{ required: true, message: '请输入还车里程', trigger: 'blur' }],
  returnedMileagePictureId: [{ required: true, message: '请上传还车里程照片', trigger: 'blur' }],
})
const getDetail = async (id) => {
  const res = await getOrderDetail(id)
  model.value = {
    ...res.data,
    files1: res.data.collectPlateNumberPictureId ? [{ ossId: res.data.collectPlateNumberPictureId, url: res.data.collectPlateNumberPictureUrl }] : [],
    files2: res.data.collectMileagePictureId ? [{ ossId: res.data.collectMileagePictureId, url: res.data.collectMileagePictureUrl }] : [],
    files3: res.data.returnedMileagePictureId ? [{ ossId: res.data.returnedMileagePictureId, url: res.data.returnedMileagePictureUrl }] : [],
  }
}

const list = ref([])
const getList = async () => {
  const res = await getEndOrderList()
  list.value = res.rows.map(i => ({ ...i, str: `${i.expectedPlateNumber} ${i.expectedDriverName} / ${i.approvePlateNumber || ''} ${i.approveDriverName || ''}` }))
}
// 车辆
const carOptions = ref([])
const getCar = async () => {
  const res = await getCarListApi({ vehicleStatusCode: 'NORMAL', vehicleTypeCode: model.value.vehicleTypeCode })
  carOptions.value = res.rows
}

// 司机
const driverOptions = ref([])
const getDriver = async () => {
  const res = await getDriverListApi()
  driverOptions.value = res.rows
}

// 申请人
const userOptions = ref([])
const getUser = async () => {
  const res = await getUserListApi()
  userOptions.value = res.rows
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
        let data = {}
        if (model.value.useCarWorkOrderId) {
          if (type.value === 'collect') {
            // 领车
            data = {
              collectDriverId: model.value.collectDriverId,
              collectDriverName: model.value.collectDriverName,
              collectMileage: model.value.collectMileage,
              collectMileagePictureId: model.value.collectMileagePictureId,
              collectPlateNumber: model.value.collectPlateNumber,
              collectPlateNumberPictureId: model.value.collectPlateNumberPictureId,
              collectVehicleId: model.value.collectVehicleId,
              useCarWorkOrderId: model.value.useCarWorkOrderId,
              workOrdeStatusCode: 'collect',
            }
          } else if (type.value === 'returned') {
            // 还车
            data = {
              workOrdeStatusCode: 'returned',
              useCarWorkOrderId: model.value.useCarWorkOrderId,
              collectPlateNumber: model.value.collectPlateNumber,
              collectDriverName: model.value.collectDriverName,
              collectMileage: model.value.collectMileage,
              returnedDriverId: model.value.returnedDriverId,
              returnedDriverName: model.value.returnedDriverName,
              returnedMileage: model.value.returnedMileage,
              returnedMileagePictureId: model.value.returnedMileagePictureId,
            }
          }
          res = await putOrder(data)
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

const type = ref('')
onLoad((param) => {
  type.value = param.type
  if (param.id) {
    getDetail(param.id)
  }
  getDict('work_orde_status')
  getList()
  getCar()
  getDriver()
  getUser()
})
</script>

<template>
  <view class="info-page">
    <BaseForm>
      <view class="form-con">
        <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
          <wd-cell-group border>
            <wd-input clearable type="number" label="用车工单编号" label-width="100px" prop="useCarWorkOrderId"
              v-model="model.useCarWorkOrderId" placeholder="请输入用车工单编号" disabled />

            <wd-select-picker clearable :disabled="type === 'returned'" type="radio" value-key="vehicleId" label-key="plateNumber" label-width="100px"
              prop="collectVehicleId" label="领取车辆" placeholder="请选择领取车辆" v-model="model.collectVehicleId"
              :columns="carOptions" filterable :show-confirm="false" />

            <wd-select-picker clearable :disabled="type === 'returned'" type="radio" value-key="driverId" label-key="driverName" label-width="100px"
              prop="collectDriverId" label="领车司机" placeholder="请选择领车司机" v-model="model.collectDriverId"
              :columns="driverOptions" filterable :show-confirm="false" />
            <wd-input clearable :disabled="type === 'returned'" type="number" label="领车里程" label-width="100px" prop="collectMileage"
              v-model="model.collectMileage" placeholder="请输入领车里程" />

            <view v-if="type === 'collect'">
              <wd-cell title="领取车辆照片" title-width="100px" prop="fileList">
                <BaseUpload :file-list="model.files1"
                  @update:fileList="(...args) => changeUpload(...args, 'collectPlateNumberPictureId')" />
              </wd-cell>

              <wd-cell title="领车里程图片" title-width="100px" prop="fileList">
                <BaseUpload :file-list="model.files2"
                  @update:fileList="(...args) => changeUpload(...args, 'collectMileagePictureId')" />
              </wd-cell>
            </view>

            <view v-if="type === 'returned'">
              <wd-select-picker clearable type="radio" value-key="driverId" label-key="driverName" label-width="100px"
                prop="returnedDriverId" label="还车司机" placeholder="请选择还车司机" v-model="model.returnedDriverId"
                :columns="driverOptions" filterable :show-confirm="false" />

              <wd-input clearable type="number" label="还车里程" label-width="100px" prop="returnedMileage"
                v-model="model.returnedMileage" placeholder="请输入还车里程" />

              <wd-cell title="还车里程图片" title-width="100px" prop="fileList">
                <BaseUpload :file-list="model.files3"
                  @update:fileList="(...args) => changeUpload(...args, 'returnedMileagePictureId')" />
              </wd-cell>
            </view>
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
