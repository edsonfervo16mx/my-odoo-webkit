<template>
  <div class="wk-table-wrap">
    <div class="wk-table-toolbar">
      <div class="wk-search-wrap">
        <svg class="wk-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search field or value…"
          class="wk-search-input"
        />
      </div>
      <button class="wk-copy-btn" @click="copyDataToClipboard" :class="{ 'wk-copy-btn--copied': copied }">
        <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ copied ? 'Copied!' : 'Copy JSON' }}
      </button>
    </div>

    <div class="wk-field-list">
      <div
        v-for="(value, key) in filteredData"
        :key="key"
        class="wk-field-row"
        :class="{ 'wk-field-row--copied': lastValueCopied === String(key) }"
        @click="copyValue(formatValue(value), String(key))"
      >
        <div class="wk-field-row__key">
          {{ key }}
          <span class="wk-field-row__badge">{{ lastValueCopied === String(key) ? '✓ Copied' : 'copy' }}</span>
        </div>
        <pre class="wk-field-row__val">{{ formatValue(value) }}</pre>
      </div>
      <div v-if="Object.keys(filteredData).length === 0" class="wk-table-empty">
        {{ searchQuery ? 'No matching fields' : 'No data available' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'

const data: any = ref({})
const searchQuery = ref('')
const copied = ref(false)
const lastValueCopied = ref<string | null>(null)

const props = defineProps<{
  model: string | null
  id: string | null
}>()

const firstLevelData = computed(() => {
  if (!data.value?.result?.[0]) return {}
  return data.value.result[0]
})

const filteredData = computed(() => {
  if (!searchQuery.value) return firstLevelData.value
  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any> = {}
  Object.entries(firstLevelData.value).forEach(([key, value]) => {
    if (key.toLowerCase().includes(query) || formatValue(value).toLowerCase().includes(query)) {
      result[key] = value
    }
  })
  return result
})

const formatValue = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value) || typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

const copyValue = async (text: string, key: string) => {
  try {
    await navigator.clipboard.writeText(text)
    lastValueCopied.value = key
    setTimeout(() => { lastValueCopied.value = null }, 1500)
  } catch {}
}

const copyDataToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(data.value, null, 2))
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch {}
}

const getSessionId = (): string => {
  const c = document.cookie.split(';').find(c => c.trim().startsWith('session_id='))
  return c ? c.split('=')[1].trim() : ''
}

const web_read = async () => {
  if (!props.model || !props.id) return
  const endpointUrl = localStorage.getItem('endpointUrlOdooWebkit') || 'http://localhost:8069'
  const url = `${endpointUrl}/web/dataset/call_kw/${props.model}/read`
  const payload = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': `session_id=${getSessionId()}` },
    credentials: 'include',
    body: JSON.stringify({
      id: 4, jsonrpc: '2.0', method: 'call',
      params: { model: props.model, method: 'read', args: [[parseInt(props.id!)]], kwargs: {} }
    })
  })
  data.value = await payload.json()
}

watch(() => props.id, async () => { if (props.id) await web_read() })
onMounted(async () => { await web_read() })
</script>

<style scoped>
.wk-table-wrap {
  background: var(--wk-bg);
  border-top: 1px solid var(--wk-border);
}

/* ── Toolbar ── */
.wk-table-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--wk-border);
  background: var(--wk-bg);
}

.wk-search-wrap {
  position: relative;
  flex: 1;
}

.wk-search-icon {
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--wk-text-muted);
  pointer-events: none;
}

.wk-search-input {
  width: 100%;
  padding: 6px 10px 6px 28px;
  border: 1px solid var(--wk-border);
  border-radius: var(--wk-radius-sm);
  font-size: 12.5px;
  color: var(--wk-text-primary);
  background: var(--wk-bg-surface);
  transition: border-color var(--wk-transition), box-shadow var(--wk-transition);
}

.wk-search-input:focus {
  outline: none;
  border-color: var(--wk-accent);
  box-shadow: 0 0 0 3px var(--wk-accent-faint);
  background: var(--wk-bg);
}

.wk-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  background: var(--wk-bg-elevated);
  color: var(--wk-text-secondary);
  border: 1px solid var(--wk-border);
  border-radius: var(--wk-radius-sm);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--wk-transition);
}

.wk-copy-btn:hover {
  background: var(--wk-bg-surface);
  border-color: var(--wk-text-muted);
  color: var(--wk-text-primary);
}

.wk-copy-btn--copied {
  background: var(--wk-success-bg) !important;
  border-color: var(--wk-success-border) !important;
  color: var(--wk-success) !important;
}

/* ── Field list (stacked layout) ── */
.wk-field-list {
  display: flex;
  flex-direction: column;
}

.wk-field-row {
  position: relative;
  padding: 8px 16px;
  border-bottom: 1px solid var(--wk-border);
  cursor: pointer;
  transition: background var(--wk-transition);
}

.wk-field-row:hover {
  background: var(--wk-bg-elevated);
}

.wk-field-row--copied {
  background: var(--wk-success-bg) !important;
}

.wk-field-row__key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--wk-accent);
  margin-bottom: 3px;
}

.wk-field-row--copied .wk-field-row__key {
  color: var(--wk-success);
}

.wk-field-row__badge {
  font-family: -apple-system, sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: var(--wk-text-muted);
  opacity: 0;
  transition: opacity var(--wk-transition);
}

.wk-field-row:hover .wk-field-row__badge {
  opacity: 1;
}

.wk-field-row--copied .wk-field-row__badge {
  opacity: 1;
  color: var(--wk-success);
}

.wk-field-row__val {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--wk-text-primary);
  white-space: pre-wrap;
  word-break: break-all;
  width: 100%;
}

.wk-table-empty {
  text-align: center;
  padding: 32px 16px;
  color: var(--wk-text-muted);
  font-size: 13px;
}
</style>
