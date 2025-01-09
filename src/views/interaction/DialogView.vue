<template>
  <div class="demo-container">
    <h1 class="demo-title">對話框 (Dialogs)</h1>
    <p class="demo-description">用於展示交互操作的彈出框，支持多種操作形式。</p>

    <!-- 基本對話框 -->
    <div class="demo-section">
      <h2 class="section-title">基本對話框</h2>
      <p class="section-description">展示基本的對話框樣式。</p>

      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="primary" @click="showBasicDialog = true">打開對話框</el-button>
          <el-dialog title="基本對話框" v-model="showBasicDialog">
            <span>這是一個基本對話框的內容。</span>
            <template #footer>
              <el-button @click="showBasicDialog = false">取消</el-button>
              <el-button type="primary" @click="showBasicDialog = false">確認</el-button>
            </template>
          </el-dialog>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ basicDialogCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制對話框的顯示
const showBasicDialog = ref(false)

// 程式碼範例
const basicDialogCode = `
<el-dialog title="基本對話框" v-model="showBasicDialog">
  <span>這是一個基本對話框的內容。</span>
  <template #footer>
    <el-button @click="showBasicDialog = false">取消</el-button>
    <el-button type="primary" @click="showBasicDialog = false">確認</el-button>
  </template>
</el-dialog>
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
