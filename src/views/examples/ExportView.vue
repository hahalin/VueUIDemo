<template>
  <div class="export-container">
    <!-- 匯出選項設置 -->
    <el-card class="export-card">
      <template #header>
        <div class="card-header">
          <span>匯出選項設置</span>
          <el-button type="primary" @click="handleExport" :loading="exporting">
            開始匯出
          </el-button>
        </div>
      </template>

      <el-form :model="exportForm" label-width="120px">
        <!-- 匯出範圍設置 -->
        <div class="form-section">
          <h3>匯出範圍</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="時間範圍">
                <el-date-picker
                  v-model="exportForm.dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="開始日期"
                  end-placeholder="結束日期"
                  :shortcuts="dateShortcuts"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="資料範圍">
                <el-select v-model="exportForm.dataRange" style="width: 100%">
                  <el-option label="全部資料" value="all" />
                  <el-option label="當前查詢結果" value="current" />
                  <el-option label="已選擇項目" value="selected" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 欄位選擇 -->
        <div class="form-section">
          <h3>欄位選擇</h3>
          <el-form-item label="匯出欄位">
            <el-checkbox-group v-model="exportForm.columns">
              <el-space wrap>
                <el-checkbox v-for="field in exportFields" 
                            :key="field.value" 
                            :label="field.value">
                  {{ field.label }}
                </el-checkbox>
              </el-space>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <!-- 格式設置 -->
        <div class="form-section">
          <h3>格式設置</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="匯出格式">
                <el-radio-group v-model="exportForm.format">
                  <el-radio label="pdf">PDF</el-radio>
                  <el-radio label="excel">Excel</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紙張大小">
                <el-select v-model="exportForm.pageSize" style="width: 100%">
                  <el-option label="A4" value="A4" />
                  <el-option label="A3" value="A3" />
                  <el-option label="Letter" value="Letter" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="方向">
                <el-radio-group v-model="exportForm.orientation">
                  <el-radio label="portrait">直向</el-radio>
                  <el-radio label="landscape">橫向</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包含頁碼">
                <el-switch v-model="exportForm.showPageNumber" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>

    <!-- 預覽區域 -->
    <el-card class="export-card">
      <template #header>
        <div class="card-header">
          <span>預覽區域</span>
          <el-button type="primary" plain @click="refreshPreview">
            刷新預覽
          </el-button>
        </div>
      </template>

      <div class="preview-container" v-loading="previewLoading">
        <div class="preview-page" :class="exportForm.orientation">
          <div class="preview-header">
            <h2>報表標題</h2>
            <p>產生日期：{{ currentDateTime }}</p>
          </div>
          
          <el-table :data="previewData" border style="width: 100%">
            <el-table-column
              v-for="field in selectedFields"
              :key="field.value"
              :prop="field.value"
              :label="field.label"
            />
          </el-table>

          <div class="preview-footer" v-if="exportForm.showPageNumber">
            <div class="page-number">Page 1 of 1</div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 匯出歷史記錄 -->
    <el-card class="export-card">
      <template #header>
        <div class="card-header">
          <span>匯出歷史記錄</span>
        </div>
      </template>

      <el-table :data="exportHistory" style="width: 100%">
        <el-table-column prop="date" label="匯出時間" width="180" />
        <el-table-column prop="name" label="檔案名稱" />
        <el-table-column prop="format" label="格式" width="100">
          <template #default="{ row }">
            <el-tag :type="row.format === 'pdf' ? 'danger' : 'success'">
              {{ row.format.toUpperCase() }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleDownload(row)"
              :disabled="row.status !== 'completed'"
            >
              下載
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 匯出表單數據
const exportForm = reactive({
  dateRange: [],
  dataRange: 'all',
  columns: ['name', 'department', 'position', 'date'],
  format: 'pdf',
  pageSize: 'A4',
  orientation: 'portrait',
  showPageNumber: true
})

// 匯出狀態
const exporting = ref(false)
const previewLoading = ref(false)

// 日期快捷選項
const dateShortcuts = [
  {
    text: '最近一個月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    }
  },
  {
    text: '最近三個月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    }
  }
]

// 可匯出欄位
const exportFields = [
  { label: '姓名', value: 'name' },
  { label: '部門', value: 'department' },
  { label: '職位', value: 'position' },
  { label: '入職日期', value: 'date' },
  { label: '狀態', value: 'status' },
  { label: '電話', value: 'phone' },
  { label: '電子郵件', value: 'email' }
]

// 已選擇的欄位
const selectedFields = computed(() => {
  return exportFields.filter(field => exportForm.columns.includes(field.value))
})

// 預覽數據
const previewData = ref([
  {
    name: '張三',
    department: '人力資源部',
    position: '經理',
    date: '2024-01-01',
    status: '在職',
    phone: '0912345678',
    email: 'zhangsan@example.com'
  }
])

// 匯出歷史記錄
const exportHistory = ref([
  {
    date: '2024-01-09 10:00:00',
    name: '員工資料報表.pdf',
    format: 'pdf',
    status: 'completed'
  },
  {
    date: '2024-01-08 15:30:00',
    name: '員工資料報表.xlsx',
    format: 'excel',
    status: 'completed'
  }
])

// 當前日期時間
const currentDateTime = computed(() => {
  return new Date().toLocaleString()
})

// 處理匯出
const handleExport = async () => {
  if (exportForm.columns.length === 0) {
    ElMessage.warning('請至少選擇一個匯出欄位')
    return
  }

  exporting.value = true
  try {
    // 模擬匯出過程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 添加到歷史記錄
    exportHistory.value.unshift({
      date: new Date().toLocaleString(),
      name: `員工資料報表_${new Date().getTime()}.${exportForm.format}`,
      format: exportForm.format,
      status: 'completed'
    })

    ElMessage.success('匯出成功')
  } catch (error) {
    ElMessage.error('匯出失敗')
  } finally {
    exporting.value = false
  }
}

// 刷新預覽
const refreshPreview = () => {
  previewLoading.value = true
  setTimeout(() => {
    previewLoading.value = false
    ElMessage.success('預覽已更新')
  }, 1000)
}

// 下載文件
const handleDownload = (record) => {
  ElMessage.success(`開始下載: ${record.name}`)
}

// 獲取狀態類型
const getStatusType = (status) => {
  const map = {
    completed: 'success',
    processing: 'warning',
    failed: 'danger'
  }
  return map[status] || 'info'
}
</script>

<style scoped>
.export-container {
  padding: 20px;
}

.export-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.preview-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 400px;
}

.preview-page {
  background-color: white;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.preview-page.portrait {
  max-width: 800px;
}

.preview-page.landscape {
  max-width: 1200px;
}

.preview-header {
  margin-bottom: 20px;
  text-align: center;
}

.preview-footer {
  margin-top: 20px;
  text-align: center;
}

.page-number {
  color: #666;
  font-size: 12px;
}
</style>