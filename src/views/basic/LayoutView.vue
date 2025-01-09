<template>
    <div class="demo-container">
      <h1 class="demo-title">版面配置</h1>
      <p class="demo-description">版面配置是整個使用者介面的基礎，提供了基本的區塊與網格系統。</p>
  
      <!-- 基本容器 -->
      <div class="demo-section">
        <h2 class="section-title">基本容器</h2>
        <p class="section-description">基本的容器元件，可以包含任何內容。</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-container class="layout-container">
              <el-header class="bg-header">Header</el-header>
              <el-container>
                <el-aside width="200px" class="bg-aside">Aside</el-aside>
                <el-main class="bg-main">Main</el-main>
              </el-container>
            </el-container>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-container>
    &lt;el-header>Header&lt;/el-header>
    &lt;el-container>
      &lt;el-aside width="200px">Aside&lt;/el-aside>
      &lt;el-main>Main&lt;/el-main>
    &lt;/el-container>
  &lt;/el-container>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 網格系統 -->
      <div class="demo-section">
        <h2 class="section-title">網格系統</h2>
        <p class="section-description">24 欄位網格系統，可靈活配置版面。</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <!-- 均分欄位 -->
            <el-row class="mb-4">
              <el-col :span="8"><div class="grid-content">span=8</div></el-col>
              <el-col :span="8"><div class="grid-content">span=8</div></el-col>
              <el-col :span="8"><div class="grid-content">span=8</div></el-col>
            </el-row>
  
            <!-- 不均分欄位 -->
            <el-row class="mb-4">
              <el-col :span="6"><div class="grid-content">span=6</div></el-col>
              <el-col :span="12"><div class="grid-content">span=12</div></el-col>
              <el-col :span="6"><div class="grid-content">span=6</div></el-col>
            </el-row>
  
            <!-- 含間距的欄位 -->
            <el-row :gutter="20" class="mb-4">
              <el-col :span="12"><div class="grid-content">span=12</div></el-col>
              <el-col :span="12"><div class="grid-content">span=12</div></el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;!-- 均分欄位 -->
  &lt;el-row>
    &lt;el-col :span="8">&lt;div class="grid-content">span=8&lt;/div>&lt;/el-col>
    &lt;el-col :span="8">&lt;div class="grid-content">span=8&lt;/div>&lt;/el-col>
    &lt;el-col :span="8">&lt;div class="grid-content">span=8&lt;/div>&lt;/el-col>
  &lt;/el-row>
  
  &lt;!-- 不均分欄位 -->
  &lt;el-row>
    &lt;el-col :span="6">&lt;div class="grid-content">span=6&lt;/div>&lt;/el-col>
    &lt;el-col :span="12">&lt;div class="grid-content">span=12&lt;/div>&lt;/el-col>
    &lt;el-col :span="6">&lt;div class="grid-content">span=6&lt;/div>&lt;/el-col>
  &lt;/el-row>
  
  &lt;!-- 含間距的欄位 -->
  &lt;el-row :gutter="20">
    &lt;el-col :span="12">&lt;div class="grid-content">span=12&lt;/div>&lt;/el-col>
    &lt;el-col :span="12">&lt;div class="grid-content">span=12&lt;/div>&lt;/el-col>
  &lt;/el-row>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- 欄位位移 -->
      <div class="demo-section">
        <h2 class="section-title">欄位位移</h2>
        <p class="section-description">可以設定欄位的偏移距離。</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row class="mb-4">
              <el-col :span="8"><div class="grid-content">span=8</div></el-col>
              <el-col :span="8" :offset="8"><div class="grid-content">span=8 offset=8</div></el-col>
            </el-row>
            <el-row class="mb-4">
              <el-col :span="6" :offset="6"><div class="grid-content">span=6 offset=6</div></el-col>
              <el-col :span="6" :offset="6"><div class="grid-content">span=6 offset=6</div></el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-row>
    &lt;el-col :span="8">&lt;div class="grid-content">span=8&lt;/div>&lt;/el-col>
    &lt;el-col :span="8" :offset="8">&lt;div class="grid-content">span=8 offset=8&lt;/div>&lt;/el-col>
  &lt;/el-row>
  
  &lt;el-row>
    &lt;el-col :span="6" :offset="6">&lt;div class="grid-content">span=6 offset=6&lt;/div>&lt;/el-col>
    &lt;el-col :span="6" :offset="6">&lt;div class="grid-content">span=6 offset=6&lt;/div>&lt;/el-col>
  &lt;/el-row>
            </code></pre>
          </div>
        </div>
      </div>
  
      <!-- RWD 響應式配置 -->
      <div class="demo-section">
        <h2 class="section-title">RWD 響應式配置</h2>
        <p class="section-description">針對不同尺寸的螢幕，可以設定不同的欄位寬度。</p>
        
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="grid-content">
                  xs=24 sm=12 md=8 lg=6 xl=4
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="grid-content">
                  xs=24 sm=12 md=8 lg=6 xl=4
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="grid-content">
                  xs=24 sm=12 md=8 lg=6 xl=4
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="demo-block-code">
            <pre><code>
  &lt;el-row :gutter="10">
    &lt;el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      &lt;div class="grid-content">xs=24 sm=12 md=8 lg=6 xl=4&lt;/div>
    &lt;/el-col>
    &lt;el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      &lt;div class="grid-content">xs=24 sm=12 md=8 lg=6 xl=4&lt;/div>
    &lt;/el-col>
    &lt;el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      &lt;div class="grid-content">xs=24 sm=12 md=8 lg=6 xl=4&lt;/div>
    &lt;/el-col>
  &lt;/el-row>
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
  
  /* Layout 樣式 */
  .layout-container {
    height: 400px;
  }
  
  .bg-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    text-align: center;
  }
  
  .bg-aside {
    background-color: #d3dce6;
    color: #333;
    line-height: 340px;
    text-align: center;
  }
  
  .bg-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 340px;
  }
  
  /* Grid 樣式 */
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background: #e5e9f2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
  
  .mb-4 {
    margin-bottom: 16px;
  }
  </style>