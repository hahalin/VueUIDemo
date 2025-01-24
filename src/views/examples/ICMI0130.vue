<template>
    <div class="icmi0130-management">
        <!-- 查詢表單 -->
        <el-card class="search-card">
            <template #header>
                <div class="card-header">
                    <span>查詢條件</span>
                </div>
            </template>
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item label="系統別">
                    <el-select v-model="searchForm.systemType" placeholder="請選擇系統別" clearable style="width: 240px">
                        <el-option v-for="type in SYSTEM_TYPES" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="資料類別">
                    <el-select v-model="searchForm.dataType" placeholder="請選擇資料類別" clearable style="width: 160px">
                        <el-option v-for="type in DATA_TYPES" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="代碼">
                    <el-input v-model="searchForm.code" placeholder="請輸入代碼" clearable />
                </el-form-item>
                <el-form-item label="代碼名稱">
                    <el-input v-model="searchForm.codeName" placeholder="請輸入代碼名稱" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">
                        <el-icon>
                            <Search />
                        </el-icon>查詢
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
            <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
                <el-table-column type="selection" width="55">
                    <template #header="scope">
                        <el-checkbox v-model="isAllSelected" @change="handleSelectAll"
                            :indeterminate="isIndeterminate" />
                    </template>
                </el-table-column>
                <el-table-column label="代碼" prop="code" width="100">
                    <template #default="{ row }">
                        <el-input v-model="row.code" size="small" disabled="true" />
                    </template>
                </el-table-column>
                <el-table-column label="代碼說明一" prop="desc1" min-width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.desc1" size="small" />
                    </template>
                </el-table-column>
                <el-table-column label="代碼說明二" prop="desc2" min-width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.desc2" size="small" />
                    </template>
                </el-table-column>
                <el-table-column label="生效起日" prop="startDate" width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.startDate" size="small" disabled="true" />
                    </template>
                </el-table-column>
                <el-table-column label="生效迄日" prop="endDate" width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.endDate" size="small" />
                    </template>
                </el-table-column>
                <el-table-column label="異動人員" prop="modifier" width="120">
                    <template #default="{ row }">
                        <el-input v-model="row.modifier" size="small" disabled="true" />
                    </template>
                </el-table-column>
                <el-table-column label="異動日期" prop="modifiedDate" width="150">
                    <template #default="{ row }">
                        <el-input v-model="row.modifiedDate" size="small" />
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
                :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" /> -->
        </el-card>
        <div class="row mt-1_">
            <el-button-group>
                <el-button @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>新增
                </el-button>
                <el-button @click="handleCorrect">
                    <el-icon>
                        <Edit />
                    </el-icon>更正
                </el-button>
                <el-button @click="handleDelete">
                    <el-icon>
                        <Delete />
                    </el-icon>刪除
                </el-button>
                <el-button @click="handleRefresh">
                    <el-icon>
                        <Refresh />
                    </el-icon>重新整理
                </el-button>
                <el-button @click="handlePrint">
                    <el-icon>
                        <Printer />
                    </el-icon>列印
                </el-button>
                <el-button @click="handleCopy">
                    <el-icon>
                        <CopyDocument />
                    </el-icon>資料複製
                </el-button>
                <el-button @click="handleDownload">
                    <el-icon>
                        <Download />
                    </el-icon>下傳
                </el-button>
                <el-button @click="handleImport">
                    <el-icon>
                        <Upload />
                    </el-icon>匯入
                </el-button>
                <el-button @click="handleClear">
                    <el-icon>
                        <Delete />
                    </el-icon>清除
                </el-button>
                <el-button @click="handleBack">
                    <el-icon>
                        <Back />
                    </el-icon>回前畫面
                </el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Edit, Delete, Refresh, Printer, CopyDocument, Download, Upload, Back } from '@element-plus/icons-vue'

// 定義常數
const SYSTEM_TYPES = [
    { value: 'CMS', label: 'CMS-醫療申訴子系統' },
    { value: 'HMD', label: 'HMD-藥材管理子系統' },
    { value: 'HMF', label: 'HMF-支付標準管理子系統' }
]

const DATA_TYPES = [
    { value: '001', label: '001-總類別' },
    { value: '002', label: '002-層級別' },
    { value: '003', label: '003-醫療別' }
]

// 狀態變數
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(4)
const isAllSelected = ref(false)
const isIndeterminate = ref(false)

// 搜尋表單
const searchForm = reactive({
    systemType: '',
    dataType: '',
    code: '',
    codeName: ''
})

// 範例資料
const tableData = ref([
    { code: '1', desc1: '西醫醫院', desc2: '', startDate: '105/11/01', endDate: '999/12/31',modifier:'D110307', modifiedDate:'106/01/06 10:39:49'},
    { code: '2', desc1: '西醫診所', desc2: '', startDate: '105/11/01', endDate: '999/12/31',modifier:'D110307', modifiedDate:'106/01/06 10:39:49' },
    { code: '3', desc1: '牙醫', desc2: '', startDate: '105/11/01', endDate: '999/12/31',modifier:'D110307', modifiedDate:'106/01/06 10:39:49' },
    { code: '4', desc1: '中醫', desc2: '', startDate: '105/11/01', endDate: '999/12/31',modifier:'D110307', modifiedDate:'106/01/06 10:39:49' }
])

// 處理全選/取消全選
const handleSelectAll = (val) => {
    tableData.value.forEach(row => {
        row.selected = val
    })
    isAllSelected.value = val
    isIndeterminate.value = false
}

// 處理分頁大小改變
const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
}

// 處理頁碼改變
const handleCurrentChange = (val) => {
    currentPage.value = val
}

// 處理查詢
const handleSearch = () => {
    loading.value = true
    // 模擬 API 呼叫
    setTimeout(() => {
        loading.value = false
    }, 500)
}

// 初始載入
handleSearch()
</script>

<style scoped>
.mt-1 {
    margin-top: 10px;
}

.icmi0130-management {
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

:deep(.el-table .cell) {
    padding: 0 5px;
}

:deep(.el-input.is-small .el-input__wrapper) {
    padding: 1px 5px;
}
</style>