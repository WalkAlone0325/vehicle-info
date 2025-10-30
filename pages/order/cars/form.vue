<script setup>
import { ref } from 'vue'
import { getOrderDetail, getDictApi, putOrder, postOrder, getEndOrderList,getCarListApi,getDriverListApi,getUserListApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import http from '@/utils/request'
import { getToken } from '@/utils'

const user = uni.getStorageSync('user')
const options = ref([])
const loading = ref(false)
const form = ref(null)
const model = ref({
  collectDriverId: '',
  collectDriverName: '',
  collectVehicleId: '',
  returnedDriverId: '',
  collectPlateNumber: '',
  returnedDriverName: '',
  workOrdeStatusCode: 'waiting_collect',
  useCarApplicationOrderId: '',
  applicantUserId: user.userId,
  applicantUserName: user.userName,
  collectMileage: '',
  returnedMileage: '',
  returnedTime: '',
  collectMileagePictureId: '',
  collectPlateNumberPictureId: '',
  remark: '',
  files1: [],
  files2: [],
  files3: [],
})
const rules = ref({
  useCarApplicationOrderId: [{ required: true, message: '请选择用车申请工单' }],
})
const getDetail = async (id) => {
  const res = await getOrderDetail(id)
  model.value = {
    ...res.data,
    files1: res.data.collectPlateNumberPictureId ? [{ossId: res.data.collectPlateNumberPictureId, url: res.data.collectPlateNumberPictureUrl}] : [],
    files2: res.data.collectMileagePictureId ? [{ossId: res.data.collectMileagePictureId, url: res.data.collectMileagePictureUrl}] : [],
    files3: res.data.returnedMileagePictureId ? [{ossId: res.data.returnedMileagePictureId, url: res.data.returnedMileagePictureUrl}] : [],
  }
  handleCode({ value: model.value.useCarApplicationOrderId })
}

const list = ref([])
const getList = async () => {
  const res = await getEndOrderList({pageNum: 1, pageSize: 9999, order: 'asc'})
  list.value = res.rows.map(i => ({...i, str: `${i.expectedPlateNumber} ${i.expectedDriverName} / ${i.approvePlateNumber || ''} ${i.approveDriverName || ''}`}))
}
const handleCode = ({ value }) => {
  const find = list.value.find(item => item.useCarApplicationOrderId == value)
  console.log('🚀:>> ',list.value, find)
  model.value.collectDriverId = find.expectedDriverId
  model.value.collectDriverName = find.expectedDriverName
  model.value.collectVehicleId = find.expectedVehicleId
  model.value.collectPlateNumber = find.expectedPlateNumber
  model.value.returnedDriverId = find.approveDriverId
  model.value.returnedDriverName = find.approveDriverName
  model.value.applicantUserId = find.applicantUserId
  model.value.applicantUserName = find.applicantUserName
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

const handleSubmit = (type) => {
  form.value
    .validate()
    .then(async ({ valid, errors }) => {
      if (valid) {
        loading.value = true
        // 提交表单数据
        let res
        if (model.value.useCarWorkOrderId) {
          if(type === 'collect') {
            // 领车
            model.value.workOrdeStatusCode = 'collect'
          } else if(type === 'returned') {
            // 还车
            model.value.workOrdeStatusCode = 'returned'
          }
          res = await putOrder({
            useCarWorkOrderId: model.value.useCarWorkOrderId,
            useCarApplicationOrderId: model.value.useCarApplicationOrderId,
            collectVehicleId: model.value.collectVehicleId,
            collectPlateNumber: model.value.collectPlateNumber,
            collectPlateNumberPictureId: model.value.collectPlateNumberPictureId,
            collectDriverId: model.value.collectDriverId,
            collectDriverName: model.value.collectDriverName,
            collectMileage: model.value.collectMileage,
            collectMileagePictureId: model.value.collectMileagePictureId,
            returnedDriverId: model.value.returnedDriverId,
            returnedDriverName: model.value.returnedDriverName,
            returnedMileage: model.value.returnedMileage,
            returnedMileagePictureId: model.value.returnedMileagePictureId,
            returnedTime: model.value.returnedTime,
            workOrdeStatusCode: model.value.workOrdeStatusCode,
            applicantUserId: model.value.applicantUserId,
            applicantUserName: model.value.applicantUserName
          })
        } else {
          res = await postOrder(model.value)
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

const customUpload = (file, formData, options) => {
  const uploadTask = uni.uploadFile({
    url: http.config.baseURL + 'system/local/file/upload',
    // url: 'https://sxnmggz.com:8448/prod-api/system/oss/upload',
    header: {
      ...options.header,
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    },
    name: 'file',
    fileName: 'file',
    fileType: 'image',
    formData,
    filePath: file.url,
    success: async (res) => {
      const e = JSON.parse(res.data)
      if (e.code == 200) {
        // 设置上传成功
        options.onSuccess(e, file, formData)
        model.value.fileList = [{ url: e.data.url }]
        toast.show('上传成功')
      } else {
        // 设置上传失败
        options.onError({ ...e, errMsg: e.errMsg || '' }, file, formData)
        toast.show('上传失败')
      }
    },
    fail(err) {
      // 设置上传失败
      options.onError(err, file, formData)
    }
  })
  // 设置当前文件加载的百分比
  uploadTask.onProgressUpdate((res) => {
    options.onProgress(res, file)
  })
}

const type = ref('')
onLoad(async (param) => {
  await getList()
  type.value = param.type
  if (param.id) {
    getDetail(param.id)
  }
  getDict('work_orde_status')
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
            <wd-select-picker clearable type="radio" value-key="useCarApplicationOrderId" label-key="str"
              label-width="100px" prop="useCarApplicationOrderId" label="申请工单编号" placeholder="请选择用车申请工单编号"
              v-model="model.useCarApplicationOrderId" :columns="list" filterable @change="handleCode" :show-confirm="false" />

            <wd-select-picker clearable type="radio" value-key="vehicleId" label-key="plateNumber"
              label-width="100px" prop="collectVehicleId" label="领取车辆" placeholder="请选择领取车辆"
              v-model="model.collectVehicleId" :columns="carOptions" filterable :show-confirm="false" />

            <wd-cell title="领取车辆照片" title-width="100px" prop="fileList">
               <BaseUpload :file-list="model.files1" @update:fileList="(...args) => changeUpload(...args, 'collectPlateNumberPictureId')" />
            </wd-cell>

            <wd-select-picker clearable type="radio" value-key="driverId" label-key="driverName" label-width="100px"
              prop="collectDriverId" label="领车司机" placeholder="请选择领车司机" v-model="model.collectDriverId"
              :columns="driverOptions" filterable :show-confirm="false" />
            <wd-input clearable type="number" label="实际起始里程" label-width="100px" prop="collectMileage"
              v-model="model.collectMileage" placeholder="请输入实际起始里程" />

            <wd-cell title="实际起始里程照片" title-width="100px" prop="fileList">
               <BaseUpload :file-list="model.files2" @update:fileList="(...args) => changeUpload(...args, 'collectMileagePictureId')" />
            </wd-cell>

            <wd-select-picker clearable type="radio" value-key="driverId" label-key="driverName" label-width="100px"
              prop="returnedDriverId" label="还车司机" placeholder="请选择还车司机" v-model="model.returnedDriverId"
              :columns="driverOptions" filterable :show-confirm="false" />

            <wd-input clearable type="number" label="实际结束里程" label-width="100px" prop="returnedMileage"
              v-model="model.returnedMileage" placeholder="请输入实际结束里程" />
            <wd-datetime-picker clearable label="还车时间" label-width="100px" placeholder="请选择还车时间" prop="returnedTime" v-model="model.returnedTime" />

            <wd-cell title="实际结束里程照片" title-width="100px" prop="fileList">
               <BaseUpload :file-list="model.files3" @update:fileList="(...args) => changeUpload(...args, 'returnedMileagePictureId')" />
            </wd-cell>

            <wd-picker clearable label="工单状态" placeholder="请选择工单状态" value-key="dictValue" label-key="dictLabel" label-width="100px"
              prop="workOrdeStatusCode" v-model="model.workOrdeStatusCode" :columns="options" />

            <wd-select-picker clearable type="radio" value-key="userId" label-key="userName" label-width="100px"
              prop="applicantUserId" label="申请人" placeholder="请选择申请人" v-model="model.applicantUserId"
              :columns="userOptions" filterable :show-confirm="false" />

            <wd-input label="备注" label-width="100px" prop="remark" clearable v-model="model.remark" placeholder="请输入备注" />
          </wd-cell-group>
          <view class="footer" v-if="type !== 'returned'">
            <wd-button type="primary" :loading="loading" @click="handleSubmit">保存</wd-button>
            <!-- <view style="margin-left: 40rpx;" v-if="model.workOrdeStatusCode == 'waiting_collect'"></view>
            <wd-button type="success" v-if="model.workOrdeStatusCode == 'waiting_collect'" :loading="loading" @click="handleSubmit('collect')">领车</wd-button>
            <view style="margin-left: 40rpx;" v-if="model.workOrdeStatusCode == 'collect'"></view>
            <wd-button type="success" v-if="model.workOrdeStatusCode == 'collect'" :loading="loading" @click="handleSubmit('returned')">还车</wd-button> -->
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
