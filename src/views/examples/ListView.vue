```vue
<template>
  <div class="list-container">
    <!-- 搜尋區域 -->
    <el-card class="search-card">
      <el-form :model="searchForm" ref="searchFormRef" :inline="true">
        <el-form-item label="關鍵字">
          <el-input
            v-model="searchForm.keyword"
            placeholder="請輸入關鍵字"
            clearable
          />
        </el-form-item>
        <el-form-item label="日期範圍">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="狀態">
          <el-select
            v-model="searchForm.status"
            placeholder="請選擇狀態"
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查詢</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格區域 -->
    <el-card class="table-card">
      <template #header>
        <div class="table-header">
          <div class="table-title">資料列表</div>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>新增
          </el-button>
        </div>
      </template>

      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="編號" width="80" />
        <el-table-column prop="name" label="名稱" min-width="120" show-overflow-tooltip />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金額" width="120" align="right">
          <template #default="{ row }">
            {{ formatAmount(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="handleEdit(row)">
                編輯
              </el-button>
              <el-button type="success" size="small" @click="handleView(row)">
                查看
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                刪除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 表單對話框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增資料' : '編輯資料'"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="名稱" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="金額" prop="amount">
          <el-input-number v-model="formData.amount" :precision="2" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            確認
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 搜尋表單
const searchForm = reactive({
  keyword: '',
  dateRange: [],
  status: ''
})

// 狀態選項
const statusOptions = [
  { label: '進行中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
]

// 表格資料
const loading = ref(false)
const tableData = ref([
  {
    id: 1,
    name: '測試資料 1',
    date: '2024-01-01',
    status: 'processing',
    amount: 1234.56
  },
  {
    id: 2,
    name: '測試資料 2',
    date: '2024-01-02',
    status: 'completed',
    amount: 2345.67
  }
])

// 分頁設置
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 對話框控制
const dialogVisible = ref(false)
const dialogType = ref('add') // 'add' or 'edit'
const formData = reactive({
  name: '',
  status: '',
  amount: 0
})

// 表單驗證規則
const formRules = {
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { min: 2, max: 50, message: '長度需在 2 到 50 個字元之間', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '請選擇狀態', trigger: 'change' }
  ],
  amount: [
    { required: true, message: '請輸入金額', trigger: 'blur' }
  ]
}

// 查詢處理
const handleSearch = () => {
  loading.value = true
  console.log('搜尋條件:', searchForm)
  // 模擬 API 請求
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查詢成功')
  }, 1000)
}

// 重置表單
const searchFormRef = ref()
const resetForm = () => {
  searchFormRef.value?.resetFields()
}

// 新增資料
const handleAdd = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
}

// 編輯資料
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.assign(formData, row)
  dialogVisible.value = true
}

// 查看詳情
const handleView = (row) => {
  ElMessage.info(`查看詳情：${row.name}`)
}

// 刪除資料
const handleDelete = (row) => {
  ElMessageBox.confirm(
    '確定要刪除這筆資料嗎？',
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage.success('刪除成功')
  })
}

// 表單提交
const formRef = ref()
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('提交資料:', formData)
      ElMessage.success('提交成功')
      dialogVisible.value = false
    } else {
      console.log('表單驗證失敗:', fields)
    }
  })
}

// 分頁處理
const handleSizeChange = (val) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  handleSearch()
}

// 工具方法
const getStatusType = (status) => {
  const map = {
    processing: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return map[status] || 'default'
}

const getStatusLabel = (status) => {
  const map = {
    processing: '進行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status] || status
}

const formatAmount = (amount) => {
  return `$${amount.toLocaleString()}`
}
</script>

<style scoped>
.list-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.table-card {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 16px;
  font-weight: bold;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
```