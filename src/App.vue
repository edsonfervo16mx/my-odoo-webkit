<script setup lang="ts">
import { ref } from 'vue'
import ModelDescriptionTab from './components/ModelDescriptionTab.vue'
import ModelScriptsTab from './components/ModelScriptsTab.vue'
import MiscTab from './components/MiscTab.vue'
import ShellTab from './components/Shell.vue'

const isOpen = ref(false)
const showSettings = ref(false)

const id = ref<string | null>(null)
const menuId = ref<string | null>(null)
const action = ref<string | null>(null)
const model = ref<string | null>(null)
const viewType = ref<string | null>(null)
const context = ref<string | null>(null)
const domain = ref<string | null>(null)
const xmlId = ref<string | null>(null)
const searchViewId = ref<string | null>(null)

const activeTab = ref('description')
const tabs = [
  { id: 'description', name: 'Info' },
  { id: 'scripts', name: 'Scripts' },
  { id: 'fields', name: 'Fields' },
  { id: 'shell', name: 'Shell' },
]

const parseOdooUrl = () => {
  const hash = window.location.hash
  if (!hash) return
  const params = new URLSearchParams(hash.substring(1))
  id.value = params.get('id')
  menuId.value = params.get('menu_id')
  action.value = params.get('action')
  model.value = params.get('model')
  viewType.value = params.get('view_type')
}

const setCurrentAction = () => {
  const currentAction = sessionStorage.getItem('current_action')
  if (currentAction) {
    try {
      const actionObj = JSON.parse(currentAction)
      context.value = actionObj.context
      domain.value = actionObj.domain
      xmlId.value = actionObj.xml_id
      searchViewId.value = actionObj.search_view_id
    } catch {}
  }
}

const reloadApp = () => {
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
  parseOdooUrl()
  setCurrentAction()
}

const toggleDebugMode = () => {
  const url = new URL(window.location.href)
  if (url.searchParams.has('debug')) {
    url.searchParams.delete('debug')
  } else {
    url.searchParams.append('debug', '1')
  }
  window.location.href = url.toString() + window.location.hash
}

const endpointUrl = ref<string>(localStorage.getItem('endpointUrlOdooWebkit') || 'http://localhost:8069')

const saveEndpoint = () => {
  const isChanged = localStorage.getItem('endpointUrlOdooWebkit') !== endpointUrl.value
  localStorage.setItem('endpointUrlOdooWebkit', endpointUrl.value || 'http://localhost:8069')
  if (isChanged) {
    setTimeout(() => window.location.reload(), 250)
  }
}

parseOdooUrl()
setCurrentAction()
</script>

<template>
  <div class="wk-container">
    <div class="wk-sidebar" :class="{ 'wk-sidebar--open': isOpen }">

      <!-- Header -->
      <div class="wk-header">
        <div class="wk-header__brand">
          <span class="wk-header__logo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </span>
          <span class="wk-header__title">Odoo Webkit</span>
        </div>
        <div class="wk-header__actions">
          <button class="wk-icon-btn" @click="toggleDebugMode" title="Toggle Debug Mode">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2l1.5 1.5"/><path d="M14.5 3.5L16 2"/>
              <path d="M9 7.5A5 5 0 0 1 19 10v2h1a1 1 0 0 1 0 2h-1v1a5 5 0 0 1-10 0v-1H7a1 1 0 0 1 0-2h1v-2a5 5 0 0 1 1-2.9"/>
              <path d="M12 10v6"/><path d="M10 13h4"/>
            </svg>
          </button>
          <button class="wk-icon-btn wk-icon-btn--reload" @click="reloadApp" title="Reload Extension">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M8 16H3v5"/>
            </svg>
          </button>
          <button class="wk-icon-btn" :class="{ 'wk-icon-btn--active': showSettings }" @click="showSettings = !showSettings" title="Settings">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          <button class="wk-icon-btn wk-icon-btn--close" @click="isOpen = false" title="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <nav class="wk-tab-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="wk-tab-nav__item"
          :class="{ 'wk-tab-nav__item--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <!-- Info -->
          <svg v-if="tab.id === 'description'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <!-- Scripts -->
          <svg v-if="tab.id === 'scripts'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          <!-- Fields -->
          <svg v-if="tab.id === 'fields'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          <!-- Shell -->
          <svg v-if="tab.id === 'shell'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <span>{{ tab.name }}</span>
        </button>
      </nav>

      <!-- Tab Content -->
      <div class="wk-content">
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
        <ShellTab v-if="activeTab === 'shell'" />
      </div>

      <!-- Settings Panel -->
      <div class="wk-settings" :class="{ 'wk-settings--open': showSettings }">
        <div class="wk-settings__header">
          <button class="wk-icon-btn" @click="showSettings = false" title="Back">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <span class="wk-settings__title">Settings</span>
        </div>
        <div class="wk-settings__body">
          <div class="wk-field-group">
            <label class="wk-label">Endpoint URL</label>
            <p class="wk-hint">URL base de tu instancia Odoo</p>
            <div class="wk-input-row">
              <input
                type="text"
                class="wk-input"
                placeholder="http://localhost:8069"
                v-model="endpointUrl"
                @keydown.enter="saveEndpoint"
              />
              <button class="wk-btn wk-btn--primary" @click="saveEndpoint">Save</button>
            </div>
          </div>
        </div>
        <div class="wk-settings__footer">
          <p>By <a href="https://edsonfervo16mx.github.io/" target="_blank">@edsonfervo16mx</a></p>
          <span class="wk-version">v1.2.1</span>
        </div>
      </div>

    </div>

    <!-- Floating Action Button -->
    <button v-if="!isOpen" class="wk-fab" @click="isOpen = true" title="Open Odoo Webkit">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.wk-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
}

/* ── Sidebar ── */
.wk-sidebar {
  position: absolute;
  top: 0;
  right: -480px;
  width: 480px;
  height: 100vh;
  background: var(--wk-bg);
  box-shadow: -6px 0 32px rgba(0, 0, 0, 0.10), -1px 0 0 var(--wk-border);
  transition: right var(--wk-transition);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.wk-sidebar--open {
  right: 0;
}

/* ── Header ── */
.wk-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 14px;
  height: 52px;
  border-bottom: 1px solid var(--wk-border);
  flex-shrink: 0;
  background: var(--wk-bg);
}

.wk-header__brand {
  display: flex;
  align-items: center;
  gap: 9px;
}

.wk-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--wk-accent);
  color: #fff;
  border-radius: 7px;
  flex-shrink: 0;
}

.wk-header__title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--wk-text-primary);
  letter-spacing: -0.01em;
}

.wk-header__actions {
  display: flex;
  align-items: center;
  gap: 1px;
}

/* ── Icon Buttons ── */
.wk-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: var(--wk-text-muted);
  border-radius: var(--wk-radius-sm);
  cursor: pointer;
  transition: background var(--wk-transition), color var(--wk-transition);
  flex-shrink: 0;
}

.wk-icon-btn:hover {
  background: var(--wk-bg-elevated);
  color: var(--wk-text-secondary);
}

.wk-icon-btn--reload:hover {
  color: var(--wk-accent);
}

.wk-icon-btn--active {
  background: var(--wk-accent-faint);
  color: var(--wk-accent);
}

.wk-icon-btn--close:hover {
  background: #fef2f2;
  color: #ef4444;
}

/* ── Tab Navigation ── */
.wk-tab-nav {
  display: flex;
  padding: 0 6px;
  border-bottom: 1px solid var(--wk-border);
  height: 42px;
  align-items: flex-end;
  flex-shrink: 0;
  background: var(--wk-bg);
  gap: 2px;
}

.wk-tab-nav__item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--wk-text-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  border-radius: var(--wk-radius-sm) var(--wk-radius-sm) 0 0;
  transition: color var(--wk-transition), background var(--wk-transition), border-color var(--wk-transition);
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.wk-tab-nav__item:hover {
  color: var(--wk-text-secondary);
  background: var(--wk-bg-surface);
}

.wk-tab-nav__item--active {
  color: var(--wk-accent);
  border-bottom-color: var(--wk-accent);
  font-weight: 600;
}

/* ── Content Area ── */
.wk-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--wk-bg-surface);
}

/* ── Settings Panel ── */
.wk-settings {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: var(--wk-bg);
  transition: left var(--wk-transition);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.wk-settings--open {
  left: 0;
}

.wk-settings__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  height: 52px;
  border-bottom: 1px solid var(--wk-border);
  flex-shrink: 0;
}

.wk-settings__title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--wk-text-primary);
}

.wk-settings__body {
  flex: 1;
  padding: 24px 20px;
  overflow-y: auto;
}

.wk-settings__footer {
  padding: 14px 20px;
  border-top: 1px solid var(--wk-border);
  font-size: 11.5px;
  color: var(--wk-text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wk-settings__footer a {
  color: var(--wk-accent);
  text-decoration: none;
}

.wk-settings__footer a:hover {
  text-decoration: underline;
}

.wk-version {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  background: var(--wk-bg-elevated);
  padding: 2px 7px;
  border-radius: 20px;
  color: var(--wk-text-muted);
}

/* ── Form Elements ── */
.wk-field-group {
  margin-bottom: 24px;
}

.wk-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--wk-text-primary);
  margin-bottom: 3px;
}

.wk-hint {
  font-size: 11.5px;
  color: var(--wk-text-muted);
  margin-bottom: 10px;
}

.wk-input-row {
  display: flex;
  gap: 8px;
}

.wk-input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid var(--wk-border);
  border-radius: var(--wk-radius-sm);
  font-size: 13px;
  color: var(--wk-text-primary);
  background: var(--wk-bg);
  transition: border-color var(--wk-transition), box-shadow var(--wk-transition);
  min-width: 0;
}

.wk-input:focus {
  outline: none;
  border-color: var(--wk-accent);
  box-shadow: 0 0 0 3px var(--wk-accent-faint);
}

.wk-btn {
  padding: 7px 14px;
  border: none;
  border-radius: var(--wk-radius-sm);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--wk-transition), transform var(--wk-transition), box-shadow var(--wk-transition);
}

.wk-btn--primary {
  background: var(--wk-accent);
  color: #fff;
}

.wk-btn--primary:hover {
  background: var(--wk-accent-hover);
  box-shadow: 0 2px 8px rgba(135, 90, 123, 0.35);
}

/* ── Floating Action Button ── */
.wk-fab {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  background: var(--wk-accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(135, 90, 123, 0.45);
  transition: background var(--wk-transition), transform var(--wk-transition), box-shadow var(--wk-transition);
}

.wk-fab:hover {
  background: var(--wk-accent-hover);
  transform: scale(1.07);
  box-shadow: 0 4px 16px rgba(135, 90, 123, 0.5);
}
</style>
