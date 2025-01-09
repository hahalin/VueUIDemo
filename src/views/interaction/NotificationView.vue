<template>
  <div class="demo-container">
    <h1 class="demo-title">通知 (Notifications)</h1>
    <p class="demo-description">展示通知信息，用於提示重要系統消息。</p>

    <!-- 基本通知 -->
    <div class="demo-section">
      <h2 class="section-title">基本通知</h2>
      <p class="section-description">展示不同類型的通知。</p>

      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="success" @click="showNotification('success', '操作成功')">成功</el-button>
          <el-button type="info" @click="showNotification('info', '信息提示')">信息</el-button>
          <el-button type="warning" @click="showNotification('warning', '警告信息')">警告</el-button>
          <el-button type="danger" @click="showNotification('error', '錯誤信息')">錯誤</el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ notificationCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'

// 顯示通知
const showNotification = (type: string, message: string) => {
  ElNotification({
    title: type.toUpperCase(),
    message,
    type,
  })
}

// 程式碼範例
const notificationCode = `
ElNotification({
  title: 'SUCCESS',
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
