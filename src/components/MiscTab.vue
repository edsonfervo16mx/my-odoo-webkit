<template>
  <div class="wk-tab-pane">
    <div class="wk-misc-content">
      <h3>Additional Information</h3>
      <p>Menu ID: {{ menuId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  menuId: string | null
}>()
</script>

<style scoped>
.wk-misc-content {
  padding: 20px;
}
</style> 