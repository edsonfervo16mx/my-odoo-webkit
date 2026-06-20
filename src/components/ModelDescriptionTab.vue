<template>
  <div class="wk-desc">

    <!-- Model hero card -->
    <div class="wk-hero">
      <div class="wk-hero__main">
        <div class="wk-hero__label">Model</div>
        <div class="wk-hero__model" @click="copy(model, 'model')" :class="{ 'wk-copied': lastCopied === 'model' }">
          {{ model ?? '—' }}
          <span class="wk-copy-badge">{{ lastCopied === 'model' ? '✓' : '' }}</span>
        </div>
      </div>
      <div class="wk-hero__meta">
        <div class="wk-meta-chip" @click="copy(id, 'id')" :class="{ 'wk-copied': lastCopied === 'id' }">
          <span class="wk-meta-chip__label">ID</span>
          <span class="wk-meta-chip__value">{{ id ?? '—' }}</span>
        </div>
        <div class="wk-meta-chip" @click="copy(viewType, 'viewType')" :class="{ 'wk-copied': lastCopied === 'viewType' }">
          <span class="wk-meta-chip__label">View</span>
          <span class="wk-meta-chip__value">{{ viewType ?? '—' }}</span>
        </div>
        <div class="wk-meta-chip" @click="copy(action, 'action')" :class="{ 'wk-copied': lastCopied === 'action' }">
          <span class="wk-meta-chip__label">Action</span>
          <span class="wk-meta-chip__value">{{ action ?? '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Technical details (collapsible) -->
    <div class="wk-details">
      <button class="wk-details__toggle" @click="showDetails = !showDetails">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
          :style="{ transform: showDetails ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
        <span>Technical details</span>
      </button>
      <div v-if="showDetails" class="wk-details__grid">
        <div v-for="item in detailItems" :key="item.key" class="wk-detail-item">
          <span class="wk-detail-item__label">{{ item.label }}</span>
          <pre class="wk-codeblock" @click="copy(item.value, item.key)" :class="{ 'wk-codeblock--copied': lastCopied === item.key }">
            <code>{{ item.value ?? '—' }}</code>
            <span class="wk-codeblock__hint">{{ lastCopied === item.key ? '✓ Copied' : 'Click to copy' }}</span>
          </pre>
        </div>
      </div>
    </div>

    <!-- Record data table -->
    <TableFields :model="model" :id="id" v-if="model && id" />
  </div>
</template>

<script setup lang="ts">
import TableFields from './TableFields.vue'
import { ref, computed } from 'vue'

const props = defineProps<{
  model: string | null
  id: string | null
  action: string | null
  viewType: string | null
  context: string | null
  domain: string | null
  xmlId: string | null
  searchViewId: string | null
}>()

const showDetails = ref(false)
const lastCopied = ref<string | null>(null)

const detailItems = computed(() => [
  { key: 'context', label: 'Context', value: props.context },
  { key: 'domain', label: 'Domain', value: props.domain },
  { key: 'xmlId', label: 'XML ID', value: props.xmlId },
  { key: 'searchViewId', label: 'Search View ID', value: props.searchViewId },
])

const copy = async (text: string | null, key: string) => {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    lastCopied.value = key
    setTimeout(() => { lastCopied.value = null }, 1500)
  } catch {}
}
</script>

<style scoped>
.wk-desc {
  padding: 0;
}

/* ── Hero card ── */
.wk-hero {
  background: var(--wk-bg);
  border-bottom: 1px solid var(--wk-border);
  padding: 14px 16px 12px;
}

.wk-hero__main {
  margin-bottom: 10px;
}

.wk-hero__label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--wk-text-muted);
  margin-bottom: 4px;
}

.wk-hero__model {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--wk-text-primary);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: var(--wk-radius-sm);
  transition: background var(--wk-transition), color var(--wk-transition);
  margin: -4px -8px;
}

.wk-hero__model:hover {
  background: var(--wk-accent-faint);
  color: var(--wk-accent);
}

.wk-hero__model.wk-copied {
  background: var(--wk-success-bg);
  color: var(--wk-success);
}

.wk-copy-badge {
  font-size: 11px;
  font-weight: 700;
  min-width: 12px;
}

.wk-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Meta chips ── */
.wk-meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border: 1px solid var(--wk-border);
  border-radius: 20px;
  cursor: pointer;
  background: var(--wk-bg-surface);
  transition: all var(--wk-transition);
}

.wk-meta-chip:hover {
  border-color: var(--wk-accent);
  background: var(--wk-accent-faint);
}

.wk-meta-chip.wk-copied {
  border-color: var(--wk-success-border);
  background: var(--wk-success-bg);
}

.wk-meta-chip__label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--wk-text-muted);
}

.wk-meta-chip__value {
  font-size: 12px;
  font-weight: 600;
  color: var(--wk-text-primary);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
}

.wk-meta-chip.wk-copied .wk-meta-chip__value {
  color: var(--wk-success);
}

/* ── Details section ── */
.wk-details {
  border-bottom: 1px solid var(--wk-border);
  background: var(--wk-bg);
}

.wk-details__toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 9px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--wk-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: color var(--wk-transition), background var(--wk-transition);
  text-align: left;
}

.wk-details__toggle:hover {
  color: var(--wk-text-secondary);
  background: var(--wk-bg-surface);
}

.wk-details__grid {
  display: grid;
  gap: 10px;
  padding: 0 16px 14px;
}

.wk-detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wk-detail-item__label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wk-text-muted);
}

/* ── Code block ── */
.wk-codeblock {
  position: relative;
  margin: 0;
  padding: 8px 10px;
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
  top: 5px;
  right: 7px;
  font-size: 10px;
  font-weight: 500;
  color: #64748b;
  opacity: 0;
  transition: opacity var(--wk-transition);
  font-family: -apple-system, sans-serif;
}

.wk-codeblock:hover .wk-codeblock__hint {
  opacity: 1;
}

.wk-codeblock--copied .wk-codeblock__hint {
  opacity: 1;
  color: var(--wk-success);
}
</style>
