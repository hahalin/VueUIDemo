<template>
  <roc-date-picker
    v-model="date"
    placeholder="請選擇日期"
    :disabled-date="disabledDate"
  />
</template>

<script setup>
import { ref } from 'vue'
import RocDatePicker from '../../components/RocDatePicker.vue'

const date = ref(null)

// 可選擇性的設置禁用日期
const disabledDate = (date) => {
  return date < new Date()  // 禁用今天之前的日期
}
</script>