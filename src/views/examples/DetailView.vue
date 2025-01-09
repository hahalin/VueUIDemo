```vue
<template>
  <div class="detail-container">
    <!-- 頁面標題 -->
    <div class="page-header">
      <div class="header-left">
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <h2 class="page-title">訂單詳情</h2>
      </div>
      <div class="header-right">
        <el-button-group>
          <el-button type="primary" @click="handleEdit">
            編輯
          </el-button>
          <el-button type="danger" @click="handleDelete">
            刪除
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 基本資訊 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>基本資訊</span>
          <el-tag :type="getStatusType(orderInfo.status)">
            {{ getStatusLabel(orderInfo.status) }}
          </el-tag>
        </div>
      </template>
      
      <el-descriptions :column="3" border>
        <el-descriptions-item label="訂單編號">
          {{ orderInfo.orderNo }}
        </el-descriptions-item>
        <el-descriptions-item label="建立日期">
          {{ orderInfo.createDate }}
        </el-descriptions-item>
        <el-descriptions-item label="訂單金額">
          {{ formatAmount(orderInfo.amount) }}
        </el-descriptions-item>
        <el-descriptions-item label="付款方式">
          {{ orderInfo.paymentMethod }}
        </el-descriptions-item>
        <el-descriptions-item label="付款狀態">
          <el-tag size="small" :type="getPaymentStatusType(orderInfo.paymentStatus)">
            {{ orderInfo.paymentStatus }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="備註" :span="3">
          {{ orderInfo.remark }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 客戶資訊 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>客戶資訊</span>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="客戶姓名">
          {{ customerInfo.name }}
        </el-descriptions-item>
        <el-descriptions-item label="聯絡電話">
          {{ customerInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="電子郵件">
          {{ customerInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item label="送貨地址">
          {{ customerInfo.address }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 商品清單 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>商品清單</span>
        </div>
      </template>

      <el-table :data="products" border style="width: 100%">
        <el-table-column prop="name" label="商品名稱" min-width="200" />
        <el-table-column prop="price" label="單價" width="120">
          <template #default="{ row }">
            {{ formatAmount(row.price) }}
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="數量" width="120" />
        <el-table-column label="小計" width="120">
          <template #default="{ row }">
            {{ formatAmount(row.price * row.quantity) }}
          </template>
        </el-table-column>
      </el-table>

      <div class="amount-summary">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="商品總額">
            {{ formatAmount(orderInfo.subtotal) }}
          </el-descriptions-item>
          <el-descriptions-item label="運費">
            {{ formatAmount(orderInfo.shipping) }}
          </el-descriptions-item>
          <el-descriptions-item label="訂單總額">
            <span class="total-amount">
              {{ formatAmount(orderInfo.amount) }}
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>

    <!-- 訂單紀錄 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>訂單紀錄</span>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :type="activity.type"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

// 訂單資訊
const orderInfo = ref({
  orderNo: 'ORD202401100001',
  createDate: '2024-01-10',
  amount: 12345,
  status: 'processing',
  paymentMethod: '信用卡',
  paymentStatus: '已付款',
  subtotal: 11000,
  shipping: 1345,
  remark: '請在下午時段配送'
})

// 客戶資訊
const customerInfo = ref({
  name: '王大明',
  phone: '0912-345-678',
  email: 'test@example.com',
  address: '台北市信義區信義路五段100號'
})

// 商品清單
const products = ref([
  {
    name: '商品 A',
    price: 5000,
    quantity: 1
  },
  {
    name: '商品 B',
    price: 2000,
    quantity: 3
  }
])

// 訂單紀錄
const activities = ref([
  {
    content: '訂單已送達',
    timestamp: '2024-01-10 15:00:00',
    type: 'success'
  },
  {
    content: '訂單已出貨',
    timestamp: '2024-01-10 10:00:00',
    type: 'primary'
  },
  {
    content: '訂單已付款',
    timestamp: '2024-01-10 09:30:00',
    type: 'primary'
  },
  {
    content: '訂單已建立',
    timestamp: '2024-01-10 09:00:00',
    type: 'info'
  }
])

// 返回上一頁
const goBack = () => {
  history.back()
}

// 編輯訂單
const handleEdit = () => {
  ElMessage.info('編輯訂單')
}

// 刪除訂單
const handleDelete = () => {
  ElMessageBox.confirm(
    '確定要刪除這筆訂單嗎？',
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage.success('刪除成功')
  })
}

// 工具方法
const getStatusType = (status) => {
  const map = {
    processing: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return map[status] || 'default'
}

const getStatusLabel = (status) => {
  const map = {
    processing: '處理中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status] || status
}

const getPaymentStatusType = (status) => {
  return status === '已付款' ? 'success' : 'warning'
}

const formatAmount = (amount) => {
  return `$${amount.toLocaleString()}`
}
</script>

<style scoped>
.detail-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  margin: 0;
  font-size: 20px;
}

.detail-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount-summary {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  margin-left: auto;
}

.total-amount {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
}
</style>
```