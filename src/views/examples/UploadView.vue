<template>
    <div class="upload-container">
      <!-- 單檔上傳區域 -->
      <el-card class="upload-card">
        <template #header>
          <div class="card-header">
            <span>單檔上傳</span>
            <el-tag type="info">支援格式：.jpg, .jpeg, .png, .pdf</el-tag>
          </div>
        </template>
  
        <el-upload
          class="upload-dragger"
          drag
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-progress="handleProgress"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            將檔案拖曳至此處，或<em>點擊上傳</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              檔案大小不超過 10MB
            </div>
          </template>
        </el-upload>
      </el-card>
  
      <!-- 多檔上傳區域 -->
      <el-card class="upload-card">
        <template #header>
          <div class="card-header">
            <span>多檔上傳</span>
            <div class="header-actions">
              <el-button type="primary" @click="submitUpload">
                開始上傳
              </el-button>
              <el-button type="warning" @click="clearFiles">
                清空列表
              </el-button>
            </div>
          </div>
        </template>
  
        <el-upload
          ref="multipleUploadRef"
          class="upload-list"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-success="handleMultiSuccess"
          :on-error="handleError"
          :on-progress="handleProgress"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :auto-upload="false"
          multiple
        >
          <template #trigger>
            <el-button type="primary">選擇多個檔案</el-button>
          </template>
        </el-upload>
      </el-card>
  
      <!-- 上傳檔案列表 -->
      <el-card class="upload-card" v-if="fileList.length > 0">
        <template #header>
          <div class="card-header">
            <span>上傳檔案列表</span>
            <el-button type="danger" @click="clearFileList">
              清空歷史記錄
            </el-button>
          </div>
        </template>
  
        <el-table :data="fileList" style="width: 100%">
          <el-table-column prop="name" label="檔案名稱" min-width="200" />
          <el-table-column prop="size" label="大小" width="120">
            <template #default="{ row }">
              {{ formatFileSize(row.size) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="狀態" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上傳進度" width="200">
            <template #default="{ row }">
              <el-progress
                v-if="row.status === 'uploading'"
                :percentage="row.percentage || 0"
              />
              <span v-else>{{ row.status === 'success' ? '完成' : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.status === 'success'"
                type="primary"
                size="small"
                @click="handleDownload(row)"
              >
                下載
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(row)"
              >
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <!-- 圖片預覽對話框 -->
      <el-dialog v-model="previewVisible" title="圖片預覽" width="800px">
        <img :src="previewUrl" alt="Preview" style="width: 100%;" />
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { UploadFilled } from '@element-plus/icons-vue'
  
  // 上傳相關參數
  const uploadUrl = '/api/upload' // 實際使用時替換為真實的上傳API
  const multipleUploadRef = ref(null)
  const fileList = ref([])
  const previewVisible = ref(false)
  const previewUrl = ref('')
  
  // 允許的文件類型
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  // 上傳前驗證
  const beforeUpload = (file) => {
    // 檢查文件類型
    if (!allowedTypes.includes(file.type)) {
      ElMessage.error('檔案格式不支援！')
      return false
    }
    // 檢查文件大小
    if (file.size > maxSize) {
      ElMessage.error('檔案大小不能超過 10MB！')
      return false
    }
    return true
  }
  
  // 上傳成功處理
  const handleSuccess = (response, uploadFile) => {
    ElMessage.success(`${uploadFile.name} 上傳成功`)
    uploadFile.status = 'success'
    fileList.value.push(uploadFile)
  }
  
  // 多文件上傳成功處理
  const handleMultiSuccess = (response, uploadFile) => {
    ElMessage.success(`${uploadFile.name} 上傳成功`)
    uploadFile.status = 'success'
  }
  
  // 上傳失敗處理
  const handleError = (error, uploadFile) => {
    ElMessage.error(`${uploadFile.name} 上傳失敗`)
    uploadFile.status = 'error'
  }
  
  // 上傳進度處理
  const handleProgress = (event, uploadFile) => {
    uploadFile.status = 'uploading'
    uploadFile.percentage = Math.round(event.percent)
  }
  
  // 移除文件
  const handleRemove = (uploadFile) => {
    const index = fileList.value.indexOf(uploadFile)
    if (index !== -1) {
      fileList.value.splice(index, 1)
    }
  }
  
  // 預覽文件
  const handlePreview = (uploadFile) => {
    if (uploadFile.raw.type.startsWith('image/')) {
      previewUrl.value = URL.createObjectURL(uploadFile.raw)
      previewVisible.value = true
    } else {
      ElMessage.info('只能預覽圖片文件')
    }
  }
  
  // 下載文件
  const handleDownload = (file) => {
    // 實際使用時替換為真實的下載邏輯
    ElMessage.success(`開始下載: ${file.name}`)
  }
  
  // 刪除文件
  const handleDelete = (file) => {
    const index = fileList.value.findIndex(item => item.uid === file.uid)
    if (index !== -1) {
      fileList.value.splice(index, 1)
      ElMessage.success('檔案已刪除')
    }
  }
  
  // 提交上傳
  const submitUpload = () => {
    multipleUploadRef.value?.submit()
  }
  
  // 清空文件列表
  const clearFiles = () => {
    multipleUploadRef.value?.clearFiles()
  }
  
  // 清空歷史記錄
  const clearFileList = () => {
    fileList.value = []
    ElMessage.success('歷史記錄已清空')
  }
  
  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  // 獲取狀態標籤類型
  const getStatusType = (status) => {
    const map = {
      success: 'success',
      uploading: 'primary',
      error: 'danger'
    }
    return map[status] || 'info'
  }
  
  // 獲取狀態標籤文字
  const getStatusLabel = (status) => {
    const map = {
      success: '成功',
      uploading: '上傳中',
      error: '失敗'
    }
    return map[status] || status
  }
  </script>
  
  <style scoped>
  .upload-container {
    padding: 20px;
  }
  
  .upload-card {
    margin-bottom: 20px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
  }
  
  .upload-dragger {
    width: 100%;
  }
  
  .upload-list {
    width: 100%;
  }
  
  :deep(.el-upload-list) {
    width: 100%;
  }
  
  :deep(.el-upload-dragger) {
    width: 100%;
  }
  
  :deep(.el-upload) {
    width: 100%;
  }
  </style>