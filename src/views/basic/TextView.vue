<template>
    <div class="demo-container">
      <h1 class="demo-title">文字樣式</h1>
      <p class="demo-description">用於展示不同層級的文字樣式，包含標題、內文、連結等。</p>
  
      <!-- 標題樣式 -->
      <div class="demo-section">
        <h2 class="section-title">標題樣式</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <h1>h1 主標題</h1>
            <h2>h2 次標題</h2>
            <h3>h3 小標題</h3>
            <h4>h4 小標題</h4>
            <h5>h5 小標題</h5>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;h1>h1 主標題&lt;/h1>
  &lt;h2>h2 次標題&lt;/h2>
  &lt;h3>h3 小標題&lt;/h3>
  &lt;h4>h4 小標題&lt;/h4>
  &lt;h5>h5 小標題&lt;/h5>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 文字段落 -->
      <div class="demo-section">
        <h2 class="section-title">文字段落</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <p class="text-default">預設文字樣式：這是一段預設的文字段落。</p>
            <p class="text-primary">主要文字樣式：這是一段主要的文字段落。</p>
            <p class="text-success">成功文字樣式：這是一段成功的文字段落。</p>
            <p class="text-warning">警告文字樣式：這是一段警告的文字段落。</p>
            <p class="text-danger">錯誤文字樣式：這是一段錯誤的文字段落。</p>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;p class="text-default">預設文字樣式：這是一段預設的文字段落。&lt;/p>
  &lt;p class="text-primary">主要文字樣式：這是一段主要的文字段落。&lt;/p>
  &lt;p class="text-success">成功文字樣式：這是一段成功的文字段落。&lt;/p>
  &lt;p class="text-warning">警告文字樣式：這是一段警告的文字段落。&lt;/p>
  &lt;p class="text-danger">錯誤文字樣式：這是一段錯誤的文字段落。&lt;/p>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 文字對齊 -->
      <div class="demo-section">
        <h2 class="section-title">文字對齊</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <p class="text-left">靠左對齊的文字</p>
            <p class="text-center">置中對齊的文字</p>
            <p class="text-right">靠右對齊的文字</p>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;p class="text-left">靠左對齊的文字&lt;/p>
  &lt;p class="text-center">置中對齊的文字&lt;/p>
  &lt;p class="text-right">靠右對齊的文字&lt;/p>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 連結樣式 -->
      <div class="demo-section">
        <h2 class="section-title">連結樣式</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <a href="#" class="link-default">預設連結</a>
            <a href="#" class="link-primary">主要連結</a>
            <a href="#" class="link-underline">帶底線連結</a>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;a href="#" class="link-default">預設連結&lt;/a>
  &lt;a href="#" class="link-primary">主要連結&lt;/a>
  &lt;a href="#" class="link-underline">帶底線連結&lt;/a>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 文字修飾 -->
      <div class="demo-section">
        <h2 class="section-title">文字修飾</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <p><strong>粗體文字</strong></p>
            <p><em>斜體文字</em></p>
            <p><u>底線文字</u></p>
            <p><del>刪除線文字</del></p>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;p>&lt;strong>粗體文字&lt;/strong>&lt;/p>
  &lt;p>&lt;em>斜體文字&lt;/em>&lt;/p>
  &lt;p>&lt;u>底線文字&lt;/u>&lt;/p>
  &lt;p>&lt;del>刪除線文字&lt;/del>&lt;/p>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 文字大小 -->
      <div class="demo-section">
        <h2 class="section-title">文字大小</h2>
        <div class="demo-block">
          <div class="demo-block-content">
            <p class="text-xs">特小文字 (12px)</p>
            <p class="text-sm">小文字 (14px)</p>
            <p class="text-base">基本文字 (16px)</p>
            <p class="text-lg">大文字 (18px)</p>
            <p class="text-xl">特大文字 (20px)</p>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;p class="text-xs">特小文字 (12px)&lt;/p>
  &lt;p class="text-sm">小文字 (14px)&lt;/p>
  &lt;p class="text-base">基本文字 (16px)&lt;/p>
  &lt;p class="text-lg">大文字 (18px)&lt;/p>
  &lt;p class="text-xl">特大文字 (20px)&lt;/p>
            </code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
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
  
  /* 文字顏色 */
  .text-default { color: #606266; }
  .text-primary { color: #409EFF; }
  .text-success { color: #67C23A; }
  .text-warning { color: #E6A23C; }
  .text-danger { color: #F56C6C; }
  
  /* 文字對齊 */
  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  
  /* 連結樣式 */
  .link-default {
    color: #606266;
    text-decoration: none;
    margin-right: 16px;
  }
  
  .link-primary {
    color: #409EFF;
    text-decoration: none;
    margin-right: 16px;
  }
  
  .link-underline {
    color: #409EFF;
    text-decoration: underline;
  }
  
  /* 文字大小 */
  .text-xs { font-size: 12px; }
  .text-sm { font-size: 14px; }
  .text-base { font-size: 16px; }
  .text-lg { font-size: 18px; }
  .text-xl { font-size: 20px; }
  </style>