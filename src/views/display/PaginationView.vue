```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">分頁</h1>
    <p class="demo-description">當資料量較大時，使用分頁分割資料。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">基本的分頁用法</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-pagination
            v-model:current-page="currentPage1"
            :total="50"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-pagination
  v-model:current-page="currentPage1"
  :total="50"
  @current-change="handleCurrentChange"
/>

const currentPage1 = ref(1)
const handleCurrentChange = (val: number) => {
  console.log('目前頁數：', val)
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 設定每頁筆數 -->
    <div class="demo-section">
      <h2 class="section-title">設定每頁筆數</h2>
      <p class="section-description">可以調整每頁顯示的資料筆數</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-pagination
            v-model:current-page="currentPage2"
            v-model:page-size="pageSize2"
            :page-sizes="[10, 20, 30, 40]"
            :total="200"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-pagination
  v-model:current-page="currentPage2"
  v-model:page-size="pageSize2"
  :page-sizes="[10, 20, 30, 40]"
  :total="200"
  layout="total, sizes, prev, pager, next, jumper"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>

const currentPage2 = ref(1)
const pageSize2 = ref(10)
const handleSizeChange = (val: number) => {
  console.log('每頁筆數：', val)
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 搭配表格使用 -->
    <div class="demo-section">
      <h2 class="section-title">搭配表格使用</h2>
      <p class="section-description">分頁搭配表格的實際應用情境</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="名稱" width="180" />
            <el-table-column prop="address" label="地址" />
          </el-table>
          
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage3"
              v-model:page-size="pageSize3"
              :page-sizes="[5, 10, 20]"
              :total="total"
              layout="total, sizes, prev, pager, next"
              @size-change="handleTableSizeChange"
              @current-change="handleTableCurrentChange"
            />
          </div>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-table :data="tableData" style="width: 100%">
  &lt;el-table-column prop="date" label="日期" width="180" />
  &lt;el-table-column prop="name" label="名稱" width="180" />
  &lt;el-table-column prop="address" label="地址" />
&lt;/el-table>

&lt;div class="pagination-wrapper">
  &lt;el-pagination
    v-model:current-page="currentPage3"
    v-model:page-size="pageSize3"
    :page-sizes="[5, 10, 20]"
    :total="total"
    layout="total, sizes, prev, pager, next"
    @size-change="handleTableSizeChange"
    @current-change="handleTableCurrentChange"
  />
&lt;/div>

// 模擬從後端獲取資料
const loadTableData = () => {
  const start = (currentPage3.value - 1) * pageSize3.value
  return mockData.slice(start, start + pageSize3.value)
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 不同大小 -->
    <div class="demo-section">
      <h2 class="section-title">不同大小</h2>
      <p class="section-description">提供不同尺寸的分頁組件</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <div class="mb-4">
            <el-pagination
              v-model:current-page="currentPage4"
              :page-size="10"
              :total="50"
              size="large"
            />
          </div>
          <div class="mb-4">
            <el-pagination
              v-model:current-page="currentPage5"
              :page-size="10"
              :total="50"
            />
          </div>
          <div>
            <el-pagination
              v-model:current-page="currentPage6"
              :page-size="10"
              :total="50"
              size="small"
            />
          </div>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-pagination
  v-model:current-page="currentPage4"
  :page-size="10"
  :total="50"
  size="large"
/>

&lt;el-pagination
  v-model:current-page="currentPage5"
  :page-size="10"
  :total="50"
/>

&lt;el-pagination
  v-model:current-page="currentPage6"
  :page-size="10"
  :total="50"
  size="small"
/>
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 基本用法
const currentPage1 = ref(1)

// 設定每頁筆數
const currentPage2 = ref(1)
const pageSize2 = ref(10)

// 表格分頁
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const total = ref(100)

// 生成模擬資料
const mockData = Array.from({ length: 100 }, (_, index) => ({
  date: `2024-01-${String(index % 30 + 1).padStart(2, '0')}`,
  name: `名稱 ${index + 1}`,
  address: `台北市信義區信義路 ${index + 1} 段`
}))

// 表格資料
const tableData = ref(mockData.slice(0, 10))

// 不同大小
const currentPage4 = ref(1)
const currentPage5 = ref(1)
const currentPage6 = ref(1)

// 處理分頁事件
const handleCurrentChange = (val: number) => {
  console.log('目前頁數：', val)
}

const handleSizeChange = (val: number) => {
  console.log('每頁筆數：', val)
}

// 表格分頁處理
const handleTableCurrentChange = (val: number) => {
  currentPage3.value = val
  tableData.value = mockData.slice(
    (val - 1) * pageSize3.value,
    val * pageSize3.value
  )
}

const handleTableSizeChange = (val: number) => {
  pageSize3.value = val
  tableData.value = mockData.slice(0, val)
  currentPage3.value = 1
}
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

.mb-4 {
  margin-bottom: 16px;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
```