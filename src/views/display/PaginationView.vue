<template>
    <div class="demo-container">
      <h1 class="demo-title">分頁表格</h1>
      <p class="demo-description">展示多頁的資料，並提供分頁切換功能。</p>
  
      <!-- 基本分頁表格 -->
      <div class="demo-section">
        <h2 class="section-title">基本分頁表格</h2>
        <p class="section-description">使用基礎的分頁功能來顯示多頁資料。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table :data="paginatedData" style="width: 100%">
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
            <el-pagination
              class="mt-4"
              background
              layout="prev, pager, next"
              :total="tableData.length"
              :page-size="pageSize"
              @current-change="handlePageChange"
            />
          </div>
          <div class="demo-block-code">
            <pre><code>{{ basicPaginationCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 斑馬條紋和邊框 -->
      <div class="demo-section">
        <h2 class="section-title">斑馬條紋和邊框的分頁表格</h2>
        <p class="section-description">提升表格可讀性，結合分頁功能。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-table :data="paginatedData" stripe border style="width: 100%">
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
            <el-pagination
              class="mt-4"
              background
              layout="prev, pager, next"
              :total="tableData.length"
              :page-size="pageSize"
              @current-change="handlePageChange"
            />
          </div>
          <div class="demo-block-code">
            <pre><code>{{ stripedPaginationCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  // 模擬資料
  const tableData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    date: `2024-01-${String(index + 1).padStart(2, '0')}`,
    name: `使用者 ${index + 1}`,
    status: ['處理中', '已完成', '已取消'][index % 3],
    phone: `0912-345-${String(index + 1).padStart(3, '0')}`,
    address: `台北市信義區信義路 ${index + 1} 段`
  }))
  
  // 分頁設定
  const pageSize = 10
  const currentPage = ref(1)
  
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return tableData.slice(start, end)
  })
  
  // 狀態標籤類型映射
  const getStatusType = (status: string) => {
    const map: Record<string, string> = {
      '處理中': 'warning',
      '已完成': 'success',
      '已取消': 'info'
    }
    return map[status] || 'default'
  }
  
  // 分頁切換處理
  const handlePageChange = (page: number) => {
    currentPage.value = page
  }
  
  // 程式碼範例
  const basicPaginationCode = `
  <el-table :data="paginatedData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="120" />
    ...
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="tableData.length"
    :page-size="pageSize"
    @current-change="handlePageChange"
  />
  `.trim()
  
  const stripedPaginationCode = `
  <el-table :data="paginatedData" stripe border style="width: 100%">
    <el-table-column prop="date" label="日期" width="120" />
    ...
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="tableData.length"
    :page-size="pageSize"
    @current-change="handlePageChange"
  />
  `.trim()
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
  