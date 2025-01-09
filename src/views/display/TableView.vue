<template>
    <div class="demo-container">
      <h1 class="demo-title">表格</h1>
      <p class="demo-description">用於展示多條結構類似的資料。</p>
  
      <!-- 基本表格 -->
      <div class="demo-section">
        <h2 class="section-title">基本表格</h2>
        <p class="section-description">基本的資料展示表格</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="status" label="狀態" width="100">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="電話" width="120" />
              <el-table-column prop="address" label="地址" />
            </el-table>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ basicTableCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 斑馬條紋和邊框 -->
      <div class="demo-section">
        <h2 class="section-title">斑馬條紋和邊框</h2>
        <p class="section-description">使用斑馬條紋和邊框增加表格的可讀性</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="status" label="狀態" width="100">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="電話" width="120" />
              <el-table-column prop="address" label="地址" />
            </el-table>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ stripeTableCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 排序和過濾 -->
      <div class="demo-section">
        <h2 class="section-title">排序和過濾</h2>
        <p class="section-description">支援排序和過濾功能的表格</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table
              :data="filteredTableData"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="120"
              />
              <el-table-column
                prop="name"
                label="姓名"
                width="120"
              />
              <el-table-column
                prop="status"
                label="狀態"
                width="120"
                :filters="statusFilters"
                :filter-method="filterStatus"
              >
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="電話" width="120" />
              <el-table-column prop="address" label="地址" />
            </el-table>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ sortFilterTableCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 可展開行 -->
      <div class="demo-section">
        <h2 class="section-title">可展開行</h2>
        <p class="section-description">展示每一列的詳細資訊</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template #default="props">
                  <div class="expanded-row">
                    <p><strong>建立時間：</strong>{{ props.row.date }}</p>
                    <p><strong>詳細地址：</strong>{{ props.row.address }}</p>
                    <p><strong>聯絡電話：</strong>{{ props.row.phone }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="status" label="狀態">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ expandTableCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 可選擇行 -->
      <div class="demo-section">
        <h2 class="section-title">可選擇行</h2>
        <p class="section-description">支援選擇單行或多行</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="status" label="狀態" width="100">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">
                    {{ row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="地址" />
            </el-table>
            <div class="mt-4">
              已選擇 {{ selectedRows.length }} 筆資料
            </div>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ selectTableCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface TableData {
    id: number
    date: string
    name: string
    status: string
    phone: string
    address: string
  }
  
  // 模擬資料
  const tableData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    date: `2024-01-${String(index + 1).padStart(2, '0')}`,
    name: `使用者 ${index + 1}`,
    status: ['處理中', '已完成', '已取消'][index % 3],
    phone: `0912-345-${String(index + 1).padStart(3, '0')}`,
    address: `台北市信義區信義路 ${index + 1} 段`
  }))
  
  // 狀態過濾選項
  const statusFilters = [
    { text: '處理中', value: '處理中' },
    { text: '已完成', value: '已完成' },
    { text: '已取消', value: '已取消' }
  ]
  
  // 過濾後的資料
  const filteredTableData = ref(tableData)
  
  // 已選擇的行
  const selectedRows = ref<TableData[]>([])
  
  // 取得狀態對應的標籤類型
  const getStatusType = (status: string) => {
    const map: Record<string, string> = {
      '處理中': 'warning',
      '已完成': 'success',
      '已取消': 'info'
    }
    return map[status] || 'default'
  }
  
  // 狀態過濾方法
  const filterStatus = (value: string, row: TableData) => {
    return row.status === value
  }
  
  // 選擇行變更處理
  const handleSelectionChange = (val: TableData[]) => {
    selectedRows.value = val
  }
  
  // 程式碼範例
  const basicTableCode = `
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="120" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="status" label="狀態" width="100">
      <template #default="{ row }">
        <el-tag :type="getStatusType(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="電話" width="120" />
    <el-table-column prop="address" label="地址" />
  </el-table>
  `
  
  const stripeTableCode = `
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%"
  >
    ...
  </el-table>
  `.trim()
  
  const sortFilterTableCode = `
  <el-table
    :data="filteredTableData"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="120"
    />
    <el-table-column
      prop="status"
      label="狀態"
      width="120"
      :filters="statusFilters"
      :filter-method="filterStatus"
    >
      <template #default="{ row }">
        <el-tag :type="getStatusType(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    ...
  </el-table>
  `
  
  const expandTableCode = `
  <el-table :data="tableData">
    <el-table-column type="expand">
      <template #default="props">
        <div class="expanded-row">
          <p><strong>建立時間：</strong>{{ props.row.date }}</p>
          <p><strong>詳細地址：</strong>{{ props.row.address }}</p>
          <p><strong>聯絡電話：</strong>{{ props.row.phone }}</p>
        </div>
      </template>
    </el-table-column>
    ...
  </el-table>
  `
  
  const selectTableCode = `
  <el-table
    :data="tableData"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    ...
  </el-table>
  `
  </script>
  
  <style scoped>
  .demo-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .demo-title {
    font-size: 28px;
    margin-bottom: 16px;
  }
  
  .demo-description {
    color: #666;
    margin-bottom: 32px;
  }
  
  .demo-section {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .section-description {
    color: #666;
    margin-bottom: 16px;
  }
  
  .demo-block {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  
  .demo-block-content {
    padding: 24px;
  }
  
  .demo-block-code {
    background-color: #fafafa;
    border-top: 1px solid #dcdfe6;
    padding: 24px;
  }
  
  .demo-block-code pre {
    margin: 0;
  }
  
  .demo-block-code code {
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
  }
  
  .expanded-row {
    padding: 20px;
  }
  
  .expanded-row p {
    margin: 0;
    line-height: 1.8;
  }
  
  .mt-4 {
    margin-top: 16px;
  }
  </style>