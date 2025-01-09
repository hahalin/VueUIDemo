<template>
    <div class="home-container">
      <el-row :gutter="20">
        <!-- 數據概覽卡片 -->
        <el-col :span="6" v-for="card in statisticsCards" :key="card.title">
          <el-card class="statistics-card" :body-style="{ padding: '20px' }">
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
  
      <el-row :gutter="20" class="mt-4">
        <!-- 歡迎卡片 -->
        <el-col :span="24">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>歡迎使用</span>
              </div>
            </template>
            <div class="welcome-content">
              <h2>UI 組件展示系統</h2>
              <p>本系統提供以下功能：</p>
              <el-row :gutter="20" class="feature-list">
                <el-col :span="6" v-for="feature in features" :key="feature.title">
                  <el-card class="feature-card" shadow="hover">
                    <el-icon class="feature-icon">
                      <component :is="feature.icon" />
                    </el-icon>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.description }}</p>
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
    User,
    Document,
    Upload,
    Download
  } from '@element-plus/icons-vue'
  
  // 統計卡片數據
  const statisticsCards = [
    {
      title: '總用戶數',
      value: '1,234',
      icon: 'User',
      type: 'success'
    },
    {
      title: '表單數量',
      value: '56',
      icon: 'Document',
      type: 'primary'
    },
    {
      title: '上傳文件',
      value: '89',
      icon: 'Upload',
      type: 'warning'
    },
    {
      title: '導出次數',
      value: '128',
      icon: 'Download',
      type: 'danger'
    }
  ]
  
  // 功能特點
  const features = [
    {
      title: '基本表單',
      description: '包含各種表單控件和驗證功能',
      icon: 'Document'
    },
    {
      title: '查詢介面',
      description: '強大的數據查詢和展示功能',
      icon: 'Search'
    },
    {
      title: '檔案上傳',
      description: '支援拖放上傳和批量處理',
      icon: 'Upload'
    },
    {
      title: 'PDF匯出',
      description: '靈活的數據導出和報表生成',
      icon: 'Download'
    }
  ]
  </script>
  
  <style scoped>
  .home-container {
    padding: 20px;
  }
  
  .statistics-card {
    margin-bottom: 20px;
  }
  
  .statistics-content {
    display: flex;
    align-items: center;
  }
  
  .statistics-icon {
    font-size: 48px;
    margin-right: 16px;
  }
  
  .statistics-icon.success {
    color: #67c23a;
  }
  
  .statistics-icon.primary {
    color: #409eff;
  }
  
  .statistics-icon.warning {
    color: #e6a23c;
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
    margin-bottom: 20px;
    color: #303133;
  }
  
  .feature-list {
    margin-top: 30px;
  }
  
  .feature-card {
    text-align: center;
    padding: 20px;
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
  }
  </style>