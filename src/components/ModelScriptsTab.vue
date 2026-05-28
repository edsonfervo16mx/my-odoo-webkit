<template>
  <div class="wk-scripts">
    <div class="wk-scripts__header">
      <h2 class="wk-section-title">ORM Scripts</h2>
      <p class="wk-section-hint">Click any block to copy</p>
    </div>
    <div class="wk-scripts__grid">
      <div v-for="(item, index) in codeContent" :key="item.code" class="wk-script-card">
        <div class="wk-script-card__desc">{{ item.description }}</div>
        <pre
          class="wk-codeblock"
          :class="{ 'wk-codeblock--copied': lastCopied === index }"
          @click="copyToClipboard(index)"
        ><code>{{ item.code }}</code><span class="wk-codeblock__hint">{{ lastCopied === index ? '✓ Copied' : 'Click to copy' }}</span></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  model: string | null
  id: string | null
}>()

const lastCopied = ref<number | null>(null)

const codeContent = computed(() => [
  {
    code: `self.env['${props.model}'].browse(${props.id})`,
    description: 'Browse record by ID'
  },
  {
    code: `self.env['${props.model}'].search([('id', '=', ${props.id})])`,
    description: 'Search by ID'
  },
  {
    code: `self.env['${props.model}'].search_read([('id', '=', ${props.id})])`,
    description: 'Search and read fields'
  },
  {
    code: `self.env['${props.model}'].search_count([('id', '=', ${props.id})])`,
    description: 'Count matching records'
  },
  {
    code: `self.env['${props.model}'].create({'name': 'New Name'})`,
    description: 'Create a new record'
  },
  {
    code: `self.env['${props.model}'].browse(${props.id}).write({'name': 'New Name'})`,
    description: 'Update record'
  },
  {
    code: `self.env.cr.commit()`,
    description: 'Commit transaction'
  },
  {
    code: `self.env['${props.model}'].browse(${props.id}).unlink()`,
    description: 'Delete record'
  },
])

const copyToClipboard = async (index: number) => {
  try {
    await navigator.clipboard.writeText(codeContent.value[index].code)
    lastCopied.value = index
    setTimeout(() => { lastCopied.value = null }, 1500)
  } catch {}
}
</script>

<style scoped>
.wk-scripts {
  padding: 0;
}

.wk-scripts__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 14px 16px 0;
  margin-bottom: 12px;
}

.wk-section-title {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--wk-text-muted);
}

.wk-section-hint {
  font-size: 11px;
  color: var(--wk-text-muted);
}

.wk-scripts__grid {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--wk-border);
}

.wk-script-card {
  padding: 12px 16px;
  background: var(--wk-bg);
}

.wk-script-card__desc {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--wk-text-secondary);
  margin-bottom: 6px;
}

/* ── Code block ── */
.wk-codeblock {
  position: relative;
  margin: 0;
  padding: 9px 10px;
  background: var(--wk-code-bg);
  border-radius: var(--wk-radius-sm);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--wk-code-text);
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  cursor: pointer;
  transition: background var(--wk-transition), box-shadow var(--wk-transition);
}

.wk-codeblock:hover {
  background: var(--wk-code-bg-hover);
  box-shadow: 0 0 0 2px var(--wk-accent-light);
}

.wk-codeblock--copied {
  background: #052e16 !important;
  box-shadow: 0 0 0 2px var(--wk-success-border) !important;
}

.wk-codeblock code {
  display: block;
}

.wk-codeblock__hint {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 10px;
  font-weight: 500;
  color: #64748b;
  opacity: 0;
  transition: opacity var(--wk-transition);
  font-family: -apple-system, sans-serif;
  pointer-events: none;
}

.wk-codeblock:hover .wk-codeblock__hint {
  opacity: 1;
}

.wk-codeblock--copied .wk-codeblock__hint {
  opacity: 1;
  color: var(--wk-success);
}
</style>
