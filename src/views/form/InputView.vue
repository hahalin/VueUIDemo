```vue
<template>
  <div class="demo-container">
    <h1 class="demo-title">文字方塊</h1>
    <p class="demo-description">基本的文字輸入元件，支援各種輸入需求。</p>

    <!-- 基本用法 -->
    <div class="demo-section">
      <h2 class="section-title">基本用法</h2>
      <p class="section-description">最基本的文字輸入方塊</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-input
            v-model="input1"
            placeholder="請輸入內容"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input1" placeholder="請輸入內容" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 尺寸 -->
    <div class="demo-section">
      <h2 class="section-title">不同尺寸</h2>
      <p class="section-description">提供大、中、小三種尺寸</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space direction="vertical" size="large" style="width: 100%">
            <el-input
              v-model="input2"
              size="large"
              placeholder="大尺寸"
            />
            <el-input
              v-model="input3"
              placeholder="預設尺寸"
            />
            <el-input
              v-model="input4"
              size="small"
              placeholder="小尺寸"
            />
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input2" size="large" placeholder="大尺寸" />
&lt;el-input v-model="input3" placeholder="預設尺寸" />
&lt;el-input v-model="input4" size="small" placeholder="小尺寸" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 禁用狀態 -->
    <div class="demo-section">
      <h2 class="section-title">禁用狀態</h2>
      <p class="section-description">禁止輸入的狀態</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-input
            v-model="input5"
            disabled
            placeholder="禁用狀態"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input5" disabled placeholder="禁用狀態" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 可清除內容 -->
    <div class="demo-section">
      <h2 class="section-title">可清除內容</h2>
      <p class="section-description">顯示清除按鈕</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-input
            v-model="input6"
            clearable
            placeholder="輸入後可清除內容"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input6" clearable placeholder="輸入後可清除內容" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 密碼輸入 -->
    <div class="demo-section">
      <h2 class="section-title">密碼輸入</h2>
      <p class="section-description">可切換顯示/隱藏的密碼輸入</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-input
            v-model="input7"
            type="password"
            placeholder="請輸入密碼"
            show-password
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input7" type="password" placeholder="請輸入密碼" show-password />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 帶圖示 -->
    <div class="demo-section">
      <h2 class="section-title">帶圖示</h2>
      <p class="section-description">在輸入框內增加圖示</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space direction="vertical" size="large" style="width: 100%">
            <el-input
              v-model="input8"
              placeholder="前置圖示"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>

            <el-input
              v-model="input9"
              placeholder="後置圖示"
            >
              <template #suffix>
                <el-icon><Calendar /></el-icon>
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input8" placeholder="前置圖示">
  &lt;template #prefix>
    &lt;el-icon>&lt;Search />&lt;/el-icon>
  &lt;/template>
&lt;/el-input>

&lt;el-input v-model="input9" placeholder="後置圖示">
  &lt;template #suffix>
    &lt;el-icon>&lt;Calendar />&lt;/el-icon>
  &lt;/template>
&lt;/el-input>
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 文字區域 -->
    <div class="demo-section">
      <h2 class="section-title">文字區域</h2>
      <p class="section-description">多行文字輸入</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-input
            v-model="input10"
            type="textarea"
            rows="4"
            placeholder="請輸入多行內容"
          />
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input10" type="textarea" rows="4" placeholder="請輸入多行內容" />
          </code></pre>
        </div>
      </div>
    </div>

    <!-- 複合型輸入框 -->
    <div class="demo-section">
      <h2 class="section-title">複合型輸入框</h2>
      <p class="section-description">可前後加入額外內容</p>
      
      <div class="demo-block">
        <div class="demo-block-content">
          <el-space direction="vertical" size="large" style="width: 100%">
            <el-input v-model="input11" placeholder="請輸入網址">
              <template #prepend>https://</template>
              <template #append>.com</template>
            </el-input>

            <el-input v-model="input12" placeholder="請輸入金額">
              <template #prepend>
                <el-select v-model="select1" style="width: 100px">
                  <el-option label="TWD" value="TWD" />
                  <el-option label="USD" value="USD" />
                  <el-option label="EUR" value="EUR" />
                </el-select>
              </template>
              <template #append>.00</template>
            </el-input>
          </el-space>
        </div>
        <div class="demo-block-code">
          <pre><code>
&lt;el-input v-model="input11" placeholder="請輸入網址">
  &lt;template #prepend>https://&lt;/template>
  &lt;template #append>.com&lt;/template>
&lt;/el-input>

&lt;el-input v-model="input12" placeholder="請輸入金額">
  &lt;template #prepend>
    &lt;el-select v-model="select1" style="width: 100px">
      &lt;el-option label="TWD" value="TWD" />
      &lt;el-option label="USD" value="USD" />
      &lt;el-option label="EUR" value="EUR" />
    &lt;/el-select>
  &lt;/template>
  &lt;template #append>.00&lt;/template>
&lt;/el-input>
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Calendar } from '@element-plus/icons-vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')
const input7 = ref('')
const input8 = ref('')
const input9 = ref('')
const input10 = ref('')
const input11 = ref('')
const input12 = ref('')
const select1 = ref('TWD')
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
</style>
```