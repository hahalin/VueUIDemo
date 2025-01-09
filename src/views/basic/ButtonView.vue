<template>
    <div class="demo-container">
      <h1 class="demo-title">按鈕</h1>
      <p class="demo-description">提供各種類型和樣式的按鈕，用於觸發相對應的操作行為。</p>
  
      <!-- 基本按鈕 -->
      <div class="demo-section">
        <h2 class="section-title">基本按鈕</h2>
        <p class="section-description">基礎的按鈕用法</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button>預設按鈕</el-button>
              <el-button type="primary">主要按鈕</el-button>
              <el-button type="success">確認按鈕</el-button>
              <el-button type="info">資訊按鈕</el-button>
              <el-button type="warning">警告按鈕</el-button>
              <el-button type="danger">危險按鈕</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button>預設按鈕&lt;/el-button>
  &lt;el-button type="primary">主要按鈕&lt;/el-button>
  &lt;el-button type="success">確認按鈕&lt;/el-button>
  &lt;el-button type="info">資訊按鈕&lt;/el-button>
  &lt;el-button type="warning">警告按鈕&lt;/el-button>
  &lt;el-button type="danger">危險按鈕&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 次要按鈕 -->
      <div class="demo-section">
        <h2 class="section-title">次要按鈕</h2>
        <p class="section-description">次要的按鈕樣式</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button plain>預設按鈕</el-button>
              <el-button type="primary" plain>主要按鈕</el-button>
              <el-button type="success" plain>確認按鈕</el-button>
              <el-button type="info" plain>資訊按鈕</el-button>
              <el-button type="warning" plain>警告按鈕</el-button>
              <el-button type="danger" plain>危險按鈕</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button plain>預設按鈕&lt;/el-button>
  &lt;el-button type="primary" plain>主要按鈕&lt;/el-button>
  &lt;el-button type="success" plain>確認按鈕&lt;/el-button>
  &lt;el-button type="info" plain>資訊按鈕&lt;/el-button>
  &lt;el-button type="warning" plain>警告按鈕&lt;/el-button>
  &lt;el-button type="danger" plain>危險按鈕&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 圓角按鈕 -->
      <div class="demo-section">
        <h2 class="section-title">圓角按鈕</h2>
        <p class="section-description">圓角樣式的按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button round>預設按鈕</el-button>
              <el-button type="primary" round>主要按鈕</el-button>
              <el-button type="success" round>確認按鈕</el-button>
              <el-button type="info" round>資訊按鈕</el-button>
              <el-button type="warning" round>警告按鈕</el-button>
              <el-button type="danger" round>危險按鈕</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button round>預設按鈕&lt;/el-button>
  &lt;el-button type="primary" round>主要按鈕&lt;/el-button>
  &lt;el-button type="success" round>確認按鈕&lt;/el-button>
  &lt;el-button type="info" round>資訊按鈕&lt;/el-button>
  &lt;el-button type="warning" round>警告按鈕&lt;/el-button>
  &lt;el-button type="danger" round>危險按鈕&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 圖示按鈕 -->
      <div class="demo-section">
        <h2 class="section-title">圖示按鈕</h2>
        <p class="section-description">帶有圖示的按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button :icon="Search">搜尋</el-button>
              <el-button type="primary" :icon="Edit">編輯</el-button>
              <el-button type="success" :icon="Check">確認</el-button>
              <el-button type="info" :icon="Message">訊息</el-button>
              <el-button type="warning" :icon="Star">收藏</el-button>
              <el-button type="danger" :icon="Delete">刪除</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button :icon="Search">搜尋&lt;/el-button>
  &lt;el-button type="primary" :icon="Edit">編輯&lt;/el-button>
  &lt;el-button type="success" :icon="Check">確認&lt;/el-button>
  &lt;el-button type="info" :icon="Message">訊息&lt;/el-button>
  &lt;el-button type="warning" :icon="Star">收藏&lt;/el-button>
  &lt;el-button type="danger" :icon="Delete">刪除&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 按鈕尺寸 -->
      <div class="demo-section">
        <h2 class="section-title">按鈕尺寸</h2>
        <p class="section-description">不同尺寸的按鈕</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap alignment="center">
              <el-button size="large" type="primary">大型按鈕</el-button>
              <el-button type="primary">預設按鈕</el-button>
              <el-button size="small" type="primary">小型按鈕</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button size="large" type="primary">大型按鈕&lt;/el-button>
  &lt;el-button type="primary">預設按鈕&lt;/el-button>
  &lt;el-button size="small" type="primary">小型按鈕&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 禁用狀態 -->
      <div class="demo-section">
        <h2 class="section-title">禁用狀態</h2>
        <p class="section-description">禁用的按鈕樣式</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button disabled>預設按鈕</el-button>
              <el-button type="primary" disabled>主要按鈕</el-button>
              <el-button type="success" disabled>確認按鈕</el-button>
              <el-button type="info" disabled>資訊按鈕</el-button>
              <el-button type="warning" disabled>警告按鈕</el-button>
              <el-button type="danger" disabled>危險按鈕</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button disabled>預設按鈕&lt;/el-button>
  &lt;el-button type="primary" disabled>主要按鈕&lt;/el-button>
  &lt;el-button type="success" disabled>確認按鈕&lt;/el-button>
  &lt;el-button type="info" disabled>資訊按鈕&lt;/el-button>
  &lt;el-button type="warning" disabled>警告按鈕&lt;/el-button>
  &lt;el-button type="danger" disabled>危險按鈕&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 載入狀態 -->
      <div class="demo-section">
        <h2 class="section-title">載入狀態</h2>
        <p class="section-description">顯示載入中的按鈕樣式</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap>
              <el-button :loading="true">載入中</el-button>
              <el-button type="primary" :loading="true">載入中</el-button>
              <el-button type="success" :loading="true">載入中</el-button>
              <el-button type="info" :loading="true">載入中</el-button>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button :loading="true">載入中&lt;/el-button>
  &lt;el-button type="primary" :loading="true">載入中&lt;/el-button>
  &lt;el-button type="success" :loading="true">載入中&lt;/el-button>
  &lt;el-button type="info" :loading="true">載入中&lt;/el-button>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 按鈕群組 -->
      <div class="demo-section">
        <h2 class="section-title">按鈕群組</h2>
        <p class="section-description">將多個按鈕組合在一起</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-space wrap direction="vertical" size="large">
              <el-button-group>
                <el-button type="primary" :icon="ArrowLeft">上一頁</el-button>
                <el-button type="primary">下一頁<el-icon class="el-icon--right"><ArrowRight /></el-icon></el-button>
              </el-button-group>
  
              <el-button-group>
                <el-button type="primary" :icon="Edit" />
                <el-button type="primary" :icon="Share" />
                <el-button type="primary" :icon="Delete" />
              </el-button-group>
            </el-space>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-button-group>
    &lt;el-button type="primary" :icon="ArrowLeft">上一頁&lt;/el-button>
    &lt;el-button type="primary">下一頁&lt;el-icon>&lt;ArrowRight />&lt;/el-icon>&lt;/el-button>
  &lt;/el-button-group>
  
  &lt;el-button-group>
    &lt;el-button type="primary" :icon="Edit" />
    &lt;el-button type="primary" :icon="Share" />
    &lt;el-button type="primary" :icon="Delete" />
  &lt;/el-button-group>
            </code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    Search,
    Edit,
    Check,
    Message,
    Star,
    Delete,
    Share,
    ArrowLeft,
    ArrowRight
  } from '@element-plus/icons-vue'
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