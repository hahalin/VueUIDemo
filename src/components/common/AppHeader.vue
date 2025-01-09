<template>
    <el-header class="app-header">
      <div class="header-left">
        <el-button type="text" @click="toggleSidebar">
          <el-icon><Fold v-if="!isSidebarCollapsed" /><Expand v-else /></el-icon>
        </el-button>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentPath">{{ currentPath }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="user-info">
            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <span class="username">管理員</span>
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>個人資料</el-dropdown-item>
              <el-dropdown-item>修改密碼</el-dropdown-item>
              <el-dropdown-item divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { Fold, Expand, CaretBottom } from '@element-plus/icons-vue'
  
  const route = useRoute()
  const isSidebarCollapsed = ref(false)
  
  // 當前路徑名稱
  const currentPath = computed(() => {
    const pathMap = {
      '/': '首頁',
      '/form': '基本表單',
      '/search': '查詢列表',
      '/upload': '檔案上傳',
      '/export': 'PDF匯出'
    }
    return pathMap[route.path]
  })
  
  // 切換側邊欄
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 20px;
    height: 60px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .header-right {
    display: flex;
    align-items: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .user-info:hover {
    background-color: #f5f7fa;
  }
  
  .username {
    font-size: 14px;
    color: #606266;
  }
  
  :deep(.el-button) {
    padding: 8px;
    height: auto;
  }
  </style>