<template>
  <div class="wk-fields">
    <div class="wk-fields__toolbar">
      <div class="wk-search-wrap">
        <svg class="wk-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search fields…"
          class="wk-search-input"
        />
      </div>
      <span v-if="fieldCount > 0" class="wk-count">{{ fieldCount }}</span>
    </div>

    <div class="wk-fields__list">
      <div v-for="(field, key) in filteredFields" :key="key" class="wk-field-card">
        <div class="wk-field-card__head">
          <span class="wk-field-card__name">{{ key }}</span>
          <div class="wk-field-card__badges">
            <span class="wk-badge wk-badge--type">{{ field.type }}</span>
            <span v-if="field.required" class="wk-badge wk-badge--req">required</span>
            <span v-if="field.readonly" class="wk-badge wk-badge--ro">readonly</span>
          </div>
        </div>
        <div class="wk-field-card__body">
          <div v-if="field.string" class="wk-field-card__row">
            <span class="wk-field-card__label">Label</span>
            <span class="wk-field-card__value">{{ field.string }}</span>
          </div>
          <div v-if="field.relation" class="wk-field-card__row">
            <span class="wk-field-card__label">Relation</span>
            <span class="wk-field-card__value wk-field-card__value--mono">{{ field.relation }}</span>
          </div>
        </div>
      </div>

      <div v-if="fieldCount === 0 && !loading" class="wk-fields__empty">
        {{ searchQuery ? 'No matching fields' : 'No fields available' }}
      </div>
      <div v-if="loading" class="wk-fields__empty">Loading fields…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const props = defineProps<{
  model: string | null
  id: string | null
  action: string | null
  viewType: string | null
  menuId: string | null
}>()

const data: any = ref({})
const searchQuery = ref('')
const loading = ref(false)

const filteredFields = computed(() => {
  if (!data.value?.result) return {}
  if (!searchQuery.value) return data.value.result
  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any> = {}
  Object.entries(data.value.result).forEach(([key, value]) => {
    if (key.toLowerCase().includes(query)) result[key] = value
  })
  return result
})

const fieldCount = computed(() => Object.keys(filteredFields.value).length)

const getSessionId = () => {
  const c = document.cookie.split(';').find(c => c.trim().startsWith('session_id='))
  return c ? c.split('=')[1].trim() : ''
}

const get_fields = async () => {
  if (!props.model) return
  loading.value = true
  const endpointUrl = localStorage.getItem('endpointUrlOdooWebkit') || 'http://localhost:8069'
  try {
    const payload = await fetch(`${endpointUrl}/web/dataset/call_kw/${props.model}/fields_get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': `session_id=${getSessionId()}` },
      credentials: 'include',
      body: JSON.stringify({
        id: 4, jsonrpc: '2.0', method: 'call',
        params: { model: props.model, method: 'fields_get', args: [], kwargs: {} }
      })
    })
    data.value = await payload.json()
  } finally {
    loading.value = false
  }
}

onMounted(get_fields)
</script>

<style scoped>
.wk-fields {
  padding: 0;
}

/* ── Toolbar ── */
.wk-fields__toolbar {
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

.wk-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--wk-text-muted);
  background: var(--wk-bg-elevated);
  padding: 2px 7px;
  border-radius: 20px;
  white-space: nowrap;
}

/* ── Field list ── */
.wk-fields__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--wk-border);
}

.wk-field-card {
  background: var(--wk-bg);
  padding: 10px 16px;
}

.wk-field-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 5px;
  flex-wrap: wrap;
}

.wk-field-card__name {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--wk-accent);
}

.wk-field-card__badges {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

/* ── Badges ── */
.wk-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.wk-badge--type {
  background: var(--wk-accent-faint);
  color: var(--wk-accent);
}

.wk-badge--req {
  background: #fef9c3;
  color: #92400e;
}

.wk-badge--ro {
  background: var(--wk-bg-elevated);
  color: var(--wk-text-muted);
}

.wk-field-card__body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.wk-field-card__row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 12px;
}

.wk-field-card__label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--wk-text-muted);
  min-width: 42px;
}

.wk-field-card__value {
  color: var(--wk-text-secondary);
  word-break: break-word;
}

.wk-field-card__value--mono {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 11px;
  color: var(--wk-text-primary);
}

.wk-fields__empty {
  padding: 32px 16px;
  text-align: center;
  color: var(--wk-text-muted);
  font-size: 13px;
  background: var(--wk-bg);
}
</style>
