<template>
  <div class="wk-shell">
    <div class="wk-shell__header">
      <h2 class="wk-section-title">Shell Commands</h2>
      <p class="wk-section-hint">Click any block to copy</p>
    </div>
    <div class="wk-shell__list">
      <div v-for="(item, index) in shellCommands" :key="index" class="wk-cmd-card">
        <div class="wk-cmd-card__desc">{{ item.description }}</div>
        <pre
          class="wk-codeblock"
          :class="{ 'wk-codeblock--copied': lastCopied === index }"
          @click="copyToClipboard(item.command, index)"
        ><code>{{ item.command }}</code><span class="wk-codeblock__hint">{{ lastCopied === index ? '✓ Copied' : 'Click to copy' }}</span></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lastCopied = ref<number | null>(null)

const shellCommands = [
  { command: '$ odoo-bin shell', description: 'Open an interactive Odoo shell' },
  { command: '$ odoo-update', description: 'Update modules in the database' },
  { command: '$ odoosh-restart', description: 'Restart all Odoo.sh services' },
  { command: '$ odoosh-restart cron', description: 'Restart Odoo.sh cron service' },
  { command: '$ odoosh-restart http', description: 'Restart Odoo.sh HTTP service' },
  { command: '$ odoosh-sql-access', description: 'Manage PostgreSQL external access (dedicated)' },
  { command: '$ odoosh-storage', description: 'Check container filesystem storage usage' },
  { command: '$ psql', description: 'Open a database shell' },
  { command: '$ mutt', description: 'Check mail rendering on text clients' },
  { command: '$ lnav ~/logs/odoo.log', description: 'Navigate Odoo log file interactively' },
]

const copyToClipboard = async (text: string, index: number) => {
  try {
    await navigator.clipboard.writeText(text)
    lastCopied.value = index
    setTimeout(() => { lastCopied.value = null }, 1500)
  } catch {}
}
</script>

<style scoped>
.wk-shell {
  padding: 0;
}

.wk-shell__header {
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

.wk-shell__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--wk-border);
}

.wk-cmd-card {
  padding: 12px 16px;
  background: var(--wk-bg);
}

.wk-cmd-card__desc {
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
