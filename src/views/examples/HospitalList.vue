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
                <el-form-item label="機構代號">
                    <el-input v-model="searchForm.hospitalId" placeholder="請輸入機構代號" clearable />
                </el-form-item>
                <el-form-item label="機構名稱">
                    <el-input v-model="searchForm.hospitalName" placeholder="請輸入機構名稱" clearable />
                </el-form-item>
                <el-form-item label="機構類別">
                    <el-select v-model="searchForm.hospitalType" placeholder="請選擇機構類別" clearable style="width: 160px">
                        <el-option v-for="type in HOSPITAL_TYPES" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select>
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
            <el-table :data="hospitals" v-loading="loading" style="width: 100%" border>
                <el-table-column prop="id" label="機構代號" width="120" />
                <el-table-column prop="name" label="機構名稱" width="200" />
                <el-table-column prop="typeName" label="機構類別" width="120" />
                <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
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
                                <el-option v-for="type in HOSPITAL_TYPES" :key="type.value" :label="type.label"
                                    :value="type.value" />
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
</template>
<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete, Lock } from '@element-plus/icons-vue'
import { TAIWAN_CITIES } from '../../constants/cities'
import { HOSPITAL_TYPES } from '../../constants/hospitalTypes'
import axios from 'axios'

// API 配置
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

// 狀態變數
const hospitals = ref([])
const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('create')
const formRef = ref(null)

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

// 查詢功能
const handleSearch = async () => {
    loading.value = true
    try {
        const params = Object.fromEntries(
            Object.entries(searchForm).filter(([_, v]) => v != '')
        )
        const { data } = await api.get('/hospital/search', { params })
        hospitals.value = data
    } catch (error) {
        console.log(error);
        ElMessage.error('查詢失敗: ' + (error.response?.data || error.message))
    } finally {
        loading.value = false
    }
}

// 重置查詢
const resetSearch = () => {
    Object.keys(searchForm).forEach(key => searchForm[key] = '')
    handleSearch()
}

// 顯示新增對話框
const showCreateDialog = () => {
    dialogType.value = 'create'
    // 重置所有表單欄位
    formData.hospitalId = ''
    formData.hospitalName = ''
    formData.hospitalType = ''
    formData.city = ''
    formData.detailAddress = ''
    formData.phone = ''
    formData.ownerName = ''

    dialogVisible.value = true
    // 使用 nextTick 確保表單已渲染後再重置驗證狀態
    nextTick(() => {
        if (formRef.value) {
            formRef.value.resetFields()
        }
    })
}



// 顯示編輯對話框
const showEditDialog = (row) => {
    dialogType.value = 'edit'

    // 尋找縣市
    const cityMatch = TAIWAN_CITIES.find(city => row.address.startsWith(city.value))

    // 尋找機構類別
    const typeMatch = HOSPITAL_TYPES.find(type => type.label === row.typeName)

    // 填入表單資料
    formData.hospitalId = row.id
    formData.hospitalName = row.name
    formData.hospitalType = typeMatch ? typeMatch.value : ''
    formData.city = cityMatch ? cityMatch.value : ''
    formData.detailAddress = cityMatch ? row.address.substring(cityMatch.value.length) : row.address
    formData.phone = row.phone
    formData.ownerName = row.ownerName || '' // 確保有值

    dialogVisible.value = true

    // 重置表單驗證狀態
    nextTick(() => {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
    })
}



// 提交表單
const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const submitData = {
                    ...formData,
                    address: `${formData.city}${formData.detailAddress}` // 組合完整地址
                }

                if (dialogType.value === 'create') {
                    await api.post('/hospital', submitData)
                    ElMessage.success('新增成功')
                } else {
                    await api.put(`/hospital/${submitData.hospitalId}`, submitData)
                    ElMessage.success('更新成功')
                }
                dialogVisible.value = false
                handleSearch()
            } catch (error) {
                ElMessage.error(error.response?.data || '操作失敗')
            } finally {
                submitting.value = false
            }
        }
    })
}

// 刪除機構
const handleDelete = async (row) => {
    try {
        await ElMessageBox.confirm(
            `確定要註銷 ${row.name} 嗎？`,
            '確認註銷',
            { type: 'warning' }
        )

        await api.delete(`/hospital/${row.id}`)
        ElMessage.success('註銷成功')
        handleSearch()
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('註銷失敗')
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