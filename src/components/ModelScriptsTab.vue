<template>
  <div class="wk-shell-container">
    <h1>Model Scripts</h1>
    <div class="wk-shell-commands">
      <div class="wk-command" v-for="(item, index) in codeContent" :key="item.code">
        <pre @click="copyToClipboard(index)"><code>{{ item.code }}</code></pre>
        <span>{{ item.description }}</span>
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
  const browse_script = {
    code: `self.env['${props.model}'].browse(${props.id})`,
    description: 'Returns a recordset for the given ID'
  }
  const search_script = {
    code: `self.env['${props.model}'].search([('id', '=', ${props.id})])`,
    description: 'Search records'
  }
  const search_read_script = {
    code: `self.env['${props.model}'].search_read([('id', '=', ${props.id})])`,
    description: 'Search and read'
  }
  const search_count_script = {
    code: `self.env['${props.model}'].search_count([('id', '=', ${props.id})])`,
    description: 'Count records'
  }
  const unlink_script = {
    code: `self.env['${props.model}'].unlink(${props.id})`,
    description: 'Delete the record with the given ID'
  }

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
    await navigator.clipboard.writeText(codeContent.value[index].code)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
.wk-shell-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.wk-shell-container h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 24px;
}

.wk-shell-commands {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.wk-command {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.wk-command pre {
  margin: 0;
  padding: 8px 12px;
  background: #2c3e50;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #fff;
  white-space: pre-wrap;
  word-break: break-all;
}

.wk-command pre:hover {
  background: #3c4e60;
}

.wk-command span {
  color: #666;
  font-size: 14px;
  flex: 1;
}
</style> 