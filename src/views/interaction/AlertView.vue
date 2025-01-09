<template>
    <div class="demo-container">
      <h1 class="demo-title">警告提示 (Alerts)</h1>
      <p class="demo-description">警告提示用於向用戶傳達重要訊息，並支持多種樣式與互動。</p>
  
      <!-- 基本警告提示 -->
      <div class="demo-section">
        <h2 class="section-title">基本警告提示</h2>
        <p class="section-description">展示基本的警告提示樣式。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-alert title="成功提示" type="success" show-icon />
            <el-alert title="資訊提示" type="info" show-icon />
            <el-alert title="警告提示" type="warning" show-icon />
            <el-alert title="錯誤提示" type="error" show-icon />
          </div>
          <div class="demo-block-code">
            <pre><code>{{ basicAlertCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 可關閉警告提示 -->
      <div class="demo-section">
        <h2 class="section-title">可關閉警告提示</h2>
        <p class="section-description">支持手動關閉的警告提示。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-alert title="這是一條成功提示" type="success" show-icon closable />
            <el-alert title="這是一條資訊提示" type="info" show-icon closable />
            <el-alert title="這是一條警告提示" type="warning" show-icon closable />
            <el-alert title="這是一條錯誤提示" type="error" show-icon closable />
          </div>
          <div class="demo-block-code">
            <pre><code>{{ closableAlertCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 自定義內容 -->
      <div class="demo-section">
        <h2 class="section-title">自定義內容</h2>
        <p class="section-description">警告提示可以包含自定義內容。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-alert type="info" show-icon>
              <template #title>自定義標題</template>
              <span>這是一條帶有自定義內容的警告提示。</span>
            </el-alert>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ customAlertCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 不同樣式 -->
      <div class="demo-section">
        <h2 class="section-title">不同樣式</h2>
        <p class="section-description">展示純文字與無圖標的警告提示。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-alert title="純文字提示" type="success" effect="light" />
            <el-alert title="無圖標提示" type="info" :show-icon="false" />
          </div>
          <div class="demo-block-code">
            <pre><code>{{ styleAlertCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 程式碼範例
  const basicAlertCode = `
  <el-alert title="成功提示" type="success" show-icon />
  <el-alert title="資訊提示" type="info" show-icon />
  <el-alert title="警告提示" type="warning" show-icon />
  <el-alert title="錯誤提示" type="error" show-icon />
  `.trim()
  
  const closableAlertCode = `
  <el-alert title="這是一條成功提示" type="success" show-icon closable />
  <el-alert title="這是一條資訊提示" type="info" show-icon closable />
  <el-alert title="這是一條警告提示" type="warning" show-icon closable />
  <el-alert title="這是一條錯誤提示" type="error" show-icon closable />
  `.trim()
  
  const customAlertCode = `
  <el-alert type="info" show-icon>
    <template #title>自定義標題</template>
    <span>這是一條帶有自定義內容的警告提示。</span>
  </el-alert>
  `.trim()
  
  const styleAlertCode = `
  <el-alert title="純文字提示" type="success" effect="light" />
  <el-alert title="無圖標提示" type="info" :show-icon="false" />
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
  </style>
  