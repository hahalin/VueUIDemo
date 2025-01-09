```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">系統通知</h1>
    <p class="demo-description">用於顯示系統級通知的訊息。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">基本的通知提示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button plain @click="open1">
            打開通知
          </el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>
const open1 = () => {
  ElNotification({
    title: '標題',
    message: '這是一條通知訊息'
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 不同類型 -->
    <div class="demo-section">
      <h2 class="section-title">不同類型</h2>
      <p class="section-description">提供成功、警告、提示、錯誤等不同類型的通知</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-button plain @click="openSuccess">成功</el-button>
            <el-button plain @click="openWarning">警告</el-button>
            <el-button plain @click="openInfo">提示</el-button>
            <el-button plain @click="openError">錯誤</el-button>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openSuccess = () => {
  ElNotification({
    title: '成功',
    message: '這是一條成功的通知訊息',
    type: 'success',
  })
}

const openWarning = () => {
  ElNotification({
    title: '警告',
    message: '這是一條警告的通知訊息',
    type: 'warning',
  })
}

const openInfo = () => {
  ElNotification({
    title: '提示',
    message: '這是一條提示的通知訊息',
    type: 'info',
  })
}

const openError = () => {
  ElNotification({
    title: '錯誤',
    message: '這是一條錯誤的通知訊息',
    type: 'error',
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 不同位置 -->
    <div class="demo-section">
      <h2 class="section-title">不同位置</h2>
      <p class="section-description">可以從不同角落彈出通知</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-button plain @click="openTopRight">右上角</el-button>
            <el-button plain @click="openTopLeft">左上角</el-button>
            <el-button plain @click="openBottomRight">右下角</el-button>
            <el-button plain @click="openBottomLeft">左下角</el-button>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openTopRight = () => {
  ElNotification({
    title: '右上角通知',
    message: '這是一條通知訊息',
    position: 'top-right'
  })
}

const openTopLeft = () => {
  ElNotification({
    title: '左上角通知',
    message: '這是一條通知訊息',
    position: 'top-left'
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 自訂內容 -->
    <div class="demo-section">
      <h2 class="section-title">自訂內容</h2>
      <p class="section-description">自訂通知內容的樣式</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-button plain @click="openHTML">HTML 內容</el-button>
            <el-button plain @click="openWithIcon">帶有圖示</el-button>
            <el-button plain @click="openWithClose">自訂關閉按鈕</el-button>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openHTML = () => {
  ElNotification({
    title: '自訂內容',
    dangerouslyUseHTMLString: true,
    message: '<strong>這是 <i>HTML</i> 片段</strong>'
  })
}

const openWithIcon = () => {
  ElNotification({
    title: '自訂圖示',
    message: '這是一條帶有圖示的通知',
    icon: markRaw(Bell)
  })
}
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 隱藏關閉按鈕 -->
    <div class="demo-section">
      <h2 class="section-title">隱藏關閉按鈕</h2>
      <p class="section-description">不顯示關閉按鈕的通知</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button plain @click="openNoClose">
            不可關閉的通知
          </el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>
const openNoClose = () => {
  ElNotification({
    title: '無法關閉',
    message: '這是一條不能被關閉的通知',
    showClose: false,
    duration: 0
  })
}
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

// 基本通知
const open1 = () => {
  ElNotification({
    title: '標題',
    message: '這是一條通知訊息'
  })
}

// 不同類型的通知
const openSuccess = () => {
  ElNotification({
    title: '成功',
    message: '這是一條成功的通知訊息',
    type: 'success',
  })
}

const openWarning = () => {
  ElNotification({
    title: '警告',
    message: '這是一條警告的通知訊息',
    type: 'warning',
  })
}

const openInfo = () => {
  ElNotification({
    title: '提示',
    message: '這是一條提示的通知訊息',
    type: 'info',
  })
}

const openError = () => {
  ElNotification({
    title: '錯誤',
    message: '這是一條錯誤的通知訊息',
    type: 'error',
  })
}

// 不同位置
const openTopRight = () => {
  ElNotification({
    title: '右上角通知',
    message: '這是一條通知訊息',
    position: 'top-right'
  })
}

const openTopLeft = () => {
  ElNotification({
    title: '左上角通知',
    message: '這是一條通知訊息',
    position: 'top-left'
  })
}

const openBottomRight = () => {
  ElNotification({
    title: '右下角通知',
    message: '這是一條通知訊息',
    position: 'bottom-right'
  })
}

const openBottomLeft = () => {
  ElNotification({
    title: '左下角通知',
    message: '這是一條通知訊息',
    position: 'bottom-left'
  })
}

// 自訂內容
const openHTML = () => {
  ElNotification({
    title: '自訂內容',
    dangerouslyUseHTMLString: true,
    message: '<strong>這是 <i>HTML</i> 片段</strong>'
  })
}

const openWithIcon = () => {
  ElNotification({
    title: '自訂圖示',
    message: '這是一條帶有圖示的通知',
    icon: markRaw(Bell)
  })
}

const openWithClose = () => {
  ElNotification({
    title: '自訂關閉按鈕',
    message: '點擊關閉按鈕時會觸發回調函數',
    onClose: () => {
      ElNotification({
        title: '提示',
        message: '通知已關閉'
      })
    }
  })
}

// 不可關閉
const openNoClose = () => {
  ElNotification({
    title: '無法關閉',
    message: '這是一條不能被關閉的通知',
    showClose: false,
    duration: 0
  })
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
</style>
```