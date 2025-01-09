```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">標記</h1>
    <p class="demo-description">用於顯示數字提醒或狀態標記。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">最基本的標記提示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-badge :value="12" class="item">
            <el-button>評論</el-button>
          </el-badge>
          <el-badge :value="3" class="item">
            <el-button>回覆</el-button>
          </el-badge>
          <el-badge :value="1" class="item" type="primary">
            <el-button>訊息</el-button>
          </el-badge>
          <el-badge :value="2" class="item" type="warning">
            <el-button>通知</el-button>
          </el-badge>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-badge :value="12" class="item">
  &lt;el-button>評論&lt;/el-button>
&lt;/el-badge>

&lt;el-badge :value="3" class="item">
  &lt;el-button>回覆&lt;/el-button>
&lt;/el-badge>

&lt;el-badge :value="1" class="item" type="primary">
  &lt;el-button>訊息&lt;/el-button>
&lt;/el-badge>

&lt;el-badge :value="2" class="item" type="warning">
  &lt;el-button>通知&lt;/el-button>
&lt;/el-badge>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 最大值 -->
    <div class="demo-section">
      <h2 class="section-title">最大值</h2>
      <p class="section-description">可以自定義最大值，超過最大值會顯示 '+'</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-badge :value="200" :max="99" class="item">
            <el-button>評論</el-button>
          </el-badge>
          <el-badge :value="100" :max="10" class="item">
            <el-button>回覆</el-button>
          </el-badge>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-badge :value="200" :max="99" class="item">
  &lt;el-button>評論&lt;/el-button>
&lt;/el-badge>

&lt;el-badge :value="100" :max="10" class="item">
  &lt;el-button>回覆&lt;/el-button>
&lt;/el-badge>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 自定義內容 -->
    <div class="demo-section">
      <h2 class="section-title">自定義內容</h2>
      <p class="section-description">可以顯示文字而不是數字</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-badge value="新" class="item">
            <el-button>評論</el-button>
          </el-badge>
          <el-badge value="熱門" class="item">
            <el-button>回覆</el-button>
          </el-badge>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-badge value="新" class="item">
  &lt;el-button>評論&lt;/el-button>
&lt;/el-badge>

&lt;el-badge value="熱門" class="item">
  &lt;el-button>回覆&lt;/el-button>
&lt;/el-badge>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 小紅點 -->
    <div class="demo-section">
      <h2 class="section-title">小紅點</h2>
      <p class="section-description">以紅點的形式標記需要注意的內容</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-badge is-dot class="item">
            <el-button icon="ChatRound" />
          </el-badge>
          <el-badge is-dot class="item">
            <el-icon><Bell /></el-icon>
          </el-badge>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-badge is-dot class="item">
  &lt;el-button icon="ChatRound" />
&lt;/el-badge>

&lt;el-badge is-dot class="item">
  &lt;el-icon>&lt;Bell />&lt;/el-icon>
&lt;/el-badge>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 狀態標記 -->
    <div class="demo-section">
      <h2 class="section-title">狀態標記</h2>
      <p class="section-description">不同狀態的標記樣式</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space wrap>
            <el-badge value="success" type="success">
              <el-button>成功</el-button>
            </el-badge>
            <el-badge value="warning" type="warning">
              <el-button>警告</el-button>
            </el-badge>
            <el-badge value="info" type="info">
              <el-button>資訊</el-button>
            </el-badge>
            <el-badge value="danger" type="danger">
              <el-button>錯誤</el-button>
            </el-badge>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-badge value="success" type="success">
  &lt;el-button>成功&lt;/el-button>
&lt;/el-badge>

&lt;el-badge value="warning" type="warning">
  &lt;el-button>警告&lt;/el-button>
&lt;/el-badge>

&lt;el-badge value="info" type="info">
  &lt;el-button>資訊&lt;/el-button>
&lt;/el-badge>

&lt;el-badge value="danger" type="danger">
  &lt;el-button>錯誤&lt;/el-button>
&lt;/el-badge>
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bell } from '@element-plus/icons-vue'
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

.item {
  margin-right: 40px;
  margin-bottom: 20px;
}

.item:last-child {
  margin-right: 0;
}
</style>
```