<template>
  <div class="wk-tab-pane">
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
import { computed } from 'vue'

const props = defineProps<{
  model: string | null
  id: string | null
}>()

const codeContent = computed(() => {
  const browse_script = `self.env['${props.model}'].browse(${props.id})`
  const search_script = `self.env['${props.model}'].search([('id', '=', ${props.id})])`
  const search_read_script = `self.env['${props.model}'].search_read([('id', '=', ${props.id})])`
  const search_count_script = `self.env['${props.model}'].search_count([('id', '=', ${props.id})])`
  const unlink_script = `self.env['${props.model}'].unlink(${props.id})`

  return [
    browse_script,
    search_script,
    search_read_script,
    search_count_script,
    unlink_script
  ]
})

const copyToClipboard = async (index: number) => {
  try {
    await navigator.clipboard.writeText(codeContent.value[index])
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
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
  background-color: #263238;
  border-radius: 6px;
  padding: 15px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #EEFFFF;
  flex: 1;
}

.wk-code-content :deep(.string) { color: #C3E88D; }
.wk-code-content :deep(.keyword) { color: #C792EA; }
.wk-code-content :deep(.function) { color: #82AAFF; }
.wk-code-content :deep(.number) { color: #F78C6C; }
.wk-code-content :deep(.operator) { color: #89DDFF; }
.wk-code-content :deep(.comment) { color: #546E7A; }
.wk-code-content :deep(.variable) { color: #EEFFFF; }
.wk-code-content :deep(.property) { color: #B2CCD6; }
.wk-code-content :deep(.self) { color: #FF0000; }

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