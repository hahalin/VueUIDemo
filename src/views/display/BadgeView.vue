<template>
    <div class="demo-container">
      <h1 class="demo-title">徽章 (Badges)</h1>
      <p class="demo-description">徽章通常用於標記狀態、數量，或者用於強調某些元素。</p>
  
      <!-- 基本徽章 -->
      <div class="demo-section">
        <h2 class="section-title">基本徽章</h2>
        <p class="section-description">展示基本的徽章樣式。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-badge :value="12" class="badge-item">
              <el-button size="small">消息</el-button>
            </el-badge>
            <el-badge :value="3" class="badge-item">
              <el-button size="small">通知</el-button>
            </el-badge>
            <el-badge :value="0" class="badge-item" type="success">
              <el-button size="small">已讀</el-button>
            </el-badge>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ basicBadgeCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 狀態徽章 -->
      <div class="demo-section">
        <h2 class="section-title">狀態徽章</h2>
        <p class="section-description">用於表示不同狀態的徽章。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-badge value="待處理" class="badge-item" type="warning">
              <el-button size="small">訂單</el-button>
            </el-badge>
            <el-badge value="完成" class="badge-item" type="success">
              <el-button size="small">任務</el-button>
            </el-badge>
            <el-badge value="失敗" class="badge-item" type="danger">
              <el-button size="small">錯誤</el-button>
            </el-badge>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ statusBadgeCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 點狀徽章 -->
      <div class="demo-section">
        <h2 class="section-title">點狀徽章</h2>
        <p class="section-description">使用點狀徽章標記狀態或提醒。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-badge is-dot class="badge-item">
              <el-button size="small">未讀消息</el-button>
            </el-badge>
            <el-badge is-dot type="success" class="badge-item">
              <el-button size="small">在線</el-button>
            </el-badge>
            <el-badge is-dot type="danger" class="badge-item">
              <el-button size="small">警告</el-button>
            </el-badge>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ dotBadgeCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 最大值徽章 -->
      <div class="demo-section">
        <h2 class="section-title">最大值徽章</h2>
        <p class="section-description">當數值超過設定的最大值時，顯示 "+x"。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-badge :value="100" :max="99" class="badge-item">
              <el-button size="small">通知</el-button>
            </el-badge>
            <el-badge :value="250" :max="99" class="badge-item">
              <el-button size="small">消息</el-button>
            </el-badge>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ maxBadgeCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 程式碼範例
  const basicBadgeCode = `
  <el-badge :value="12">
    <el-button size="small">消息</el-button>
  </el-badge>
  <el-badge :value="3">
    <el-button size="small">通知</el-button>
  </el-badge>
  <el-badge :value="0" type="success">
    <el-button size="small">已讀</el-button>
  </el-badge>
  `.trim()
  
  const statusBadgeCode = `
  <el-badge value="待處理" type="warning">
    <el-button size="small">訂單</el-button>
  </el-badge>
  <el-badge value="完成" type="success">
    <el-button size="small">任務</el-button>
  </el-badge>
  <el-badge value="失敗" type="danger">
    <el-button size="small">錯誤</el-button>
  </el-badge>
  `.trim()
  
  const dotBadgeCode = `
  <el-badge is-dot>
    <el-button size="small">未讀消息</el-button>
  </el-badge>
  <el-badge is-dot type="success">
    <el-button size="small">在線</el-button>
  </el-badge>
  <el-badge is-dot type="danger">
    <el-button size="small">警告</el-button>
  </el-badge>
  `.trim()
  
  const maxBadgeCode = `
  <el-badge :value="100" :max="99">
    <el-button size="small">通知</el-button>
  </el-badge>
  <el-badge :value="250" :max="99">
    <el-button size="small">消息</el-button>
  </el-badge>
  `.trim()
  </script>
  
  <style scoped>
  .badge-item {
    margin-right: 16px;
  }

  
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
  
  </style>
  