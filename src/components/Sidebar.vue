<template>
  <div class="wk-odoo-sidebar-container">
    <div class="wk-odoo-sidebar" :class="{ 'wk-sidebar-open': isOpen }">
      <div class="wk-sidebar-header">
        <h2 class="wk-sidebar-title">Odoo Tools</h2>
        <button class="wk-toggle-btn" @click="toggleSidebar">
          {{ isOpen ? '×' : '☰' }}
        </button>
      </div>
      <div class="wk-sidebar-content">
        <nav class="wk-sidebar-menu">
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/model-manager">Model</RouterLink></li>
            <li><RouterLink to="/scripts">Scripts</RouterLink></li>
            <li><RouterLink to="/settings">Settings</RouterLink></li>
            <li><RouterLink to="/help">Help</RouterLink></li>
          </ul>
        </nav>
        <div class="wk-sidebar-router-content">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- Botón flotante visible cuando el sidebar está cerrado -->
    <button v-if="!isOpen" class="wk-floating-toggle" @click="toggleSidebar">
      ☰
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const navigate = (section: string) => {
  console.log(`Navigating to ${section}`)
  // Add your navigation logic here
}
</script>

<style scoped>
.wk-odoo-sidebar-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
}

.wk-sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white !important;
}

.wk-odoo-sidebar {
  position: absolute;
  top: 0;
  right: -30vw;
  width: 30vw;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
}

.wk-sidebar-open {
  right: 0;
}

.wk-floating-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #875A7B;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;
}

.wk-floating-toggle:hover {
  background-color: #6d4862;
}

.wk-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #875A7B;
  color: white;
}

.wk-sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.wk-toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.wk-sidebar-content {
  padding: 1rem;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.wk-sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wk-sidebar-menu li {
  margin-bottom: 0.5rem;
}

.wk-sidebar-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.wk-sidebar-menu a:hover {
  background-color: #f5f5f5;
}

.wk-sidebar-router-content {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>