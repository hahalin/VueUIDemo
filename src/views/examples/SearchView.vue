<template>
    <div class="search-container">
      <!-- 查詢條件區 -->
      <el-card class="search-card">
        <template #header>
          <div class="card-header">
            <span>查詢條件</span>
            <div class="header-actions">
              <el-button type="primary" @click="handleSearch">查詢</el-button>
              <el-button @click="resetSearch">重置</el-button>
            </div>
          </div>
        </template>
  
        <el-form :model="searchForm" ref="searchFormRef" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="日期範圍">
                <el-date-picker
                  v-model="searchForm.dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="開始日期"
                  end-placeholder="結束日期"
                  :shortcuts="dateShortcuts"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部門">
                <el-select v-model="searchForm.department" placeholder="請選擇部門" style="width: 100%">
                  <el-option label="全部" value="" />
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="狀態">
                <el-select v-model="searchForm.status" placeholder="請選擇狀態" style="width: 100%">
                  <el-option label="全部" value="" />
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="關鍵字">
                <el-input
                  v-model="searchForm.keyword"
                  placeholder="請輸入關鍵字"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
  
      <!-- 查詢結果表格 -->
      <el-card class="table-card">
        <template #header>
          <div class="card-header">
            <span>查詢結果</span>
            <div class="header-actions">
              <el-button type="success" @click="handleExport">
                <el-icon><Download /></el-icon>匯出
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <el-icon><Plus /></el-icon>新增
              </el-button>
            </div>
          </div>
        </template>
  
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          stripe
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序號" width="60" />
          <el-table-column prop="name" label="姓名" sortable />
          <el-table-column prop="department" label="部門">
            <template #default="{ row }">
              {{ getDepartmentLabel(row.department) }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="入職日期" sortable />
          <el-table-column prop="status" label="狀態">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ getStatusLabel(row.status) }}
              </el-tag>
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
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Download, Plus } from '@element-plus/icons-vue'
  
  // 查詢表單數據
  const searchForm = reactive({
    dateRange: [],
    department: '',
    status: '',
    keyword: ''
  })
  
  // 部門選項
  const departmentOptions = [
    { value: 'hr', label: '人力資源部' },
    { value: 'it', label: '資訊技術部' },
    { value: 'finance', label: '財務部' },
    { value: 'sales', label: '銷售部' }
  ]
  
  // 狀態選項
  const statusOptions = [
    { value: 'active', label: '在職' },
    { value: 'inactive', label: '離職' },
    { value: 'vacation', label: '休假中' }
  ]
  
  // 日期快捷選項
  const dateShortcuts = [
    {
      text: '最近一週',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    },
    {
      text: '最近一個月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 1)
        return [start, end]
      },
    },
    {
      text: '最近三個月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 3)
        return [start, end]
      },
    }
  ]
  
  // 表格相關數據
  const tableLoading = ref(false)
  const tableData = ref([
    {
      name: '張三',
      department: 'hr',
      date: '2024-01-01',
      status: 'active'
    },
    {
      name: '李四',
      department: 'it',
      date: '2024-01-02',
      status: 'vacation'
    }
  ])
  const selectedRows = ref([])
  
  // 分頁相關
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(100)
  
  // 查詢方法
  const handleSearch = () => {
    tableLoading.value = true
    console.log('查詢條件:', searchForm)
    // 模擬API請求
    setTimeout(() => {
      tableLoading.value = false
      ElMessage.success('查詢成功')
    }, 1000)
  }
  
  // 重置查詢條件
  const resetSearch = () => {
    searchForm.dateRange = []
    searchForm.department = ''
    searchForm.status = ''
    searchForm.keyword = ''
  }
  
  // 表格操作方法
  const handleSelectionChange = (val) => {
    selectedRows.value = val
  }
  
  const handleAdd = () => {
    ElMessage.info('點擊了新增按鈕')
  }
  
  const handleEdit = (row) => {
    console.log('編輯:', row)
    ElMessage.info(`編輯: ${row.name}`)
  }
  
  const handleView = (row) => {
    console.log('查看:', row)
    ElMessage.info(`查看: ${row.name}`)
  }
  
  const handleDelete = (row) => {
    ElMessageBox.confirm(
      `確定要刪除 ${row.name} 的記錄嗎？`,
      '警告',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        ElMessage.success('刪除成功')
      })
      .catch(() => {
        ElMessage.info('已取消刪除')
      })
  }
  
  const handleExport = () => {
    ElMessage.success('開始匯出資料')
  }
  
  // 分頁操作方法
  const handleSizeChange = (val) => {
    console.log('每頁數量:', val)
    // 重新加載數據
    handleSearch()
  }
  
  const handleCurrentChange = (val) => {
    console.log('當前頁:', val)
    // 重新加載數據
    handleSearch()
  }
  
  // 工具方法
  const getDepartmentLabel = (value) => {
    const item = departmentOptions.find(item => item.value === value)
    return item ? item.label : value
  }
  
  const getStatusLabel = (value) => {
    const item = statusOptions.find(item => item.value === value)
    return item ? item.label : value
  }
  
  const getStatusType = (status) => {
    const map = {
      active: 'success',
      inactive: 'danger',
      vacation: 'warning'
    }
    return map[status] || 'info'
  }
  </script>
  
  <style scoped>
  .search-container {
    padding: 20px;
  }
  
  .search-card {
    margin-bottom: 20px;
  }
  
  .table-card {
    margin-bottom: 20px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
  }
  
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  </style>