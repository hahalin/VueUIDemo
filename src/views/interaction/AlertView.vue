```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">提示訊息</h1>
    <p class="demo-description">用於頁面中展示重要的提示訊息。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">基本的提示訊息</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-alert title="預設提示訊息" />
          <el-alert class="mt-2" title="成功提示訊息" type="success" />
          <el-alert class="mt-2" title="警告提示訊息" type="warning" />
          <el-alert class="mt-2" title="錯誤提示訊息" type="error" />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-alert title="預設提示訊息" />
&lt;el-alert title="成功提示訊息" type="success" />
&lt;el-alert title="警告提示訊息" type="warning" />
&lt;el-alert title="錯誤提示訊息" type="error" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 主題樣式 -->
    <div class="demo-section">
      <h2 class="section-title">主題樣式</h2>
      <p class="section-description">深色主題的提示訊息</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-alert title="預設提示訊息" effect="dark" />
          <el-alert class="mt-2" title="成功提示訊息" type="success" effect="dark" />
          <el-alert class="mt-2" title="警告提示訊息" type="warning" effect="dark" />
          <el-alert class="mt-2" title="錯誤提示訊息" type="error" effect="dark" />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-alert title="預設提示訊息" effect="dark" />
&lt;el-alert title="成功提示訊息" type="success" effect="dark" />
&lt;el-alert title="警告提示訊息" type="warning" effect="dark" />
&lt;el-alert title="錯誤提示訊息" type="error" effect="dark" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 帶有描述 -->
    <div class="demo-section">
      <h2 class="section-title">帶有描述</h2>
      <p class="section-description">含有輔助性文字介紹的提示訊息</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-alert
            title="帶有描述的提示訊息"
            type="success"
            description="這是一段輔助性的文字描述，可以用來補充說明主要訊息。"
          />
          <el-alert
            class="mt-2"
            title="帶有描述的提示訊息"
            type="warning"
            description="這是一段輔助性的文字描述，可以用來補充說明主要訊息。"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-alert
  title="帶有描述的提示訊息"
  type="success"
  description="這是一段輔助性的文字描述，可以用來補充說明主要訊息。"
/>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 帶有圖示 -->
    <div class="demo-section">
      <h2 class="section-title">帶有圖示</h2>
      <p class="section-description">可以在提示訊息中加入圖示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-alert title="預設提示訊息" show-icon />
          <el-alert class="mt-2" title="成功提示訊息" type="success" show-icon />
          <el-alert class="mt-2" title="警告提示訊息" type="warning" show-icon />
          <el-alert class="mt-2" title="錯誤提示訊息" type="error" show-icon />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-alert title="預設提示訊息" show-icon />
&lt;el-alert title="成功提示訊息" type="success" show-icon />
&lt;el-alert title="警告提示訊息" type="warning" show-icon />
&lt;el-alert title="錯誤提示訊息" type="error" show-icon />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 可關閉 -->
    <div class="demo-section">
      <h2 class="section-title">可關閉</h2>
      <p class="section-description">可以關閉的提示訊息</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-alert
            title="不可關閉的提示訊息"
            type="success"
            :closable="false"
          />
          <el-alert
            class="mt-2"
            title="自訂關閉按鈕文字"
            type="info"
            close-text="了解"
          />
          <el-alert
            class="mt-2"
            title="點擊關閉事件"
            type="warning"
            @close="handleClose"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-alert
  title="不可關閉的提示訊息"
  type="success"
  :closable="false"
/>

&lt;el-alert
  title="自訂關閉按鈕文字"
  type="info"
  close-text="了解"
/>

&lt;el-alert
  title="點擊關閉事件"
  type="warning"
  @close="handleClose"
/>
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('Alert 被關閉了')
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

.mt-2 {
  margin-top: 8px;
}
</style>
```