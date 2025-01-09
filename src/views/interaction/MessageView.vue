```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">訊息提示</h1>
    <p class="demo-description">用於頁面中顯示的全域提示訊息。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">基本的訊息提示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button @click="openMessage">顯示訊息</el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openMessage = () => {
  ElMessage('這是一條訊息提示')
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 不同類型 -->
    <div class="demo-section">
      <h2 class="section-title">不同類型</h2>
      <p class="section-description">提供成功、警告、錯誤等不同類型的訊息提示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-button @click="openSuccessMessage">成功</el-button>
            <el-button @click="openWarningMessage">警告</el-button>
            <el-button @click="openInfoMessage">提示</el-button>
            <el-button @click="openErrorMessage">錯誤</el-button>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openSuccessMessage = () => {
  ElMessage.success('這是一條成功訊息')
}

const openWarningMessage = () => {
  ElMessage.warning('這是一條警告訊息')
}

const openInfoMessage = () => {
  ElMessage.info('這是一條提示訊息')
}

const openErrorMessage = () => {
  ElMessage.error('這是一條錯誤訊息')
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 可關閉的訊息 -->
    <div class="demo-section">
      <h2 class="section-title">可關閉的訊息</h2>
      <p class="section-description">顯示關閉按鈕的訊息提示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button @click="openClosableMessage">
            顯示可關閉訊息
          </el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openClosableMessage = () => {
  ElMessage({
    message: '這是一條可關閉的訊息提示',
    showClose: true,
    duration: 0
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- HTML 片段 -->
    <div class="demo-section">
      <h2 class="section-title">HTML 片段</h2>
      <p class="section-description">支援顯示 HTML 內容</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button @click="openHTMLMessage">顯示 HTML 訊息</el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openHTMLMessage = () => {
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>這是 <i>HTML</i> 片段</strong>'
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 自訂配置 -->
    <div class="demo-section">
      <h2 class="section-title">自訂配置</h2>
      <p class="section-description">自訂訊息的顯示配置</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-button @click="openCustomDuration">自訂顯示時間</el-button>
            <el-button @click="openCenterMessage">置中顯示</el-button>
            <el-button @click="openCustomClass">自訂樣式</el-button>
            <el-button @click="openGroupedMessage">群組訊息</el-button>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openCustomDuration = () => {
  ElMessage({
    message: '顯示 10 秒後消失',
    duration: 10000
  })
}

const openCenterMessage = () => {
  ElMessage({
    message: '置中顯示的訊息',
    center: true
  })
}

const openCustomClass = () => {
  ElMessage({
    message: '自訂樣式的訊息',
    customClass: 'custom-message'
  })
}

const openGroupedMessage = () => {
  for (let i = 0; i < 3; i++) {
    ElMessage({
      message: \`第 \${i + 1} 條訊息\`,
      grouping: true
    })
  }
}
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

// 基本訊息
const openMessage = () => {
  ElMessage('這是一條訊息提示')
}

// 不同類型的訊息
const openSuccessMessage = () => {
  ElMessage.success('這是一條成功訊息')
}

const openWarningMessage = () => {
  ElMessage.warning('這是一條警告訊息')
}

const openInfoMessage = () => {
  ElMessage.info('這是一條提示訊息')
}

const openErrorMessage = () => {
  ElMessage.error('這是一條錯誤訊息')
}

// 可關閉的訊息
const openClosableMessage = () => {
  ElMessage({
    message: '這是一條可關閉的訊息提示',
    showClose: true,
    duration: 0
  })
}

// HTML 訊息
const openHTMLMessage = () => {
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>這是 <i>HTML</i> 片段</strong>'
  })
}

// 自訂配置
const openCustomDuration = () => {
  ElMessage({
    message: '顯示 10 秒後消失',
    duration: 10000
  })
}

const openCenterMessage = () => {
  ElMessage({
    message: '置中顯示的訊息',
    center: true
  })
}

const openCustomClass = () => {
  ElMessage({
    message: '自訂樣式的訊息',
    customClass: 'custom-message'
  })
}

const openGroupedMessage = () => {
  for (let i = 0; i < 3; i++) {
    ElMessage({
      message: `第 ${i + 1} 條訊息`,
      grouping: true
    })
  }
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

:deep(.custom-message) {
  min-width: 300px;
  background: #fdf6ec;
  border: 1px solid #faecd8;
}
</style>
```