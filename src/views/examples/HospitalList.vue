<template>
    <div class="hospital-management">
        <!-- 查詢表單 -->
        <el-card class="search-card">
            <template #header>
                <div class="card-header">
                    <span>查詢條件</span>
                </div>
            </template>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="機構類別">
                    <el-select v-model="searchForm.hospitalType" placeholder="請選擇機構類別" clearable style="width: 160px">
                        <el-option v-for="type in HOSPITAL_TYPES" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="機構代號">
                    <el-input v-model="searchForm.hospitalId" placeholder="請輸入機構代號" clearable />
                </el-form-item>
                <el-form-item label="機構名稱">
                    <el-input v-model="searchForm.hospitalName" placeholder="請輸入機構名稱" clearable />
                </el-form-item>
                <!-- <el-form-item label="縣市">
                    <el-select v-model="searchForm.city" placeholder="請選擇縣市" clearable style="width: 160px">
                        <el-option v-for="city in TAIWAN_CITIES" :key="city.value" :label="city.label"
                            :value="city.value" />
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">
                        <el-icon>
                            <Search />
                        </el-icon>查詢
                    </el-button>
                    <!-- <el-button @click="resetSearch">
                        <el-icon>
                            <Refresh />
                        </el-icon>重置
                    </el-button> -->
                    <el-button type="success" @click="showCreateDialog">
                        <el-icon>
                            <Plus />
                        </el-icon>新增機構
                    </el-button>
                    
                    <el-button type="warning" @click="showHelpDialog">
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>此範例需設定後端說明
                    </el-button>
                    
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 資料列表 -->
        <el-card class="list-card">
            <template #header>
                <div class="card-header">
                    <span>查詢結果</span>
                </div>
            </template>
            <el-table :data="pageData" v-loading="loading" style="width: 100%" border>
                <el-table-column prop="id" label="機構代號" width="120" />
                <el-table-column prop="name" label="機構名稱" width="200" />
                <el-table-column prop="hospitalType" label="機構類別" width="120">
                    <template #default="{ row }">
                        {{ getHospitalTypeName(row.hospitalType) }}
                    </template>
                </el-table-column>                <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
                <el-table-column prop="phone" label="電話" width="150" />
                <el-table-column prop="status" label="狀態" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.status === '特約中' ? 'success' : 'danger'">
                            {{ row.status }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="{ row }">
                        <el-space>
                            <el-button @click="showEditDialog(row)" type="primary" :icon="Edit" circle />
                            <el-button @click="handleDelete(row)" type="danger" :icon="Delete" circle
                                :disabled="row.status === '終止特約'" />
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
                :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>

        <!-- 新增/編輯表單 -->
        <el-dialog :title="dialogType === 'create' ? '新增醫事機構' : '編輯醫事機構'" v-model="dialogVisible" width="60%"
            :close-on-click-modal="false">
            <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!-- 修改這個部分，改為永遠顯示，但在編輯時唯讀 -->
                        <el-form-item label="機構代號" prop="hospitalId">
                            <template v-if="dialogType === 'create'">
                                <el-input v-model="formData.hospitalId" placeholder="請輸入10位數字" maxlength="10" />
                            </template>
                            <template v-else>
                                <el-input v-model="formData.hospitalId" disabled class="disabled-input" />
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="機構名稱" prop="hospitalName">
                            <el-input v-model="formData.hospitalName" placeholder="請輸入機構名稱" maxlength="100" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="機構類別" prop="hospitalType">
                            <el-select v-model="formData.hospitalType" placeholder="請選擇機構類別" style="width: 100%">
                                <el-option
                                    v-for="type in filteredHospitalTypes"
                                    :key="type.value"
                                    :label="type.label"
                                    :value="type.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="電話" prop="phone">
                            <el-input v-model="formData.phone" placeholder="格式: 02-12345678" maxlength="20" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <!-- <el-col :span="12">
                        <el-form-item label="縣市" prop="city">
                            <el-select v-model="formData.city" placeholder="請選擇縣市" style="width: 100%">
                                <el-option v-for="city in TAIWAN_CITIES" :key="city.value" :label="city.label"
                                    :value="city.value" />
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="負責人" prop="ownerName">
                            <el-input v-model="formData.ownerName" placeholder="請輸入負責人姓名" maxlength="50" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="詳細地址" prop="detailAddress">
                            <el-input v-model="formData.detailAddress" placeholder="請輸入詳細地址" maxlength="200" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <el-space>
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit" :loading="submitting">
                        確定
                    </el-button>
                </el-space>
            </template>
        </el-dialog>
    </div>
    <el-dialog v-model="helpDialogVisible" title="設定後端說明" width="50%">
        <h3>檢查步驟</h3>
        <ol>
            <li>第一支C#整合MongoDB專案需要啟動</li>
            <li>記得要去OneDrive拿最新版的</li>
            <li>於Vue專案的 src/config/apiSetting.js 設定Backend的網址與port</li>
            <li>舉例：
                <ul>
                    <li>
                        預設後端執行url為 http://localhost:5095
                    </li>
                    <li>
                        則設定 export const BackendUri = "http://localhost:5095/api"
                    </li>
                </ul>
            </li>
        </ol>
        <el-row class="row-bg" justify="space-between">
            <el-col :span="6">
                <div class="grid-content ep-bg-purple">

                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple-light">
                    <!-- <el-button @click="helpDialogVisible = false">取消</el-button> -->
                    <el-button type="primary" @click="helpDialogVisible = false">
                        我知道了
                    </el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple">

                </div>
            </el-col>
        </el-row>

        <!-- <template #footer>
            <span class="dialog-footer">

            </span>
        </template> -->
    </el-dialog>

</template>
<script setup lang="ts">
import { computed, ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete, Lock, QuestionFilled } from '@element-plus/icons-vue'
import { HOSPITAL_TYPES } from '../../constants/hospitalTypes'
import { hospitals, mockApi } from '../../mock/hospitalData';

import { hospitalApi } from '../../api/hospital'

//import { BackendUri } from '../../config/apiSetting'
//import axios from 'axios'

// API 配置
// const api = axios.create({
//     baseURL: BackendUri
// })

// 狀態變數
const hospitals = ref([])
const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const helpDialogVisible = ref(false)
const dialogType = ref('create')
const formRef = ref(null)
const filteredHospitalTypes = computed(() => {
    return HOSPITAL_TYPES.filter(type => type.value !== '00');
});

//分頁相關初始化數值
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)


// 計算分頁後的數據
const pageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return hospitals.value.slice(start, end)
})

// 處理分頁大小改變
const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1 // 重置到第一頁
}

// 處理頁碼改變
const handleCurrentChange = (val) => {
    currentPage.value = val
}
// 搜尋表單
const searchForm = reactive({
    hospitalId: '',
    hospitalName: '',
    hospitalType: '',
    city: ''
})

// 編輯表單
const formData = reactive({
    hospitalId: '',
    hospitalName: '',
    hospitalType: '',
    city: '',
    detailAddress: '',
    phone: '',
    ownerName: ''
})

// 表單驗證規則
const rules = {
    hospitalId: [
        { required: true, message: '請輸入機構代號', trigger: 'blur' },
        { pattern: /^\d{10}$/, message: '機構代號必須為10位數字', trigger: 'blur' }
    ],
    hospitalName: [
        { required: true, message: '請輸入機構名稱', trigger: 'blur' },
        { min: 2, max: 100, message: '長度必須在 2 到 100 個字元之間', trigger: 'blur' }
    ],
    hospitalType: [
        { required: true, message: '請選擇機構類別', trigger: 'change' }
    ],
    city: [
        { required: true, message: '請選擇縣市', trigger: 'change' }
    ],
    detailAddress: [
        { required: true, message: '請輸入詳細地址', trigger: 'blur' },
        { min: 2, max: 200, message: '長度必須在 2 到 200 個字元之間', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '請輸入電話', trigger: 'blur' },
        { pattern: /^\d{2,3}-\d{7,8}$/, message: '電話格式必須為02-12345678', trigger: 'blur' }
    ],
    ownerName: [
        { required: true, message: '請輸入負責人姓名', trigger: 'blur' },
        { min: 2, max: 50, message: '長度必須在 2 到 50 個字元之間', trigger: 'blur' }
    ]
}

// show help dialog
const showHelpDialog = () => {
    helpDialogVisible.value = true;
}

// 重置查詢
const resetSearch = () => {
    Object.keys(searchForm).forEach(key => searchForm[key] = '')
    handleSearch()
}

// 顯示新增對話框
const showCreateDialog = () => {
    // 1. 先重置表單ref
    if (formRef.value) {
        formRef.value.resetFields()
    }
    
    // 2. 重置 formData
    const emptyFormData = {
        hospitalId: '',
        hospitalName: '',
        hospitalType: '01',
        city: '',
        detailAddress: '',
        phone: '',
        ownerName: ''
    }
    
    // 使用解構賦值確保響應式更新
    Object.keys(formData).forEach(key => {
        formData[key] = emptyFormData[key]
    })
    
    // 3. 最後再設定 dialog 狀態
    dialogType.value = 'create'
    dialogVisible.value = true
}

const getHospitalTypeName = (typeValue) => {
    const type = HOSPITAL_TYPES.find(t => t.value === typeValue);
    return type ? type.label : typeValue;
};


// 修改編輯對話框顯示邏輯
const showEditDialog = (row) => {
    dialogType.value = 'edit'

    // 填入表單資料
    formData.hospitalId = row.id
    formData.hospitalName = row.name
    formData.hospitalType = row.hospitalType
    formData.detailAddress = row.address
    formData.phone = row.phone
    formData.ownerName = row.ownerName || ''

    dialogVisible.value = true

    // 重置表單驗證狀態
    nextTick(() => {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
    })
}



// 改寫查詢功能
const handleSearch0 = async () => {
    loading.value = true
    try {
        const params = Object.fromEntries(
            Object.entries(searchForm).filter(([_, v]) => v != '')
        )
        const data = await mockApi.searchHospitals(params)
        hospitals.value = data
        total.value = hospitals.value.length
    } catch (error) {
        console.log(error);
        ElMessage.error('查詢失敗: ' + error.message)
    } finally {
        loading.value = false
    }
}

const handleSearch = async () => {
    loading.value = true
    try {
        const params = {
            hospitalId: searchForm.hospitalId,
            hospitalName: searchForm.hospitalName,
            hospitalType: searchForm.hospitalType
        }
        const data = await hospitalApi.searchHospitals(params)
        hospitals.value = data
        total.value = hospitals.value.length
    } catch (error) {
        console.error(error)
        ElMessage.error('查詢失敗: ' + error.message)
    } finally {
        loading.value = false
    }
}


// 改寫提交表單功能
const handleSubmit0 = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const submitData = {
                    ...formData,
                    address: formData.detailAddress // 直接使用詳細地址
                }

                if (dialogType.value === 'create') {
                    await mockApi.createHospital(submitData)
                    ElMessage.success('新增成功')
                } else {
                    await mockApi.updateHospital(submitData.hospitalId, submitData)
                    ElMessage.success('更新成功')
                }
                dialogVisible.value = false
                handleSearch()
            } catch (error) {
                ElMessage.error(error.message || '操作失敗')
            } finally {
                submitting.value = false
            }
        }
    })
}

// 改寫刪除功能
const handleDelete0 = async (row) => {
    try {
        await ElMessageBox.confirm(
            `確定要註銷 ${row.name} 嗎？`,
            '確認註銷',
            { type: 'warning' }
        )

        await mockApi.deleteHospital(row.id)
        ElMessage.success('註銷成功')
        handleSearch()
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('註銷失敗')
        }
    }
}

// 提交表單功能
const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                // 整理要提交的數據
                const submitData = {
                    hospitalId: formData.hospitalId,
                    hospitalName: formData.hospitalName,
                    hospitalType: formData.hospitalType,
                    detailAddress: formData.detailAddress,
                    phone: formData.phone,
                    ownerName: formData.ownerName
                }

                if (dialogType.value === 'create') {
                    await hospitalApi.createHospital(submitData)
                    ElMessage.success('新增成功')
                } else {
                    await hospitalApi.updateHospital(submitData.hospitalId, submitData)
                    ElMessage.success('更新成功')
                }
                dialogVisible.value = false
                handleSearch() // 重新載入列表
            } catch (error) {
                console.error('操作失敗:', error)
                ElMessage.error(error.response?.data || error.message || '操作失敗')
            } finally {
                submitting.value = false
            }
        }
    })
}

// 刪除（註銷）功能
const handleDelete = async (row) => {
    try {
        await ElMessageBox.confirm(
            `確定要註銷 ${row.name} 嗎？`,
            '確認註銷',
            { type: 'warning' }
        )

        await hospitalApi.deleteHospital(row.id)
        ElMessage.success('註銷成功')
        handleSearch() // 重新載入列表
    } catch (error) {
        if (error !== 'cancel') {
            console.error('註銷失敗:', error)
            ElMessage.error(error.response?.data || error.message || '註銷失敗')
        }
    }
}



// 初始載入
handleSearch()
</script>
<style scoped>
.hospital-management {
    padding: 20px;
}

.search-card {
    margin-bottom: 20px;
}

.list-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.el-form-item {
    margin-bottom: 10px;
}

.dialog-footer {
    padding-top: 20px;
    text-align: right;
}

.el-row {
    margin-bottom: 20px;
}

:deep(.el-dialog__body) {
    padding: 20px 30px;
}

:deep(.el-form-item__label) {
    font-weight: 500;
}

:deep(.disabled-input .el-input__inner) {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #606266;
}

:deep(.el-input.is-disabled .el-input__inner) {
    color: #606266;
    font-weight: 500;
}
</style>