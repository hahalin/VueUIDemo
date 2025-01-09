<template>
  <div class="form-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>基本表單</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-position="right"
        status-icon
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="請輸入姓名" />
        </el-form-item>

        <el-form-item label="部門" prop="department">
          <el-select v-model="formData.department" placeholder="請選擇部門" style="width: 100%">
            <el-option
              v-for="item in departments"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="性別" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="興趣" prop="hobbies">
          <el-checkbox-group v-model="formData.hobbies">
            <el-checkbox
              v-for="hobby in hobbies"
              :key="hobby.value"
              :label="hobby.value"
            >
              {{ hobby.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="請選擇生日"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="備註" prop="notes">
          <el-input
            v-model="formData.notes"
            type="textarea"
            rows="4"
            placeholder="請輸入備註"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">
            提交
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)

// 表單數據
const formData = reactive({
  name: '',
  department: '',
  gender: '',
  hobbies: [],
  birthday: '',
  notes: ''
})

// 部門選項
const departments = [
  { value: 'hr', label: '人力資源' },
  { value: 'it', label: '資訊技術' },
  { value: 'finance', label: '財務' },
  { value: 'sales', label: '業務' }
]

// 興趣選項
const hobbies = [
  { value: 'reading', label: '閱讀' },
  { value: 'sports', label: '運動' },
  { value: 'music', label: '音樂' },
  { value: 'travel', label: '旅遊' }
]

// 驗證規則
const rules = reactive({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '長度需在 2 到 10 個字元之間', trigger: 'blur' }
  ],
  department: [
    { required: true, message: '請選擇部門', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '請選擇性別', trigger: 'change' }
  ],
  birthday: [
    { required: true, message: '請選擇生日', trigger: 'change' }
  ]
})

// 提交表單
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('提交成功:', formData)
      ElMessage.success('表單提交成功')
    } else {
      console.log('驗證失敗:', fields)
      ElMessage.error('請檢查表單內容')
    }
  })
}

// 重置表單
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 20px auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>