<template>
  <div class="wk-tab-pane">
    <div class="wk-collapsible">
      <div class="wk-collapsible-header" @click="toggleCollapse">
        <h3 class="wk-model-info-title">Model Information</h3>
        <span class="wk-collapse-icon">{{ isCollapsed ? '▼' : '▲' }}</span>
      </div>
      <div class="wk-model-info" v-show="!isCollapsed">
        <div class="wk-model-info-grid">
          <div class="wk-info-item">
            <span class="wk-info-label">Model</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(model)"><code>{{ model }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">ID</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(id)"><code>{{ id }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">Action</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(action)"><code>{{ action }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">View Type</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(viewType)"><code>{{ viewType }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">Context</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(context)"><code>{{ context }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">Domain</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(domain)"><code>{{ domain }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">XML ID</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(xmlId)"><code>{{ xmlId }}</code></pre></span>
          </div>
          <div class="wk-info-item">
            <span class="wk-info-label">Search View ID</span>
            <span class="wk-info-value"><pre @click="copyToClipboard(searchViewId)"><code>{{ searchViewId }}</code></pre></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TableFields :model="model" :id="id" v-if="model && id"/>
</template>

<script setup lang="ts">
import TableFields from './TableFields.vue'
import { ref } from 'vue'

defineProps<{
  model: string | null
  id: string | null
  action: string | null
  viewType: string | null
  context: string | null,
  domain: string | null,
  xmlId: string | null,
  searchViewId: string | null
}>()

const isCollapsed = ref(true)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const copyToClipboard = async (text: string | null) => {
  if (!text) return;
  
  try {
    await navigator.clipboard.writeText(text);
    // alert('Text copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // alert('Failed to copy text to clipboard');
  }
};
</script>

<style scoped>
.wk-collapsible {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 16px;
  cursor: pointer;
}

.wk-collapsible-header {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wk-collapse-icon {
  font-size: 1rem;
  color: #6c757d;
}

.wk-model-info {
  padding: 0 16px 16px 16px;
}

.wk-model-info-title {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0;
}

.wk-model-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.wk-info-item {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.wk-info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.wk-info-label {
  display: block;
  color: #6c757d;
  font-size: 0.8rem;
  margin-bottom: 2px;
  font-weight: 500;
}

.wk-info-value {
  display: block;
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: 600;
  word-break: break-all;
}

.wk-info-value pre {
  margin: 0;
  padding: 8px;
  background: #1a2634;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #e6e6e6;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wk-info-value pre:hover {
  background: #2c3e50;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

.wk-info-value pre code {
  display: block;
  width: 100%;
}
</style>