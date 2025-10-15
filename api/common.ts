import http from '@/utils/request'

export const getDictApi = (params: string) => http.get(`/system/dict/data/type/${params}`)

// 部门
export const getDeptApi = (params) => http.get('/system/dept/list/tree', { params })

// 标点
export const getLocationApi = (params) => http.get('/car/vehicleInfo/map/location', { params })

// 轨迹
export const getTraceApi = (params) => http.get('/car/jt808RecordLocationInfo/map/locus', { params })

// 一键登录
export const oneLoginApi = (params) => http.post('/xcxLogin?xcxCode=' + params)

// 登录
export const loginApi = (params) => http.post('/login', params)

// 获取个人信息
export const getInfoApi = () => http.get('/getInfo')

// 退出登录
export const logoutApi = () => http.post('/unbind/logout')

// 修改密码
export const updatePwd = (params) => http.put('/system/user/profile/updatePwd', params)

// 通知
export const getNoticeApi = (params) => http.get('/car/vehicleMaintenanceWarning/list/page', { params })
