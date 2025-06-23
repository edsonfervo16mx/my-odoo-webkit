<template>
  <div class="wk-shell-container">
    <h1 class="wk-title">Model Scripts</h1>
    <div class="wk-shell-commands">
      <div class="wk-command" v-for="(item, index) in codeContent" :key="item.code">
        <div class="wk-command-content">
          <div class="wk-command-header">
            <span class="wk-command-description">{{ item.description }}</span>
          </div>
          <pre @click="copyToClipboard(index)"><code>{{ item.code }}</code></pre>
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

  const create_script = {
    code: `self.env['${props.model}'].create({'name': 'New Name'})`,
    description: 'Create a new record'
  }

  const update_script = {
    code: `self.env['${props.model}'].browse(${props.id}).write({'name': 'New Name'})`,
    description: 'Update the record'
  }

  const commit_script = {
    code: `self.env.cr.commit()`,
    description: 'Commit the transaction'
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
    create_script,
    update_script,
    commit_script,
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

.wk-title {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4a90e2;
}

.wk-shell-container {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
}

.wk-shell-container h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
}

.wk-shell-commands {
  display: grid;
  gap: 20px;
}

.wk-command {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.wk-command:hover {
  transform: translateY(-2px);
}

.wk-command-content {
  padding: 16px;
  width: 100%;
  overflow: hidden;
}

.wk-command-header {
  margin-bottom: 12px;
}

.wk-command-description {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 500;
  display: block;
}

.wk-command pre {
  margin: 0;
  padding: 16px;
  background: #1a2634;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #e6e6e6;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.wk-command pre code {
  display: block;
  width: 100%;
}

.wk-command pre:hover {
  background: #2c3e50;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

@media (min-width: 768px) {
  .wk-shell-commands {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
</style>