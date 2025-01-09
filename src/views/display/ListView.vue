<template>
    <div class="demo-container">
      <h1 class="demo-title">列表 (Lists)</h1>
      <p class="demo-description">展示數據的列表，支持多種風格和功能。</p>
  
      <!-- 卡片樣式列表 -->
      <div class="demo-section">
        <h2 class="section-title">卡片樣式列表</h2>
        <p class="section-description">使用卡片展示列表數據，適合結構化內容。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <el-row :gutter="20">
              <el-col v-for="item in cardList" :key="item.id" :span="8">
                <el-card>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
  
      <!-- 帶圖標的列表 -->
      <div class="demo-section">
        <h2 class="section-title">帶圖標的列表</h2>
        <p class="section-description">帶有圖標的列表，適合導航或圖形化提示。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <ul class="icon-list">
              <li v-for="item in iconList" :key="item.id" class="icon-list-item">
                <component :is="item.icon" class="list-icon" />
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- 可選擇的列表 -->
      <div class="demo-section">
        <h2 class="section-title">可選擇的列表</h2>
        <p class="section-description">適用於多選或單選操作的列表。</p>
  
        <div class="demo-block">
          <div class="demo-block-content">
            <ul class="selectable-list">
              <li
                v-for="item in selectableList"
                :key="item.id"
                class="selectable-list-item"
              >
                <el-checkbox v-model="item.selected">
                  <span>{{ item.text }}</span>
                </el-checkbox>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { House, Folder, Bell } from '@element-plus/icons-vue' // 引入圖標
  
  // 卡片樣式列表數據
  const cardList = ref([
    { id: 1, title: '卡片標題 1', description: '這是卡片的描述內容 1' },
    { id: 2, title: '卡片標題 2', description: '這是卡片的描述內容 2' },
    { id: 3, title: '卡片標題 3', description: '這是卡片的描述內容 3' },
  ])
  
  // 帶圖標的列表數據
  const iconList = ref([
    { id: 1, text: '導航項目 1', icon: House },
    { id: 2, text: '導航項目 2', icon: Folder },
    { id: 3, text: '導航項目 3', icon: Bell },
  ])
  
  // 可選擇的列表數據
  const selectableList = ref([
    { id: 1, text: '選項 1', selected: false },
    { id: 2, text: '選項 2', selected: false },
    { id: 3, text: '選項 3', selected: false },
  ])
  </script>
  
  <style scoped>
  
    /* 列表樣式 */
.icon-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.icon-list-item {
  display: flex;
  align-items: center;
  gap: 12px; /* 圖標與文字的間距 */
  padding: 8px 0;
  border-bottom: 1px solid #ebebeb;
}

.list-icon {
  width: 20px; /* 圖標區域固定寬度 */
  text-align: center; /* 圖標居中對齊 */
  font-size: 20px; /* 調整圖標大小 */
  color: #409eff; /* 圖標顏色 */
}

.icon-list-item span {
  flex: 1; /* 讓文字內容占據剩餘空間 */
  white-space: nowrap; /* 防止文字換行 */
  overflow: hidden; /* 隱藏過多內容 */
  text-overflow: ellipsis; /* 使用省略號 */
}


.selectable-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selectable-list-item {
  padding: 8px 0;
  border-bottom: 1px solid #ebebeb;
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
  