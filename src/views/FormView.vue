<template>
    <div class="form-container">
      <el-card class="form-card">
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
          status-icon
        >
          <!-- 基本信息 -->
          <div class="form-section">
            <h3>基本信息</h3>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" placeholder="請輸入姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="電子郵件" prop="email">
                  <el-input v-model="formData.email" placeholder="請輸入電子郵件" />
                </el-form-item>
              </el-col>
            </el-row>
  
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="部門" prop="department">
                  <el-select v-model="formData.department" placeholder="請選擇部門" style="width: 100%">
                    <el-option
                      v-for="item in departmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="職位" prop="position">
                  <el-select v-model="formData.position" placeholder="請選擇職位" style="width: 100%">
                    <el-option
                      v-for="item in positionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
  
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="入職日期" prop="entryDate">
                  <el-date-picker
                    v-model="formData.entryDate"
                    type="date"
                    placeholder="選擇日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="狀態" prop="status">
                  <el-radio-group v-model="formData.status">
                    <el-radio label="active">在職</el-radio>
                    <el-radio label="inactive">離職</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
  
          <!-- 聯繫方式 -->
          <div class="form-section">
            <h3>聯繫方式</h3>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="電話" prop="phone">
                  <el-input v-model="formData.phone" placeholder="請輸入電話號碼" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址" prop="address">
                  <el-input v-model="formData.address" placeholder="請輸入地址" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
  
          <!-- 其他信息 -->
          <div class="form-section">
            <h3>其他信息</h3>
            <el-form-item label="技能" prop="skills">
              <el-checkbox-group v-model="formData.skills">
                <el-checkbox 
                  v-for="item in skillOptions" 
                  :key="item.value" 
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
  
            <el-form-item label="備註" prop="notes">
              <el-input
                v-model="formData.notes"
                type="textarea"
                rows="4"
                placeholder="請輸入備註"
              />
            </el-form-item>
          </div>
  
          <!-- 表單操作 -->
          <div class="form-actions">
            <el-button type="primary" @click="submitForm(formRef)">新增</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
          </div>
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
    email: '',
    department: '',
    position: '',
    entryDate: '',
    status: 'active',
    phone: '',
    address: '',
    skills: [],
    notes: ''
  })
  
  // 選項數據
  const departmentOptions = [
    { value: 'hr', label: '人力資源部' },
    { value: 'it', label: '資訊技術部' },
    { value: 'finance', label: '財務部' },
    { value: 'sales', label: '銷售部' }
  ]
  
  const positionOptions = [
    { value: 'staff', label: '一般職員' },
    { value: 'supervisor', label: '主管' },
    { value: 'manager', label: '經理' },
    { value: 'director', label: '總監' }
  ]
  
  const skillOptions = [
    { value: 'excel', label: 'Excel' },
    { value: 'word', label: 'Word' },
    { value: 'powerpoint', label: 'PowerPoint' },
    { value: 'programming', label: '程式設計' },
    { value: 'english', label: '英語' }
  ]
  
  // 表單驗證規則
  const rules = {
    name: [
      { required: true, message: '請輸入姓名', trigger: 'blur' },
      { min: 2, max: 20, message: '長度在 2 到 20 個字元之間', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '請輸入電子郵件', trigger: 'blur' },
      { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' }
    ],
    department: [
      { required: true, message: '請選擇部門', trigger: 'change' }
    ],
    position: [
      { required: true, message: '請選擇職位', trigger: 'change' }
    ],
    entryDate: [
      { required: true, message: '請選擇入職日期', trigger: 'change' }
    ],
    phone: [
      { pattern: /^[0-9-]{8,}$/, message: '請輸入正確的電話號碼格式', trigger: 'blur' }
    ]
  }
  
  // 提交表單
  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        // 這裡可以發送API請求
        console.log('表單提交:', formData)
        ElMessage.success('提交成功')
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
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .form-card {
    margin-bottom: 20px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .form-section {
    margin-bottom: 30px;
  }
  
  .form-section h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
  </style>