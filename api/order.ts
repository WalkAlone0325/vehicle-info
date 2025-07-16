import exp from 'constants'
import http from '@/utils/request'

// export const postInfo = (params: Record<string, any>) => http.get()

// 费用申请
export const postFeeApplyApi = (params) => http.post('/car/vehicleFeeInfo', params)

// 用车工单申请
export const postOrderApplyApi = (params) => http.post('/car/vehicleUseCarApplicationOrder', params)

// 草稿发布
export const putOrderDraftApi = (params) => http.put('/car/vehicleUseCarApplicationOrder', params)


// 审批列表
export const getApproveListApi = (params) => http.get('/car/vehicleUseCarApplicationOrder/application/list/page', { params })

// 审批
export const getApproveApi = (params) => http.get('/car/vehicleUseCarApplicationOrder/approver/list/page', { params })

// 审批历史
export const getHistoryApi = (params) => http.get('/car/vehicleUseCarApplicationOrder/approver/history/list/page', { params })

// 详情
export const getOrderDetailApi = (params) => http.get(`/car/vehicleUseCarApplicationOrder/${params}`)

// 车辆运维管理
// 告警配置
export const getConfigList = (params) => http.get('/car/vehicleMaintenanceWarningCycle/list/page', { params })

// 详情
export const getConfigDetail = (params) => http.get('/car/vehicleMaintenanceWarningCycle/' + params)

// 新增
export const postConfigDetail = (params) => http.post('/car/vehicleMaintenanceWarningCycle', params)

// 修改
export const putConfigDetail = (params) => http.put('/car/vehicleMaintenanceWarningCycle', params)

// 运维告警
export const getWarningList = (params) => http.get('/car/vehicleMaintenanceWarning/list/page', { params })
// 运维告警详情
export const getWarningDetail = (params) => http.get('/car/vehicleMaintenanceWarning/' + params)
// 运维告警编辑
export const putWarning = (params) => http.put('/car/vehicleMaintenanceWarning', params)
// 新增
export const postWarning = (params) => http.post('/car/vehicleMaintenanceWarning', params)

// 运维计划
export const getPlanList = (params) => http.get('/car/vehicleMaintenancePlan/list/page', {params})
// 重置
export const putPlan = (params) => http.delete('/car/vehicleMaintenancePlan/' + params)
// 详情
export const getPlanDetail = (params) => http.get('car/vehicleMaintenancePlan/vehicleId/' + params)
// 编辑
export const updatePlan = (params) => http.put('/car/vehicleMaintenancePlan/insertOrUpdateSave', params)

// 运维记录
export const getRecordList = (params) => http.get('/car/vehicleMaintenanceRecord/list/page', {params})
// 详情
export const getRecordDetail = (params) => http.get('/car/vehicleMaintenanceRecord/' + params)
// 新增
export const postRecord = (params) => http.post('/car/vehicleMaintenanceRecord', params)
// 编辑
export const putRecord = (params) => http.put('/car/vehicleMaintenanceRecord', params)
// 删除
export const deleteRecord = (params) => http.delete('/car/vehicleMaintenanceRecord/' + params)



// 审批
export const postApprove = (params) => http.put('/car/vehicleUseCarApplicationOrder/approver/', params)


// 用车工单
// 列表
export const getOrderApi = (params) => http.get('/car/vehicleUseCarWorkOrder/list/page', { params })
// 删除
export const deleteOrder = (params) => http.delete('/car/vehicleUseCarWorkOrder/' + params)
// 详情
export const getOrderDetail = (params) => http.get('/car/vehicleUseCarWorkOrder/' + params)
// 编辑
export const putOrder = (params) => http.put('/car/vehicleUseCarWorkOrder', params)
// 新增
export const postOrder = (params) => http.post('/car/vehicleUseCarWorkOrder', params)
// 列表
export const getEndOrderList = (params) => http.get('/car/vehicleUseCarApplicationOrder/dept/end/list/page', { params })

// 申请人
export const getUserListApi = (params) => http.get('/car/driverInfo/user/list/page', { params })
