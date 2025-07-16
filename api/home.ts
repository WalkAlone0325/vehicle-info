import http from '@/utils/request'

// 司机信息
export const getDriverListApi = (params) => http.get(`/car/driverInfo/list/page`, { params })

// 车辆信息
export const getCarListApi = (params) => http.get(`/car/vehicleInfo/list/page`, { params })

// 油机信息
export const getOilTankApi = (params) => http.get(`/pc/main/countData`, { params })

// 车牌数量统计
export const getCarCountApi = (params) => http.get('/op/statistics/car/vehicle/cityCount/line ', { params })

// 地市
export const getCarTableApi = (params) => http.get('/op/statistics/car/vehicle/cityCount/list ', { params })