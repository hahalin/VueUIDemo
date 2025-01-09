<template>
    <div class="demo-container">
      <h1 class="demo-title">選項按鈕</h1>
      <p class="demo-description">在多個選項中選擇其中一個</p>
  
      <!-- 基本用法 -->
      <div class="demo-section">
        <h2 class="section-title">基本用法</h2>
        <p class="section-description">最基本的選項按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-radio v-model="radio1" label="1">選項 1</el-radio>
            <el-radio v-model="radio1" label="2">選項 2</el-radio>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-radio v-model="radio1" label="1">選項 1&lt;/el-radio>
  &lt;el-radio v-model="radio1" label="2">選項 2&lt;/el-radio>
  
  const radio1 = ref('1')
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
            <el-radio v-model="radio2" label="1" disabled>選項 1</el-radio>
            <el-radio v-model="radio2" label="2" disabled>選項 2</el-radio>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-radio v-model="radio2" label="1" disabled>選項 1&lt;/el-radio>
  &lt;el-radio v-model="radio2" label="2" disabled>選項 2&lt;/el-radio>
  
  const radio2 = ref('1')
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 單選按鈕群組 -->
      <div class="demo-section">
        <h2 class="section-title">選項群組</h2>
        <p class="section-description">一組相關的選項按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-radio-group v-model="radio3">
              <el-radio label="1">選項 1</el-radio>
              <el-radio label="2">選項 2</el-radio>
              <el-radio label="3">選項 3</el-radio>
              <el-radio label="4">選項 4</el-radio>
            </el-radio-group>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-radio-group v-model="radio3">
    &lt;el-radio label="1">選項 1&lt;/el-radio>
    &lt;el-radio label="2">選項 2&lt;/el-radio>
    &lt;el-radio label="3">選項 3&lt;/el-radio>
    &lt;el-radio label="4">選項 4&lt;/el-radio>
  &lt;/el-radio-group>
  
  const radio3 = ref('1')
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 按鈕樣式 -->
      <div class="demo-section">
        <h2 class="section-title">按鈕樣式</h2>
        <p class="section-description">按鈕樣式的選項群組</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <div class="mb-4">
              <el-radio-group v-model="radio4">
                <el-radio-button label="1">選項 1</el-radio-button>
                <el-radio-button label="2">選項 2</el-radio-button>
                <el-radio-button label="3">選項 3</el-radio-button>
              </el-radio-group>
            </div>
  
            <div class="mb-4">
              <el-radio-group v-model="radio5" size="large">
                <el-radio-button label="1">大尺寸</el-radio-button>
                <el-radio-button label="2">選項 2</el-radio-button>
              </el-radio-group>
            </div>
  
            <div class="mb-4">
              <el-radio-group v-model="radio6" size="small">
                <el-radio-button label="1">小尺寸</el-radio-button>
                <el-radio-button label="2">選項 2</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-radio-group v-model="radio4">
    &lt;el-radio-button label="1">選項 1&lt;/el-radio-button>
    &lt;el-radio-button label="2">選項 2&lt;/el-radio-button>
    &lt;el-radio-button label="3">選項 3&lt;/el-radio-button>
  &lt;/el-radio-group>
  
  &lt;el-radio-group v-model="radio5" size="large">
    &lt;el-radio-button label="1">大尺寸&lt;/el-radio-button>
    &lt;el-radio-button label="2">選項 2&lt;/el-radio-button>
  &lt;/el-radio-group>
  
  &lt;el-radio-group v-model="radio6" size="small">
    &lt;el-radio-button label="1">小尺寸&lt;/el-radio-button>
    &lt;el-radio-button label="2">選項 2&lt;/el-radio-button>
  &lt;/el-radio-group>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 帶有邊框 -->
      <div class="demo-section">
        <h2 class="section-title">帶有邊框</h2>
        <p class="section-description">帶有邊框的選項按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <div class="mb-4">
              <el-radio v-model="radio7" label="1" border>選項 1</el-radio>
              <el-radio v-model="radio7" label="2" border>選項 2</el-radio>
            </div>
  
            <div class="mb-4">
              <el-radio v-model="radio8" label="1" border size="large">大尺寸</el-radio>
              <el-radio v-model="radio8" label="2" border size="large">選項 2</el-radio>
            </div>
  
            <div>
              <el-radio v-model="radio9" label="1" border size="small">小尺寸</el-radio>
              <el-radio v-model="radio9" label="2" border size="small">選項 2</el-radio>
            </div>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-radio v-model="radio7" label="1" border>選項 1&lt;/el-radio>
  &lt;el-radio v-model="radio7" label="2" border>選項 2&lt;/el-radio>
  
  &lt;el-radio v-model="radio8" label="1" border size="large">大尺寸&lt;/el-radio>
  &lt;el-radio v-model="radio8" label="2" border size="large">選項 2&lt;/el-radio>
  
  &lt;el-radio v-model="radio9" label="1" border size="small">小尺寸&lt;/el-radio>
  &lt;el-radio v-model="radio9" label="2" border size="small">選項 2&lt;/el-radio>
            </code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const radio1 = ref('1')
  const radio2 = ref('1')
  const radio3 = ref('1')
  const radio4 = ref('1')
  const radio5 = ref('1')
  const radio6 = ref('1')
  const radio7 = ref('1')
  const radio8 = ref('1')
  const radio9 = ref('1')
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
  
  .el-radio {
    margin-right: 20px;
    margin-bottom: 12px;
  }
  </style>