<template>
    <div class="demo-container">
      <h1 class="demo-title">標籤 (Tags)</h1>
      <p class="demo-description">標籤用於標識狀態、分類或其他資訊，具有多樣化的風格與互動。</p>
  
      <!-- 基本標籤 -->
      <div class="demo-section">
        <h2 class="section-title">基本標籤</h2>
        <p class="section-description">展示基本的標籤風格。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-tag>標籤 1</el-tag>
            <el-tag type="success">成功</el-tag>
            <el-tag type="info">資訊</el-tag>
            <el-tag type="warning">警告</el-tag>
            <el-tag type="danger">危險</el-tag>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ basicTagCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 可關閉標籤 -->
      <div class="demo-section">
        <h2 class="section-title">可關閉標籤</h2>
        <p class="section-description">帶有關閉按鈕的標籤。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-tag v-for="tag in closableTags" :key="tag" closable @close="removeTag(tag)">
              {{ tag }}
            </el-tag>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ closableTagCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 動態新增標籤 -->
      <div class="demo-section">
        <h2 class="section-title">動態新增標籤</h2>
        <p class="section-description">可以動態新增和刪除標籤。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <div class="dynamic-tag-container">
              <el-tag v-for="tag in dynamicTags" :key="tag" closable @close="removeDynamicTag(tag)">
                {{ tag }}
              </el-tag>
              <el-input
                class="tag-input"
                v-if="inputVisible"
                v-model="newTag"
                size="small"
                @keyup.enter="addTag"
                @blur="addTag"
              />
              <el-button v-else class="new-tag-button" size="small" @click="showInput">+ 新增標籤</el-button>
            </div>
          </div>
          <div class="demo-block-code">
            <pre><code>{{ dynamicTagCode }}</code></pre>
          </div>
        </div>
      </div>
  
      <!-- 標籤尺寸 -->
      <div class="demo-section">
        <h2 class="section-title">標籤尺寸</h2>
        <p class="section-description">支援不同尺寸的標籤。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-tag size="medium">中等</el-tag>
            <el-tag size="small">小</el-tag>
            <!-- <el-tag size="mini">迷你</el-tag> -->
          </div>
          <div class="demo-block-code">
            <pre><code>{{ sizeTagCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // 可關閉標籤資料
  const closableTags = ref(['標籤 A', '標籤 B', '標籤 C'])
  
  // 動態標籤資料
  const dynamicTags = ref(['動態標籤 1', '動態標籤 2'])
  const inputVisible = ref(false)
  const newTag = ref('')
  
  // 方法 - 移除標籤
  const removeTag = (tag: string) => {
    const index = closableTags.value.indexOf(tag)
    if (index >= 0) closableTags.value.splice(index, 1)
  }
  
  const removeDynamicTag = (tag: string) => {
    const index = dynamicTags.value.indexOf(tag)
    if (index >= 0) dynamicTags.value.splice(index, 1)
  }
  
  // 方法 - 新增標籤
  const showInput = () => {
    inputVisible.value = true
  }
  
  const addTag = () => {
    if (newTag.value.trim()) {
      dynamicTags.value.push(newTag.value.trim())
    }
    newTag.value = ''
    inputVisible.value = false
  }
  
  // 程式碼範例
  const basicTagCode = `
  <el-tag>標籤 1</el-tag>
  <el-tag type="success">成功</el-tag>
  <el-tag type="info">資訊</el-tag>
  <el-tag type="warning">警告</el-tag>
  <el-tag type="danger">危險</el-tag>
  `.trim()
  
  const closableTagCode = `
  <el-tag v-for="tag in closableTags" :key="tag" closable @close="removeTag(tag)">
    {{ tag }}
  </el-tag>
  `.trim()
  
  const dynamicTagCode = `
  <el-tag v-for="tag in dynamicTags" :key="tag" closable @close="removeDynamicTag(tag)">
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    v-model="newTag"
    size="small"
    @keyup.enter="addTag"
    @blur="addTag"
  />
  <el-button v-else size="small" @click="showInput">+ 新增標籤</el-button>
  `.trim()
  
  const sizeTagCode = `
  <el-tag size="medium">中等</el-tag>
  <el-tag size="small">小</el-tag>
  `.trim()
  </script>
  
  <style scoped>
  .dynamic-tag-container {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .tag-input {
    width: 120px;
  }
  
  .new-tag-button {
    margin-left: 8px;
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
  
  .mt-4 {
    margin-top: 16px;
  }
  </style>
  