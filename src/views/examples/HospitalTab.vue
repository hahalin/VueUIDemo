<template>
    <div class="hospital-management">
        <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
            <!-- 列表頁面 Tab -->
            <el-tab-pane label="機構列表" name="list">
                <!-- 查詢表單 -->
                <el-card class="search-card">
                    <template #header>
                        <div class="card-header">
                            <span>查詢條件</span>
                        </div>
                    </template>
                    <el-form :inline="true" :model="searchForm" class="search-form">
                        <el-form-item label="機構類別">
                            <el-select v-model="searchForm.hospitalType" placeholder="請選擇機構類別" clearable
                                style="width: 160px">
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
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch">
                                <el-icon>
                                    <Search />
                                </el-icon>查詢
                            </el-button>
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
                    <el-table :data="pageData" v-loading="loading" style="width: 100%" border>
                        <el-table-column prop="id" label="機構代號" width="100" />
                        <el-table-column prop="name" label="機構名稱" width="150" />
                        <el-table-column prop="typeName" label="機構類別" width="120" />
                        <el-table-column prop="address" label="地址" min-width="160" show-overflow-tooltip />
                        <el-table-column prop="phone" label="電話" width="150" />
                        <el-table-column prop="status" label="狀態" width="100">
                            <template #default="{ row }">
                                <el-tag :type="row.status === '特約中' ? 'success' : 'danger'">
                                    {{ row.status }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="220" fixed="right">
                            <template #default="{ row }">
                                <el-space>
                                    <el-button @click="showDetail(row)" type="info" :icon="View" circle title="查看明細" />
                                    <el-button @click="showEditDialog(row)" type="primary" :icon="Edit" circle
                                        title="編輯" />
                                    <el-button @click="handleDelete(row)" type="danger" :icon="Delete" circle
                                        :disabled="row.status === '終止特約'" title="註銷" />
                                </el-space>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[5, 10, 20]" :total="total" layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </el-card>
            </el-tab-pane>

            <!-- 明細頁面 Tab -->
            <el-tab-pane label="機構明細" name="detail" :disabled="!selectedHospital">
                <div class="detail-card-header">
                    <div class="button-row mb-1">
                        <el-button @click="backToList" plain>返回列表</el-button>
                    </div>
                </div>
                <el-card v-if="selectedHospital" class="detail-card">
                    <template #header>
                        <div class="detail-card-header">
                            <div class="title-row">
                                <span>{{ selectedHospital.name }} - 機構明細</span>
                            </div>
                        </div>
                    </template>
                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="機構代號">{{ selectedHospital.id }}</el-descriptions-item>
                        <el-descriptions-item label="機構名稱">{{ selectedHospital.name }}</el-descriptions-item>
                        <el-descriptions-item label="機構類別">{{ selectedHospital.typeName }}</el-descriptions-item>
                        <el-descriptions-item label="電話">{{ selectedHospital.phone }}</el-descriptions-item>
                        <el-descriptions-item label="地址" :span="2">{{ selectedHospital.address }}</el-descriptions-item>
                        <el-descriptions-item label="負責人">{{ selectedHospital.ownerName }}</el-descriptions-item>
                        <el-descriptions-item label="狀態">
                            <el-tag :type="selectedHospital.status === '特約中' ? 'success' : 'danger'">
                                {{ selectedHospital.status }}
                            </el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="row mt-1">
                        <el-button-group>
                            <el-button class="btn" @click="handleSubDialogClick('基本資料')">基本資料</el-button>
                            <el-button type="primary" class="btn" @click="handleSubDialogClick('設置科別')">設置科別</el-button>
                            <el-button type="success" class="btn" @click="handleSubDialogClick('服務項目')">服務項目</el-button>
                            <el-button type="info" class="btn" @click="handleSubDialogClick('特殊設備')">特殊設備</el-button>
                            <el-button type="warning" class="btn" @click="handleSubDialogClick('病床')">病床</el-button>
                            <el-button type="default" class="btn" @click="handleSubDialogClick('醫事人員')">醫事人員</el-button>
                            <el-button type="primary" class="btn" @click="handleSubDialogClick('違約處分')">違約處分</el-button>
                        </el-button-group>
                    </div>
                    <div class="row mt-1">
                        <el-button-group>
                            <el-button class="btn">評鑑等級</el-button>
                            <el-button type="primary" class="btn">類別明細</el-button>
                            <el-button type="success" class="btn">大事記</el-button>
                            <el-button type="info" class="btn">機構窗口</el-button>
                            <el-button type="warning" class="btn">試辦計畫</el-button>
                            <el-button type="default" class="btn">報備支援</el-button>
                            <el-button type="primary" class="btn">合約</el-button>
                            <el-button class="btn">重要項變更</el-button>
                            <el-button type="danger" class="btn">帳號變更</el-button>
                        </el-button-group>
                    </div>
                </el-card>
                <div class="detail-card-header">
                    <div class="button-row">
                        <el-button @click="backToList" plain>返回列表</el-button>
                    </div>
                </div>

            </el-tab-pane>
        </el-tabs>

        <!-- 新增/編輯表單 -->
        <el-dialog :title="dialogType === 'create' ? '新增醫事機構' : '編輯醫事機構'" v-model="dialogVisible" width="60%"
            :close-on-click-modal="false">
            <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
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


        <el-dialog v-model="subDialogVisible" :title="`${subDialogTitle}視窗`" width="60%">
            <h2>{{ subDialogTitle }}-明細內容</h2>
            <br /><br /><br /><br /><br /><br /><br />
            <template #footer>
                <div class="detail-card-header">
                    <div class="button-row">
                        <span class="dialog-footer">
                            <el-button type="primary" @click="subDialogVisible = false">
                                確認
                            </el-button>
                            <el-button @click="subDialogVisible = false">關閉</el-button>                            
                        </span>
                    </div>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete, View } from '@element-plus/icons-vue'
import { HOSPITAL_TYPES } from '../../constants/hospitalTypes'
import { hospitals, mockApi } from '../../mock/hospitalData'

// Tabs 相關狀態
const activeTab = ref('list')
const selectedHospital = ref(null)

// 狀態變數
const hospitals = ref([])
const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('create')
const formRef = ref(null)

const subDialogVisible = ref(false)
const subDialogTitle = ref('')

// 分頁相關
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)

const handleSubDialogClick = (title: string) => {
    subDialogVisible.value = true;
    subDialogTitle.value = title;
}

// 計算分頁數據
const pageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return hospitals.value.slice(start, end)
})

// 搜尋表單
const searchForm = reactive({
    hospitalId: '',
    hospitalName: '',
    hospitalType: '',
})

// 編輯表單
const formData = reactive({
    hospitalId: '',
    hospitalName: '',
    hospitalType: '',
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

// Tab 相關方法
const showDetail = (row) => {
    selectedHospital.value = row
    activeTab.value = 'detail'
}

const backToList = () => {
    activeTab.value = 'list'
    selectedHospital.value = null
}

const handleTabClick = () => {
    if (activeTab.value === 'list') {
        selectedHospital.value = null
    }
}

// 分頁方法
const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
}

const handleCurrentChange = (val) => {
    currentPage.value = val
}

// 顯示新增對話框
const showCreateDialog = () => {
    if (formRef.value) {
        formRef.value.resetFields()
    }

    const emptyFormData = {
        hospitalId: '',
        hospitalName: '',
        hospitalType: '',
        detailAddress: '',
        phone: '',
        ownerName: ''
    }

    Object.keys(formData).forEach(key => {
        formData[key] = emptyFormData[key]
    })

    dialogType.value = 'create'
    dialogVisible.value = true
}

// 顯示編輯對話框
const showEditDialog = (row) => {
    dialogType.value = 'edit'

    formData.hospitalId = row.id
    formData.hospitalName = row.name
    formData.hospitalType = HOSPITAL_TYPES.find(type => type.label === row.typeName)?.value || ''
    formData.detailAddress = row.address
    formData.phone = row.phone
    formData.ownerName = row.ownerName || ''

    dialogVisible.value = true

    nextTick(() => {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
    })
}


// 改寫查詢功能
const handleSearch = async () => {
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


// 提交表單功能
const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const submitData = {
                    ...formData,
                    address: formData.detailAddress
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

// 刪除功能
const handleDelete = async (row) => {
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

// 初始載入
handleSearch()
</script>

<style scoped>
.hospital-management {
    padding: 20px;
}

.search-card,
.list-card,
.detail-card {
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

:deep(.el-tabs__content) {
    padding: 20px;
}

.detail-card :deep(.el-descriptions) {
    margin-top: 20px;
}

.detail-card-header .button-row {
    width: 100%;
    display: flex;
    justify-content: center;
}

.mb-2 {
    margin-bottom: 20px;
}

.mb-1 {
    margin-bottom: 10px;
}

.mt-1 {
    margin-top: 10px;
}

.mt-2 {
    margin-top: 20px;
}

.btn {
    width: 100px;
}
</style>