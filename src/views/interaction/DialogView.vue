```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">對話視窗</h1>
    <p class="demo-description">在當前頁面打開一個對話視窗，用於顯示重要資訊或要求使用者進行操作。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">基本的對話視窗</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="primary" @click="dialogVisible = true">
            打開對話視窗
          </el-button>

          <el-dialog
            v-model="dialogVisible"
            title="提示"
            width="30%"
          >
            <span>這是一段內容</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  確認
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ basicCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 自訂內容 -->
    <div class="demo-section">
      <h2 class="section-title">自訂內容</h2>
      <p class="section-description">對話視窗內可以包含各種元件</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="primary" @click="formDialogVisible = true">
            打開表單對話視窗
          </el-button>

          <el-dialog
            v-model="formDialogVisible"
            title="用戶資料"
            width="50%"
          >
            <el-form :model="form" label-width="100px">
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="電子郵件">
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="備註">
                <el-input v-model="form.remark" type="textarea" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="formDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleFormSubmit">
                  確認
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ formCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 巢狀對話視窗 -->
    <!-- <div class="demo-section">
      <h2 class="section-title">巢狀對話視窗</h2>
      <p class="section-description">可以在對話視窗中打開另一個對話視窗</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="primary" @click="outerVisible = true">
            打開外層對話視窗
          </el-button>

          <el-dialog v-model="outerVisible" title="外層對話視窗">
            <template #default>
              <el-button type="primary" @click="innerVisible = true">
                打開內層對話視窗
              </el-button>
            </template>
            <el-dialog
              v-model="innerVisible"
              width="30%"
              title="內層對話視窗"
              append-to-body
            >
              <template #default>
                這是內層對話視窗的內容
              </template>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="innerVisible = false">關閉</el-button>
                </span>
              </template>
            </el-dialog>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="outerVisible = false">關閉</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ nestedCode }}</code></pre>
        </div>
      </div>
    </div> -->

    <!-- 確認對話框 -->
    <div class="demo-section">
      <h2 class="section-title">確認對話框</h2>
      <p class="section-description">用於確認操作的對話框</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-button type="primary" @click="handleDelete">刪除</el-button>
          <el-button type="primary" @click="handleConfirm">自訂確認框</el-button>
        </div>
        <div class="demo-block-code">
          <pre><code>{{ confirmCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

// 基本對話視窗
const dialogVisible = ref(false)

// 表單對話視窗
const formDialogVisible = ref(false)
const form = reactive({
  name: '',
  email: '',
  remark: ''
})

const handleFormSubmit = () => {
  console.log('表單提交：', form)
  formDialogVisible.value = false
}

// 巢狀對話視窗
const outerVisible = ref(false)
const innerVisible = ref(false)

// 確認對話框
const handleDelete = () => {
  ElMessageBox.confirm(
    '此操作將永久刪除該項目，是否繼續？',
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      ElMessageBox.alert('刪除成功')
    })
    .catch(() => {
      ElMessageBox.alert('已取消刪除')
    })
}

const handleConfirm = () => {
  ElMessageBox({
    title: '自訂標題',
    message: '這是一個自訂的確認對話框',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          done()
          instance.confirmButtonLoading = false
        }, 1000)
      } else {
        done()
      }
    }
  }).then(() => {
    ElMessageBox.alert('操作成功')
  })
}

// 程式碼範例
const basicCode = `
<el-button type="primary" @click="dialogVisible = true">
  打開對話視窗
</el-button>

<el-dialog
  v-model="dialogVisible"
  title="提示"
  width="30%"
>
  <span>這是一段內容</span>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">
        確認
      </el-button>
    </span>
  </template>
</el-dialog>
`.trim()

const formCode = `
<el-dialog
  v-model="formDialogVisible"
  title="用戶資料"
  width="50%"
>
  <el-form :model="form" label-width="100px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="電子郵件">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="備註">
      <el-input v-model="form.remark" type="textarea" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="formDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleFormSubmit">確認</el-button>
    </span>
  </template>
</el-dialog>
`.trim()

const nestedCode = `
<el-dialog v-model="outerVisible" title="外層對話視窗">
  <el-button type="primary" @click="innerVisible = true">
    打開內層對話視窗
  </el-button>
  <el-dialog
    v-model="innerVisible"
    width="30%"
    title="內層對話視窗"
    append-to-body
  >
    這是內層對話視窗的內容
  </el-dialog>
</el-dialog>
`.trim()

const confirmCode = `
// 確認對話框
const handleDelete = () => {
  ElMessageBox.confirm(
    '此操作將永久刪除該項目，是否繼續？',
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      ElMessageBox.alert('刪除成功')
    })
    .catch(() => {
      ElMessageBox.alert('已取消刪除')
    })
}
`.trim()
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
```