```vue
<template>
  <div class="home-container">
    <!-- 上方統計區塊 -->
    <el-row :gutter="20">
      <el-col 
        :xs="12" 
        :sm="12" 
        :md="6" 
        :lg="4.8" 
        v-for="card in statisticsCards" 
        :key="card.title"
      >
        <el-card 
          class="statistics-card card-margin" 
          :body-style="{ padding: '20px' }"
        >
          <div class="statistics-content">
            <el-icon class="statistics-icon" :class="card.type">
              <component :is="card.icon" />
            </el-icon>
            <div class="statistics-info">
              <div class="statistics-title">{{ card.title }}</div>
              <div class="statistics-value">{{ card.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 下方功能介紹區塊 -->
    <el-row :gutter="20" class="mt-4">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>功能介紹</span>
            </div>
          </template>
          <div class="welcome-content">
            <h2>UI 組件展示系統</h2>
            <p>提供全面的 UI 組件和範例頁面，協助開發者快速建立現代化的網頁應用。</p>
            <el-row :gutter="20" class="feature-list">
              <el-col :xs="24" :sm="12" :md="8" v-for="feature in features" :key="feature.title">
                <el-card class="feature-card" shadow="hover">
                  <el-icon class="feature-icon">
                    <component :is="feature.icon" />
                  </el-icon>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                  <div class="feature-items">
                    <el-space wrap v-if="feature.items">
                      <el-tag
                        v-for="item in feature.items"
                        :key="item"
                        size="small"
                        effect="plain"
                      >
                        {{ item }}
                      </el-tag>
                    </el-space>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  Document,
  Edit,
  Grid,
  Setting,
  Bell
} from '@element-plus/icons-vue'

// 統計卡片數據
const statisticsCards = [
  {
    title: '基礎元件',
    value: '4',
    icon: Document,
    type: 'primary'
  },
  {
    title: '表單元件',
    value: '6',
    icon: Edit,
    type: 'success'
  },
  {
    title: '展示元件',
    value: '4',
    icon: Grid,
    type: 'warning'
  },
  {
    title: '互動元件',
    value: '4',
    icon: Bell,
    type: 'info'
  },
  {
    title: '範例頁面',
    value: '4',
    icon: Setting,
    type: 'danger'
  }
]

// 功能特點
const features = [
  {
    title: '基礎元件',
    description: '提供基礎的 UI 元件，用於建立網頁的基本結構和內容。',
    icon: Document,
    items: ['文字樣式', '按鈕', '圖示', '版面配置']
  },
  {
    title: '表單元件',
    description: '豐富的表單控制項，支援資料輸入和表單驗證功能。',
    icon: Edit,
    items: ['文字方塊', '選項按鈕', '核取方塊', '下拉選單', '日期選擇', '檔案上傳']
  },
  {
    title: '資料呈現',
    description: '強大的資料展示元件，適用於各種資料展示場景。',
    icon: Grid,
    items: ['表格', '分頁', '標籤', '標記']
  },
  {
    title: '互動元件',
    description: '提供豐富的使用者互動功能，增強使用者體驗。',
    icon: Bell,
    items: ['提示訊息', '通知訊息', '對話視窗', '系統通知']
  },
  {
    title: '範例頁面',
    description: '整合各類元件的完整頁面範例，方便快速建立應用。',
    icon: Setting,
    items: ['資料列表', '查詢介面', '表單頁面', '詳細資料']
  }
]
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.card-margin {
  margin-bottom: 20px;
  
}

.statistics-card {
  margin-bottom: 20px;
  height: 90%;
}

.statistics-content {
  display: flex;
  align-items: center;
}

.statistics-icon {
  font-size: 48px;
  margin-right: 16px;
}

.statistics-icon.primary {
  color: #409eff;
}

.statistics-icon.success {
  color: #67c23a;
}

.statistics-icon.warning {
  color: #e6a23c;
}

.statistics-icon.info {
  color: #909399;
}

.statistics-icon.danger {
  color: #f56c6c;
}

.statistics-info {
  flex: 1;
}

.statistics-title {
  font-size: 14px;
  color: #909399;
}

.statistics-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 4px;
}

.mt-4 {
  margin-top: 20px;
}

.welcome-content {
  text-align: center;
}

.welcome-content h2 {
  margin-bottom: 12px;
  color: #303133;
}

.welcome-content > p {
  color: #606266;
  margin-bottom: 30px;
}

.feature-list {
  margin-top: 20px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  height: 100%;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 10px 0;
  color: #303133;
}

.feature-card p {
  color: #606266;
  font-size: 14px;
  margin-bottom: 16px;
  min-height: 42px;
}

.feature-items {
  margin-top: 12px;
}

.feature-items .el-tag {
  margin: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```
