<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed } from 'vue'

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

import ModelDescriptionTab from './components/ModelDescriptionTab.vue'
import ModelScriptsTab from './components/ModelScriptsTab.vue'
import MiscTab from './components/MiscTab.vue'
import ShellTab from './components/Shell.vue'
// Initialize refs for URL parameters
const id = ref<string | null>(null)
const menuId = ref<string | null>(null) 
const action = ref<string | null>(null)
const model = ref<string | null>(null)
const viewType = ref<string | null>(null)

const context = ref<string | null>(null)
const domain = ref<string | null>(null)
const xmlId = ref<string | null>(null)
const searchViewId = ref<string | null>(null)

// Tab management
const activeTab = ref('description')
const tabs = [
  { id: 'description', name: 'Model Description' },
  { id: 'scripts', name: 'Model Scripts' },
  { id: 'fields', name: 'Fields' },
  { id: 'shell', name: 'Shell' }
]

// Function to parse URL parameters
const parseOdooUrl = () => {
  // Get the URL hash part after #
  const hash = window.location.hash
  if (!hash) return

  // Create URLSearchParams from hash without the # symbol
  const params = new URLSearchParams(hash.substring(1))

  // Extract parameters
  id.value = params.get('id')
  menuId.value = params.get('menu_id')
  action.value = params.get('action')
  model.value = params.get('model')
  viewType.value = params.get('view_type')
}

const setCurrentAction = () => {
  const currentAction = sessionStorage.getItem('current_action')
  if (currentAction) {
    const actionObj = JSON.parse(currentAction)
    context.value = actionObj.context
    domain.value = actionObj.domain
    xmlId.value = actionObj.xml_id
    searchViewId.value = actionObj.search_view_id
  }
}

const reloadApp = () => {
  // console.log('reloadApp')
  // Reset all reactive values
  id.value = null
  menuId.value = null
  action.value = null
  model.value = null
  viewType.value = null
  context.value = null
  domain.value = null
  xmlId.value = null
  searchViewId.value = null
  activeTab.value = 'description'
  
  // Re-parse URL and trigger onMounted hooks
  parseOdooUrl()
  setCurrentAction()
}

const toggleDebugMode = () => {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  
  if (url.searchParams.has('debug')) {
    // If debug mode is on, remove it
    url.searchParams.delete('debug')
  } else {
    // If debug mode is off, add it
    url.searchParams.append('debug', '1')
  }
  
  // Preserve the hash part
  const hash = window.location.hash
  window.location.href = url.toString() + hash
}
const endpointUrlOdooWebkit = ref<string | null>(localStorage.getItem('endpointUrlOdooWebkit') || 'http://localhost:8069')

const saveEndpoint = () => {
  console.log('saveEndpoint', endpointUrlOdooWebkit.value)
  const is_changed = localStorage.getItem('endpointUrlOdooWebkit') !== endpointUrlOdooWebkit.value
  localStorage.setItem('endpointUrlOdooWebkit', endpointUrlOdooWebkit.value || 'http://localhost:8069/')
  endpointUrlOdooWebkit.value = localStorage.getItem('endpointUrlOdooWebkit') || 'http://localhost:8069/'
  console.log('saveEndpoint', endpointUrlOdooWebkit.value)
  // Show success message
  if (is_changed) {
    console.log('Endpoint changed')
    const successMessage = document.createElement('div')
    successMessage.textContent = 'Endpoint saved! Reloading...'
    successMessage.style.position = 'fixed'
    successMessage.style.bottom = '20px'
    successMessage.style.right = '20px'
    successMessage.style.backgroundColor = '#4CAF50'
    successMessage.style.color = 'white'
    successMessage.style.padding = '10px 20px'
    successMessage.style.borderRadius = '4px'
    successMessage.style.zIndex = '9999'
    document.body.appendChild(successMessage)

    // Reload page after 1/4 second
    setTimeout(() => {
        window.location.reload()
      }, 250)
  }
}

parseOdooUrl()
setCurrentAction()
saveEndpoint()

</script>

<template>
  <div class="wk-odoo-sidebar-container">
    <div class="wk-odoo-sidebar" :class="{ 'wk-sidebar-open': isOpen }">
      <div class="wk-sidebar-header">
        <h2 class="wk-sidebar-title">Odoo Tools</h2>
        <div class="wk-header-buttons">
          <button class="wk-debug-btn" @click="toggleDebugMode" title="Toggle Debug Mode">
            🐞
          </button>
          <button class="wk-reload-btn" @click="reloadApp" title="Reload Extension">
            ↻
          </button>
          <button class="wk-toggle-btn" @click="toggleSidebar">
            {{ isOpen ? '×' : '☰' }}
          </button>
        </div>
      </div>
      <div class="wk-sidebar-content">
        <div class="wk-sidebar-router-content">
          <div class="wk-sidebar-router-content-inner">
            <div class="wk-router-view-container">
              <div class="wk-model-manager-container">
                <h1 class="wk-model-manager-title">Odoo Tools for developers</h1>
                <div class="wk-endpoint-container">
                  <div class="wk-endpoint-input-container">
                    <label for="wk-endpoint-input">Endpoint URL</label>
                    <div class="wk-input-button-group">
                      <input 
                        type="text" 
                        class="wk-endpoint-input"
                        placeholder="Enter endpoint URL"
                        v-model="endpointUrlOdooWebkit"
                      >
                      <button 
                        class="wk-save-endpoint-btn"
                        @click="saveEndpoint"
                        title="Save Endpoint"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div class="wk-tabs">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    :class="['wk-tab-btn', { active: activeTab === tab.id }]"
                    @click="activeTab = tab.id"
                  >
                    {{ tab.name }}
                  </button>
              </div>

              <div class="wk-tab-content">
                <ModelDescriptionTab
                  v-if="activeTab === 'description'"
                  :model="model"
                  :id="id"
                  :action="action"
                  :view-type="viewType"
                  :context="context"
                  :domain="domain"
                  :xml-id="xmlId"
                  :search-view-id="searchViewId"
                />
                
                <ModelScriptsTab
                  v-if="activeTab === 'scripts'"
                  :model="model"
                  :id="id"
                />
                
                <MiscTab
                  v-if="activeTab === 'fields'"
                  :menu-id="menuId"
                  :model="model"
                  :id="id"
                  :action="action"
                  :view-type="viewType"
                />
                <ShellTab
                  v-if="activeTab === 'shell'"
                />
                </div>
              </div>
            </div>
          </div>
          <div class="wk-sidebar-footer">
            <p>Developed by <a href="https://edsonfervo16mx.github.io/" target="_blank">@edsonfervo16mx</a></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón flotante visible cuando el sidebar está cerrado -->
    <button v-if="!isOpen" class="wk-floating-toggle" @click="toggleSidebar">
      ☰
    </button>
  </div>
</template>



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
  right: -35vw;
  width: 35vw;
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

.wk-header-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.wk-reload-btn, .wk-debug-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
}

.wk-reload-btn:hover {
  transform: rotate(180deg);
}

.wk-debug-btn:hover {
  transform: scale(1.2);
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
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.wk-router-view-container {
  min-height: 200px;
  margin-top: 1rem;
}

.wk-model-manager-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.wk-model-manager-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.wk-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.wk-tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.wk-tab-btn.active {
  color: #4CAF50;
  border-bottom: 2px solid #4CAF50;
  margin-bottom: -2px;
}

.wk-tab-btn:hover {
  background-color: #f0f0f0;
}

.wk-tab-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.wk-endpoint-input-container {
  margin-bottom: 20px !important;
}

.wk-endpoint-input-container label {
  display: block !important;
  margin-bottom: 8px !important;
  font-weight: 500 !important;
  color: #333 !important;
}

.wk-input-button-group {
  display: flex !important;
  gap: 10px !important;
  align-items: center !important;
}

.wk-endpoint-input {
  flex: 1 !important;
  padding: 8px 12px !important;
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  min-width: 0;
}

.wk-endpoint-input:focus {
  outline: none !important;
  border-color: #4a90e2 !important;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3) !important;
}

.wk-save-endpoint-btn {
  padding: 8px 16px !important;
  background-color: #875A7B !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  white-space: nowrap !important;
}

.wk-save-endpoint-btn:hover {
  background-color: #6d4862 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.wk-save-endpoint-btn:active {
  transform: translateY(0) !important;
  box-shadow: none !important;
}
</style>