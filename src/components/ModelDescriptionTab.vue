<template>
  <div class="wk-tab-pane">
    <div class="wk-model-info">
      <h3 class="wk-model-info-title">Model Information</h3>
      <div class="wk-model-info-grid">
        <div class="wk-info-item">
          <span class="wk-info-label">Model</span>
          <span class="wk-info-value">{{ model }}</span>
        </div>
        <div class="wk-info-item">
          <span class="wk-info-label">ID</span>
          <span class="wk-info-value">{{ id }}</span>
        </div>
        <div class="wk-info-item">
          <span class="wk-info-label">Action</span>
          <span class="wk-info-value">{{ action }}</span>
        </div>
        <div class="wk-info-item">
          <span class="wk-info-label">View Type</span>
          <span class="wk-info-value">{{ viewType }}</span>
        </div>
      </div>
    </div>
  </div>
  <TableFields :model="model" :id="id" v-if="model && id"/>
</template>

<script setup lang="ts">
import TableFields from './TableFields.vue'
defineProps<{
  model: string | null
  id: string | null
  action: string | null
  viewType: string | null
}>()
</script>

<style scoped>
.wk-model-info {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.wk-model-info-title {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eee;
}

.wk-model-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.wk-info-item {
  padding: 12px;
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
  font-size: 0.875rem;
  margin-bottom: 4px;
  font-weight: 500;
}

.wk-info-value {
  display: block;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
  word-break: break-all;
}
</style>