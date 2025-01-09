<template>
    <div class="demo-container">
      <h1 class="demo-title">日期選擇</h1>
      <p class="demo-description">在表單中選擇或輸入日期</p>
  
      <!-- 基本用法 -->
      <div class="demo-section">
        <h2 class="section-title">基本用法</h2>
        <p class="section-description">選擇單一日期</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-date-picker
                  v-model="date1"
                  type="date"
                  placeholder="請選擇日期"
                  :size="size"
                  style="width: 100%"
                />
              </el-col>
              <el-col :span="12">
                <el-radio-group v-model="size" class="mb-4">
                  <el-radio-button label="large">大</el-radio-button>
                  <el-radio-button label="">中</el-radio-button>
                  <el-radio-button label="small">小</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-date-picker
    v-model="date1"
    type="date"
    placeholder="請選擇日期"
    :size="size"
  />
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 其他日期類型 -->
      <div class="demo-section">
        <h2 class="section-title">其他日期類型</h2>
        <p class="section-description">週、月、年等不同類型的選擇器</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space direction="vertical" style="width: 100%">
              <!-- 週選擇器 -->
              <el-date-picker
                v-model="date2"
                type="week"
                format="YYYY 第 ww 週"
                placeholder="請選擇週"
                style="width: 100%"
              />
              <!-- 月選擇器 -->
              <el-date-picker
                v-model="date3"
                type="month"
                placeholder="請選擇月份"
                style="width: 100%"
              />
              <!-- 年選擇器 -->
              <el-date-picker
                v-model="date4"
                type="year"
                placeholder="請選擇年份"
                style="width: 100%"
              />
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 週選擇器 -->
  &lt;el-date-picker
    v-model="date2"
    type="week"
    format="YYYY 第 ww 週"
    placeholder="請選擇週"
  />
  
  &lt;!-- 月選擇器 -->
  &lt;el-date-picker
    v-model="date3"
    type="month"
    placeholder="請選擇月份"
  />
  
  &lt;!-- 年選擇器 -->
  &lt;el-date-picker
    v-model="date4"
    type="year"
    placeholder="請選擇年份"
  />
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 日期範圍 -->
      <div class="demo-section">
        <h2 class="section-title">日期範圍</h2>
        <p class="section-description">選擇日期範圍</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space direction="vertical" style="width: 100%">
              <!-- 日期範圍 -->
              <el-date-picker
                v-model="dateRange1"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
                style="width: 100%"
              />
              <!-- 月份範圍 -->
              <el-date-picker
                v-model="dateRange2"
                type="monthrange"
                range-separator="至"
                start-placeholder="開始月份"
                end-placeholder="結束月份"
                style="width: 100%"
              />
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 日期範圍 -->
  &lt;el-date-picker
    v-model="dateRange1"
    type="daterange"
    range-separator="至"
    start-placeholder="開始日期"
    end-placeholder="結束日期"
  />
  
  &lt;!-- 月份範圍 -->
  &lt;el-date-picker
    v-model="dateRange2"
    type="monthrange"
    range-separator="至"
    start-placeholder="開始月份"
    end-placeholder="結束月份"
  />
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 日期限制 -->
      <div class="demo-section">
        <h2 class="section-title">日期限制</h2>
        <p class="section-description">設定可選擇的日期範圍</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <p class="mb-2">限制選擇範圍（前後 10 天）：</p>
                <el-date-picker
                  v-model="date5"
                  type="date"
                  placeholder="請選擇日期"
                  :disabled-date="disabledDate"
                  style="width: 100%"
                />
              </el-col>
              <el-col :span="12">
                <p class="mb-2">包含快速選項：</p>
                <el-date-picker
                  v-model="dateRange3"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="開始日期"
                  end-placeholder="結束日期"
                  :shortcuts="shortcuts"
                  style="width: 100%"
                />
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 限制選擇範圍 -->
  &lt;el-date-picker
    v-model="date5"
    type="date"
    placeholder="請選擇日期"
    :disabled-date="disabledDate"
  />
  
  &lt;!-- 包含快速選項 -->
  &lt;el-date-picker
    v-model="dateRange3"
    type="daterange"
    range-separator="至"
    start-placeholder="開始日期"
    end-placeholder="結束日期"
    :shortcuts="shortcuts"
  />
  
  const disabledDate = (time) => {
    const now = Date.now()
    const tenDays = 10 * 24 * 60 * 60 * 1000
    return time.getTime() > now + tenDays || time.getTime() < now - tenDays
  }
  
  const shortcuts = [
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
    },
  ]
            </code></pre>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 基本日期選擇
  const date1 = ref('')
  const size = ref('')
  
  // 其他日期類型
  const date2 = ref('')
  const date3 = ref('')
  const date4 = ref('')
  
  // 日期範圍
  const dateRange1 = ref('')
  const dateRange2 = ref('')
  
  // 日期限制
  const date5 = ref('')
  const dateRange3 = ref('')
  
  // 快速選項
  const shortcuts = [
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
    },
  ]
  
  // 限制日期選擇範圍
  const disabledDate = (time) => {
    const now = Date.now()
    const tenDays = 10 * 24 * 60 * 60 * 1000
    return time.getTime() > now + tenDays || time.getTime() < now - tenDays
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
  
  .mb-2 {
    margin-bottom: 8px;
  }
  </style>