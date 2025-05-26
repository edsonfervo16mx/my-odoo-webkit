<script setup lang="ts">
</script>

<template>
  <div class="wk-home-container">
    <section class="wk-hero">
      <h1 class="wk-title">Odoo Developer Extension</h1>
      <p class="wk-subtitle">Enhance your Odoo development with our extension</p>
    </section>
  </div>
</template>

<style scoped>
.wk-home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.wk-hero {
  text-align: center;
  padding: 40px 0;
  margin-bottom: 40px;
}

.wk-title {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
}

.wk-subtitle {
  font-size: 1.2em;
  color: #666;
}

section {
  margin-bottom: 40px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.wk-features, .wk-tools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.wk-feature, .wk-tool {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.3em;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>