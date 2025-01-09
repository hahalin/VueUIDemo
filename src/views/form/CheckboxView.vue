```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">核取方塊</h1>
    <p class="demo-description">在多個選項中選擇多個項目</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">最基本的核取方塊用法</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-checkbox v-model="checked1">選項 1</el-checkbox>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-checkbox v-model="checked1">選項 1&lt;/el-checkbox>

const checked1 = ref(false)
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 禁用狀態 -->
    <div class="demo-section">
      <h2 class="section-title">禁用狀態</h2>
      <p class="section-description">無法選擇的狀態</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-checkbox v-model="checked2" disabled>選項 1</el-checkbox>
          <el-checkbox v-model="checked3" disabled>選項 2</el-checkbox>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-checkbox v-model="checked2" disabled>選項 1&lt;/el-checkbox>
&lt;el-checkbox v-model="checked3" disabled>選項 2&lt;/el-checkbox>

const checked2 = ref(false)
const checked3 = ref(true)
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 多選組合 -->
    <div class="demo-section">
      <h2 class="section-title">多選組合</h2>
      <p class="section-description">一組相關的核取方塊</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="選項 A" />
            <el-checkbox label="選項 B" />
            <el-checkbox label="選項 C" />
            <el-checkbox label="選項 D" />
          </el-checkbox-group>
          <div class="mt-3">
            已選擇：{{ checkList }}
          </div>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-checkbox-group v-model="checkList">
  &lt;el-checkbox label="選項 A" />
  &lt;el-checkbox label="選項 B" />
  &lt;el-checkbox label="選項 C" />
  &lt;el-checkbox label="選項 D" />
&lt;/el-checkbox-group>

const checkList = ref(['選項 A'])
          </code></pre>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基本用法
const checked1 = ref(false)

// 禁用狀態
const checked2 = ref(false)
const checked3 = ref(true)

// 多選組合
const checkList = ref(['選項 A'])

// 按鈕樣式
const checkList2 = ref(['選項 A'])
const checkList3 = ref(['大尺寸'])
const checkList4 = ref(['小尺寸'])
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

.mt-3 {
  margin-top: 12px;
}

.el-checkbox {
  margin-right: 20px;
  margin-bottom: 12px;
}
</style>
```