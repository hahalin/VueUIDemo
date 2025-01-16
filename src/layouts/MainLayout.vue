<template>
  <el-container class="layout-container">
    <!-- 側邊欄 -->
    <el-aside width="240px" class="aside">
      <div class="logo">
        <span>UI Demo</span>
      </div>
      <el-scrollbar>
        <el-menu
          class="menu"
          :router="true"
          :default-active="route.path"
        >
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>首頁</span>
          </el-menu-item>

          <!-- 基礎元件 -->
          <el-sub-menu index="/basic">
            <template #title>
              <el-icon><List /></el-icon>
              <span>基礎元件</span>
            </template>
            <el-menu-item index="/basic/text">文字樣式</el-menu-item>
            <el-menu-item index="/basic/button">按鈕</el-menu-item>
            <!-- <el-menu-item index="/basic/icon">圖示</el-menu-item> -->
            <el-menu-item index="/basic/layout">版面配置</el-menu-item>
          </el-sub-menu>

          <!-- 表單元件 -->
          <el-sub-menu index="/form">
            <template #title>
              <el-icon><Edit /></el-icon>
              <span>表單元件</span>
            </template>
            <el-menu-item index="/form/input">文字方塊</el-menu-item>
            <el-menu-item index="/form/radio">選項按鈕</el-menu-item>
            <el-menu-item index="/form/checkbox">核取方塊</el-menu-item>
            <el-menu-item index="/form/select">下拉選單</el-menu-item>
            <el-menu-item index="/form/date-picker">日期選擇</el-menu-item>
            <el-menu-item index="/form/roc-date-picker">民國年日期選擇</el-menu-item>
            <el-menu-item index="/form/upload">檔案上傳</el-menu-item>
          </el-sub-menu>

          <!-- 資料呈現 -->
          <el-sub-menu index="/display">
            <template #title>
              <el-icon><Grid /></el-icon>
              <span>資料呈現</span>
            </template>
            <el-menu-item index="/display/tag">標籤</el-menu-item>
            <el-menu-item index="/display/badge">標記</el-menu-item>
            <el-menu-item index="/display/table">表格</el-menu-item>
            <el-menu-item index="/display/pagination">分頁</el-menu-item>
          </el-sub-menu>

          <!-- 互動元件 -->
          <el-sub-menu index="/interaction">
            <template #title>
              <el-icon><Bell /></el-icon>
              <span>互動元件</span>
            </template>
            <el-menu-item index="/interaction/alert">提示訊息</el-menu-item>
            <el-menu-item index="/interaction/message">通知訊息</el-menu-item>
            <el-menu-item index="/interaction/dialog">對話視窗</el-menu-item>
            <el-menu-item index="/interaction/notification">系統通知</el-menu-item>
          </el-sub-menu>

          <!-- 範例頁面 -->
          <el-sub-menu index="/examples">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>範例頁面</span>
            </template>
            <el-menu-item index="/examples/hospital-list">CRUD範例</el-menu-item> 
            <el-menu-item index="/examples/list">資料列表</el-menu-item>
            <el-menu-item index="/examples/detail">詳細資料</el-menu-item>
            <el-menu-item index="/examples/form">表單頁面</el-menu-item>
            <el-menu-item index="/examples/search">查詢列表</el-menu-item>
            <el-menu-item index="/examples/upload">檔案上傳</el-menu-item>
            <el-menu-item index="/examples/export">資料匯出</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 主要內容區 -->
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-button 
            type="text" 
            @click="toggleSidebar"
            class="toggle-button"
          >
            <el-icon><Expand /></el-icon>
          </el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentRoute">{{ currentRoute }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-space>
            <!-- 主題切換 -->
            <!-- <el-button type="text">
              <el-icon><Moon /></el-icon>
            </el-button> -->
            <!-- 通知按鈕 -->
            <el-badge :value="3" class="notification-badge">
              <el-button type="text">
                <el-icon><Bell /></el-icon>
              </el-button>
            </el-badge>
            <!-- 使用者選單 -->
            <el-dropdown>
              <span class="user-info">
                <el-avatar :size="32" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/0e8160ef-da7f-4041-a5ef-cf33955d2567/82aa571e-653f-4d5b-bae7-44880c7acc86.png" />
                <span class="username">管理員</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>個人設定</el-dropdown-item>
                  <el-dropdown-item divided>登出系統</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-header>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeFilled,
  Document,
  List,
  Edit,
  Grid,
  Bell,
  Expand,
  Moon
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapse = ref(false)

// 計算當前路徑名稱
const currentRoute = computed(() => {
  const routeMap = {
    '/': '首頁',
    '/basic/text': '文字樣式',
    '/basic/button': '按鈕',
    '/basic/icon': '圖示',
    '/basic/layout': '版面配置',
    '/form/input': '文字方塊',
    '/form/radio': '選項按鈕',
    '/form/checkbox': '核取方塊',
    '/form/select': '下拉選單',
    '/form/date-picker': '日期選擇',
    '/form/roc-date-picker': '民國年日期選擇',
    '/form/upload': '檔案上傳',
    '/display/table': '表格',
    '/display/pagination': '分頁',
    '/display/tag': '標籤',
    '/display/badge': '標記',
    '/interaction/alert': '提示訊息',
    '/interaction/message': '通知訊息',
    '/interaction/dialog': '對話視窗',
    '/interaction/notification': '系統通知',
    '/examples/list': '資料列表',
    '/examples/form': '表單頁面',
    '/examples/search': '查詢列表',
    '/examples/hospital-list':'CRUD範例',
    '/examples/upload': '檔案上傳',
    '/examples/export': '資料匯出',
    '/examples/detail': '詳細資料'
  }
  return routeMap[route.path] || ''
})

// 切換側邊欄
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>


<style scoped>
.layout-container {
  height: 100vh;
}

.aside {
  background-color: #fff;  /* 改為白色背景 */
  border-right: 1px solid #e6e6e6;  /* 加入淺色邊框 */
  transition: width 0.3s;
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;  /* 改為深色文字 */
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;  /* 改為淺色邊框 */
  background-color: #fff;  /* 改為白色背景 */
}

.menu {
  border-right: none;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.toggle-button {
  padding: 6px;
  font-size: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f6f6f6;
}

.username {
  font-size: 14px;
  color: #606266;
}

.main {
  background-color: #f5f7fa;  /* 改為較淺的灰色背景 */
  padding: 20px;
}

/* 選單樣式覆寫 */
:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  color: #303133;  /* 改為深色文字 */
}

:deep(.el-menu-item.is-active) {
  background-color: #ecf5ff;  /* 改為淺藍色背景 */
  color: #409EFF;
}

:deep(.el-menu-item:hover), :deep(.el-sub-menu__title:hover) {
  background-color: #f5f7fa;  /* 改為較淺的灰色 */
}

:deep(.el-sub-menu.is-active .el-sub-menu__title) {
  color: #303133;
}

.notification-badge :deep(.el-badge__content) {
  z-index: 10;
}
</style>