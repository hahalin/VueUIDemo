<template>
  <div class="demo-container">
    <h1 class="demo-title">消息提示 (Messages)</h1>
    <p class="demo-description">短暫的提示信息，用於展示操作結果或狀態。</p>

    <!-- 基本消息提示 -->
    <div class="demo-section">
      <h2 class="section-title">基本消息提示</h2>
      <p class="section-description">展示不同類型的消息提示。</p>

      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="success" @click="showMessage('success', '操作成功')">成功</el-button>
          <el-button type="info" @click="showMessage('info', '信息提示')">信息</el-button>
          <el-button type="warning" @click="showMessage('warning', '警告信息')">警告</el-button>
          <el-button type="danger" @click="showMessage('error', '錯誤信息')">錯誤</el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ messageCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

// 顯示消息提示
const showMessage = (type: string, message: string) => {
  ElMessage({
    message,
    type,
  })
}

// 程式碼範例
const messageCode = `
ElMessage({
  message: '操作成功',
  type: 'success',
})
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
