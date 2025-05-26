<template>
  <div class="wk-model-manager-container">
    <h1 class="wk-model-manager-title">Model Manager</h1>
    <div class="wk-model-manager-content">
      <div class="wk-code-container" v-for="(code, index) in codeContent" :key="code">
        <div class="wk-code-row">
          <pre class="wk-code-content"><code>{{ code }}</code></pre>
          <button class="wk-copy-btn" @click="copyToClipboard(index)">Copy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Initialize refs for URL parameters
const id = ref<string | null>(null)
const menuId = ref<string | null>(null) 
const action = ref<string | null>(null)
const model = ref<string | null>(null)
const viewType = ref<string | null>(null)
const codeContent = computed(() => {
const browse_script = `self.env['${model.value}'].browse(${id.value})`
const search_script = `self.env['${model.value}'].search([('id', '=', ${id.value})])`
const search_read_script = `self.env['${model.value}'].search_read([('id', '=', ${id.value})])`
const search_count_script = `self.env['${model.value}'].search_count([('id', '=', ${id.value})])`
const unlink_script = `self.env['${model.value}'].unlink(${id.value})`

  return [
    browse_script,
    search_script,
    search_read_script,
    search_count_script,
    unlink_script
  ]
})

// Function to parse URL parameters
const parseOdooUrl = () => {
  // Get the URL hash part after #
  const hash = window.location.hash
  if (!hash) return

  // Create URLSearchParams from hash without the # symbol
  const params = new URLSearchParams(hash.substring(1))

  // Extract parameters
  id.value = params.get('id')
  menuId.value = params.get('menu_id')
  action.value = params.get('action')
  model.value = params.get('model')
  viewType.value = params.get('view_type')
}

// Parse URL on component mount
onMounted(() => {
  parseOdooUrl()
})

// Function to copy code to clipboard
const copyToClipboard = async (index: number) => {
  try {
    await navigator.clipboard.writeText(codeContent.value[index])
    // alert('Code copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
    // alert('Failed to copy code to clipboard')
  }
}

</script>

<style scoped>
.wk-model-manager-container {
    padding: 20px;
    background-color: #f5f5f5;
}

.wk-model-manager-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.wk-code-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
}

.wk-code-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wk-code-content {
  background-color: #1e1e1e;
  border-radius: 6px;
  padding: 15px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #d4d4d4;
  flex: 1;
}

.wk-copy-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  height: fit-content;
}

.wk-copy-btn:hover {
  background-color: #45a049;
}

.wk-copy-btn:active {
  background-color: #3d8b40;
}

</style>
