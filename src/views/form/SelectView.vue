<template>
    <div class="demo-container">
      <h1 class="demo-title">下拉選單</h1>
      <p class="demo-description">當選項過多時，使用下拉選單來收納選項。</p>
  
      <!-- 基本用法 -->
      <div class="demo-section">
        <h2 class="section-title">基本用法</h2>
        <p class="section-description">基本的下拉選單使用方式</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-select v-model="value1" placeholder="請選擇">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-select v-model="value1" placeholder="請選擇">
    &lt;el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
  
  const options = [
    { value: '1', label: '選項一' },
    { value: '2', label: '選項二' },
    { value: '3', label: '選項三' }
  ]
  const value1 = ref('')
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 禁用狀態 -->
      <div class="demo-section">
        <h2 class="section-title">禁用狀態</h2>
        <p class="section-description">選單或選項的禁用狀態</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <!-- 整個選單禁用 -->
                <el-select v-model="value2" disabled placeholder="整個選單禁用">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <!-- 部分選項禁用 -->
                <el-select v-model="value3" placeholder="部分選項禁用">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.value === '2'"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 整個選單禁用 -->
  &lt;el-select v-model="value2" disabled placeholder="整個選單禁用">
    &lt;el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
  
  &lt;!-- 部分選項禁用 -->
  &lt;el-select v-model="value3" placeholder="部分選項禁用">
    &lt;el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.value === '2'"
    />
  &lt;/el-select>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 多選模式 -->
      <div class="demo-section">
        <h2 class="section-title">多選模式</h2>
        <p class="section-description">可以選擇多個選項</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <!-- 基本多選 -->
                <el-select
                  v-model="value4"
                  multiple
                  placeholder="請選擇多個選項"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <!-- 摺疊標籤的多選 -->
                <el-select
                  v-model="value5"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="摺疊標籤的多選"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 基本多選 -->
  &lt;el-select
    v-model="value4"
    multiple
    placeholder="請選擇多個選項"
  >
    &lt;el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
  
  &lt;!-- 摺疊標籤的多選 -->
  &lt;el-select
    v-model="value5"
    multiple
    collapse-tags
    collapse-tags-tooltip
    placeholder="摺疊標籤的多選"
  >
    &lt;el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 可搜尋 -->
      <div class="demo-section">
        <h2 class="section-title">可搜尋</h2>
        <p class="section-description">可以搜尋選項的下拉選單</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <!-- 單選搜尋 -->
                <el-select
                  v-model="value6"
                  filterable
                  placeholder="可搜尋的單選"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in moreOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <!-- 多選搜尋 -->
                <el-select
                  v-model="value7"
                  multiple
                  filterable
                  placeholder="可搜尋的多選"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in moreOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 單選搜尋 -->
  &lt;el-select
    v-model="value6"
    filterable
    placeholder="可搜尋的單選"
  >
    &lt;el-option
      v-for="item in moreOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
  
  &lt;!-- 多選搜尋 -->
  &lt;el-select
    v-model="value7"
    multiple
    filterable
    placeholder="可搜尋的多選"
  >
    &lt;el-option
      v-for="item in moreOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  &lt;/el-select>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 分組選項 -->
      <div class="demo-section">
        <h2 class="section-title">分組選項</h2>
        <p class="section-description">將選項進行分組</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-select v-model="value8" placeholder="請選擇城市">
              <el-option-group
                v-for="group in groupOptions"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-select v-model="value8" placeholder="請選擇城市">
    &lt;el-option-group
      v-for="group in groupOptions"
      :key="group.label"
      :label="group.label"
    >
      &lt;el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    &lt;/el-option-group>
  &lt;/el-select>
  
  const groupOptions = [
    {
      label: '北部',
      options: [
        { value: 'taipei', label: '台北市' },
        { value: 'ntpc', label: '新北市' }
      ]
    },
    {
      label: '中部',
      options: [
        { value: 'taichung', label: '台中市' },
        { value: 'changhua', label: '彰化縣' }
      ]
    }
  ]
            </code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 基本選項
  const options = [
    { value: '1', label: '選項一' },
    { value: '2', label: '選項二' },
    { value: '3', label: '選項三' }
  ]
  
  // 更多選項（用於搜尋示例）
  const moreOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}`,
    label: `選項 ${i + 1}`
  }))
  
  // 分組選項
  const groupOptions = [
    {
      label: '北部',
      options: [
        { value: 'taipei', label: '台北市' },
        { value: 'ntpc', label: '新北市' }
      ]
    },
    {
      label: '中部',
      options: [
        { value: 'taichung', label: '台中市' },
        { value: 'changhua', label: '彰化縣' }
      ]
    }
  ]
  
  // 各種示例的值
  const value1 = ref('')
  const value2 = ref('')
  const value3 = ref('')
  const value4 = ref([])
  const value5 = ref([])
  const value6 = ref('')
  const value7 = ref([])
  const value8 = ref('')
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
  
  .el-select {
    margin-bottom: 12px;
  }
  </style>