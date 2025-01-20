<template>
    <div class="datepicker-wrapper" ref="pickerRef">
        <!-- 輸入框 -->
        <div class="datepicker-input" :class="{ 'is-focused': showPicker }" @click="handleClick">
            <input ref="inputRef" type="text" :value="displayDate" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />
            <el-icon class="calendar-icon" :class="{ 'is-disabled': disabled }">
                <Calendar />
            </el-icon>
        </div>

        <!-- 日期選擇面板 -->
        <div v-show="showPicker" class="picker-panel" @mousedown.prevent>
            <!-- 年月切換區域 -->
            <div class="picker-header">
                <div class="picker-header-buttons">
                    <button @click="changeYear(-1)">
                        <el-icon>
                            <DArrowLeft />
                        </el-icon>
                    </button>
                    <button @click="changeMonth(-1)">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                    </button>
                </div>

                <div class="picker-header-label">
                    <button class="year-label" @click="showYearPicker = true">
                        民國 
                        {{ currentYear - 1911 }} 年
                    </button>
                    <button class="month-label" @click="showMonthPicker = true">
                        {{ currentMonth }} 月
                    </button>
                </div>

                <div class="picker-header-buttons">
                    <button @click="changeMonth(1)">
                        <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </button>
                    <button @click="changeYear(1)">
                        <el-icon>
                            <DArrowRight />
                        </el-icon>
                    </button>
                </div>
            </div>

            <!-- 星期列表 -->
            <div class="week-list">
                <span v-for="week in weeks" :key="week" class="week-item">
                    {{ week }}
                </span>
            </div>

            <!-- 日期網格 -->
            <div class="date-table">
                <div v-for="(cell, index) in dateTableData" :key="index" class="date-cell" :class="{
                    'is-today': cell.isToday,
                    'is-selected': cell.isSelected,
                    'is-disabled': cell.isDisabled,
                    'is-other-month': !cell.isCurrentMonth
                }" @click="handleDateClick(cell)">
                    {{ cell.date }}
                </div>
            </div>

            <!-- 年份選擇面板 -->
            <div v-if="showYearPicker" class="year-picker">
                <div class="year-picker-header">
                    <button @click="changeYearRange(-10)">
                        <el-icon>
                            <DArrowLeft />
                        </el-icon>
                    </button>
                    <span>
                        {{ yearRangeStart - 1911 }} - {{ yearRangeEnd - 1911 }}
                    </span>
                    <button @click="changeYearRange(10)">
                        <el-icon>
                            <DArrowRight />
                        </el-icon>
                    </button>
                </div>
                <div class="year-table">
                    <button v-for="year in yearTableData" :key="year" class="year-cell" :class="{
                        'is-selected': year === currentYear,
                        'is-disabled': isYearDisabled(year)
                    }" @click="handleYearClick(year)">
                        {{ year - 1911 }}
                    </button>
                </div>
            </div>

            <!-- 月份選擇面板 -->
            <div v-if="showMonthPicker" class="month-picker">
                <div class="month-table">
                    <button v-for="(month, index) in months" :key="month" class="month-cell" :class="{
                        'is-selected': index + 1 === currentMonth,
                        'is-disabled': isMonthDisabled(index + 1)
                    }" @click="handleMonthClick(index + 1)">
                        {{ month }}
                    </button>
                </div>
            </div>

            <!-- 底部按鈕區域 -->
            <div class="picker-footer">
                <div class="picker-shortcuts">
                    <button v-for="shortcut in shortcuts" :key="shortcut.text" class="shortcut-button"
                        @click="handleShortcutClick(shortcut)">
                        {{ shortcut.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
    Calendar,
    DArrowLeft,
    DArrowRight,
    ArrowLeft,
    ArrowRight
} from '@element-plus/icons-vue'

const props = defineProps({
    modelValue: {
        type: [Date, String],
        default: null
    },
    placeholder: {
        type: String,
        default: '請選擇日期'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    disabledDate: {
        type: Function,
        default: () => false
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

// refs
const pickerRef = ref(null)
const inputRef = ref(null)

// 狀態
const showPicker = ref(false)
const showYearPicker = ref(false)
const showMonthPicker = ref(false)
const currentDate = ref(props.modelValue ? new Date(props.modelValue) : new Date())
const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : null)

// 常量
const weeks = ['日', '一', '二', '三', '四', '五', '六']
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

const shortcuts = [
    {
        text: '今天',
        value: new Date()
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        }
    },
    {
        text: '一週前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        }
    }
]

// 計算屬性
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)

const yearRangeStart = computed(() => Math.floor(currentYear.value / 10) * 10)
const yearRangeEnd = computed(() => yearRangeStart.value + 9)

const displayDate = computed(() => {
    if (!selectedDate.value) return ''
    const year = selectedDate.value.getFullYear() - 1911
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')
    const date = String(selectedDate.value.getDate()).padStart(2, '0')
    return `${year}/${month}/${date}`
    //return `民國 ${year} 年 ${month} 月 ${date} 日`

})

// 日期表格數據
const dateTableData = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value - 1

    // 當月第一天
    const firstDay = new Date(year, month, 1)
    // 當月最後一天
    const lastDay = new Date(year, month + 1, 0)
    // 當月天數
    const currentMonthDays = lastDay.getDate()
    // 第一天星期幾
    const firstDayWeek = firstDay.getDay()

    const days = []

    // 上個月的日期
    const prevMonthDays = firstDayWeek
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        const date = prevMonthLastDay - i
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            isDisabled: props.disabledDate(new Date(year, month - 1, date))
        })
    }

    // 當月的日期
    for (let i = 1; i <= currentMonthDays; i++) {
        const date = new Date(year, month, i)
        days.push({
            date: i,
            isCurrentMonth: true,
            isToday: isToday(date),
            isSelected: isSelected(date),
            isDisabled: props.disabledDate(date)
        })
    }

    // 下個月的日期
    const nextMonthDays = 42 - days.length
    for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
            date: i,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            isDisabled: props.disabledDate(new Date(year, month + 1, i))
        })
    }

    return days
})

// 年份表格數據
const yearTableData = computed(() => {
    const start = yearRangeStart.value
    const end = yearRangeEnd.value
    const years = []
    for (let i = start; i <= end; i++) {
        years.push(i)
    }
    return years
})

// 方法
const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
}

const isSelected = (date) => {
    if (!selectedDate.value) return false
    return date.toDateString() === selectedDate.value.toDateString()
}

const handleClick = () => {
    if (props.disabled || props.readonly) return
    showPicker.value = !showPicker.value
}

const handleDateClick = (cell) => {
    if (cell.isDisabled) return
    const date = new Date(currentYear.value, currentMonth.value - 1, cell.date)
    selectedDate.value = date
    emit('update:modelValue', date)
    emit('change', date)
    showPicker.value = false
}

const handleYearClick = (year) => {
    currentDate.value = new Date(year, currentMonth.value - 1)
    showYearPicker.value = false
}

const handleMonthClick = (month) => {
    currentDate.value = new Date(currentYear.value, month - 1)
    showMonthPicker.value = false
}

const changeYear = (offset) => {
    currentDate.value = new Date(currentYear.value + offset, currentMonth.value - 1)
}

const changeMonth = (offset) => {
    currentDate.value = new Date(currentYear.value, currentMonth.value - 1 + offset)
}

const changeYearRange = (offset) => {
    currentDate.value = new Date(currentYear.value + offset, currentMonth.value - 1)
}

const handleShortcutClick = (shortcut) => {
    const date = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value
    selectedDate.value = date
    emit('update:modelValue', date)
    emit('change', date)
    showPicker.value = false
}

const handleKeydown = (event) => {
    if (props.disabled || props.readonly) return

    switch (event.key) {
        case 'Enter':
            if (!showPicker.value) {
                showPicker.value = true
            }
            break
        case 'Escape':
            showPicker.value = false
            break
    }
}

const handleClickOutside = (event) => {
    if (pickerRef.value && !pickerRef.value.contains(event.target)) {
        showPicker.value = false
        showYearPicker.value = false
        showMonthPicker.value = false
    }
}

// 生命週期
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.datepicker-wrapper {
    position: relative;
    display: inline-block;
    width: 220px;
}

/* 輸入框樣式 */
.datepicker-input {
    position: relative;
    display: flex;
    align-items: center;
    /* 新增：垂直居中對齊 */
    width: 100%;
    height: 32px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.datepicker-input:hover {
    border-color: #c0c4cc;
}

.datepicker-input.is-focused {
    border-color: #409eff;
}
.datepicker-input input {
  flex: 1;
  height: 100%;
  padding: 0 8px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #606266;
  background: none;
  line-height: 30px; /* 新增：確保文字垂直居中 */
}

.datepicker-input input::placeholder {
    color: #c0c4cc;
}

/* 調整圖示樣式 */
.calendar-icon {
  display: flex; /* 新增：使用 flex 布局 */
  align-items: center; /* 新增：垂直居中 */
  justify-content: center; /* 新增：水平居中 */
  width: 32px;
  height: 32px; /* 修改：與輸入框同高 */
  color: #c0c4cc;
  font-size: 16px; /* 新增：統一圖示大小 */
}

/* 新增：確保圖示容器大小一致 */
.calendar-icon :deep(svg) {
  width: 16px;
  height: 16px;
  display: block;
}
.calendar-icon.is-disabled {
    cursor: not-allowed;
}

/* 選擇器面板樣式 */
.picker-panel {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    z-index: 2000;
    width: 292px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

/* 面板頭部樣式 */
.picker-header {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
}

.picker-header-buttons {
    flex: 1;
    display: flex;
    align-items: center;
}

.picker-header-buttons button {
    padding: 0 6px;
    font-size: 16px;
    color: #606266;
    background: none;
    border: none;
    cursor: pointer;
}

.picker-header-buttons button:hover {
    color: #409eff;
}

.picker-header-label {
    flex: 3;
    text-align: center;
    font-size: 14px;
    color: #606266;
    cursor: default;
}

.year-label,
.month-label {
    padding: 0 4px;
    background: none;
    border: none;
    cursor: pointer;
}

.year-label:hover,
.month-label:hover {
    color: #409eff;
}

/* 星期列表樣式 */
.week-list {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #ebeef5;
}

.week-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #606266;
}

/* 日期表格樣式 */
.date-table {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 8px;
}

.date-cell {
    height: 30px;
    padding: 4px 0;
    text-align: center;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
}

.date-cell:hover {
    color: #409eff;
}

.date-cell.is-today {
    color: #409eff;
    font-weight: 700;
}

.date-cell.is-selected {
    background-color: #409eff;
    color: #fff;
    font-weight: 700;
}

.date-cell.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #f5f7fa;
}

.date-cell.is-other-month {
    color: #c0c4cc;
}

/* 年份選擇面板 */
.year-picker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}

.year-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
}

.year-table {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 8px;
    gap: 8px;
}

.year-cell {
    height: 40px;
    font-size: 14px;
    color: #606266;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
}

.year-cell:hover {
    color: #409eff;
    border-color: #409eff;
}

.year-cell.is-selected {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
}

.year-cell.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #f5f7fa;
}

/* 月份選擇面板 */
.month-picker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}

.month-table {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 8px;
    gap: 8px;
}

.month-cell {
    height: 40px;
    font-size: 14px;
    color: #606266;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
}

.month-cell:hover {
    color: #409eff;
    border-color: #409eff;
}

.month-cell.is-selected {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
}

.month-cell.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #f5f7fa;
}

/* 底部區域樣式 */
.picker-footer {
    padding: 8px;
    border-top: 1px solid #ebeef5;
}

.picker-shortcuts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.shortcut-button {
    padding: 0 8px;
    font-size: 12px;
    color: #409eff;
    background: none;
    border: none;
    cursor: pointer;
}

.shortcut-button:hover {
    color: #66b1ff;
}
</style>