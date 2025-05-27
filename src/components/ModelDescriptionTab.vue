<template>
  <div class="wk-tab-pane">
    <div class="wk-model-info">
      <h3>Model Information</h3>
      <p><strong>Model:</strong> {{ model }}</p>
      <p><strong>ID:</strong> {{ id }}</p>
      <p><strong>Action:</strong> {{ action }}</p>
      <p><strong>View Type:</strong> {{ viewType }}</p>
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
  padding: 20px;
}

.wk-model-info p {
  margin: 10px 0;
  font-size: 16px;
}
</style> 