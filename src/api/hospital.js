// src/api/hospital.js
import axios from 'axios'
import { BackendUri } from '../config/apiSetting'

const api = axios.create({
    baseURL: BackendUri
})

export const hospitalApi = {
    // 查詢醫事機構
    searchHospitals: async (params) => {
        const response = await api.get('/hospitals', { params })
        return response.data
    },

    // 取得單一醫事機構
    getHospital: async (id) => {
        const response = await api.get(`/hospitals/${id}`)
        return response.data
    },

    // 新增醫事機構
    createHospital: async (data) => {
        const response = await api.post('/hospitals', {
            id: data.hospitalId,
            name: data.hospitalName,
            hospitalType: data.hospitalType,
            address: data.detailAddress,
            phone: data.phone,
            ownerName: data.ownerName,
            status: '特約中'
        })
        return response.data
    },

    // 更新醫事機構
    updateHospital: async (id, data) => {
        await api.put(`/hospitals/${id}`, {
            id: data.hospitalId,
            name: data.hospitalName,
            hospitalType: data.hospitalType,
            address: data.detailAddress,
            phone: data.phone,
            ownerName: data.ownerName,
            status: '特約中'
        })
    },

    // 註銷醫事機構
    deleteHospital: async (id) => {
        await api.delete(`/hospitals/${id}`)
    }
}