<template>
  <el-menu
    class="sidebar-menu"
    :default-active="route.path"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/dashboard">
      <el-icon><DataLine /></el-icon>
      <template #title>儀表板</template>
    </el-menu-item>
    
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>表單示例</span>
      </template>
      <el-menu-item index="/form">基本表單</el-menu-item>
      <el-menu-item index="/search">查詢表單</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Upload /></el-icon>
        <span>檔案處理</span>
      </template>
      <el-menu-item index="/upload">檔案上傳</el-menu-item>
      <el-menu-item index="/export">PDF匯出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  DataLine,
  Document,
  Upload
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapse = ref(false)
</script>

<style scoped>
.sidebar-menu {
  height: 100vh;
  border-right: none;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>