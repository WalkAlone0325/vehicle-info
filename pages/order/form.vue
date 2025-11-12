<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { formatDate } from '@/utils'
import { getCarListApi, getDriverListApi, putOrderDraftApi, postOrderApplyApi, postApprove, getOrderDetailApi } from '@/api'
import { getApplyInfoApi, getPostApi, getDictApi, getRegionApi, getCarApi, getDriverApi } from '@/api'
import { findChildrenByCode } from '@/hooks/useColPickerData'

// const { findChildrenByCode } = useColPickerData()

const curType = ref('')
const defaultValueDate = ref(Date.now())
const curId = ref('')
const form = ref(null)
const approveForm = ref(null)
const model = ref({
  applicantNickName: '', // 申请人
  applicantUserId: '', // 申请人账号
  applicantUserName: '',
  applicantDeptId: '', // 申请人公司
  applicantDeptName: '',
  applicantCompanyDeptId: '', // 申请人部门
  applicantCompanyDeptName: '',
  applicantPostId: '', // 申请人岗位
  applicantStartRegionCode: '', // 开始地点
  name1: '',
  name2: '',
  code1: [],
  code2: [],
  applicantEndRegionCode: '', // 目标地点
  applicantIsIntermarketCityCode: '', // 是否跨市
  applicantPassengersNumber: '', // 乘车人数
  planStartTime: '', // 计划开始时间
  planEndTime: '', // 计划结束时间
  applicantContent: '', // 申请内容
})
const rules = ref({
  applicantContent: [{ required: true, message: '请输入申请内容', }],
  planStartTime: [{ required: true, message: '请选择用车开始时间' }],
  planEndTime: [{ required: true, message: '请选择用车结束时间' }],
  applicantPassengersNumber: [{ required: true, message: '请输入乘车人数' }],
  applicantStartRegionCode: [{ required: true, message: '请选择开始地点' }],
  applicantEndRegionCode: [{ required: true, message: '请选择目标地点' }],
  applicantIsIntermarketCityCode: [{ required: true, message: '请选择是否跨市' }],
})

// 审批
const approveModel = ref({
  approvalCause: undefined,
  approvalResultCode: undefined,
  approveDriverId: undefined,
  approveDriverName: undefined,
  approvePlateNumber: undefined,
  approveDriverMobile: undefined,
  approveVehicleId: undefined,
  useCarApplicationOrderId: undefined
})

const approveRules = ref({
  approvalCause: [{ required: true, message: '请输入审批原因' }],
  // approveDriverId: [{ required: true, message: '请选择审批司机' }],
  // approveVehicleId: [{ required: true, message: '请选择审批车辆' }],
})

// 数据
const typeOptions = ref([])
const carOptions = ref([])
const driverOptions = ref([])

// 存为草稿
const handleDraft = () => {
  form.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const res = await postOrderApplyApi({
        ...model.value,
        planStartTime: formatDate(model.value.planStartTime),
        planEndTime: formatDate(model.value.planEndTime),
        orderStatusCode: 'draft'
      })
      if (res.code === 200) {
        uni.showToast({ title: '草稿保存成功', icon: 'success' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}
const handlePublish = () => {
  form.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      if (model.value.useCarApplicationOrderId) {
        const res = await putOrderDraftApi({
          ...model.value,
          planStartTime: formatDate(model.value.planStartTime),
          planEndTime: formatDate(model.value.planEndTime),
          orderStatusCode: 'pending'
        })
        if (res.code === 200) {
          uni.showToast({ title: '提交成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      } else {
        const res = await postOrderApplyApi({
          ...model.value,
          planStartTime: formatDate(model.value.planStartTime),
          planEndTime: formatDate(model.value.planEndTime),
          orderStatusCode: 'pending'
        })
        if (res.code === 200) {
          uni.showToast({ title: '提交成功', icon: 'success' })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}

// 可编辑
const canEdit = computed(() => !(curType.value !== 'history' && curType.value !== 'approve'))

// 申请人信息
const getInfo = async () => {
  const res = await getApplyInfoApi()
  model.value.applicantNickName = res.data.nickName
  model.value.applicantUserId = res.data.userId
  model.value.applicantDeptId = res.data.deptId
  model.value.applicantCompanyDeptId = res.data.companyDeptId
  model.value.applicantPostId = res.data.postId
  model.value.applicantUserName = res.data.username
  model.value.applicantDeptName = res.data.deptName
  model.value.applicantCompanyDeptName = res.data.companyDeptName
}

const vehicleTypeOptions = ref([])
const ynOptions = ref([])
const getDict = async (key, option) => {
  const res = await getDictApi(key)
  option.value = res.data
}

// 地点
const area = ref([[]])
const area2 = ref([[]])
const areaOptions = ref([])
const getRegion = async (payload) => {
  const res = await getRegionApi(payload)
  area.value[0] = res.data
  area2.value[0] = res.data
  areaOptions.value = res.data
}
const columnChange = async ({ selectedItem, index, resolve, finish }) => {
  if(index < 2) {
    const res = await getRegionApi({ code: selectedItem.code })
    const areaData = findChildrenByCode(area.value[index], selectedItem.code, res.data)
    if(index == 0) {
      area.value = [areaOptions.value]
    }
    if (areaData && areaData.length) {
      area.value[index + 1] = areaData
      resolve(areaData)
    } else {
      // 没有下一项时，执行完成
      finish()
    }
  } else {
    finish()
  }
}

const columnChange2 = async ({ selectedItem, index, resolve, finish }) => {
  if(index < 2) {
    const res = await getRegionApi({ code: selectedItem.code })
    const areaData = findChildrenByCode(area2.value[index], selectedItem.code, res.data)
    if(index == 0) {
      area2.value = [areaOptions.value]
    }
    if (areaData && areaData.length) {
      area2.value[index + 1] = areaData
      resolve(areaData)
    } else {
      // 没有下一项时，执行完成
      finish()
    }
  } else {
    finish()
  }
}

const handleConfirm = ({ value, selectedItems }) => {
  model.value.code1 = value
  model.value.applicantStartRegionCode = value[2]
  // model.value.applicantStartRegionName = selectedItems.map(item => item.name).join('')
}
const handleConfirm2 = ({ value, selectedItems }) => {
  model.value.code2 = value
  model.value.applicantEndRegionCode = value[2]
  // model.value.applicantEndRegionName = selectedItems.map(item => item.name).join('')
}

watchEffect(() => {
  if (!model.value.applicantStartRegionCode || !model.value.applicantEndRegionCode) {
    model.value.applicantIsIntermarketCityCode = ''
    return
  }
  const v1 = model.value.applicantStartRegionCode?.substring(0, 4)
  const v2 = model.value.applicantEndRegionCode?.substring(0, 4)
  model.value.applicantIsIntermarketCityCode = v1 === v2 ? 'N' : 'Y'
})

// 岗位
const postOptions = ref([])
const getPost = async () => {
  const res = await getPostApi()
  postOptions.value = res.data
  if (res.data.length) {
    model.value.applicantPostId = res.data[0].postId
  }
}

// 获取详情
const getOrderDetail = async (id) => {
  const res = await getOrderDetailApi(id)
  model.value = {
    ...res.data,
    code1: [res.data.applicantStartProvinceCode, res.data.applicantStartCityCode, res.data.applicantStartCountyCode],
    code2: [res.data.applicantEndProvinceCode, res.data.applicantEndCityCode, res.data.applicantEndCountyCode],
  }
  approveModel.value = {
    ...approveModel.value,
    approveDriverId: model.value.approveDriverId,
    approveVehicleId: model.value.approveVehicleId,
    approveDriverMobile: model.value.approveDriverMobile,
    approvalCause: model.value.approvalCause,
  }
  handleConfirm({ value: model.value.code1 })
  handleConfirm2({ value: model.value.code2 })
}

// 时间
const openDatePicker = (type) => {
  defaultValueDate.value = model.value[type === 1 ? 'planStartTime' : 'planEndTime'] || Date.now()
}

onMounted(() => {
  getInfo()
  getPost()
  // getDict('vehicle_type', vehicleTypeOptions)
  getDict('sys_yes_no', ynOptions)

})

// 加载
onLoad(async (param) => {
  try {
      uni.showLoading({ title: '加载中...' })
      curType.value = param.type
      curId.value = param.id
      await getRegion()
      if (curId.value) {
        await getOrderDetail(curId.value)
        if(curType.value === 'approve' || curType.value === 'history') {
          await getCar()
          await getDriver()
        }
      }
      uni.hideLoading()
    } catch (e) {
      uni.hideLoading()
    }
})


// 审批
const handleApproveDriverChange = ({ value }) => {
  const driver = driverOptions.value.find(item => item.driverId === value)
  approveModel.value.approveDriverName = driver.driverName
}
const handleApproveCarChange = ({ value }) => {
  const car = carOptions.value.find(item => item.vehicleId === value)
  approveModel.value.approvePlateNumber = car.plateNumber
  approveModel.value.approveDriverName = car.driverName
  approveModel.value.approveDriverId = car.driverId
}

const handleApprove = (status) => {
  approveForm.value.validate().then(async ({ valid, errors }) => {
    if (valid) {
      if(model.value.taskName === '车辆管理员') {
        if(!approveModel.value.approveVehicleId) {
          uni.showToast({ title: '请选择车辆', icon: 'none' })
          return
        }
        if(!approveModel.value.approveDriverId) {
          uni.showToast({ title: '请选择司机', icon: 'none' })
          return
        }
      }
      const res = await postApprove({
        ...approveModel.value,
        approvalResultCode: status,
        taskId: model.value.taskId,
        taskName: model.value.taskName,
        useCarApplicationOrderId: model.value.useCarApplicationOrderId
      })
      if (res.code === 200) {
        uni.showToast({ title: '审批成功', icon: 'success' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }
  })
    .catch((error) => {
      console.log(error, 'error')
    })
}

// 车辆
const getCar = async () => {
  const res = await getCarApi({ isIncludeCompany: 'N', deptId: model.value.applicantCompanyDeptId })
  carOptions.value = res.rows.map(item => ({
    ...item,
    label: `${item.plateNumber}（${item.brandModel}）${item.vehicleTypeName}`,
  }))
}

// 司机
const getDriver = async () => {
  const res = await getDriverApi({ isIncludeCompany: 'N', deptId: model.value.applicantCompanyDeptId })
  driverOptions.value = res.rows.map(item => ({
    ...item,
    label: `${item.driverName}（${item.driverSexName}）${item.licenseTypeName}`,
  }))
}

const clickImg = (i) => {
  uni.previewImage({
    urls: [`data:image/jpg;base64,${model.value.flowChart}`] // 单张图片的 URL 数组
  })
  // data:image/png;base64,
  // i.useCarApplicationOrderId
}
</script>

<template>
  <view class="order-form-page">
    <wd-message-box />
    <wd-toast />
    <view style="height: 2rpx;"></view>
    <BaseForm group>
      <wd-form ref="form" :model="model" :rules="rules" errorType="toast">
        <view class="group-con">
          <wd-cell-group title="基础信息" border>
            <wd-input label="申请人" label-width="100px" prop="applicantNickName" clearable
              v-model="model.applicantNickName" placeholder="请输入申请人" readonly />
            <wd-input label="申请人账号" label-width="100px" prop="applicantUserId" clearable
              v-model="model.applicantUserName" placeholder="请输入申请人账号" readonly />
            <wd-input label="申请人公司" label-width="100px" prop="applicantDeptId" clearable
              v-model="model.applicantCompanyDeptName" placeholder="请输入申请人公司" readonly />
            <wd-input label="申请人部门" label-width="100px" prop="applicantCompanyDeptId" clearable
              v-model="model.applicantDeptName" placeholder="请输入申请人部门" readonly />
            <wd-picker :readonly="canEdit" label="申请人岗位" placeholder="请选择申请人岗位" value-key="postId" label-key="postName"
              label-width="100px" prop="applicantPostId" v-model="model.applicantPostId" :columns="postOptions" />

            <wd-col-picker clearable auto-complete label-width="100px" label="开始地点" prop="applicantStartRegionCode"
              v-model="model.code1" :columns="area" :column-change="columnChange" :readonly="canEdit"
              @confirm="handleConfirm" value-key="code" label-key="name" />
            <wd-col-picker clearable auto-complete label-width="100px" label="目标地点" prop="applicantEndRegionCode"
              v-model="model.code2" :columns="area2" :column-change="columnChange2" :readonly="canEdit"
              @confirm="handleConfirm2" value-key="code" label-key="name" />
            <wd-picker :readonly="canEdit" label="是否跨市" placeholder="请选择是否跨市" value-key="dictValue"
              label-key="dictLabel" label-width="100px" prop="applicantIsIntermarketCityCode"
              v-model="model.applicantIsIntermarketCityCode" :columns="ynOptions" />
            <wd-input label="乘车人数" type="number" :readonly="canEdit" label-width="100px"
              prop="applicantPassengersNumber" clearable v-model="model.applicantPassengersNumber"
              placeholder="请输入乘车人数" />

            <wd-datetime-picker @open="openDatePicker" :readonly="canEdit" :default-value="defaultValueDate"
              label="计划开始时间" label-width="100px" placeholder="请选择时间" prop="planStartTime"
              v-model="model.planStartTime" />
            <wd-datetime-picker @open="openDatePicker(2)" :readonly="canEdit" :default-value="defaultValueDate"
              label="计划结束时间" label-width="100px" placeholder="请选择时间" prop="planEndTime" v-model="model.planEndTime" />
            <wd-textarea :readonly="canEdit" label="申请内容" label-width="100px" prop="applicantContent" clearable
              v-model="model.applicantContent" placeholder="请输入申请内容" :maxlength="200" auto-height show-word-limit
              type="textarea" />
          </wd-cell-group>
        </view>

        <view class="footer" v-if="curType === 'draft' || !curType">
          <!-- <wd-button type="warning" v-if="curType !== 'draft'" @click="handleDraft">保存草稿</wd-button> -->
          <!-- <view class="mg"></view> -->
          <wd-button type="primary" @click="handlePublish">保存发布</wd-button>
        </view>
      </wd-form>

      <wd-form ref="approveForm" :model="approveModel" :rules="approveRules" errorType="toast">
        <view class="group-con" v-if="curType === 'approve' || curType === 'history'">
          <wd-cell-group title="审批信息" border use-slot>
            <template #value>
              <view class="btn" @click="clickImg">流程图</view>
              <!-- <wd-button size="small" plain @click="clickImg">流程图</wd-button> -->
            </template>
            <wd-input v-if="model.taskName" label="任务节点" label-width="80px" prop="taskName" clearable
              v-model="model.taskName" placeholder="请输入任务节点" readonly />
            <wd-select-picker clearable :readonly="curType === 'history'" type="radio" value-key="vehicleId"
              label-key="label" label-width="80px" prop="approveVehicleId" label="派发车辆" placeholder="请选择派发车辆"
              v-model="approveModel.approveVehicleId" :columns="carOptions" @change="handleApproveCarChange" filterable :show-confirm="false" />
            <wd-select-picker clearable :readonly="curType === 'history'" type="radio" value-key="driverId" label-key="label"
              label-width="80px" prop="approveDriverId" label="车辆司机" placeholder="请选择车辆司机"
              v-model="approveModel.approveDriverId" :columns="driverOptions" @change="handleApproveDriverChange" filterable :show-confirm="false" />
            <!-- <wd-input label="联系电话" type="tel" label-width="80px" prop="approveDriverMobile" clearable
              v-model="approveModel.approveDriverMobile" placeholder="请输入联系电话" :readonly="curType === 'history'" /> -->
            <wd-textarea v-if="curType !== 'history'"  :readonly="curType === 'history'" label="审批原因" label-width="80px" prop="approvalCause"
              clearable v-model="approveModel.approvalCause" placeholder="请输入审批原因" :maxlength="200" auto-height
              show-word-limit type="textarea" />
            <wd-input v-if="curType === 'history'" label="审核状态" :readonly="true" label-width="80px"
              prop="orderStatusName" clearable v-model="model.orderStatusName" placeholder="" />
          </wd-cell-group>

          <view class="footer" v-if="curType === 'approve'">
            <wd-button type="warning" @click="handleApprove('pass')">通过</wd-button>
            <view class="mg"></view>
            <wd-button type="primary" @click="handleApprove('refuse')">拒绝</wd-button>
          </view>
        </view>
      </wd-form>
    </BaseForm>
  </view>
</template>

<style lang="scss" scoped>
.order-form-page {

  .group-con {
    border-radius: 20rpx;
    padding: 20rpx 10rpx;
    background-color: #fff;
    margin-bottom: 30rpx;

    .btn {
      line-height: 48rpx;
      border-radius: 6rpx;
      color: #fff;
      font-size: 26rpx;
      background-color: #597fe8;
      text-align: center;
      padding: 0 12rpx;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;

    .mg {
      width: 40rpx;
    }
  }

  ::v-deep .wd-cell-group__title {
    align-items: center;
    // padding-bottom: 12rpx;
    padding-top: 12rpx;
  }
}
</style>
