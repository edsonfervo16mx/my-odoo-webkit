<template>
  <div class="wk-tab-pane">
    <div class="wk-misc-content">
      <h3>Fields Information</h3>
      <div class="wk-search-container">
        <input 
          type="text"
          v-model="searchQuery"
          placeholder="Search fields..."
          class="wk-search-input"
        />
      </div>
      <div class="wk-cards-container">
        <div v-for="(field, key) in filteredFields" :key="key" class="wk-card">
          <div class="wk-card-header">
            <h4>{{ key }}</h4>
          </div>
          <div class="wk-card-content">
            <div class="wk-field-row">
              <span class="wk-field-label">String:</span>
              <span class="wk-field-value">{{ field.string }}</span>
            </div>
            <div class="wk-field-row">
              <span class="wk-field-label">Type:</span>
              <span class="wk-field-value">{{ field.type }}</span>
            </div>
            <div class="wk-field-row" v-if="field.relation">
              <span class="wk-field-label">Relation:</span>
              <span class="wk-field-value">{{ field.relation }}</span>
            </div>
            <div class="wk-field-row">
              <span class="wk-field-label">Required:</span>
              <span class="wk-field-value">{{ field.required }}</span>
            </div>
            <div class="wk-field-row">
              <span class="wk-field-label">Readonly:</span>
              <span class="wk-field-value">{{ field.readonly }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const props = defineProps<{
  model: string | null
  id: string | null
  action: string | null
  viewType: string | null
  menuId: string | null
}>()

const data: any = ref({})
const searchQuery = ref('')

const filteredFields = computed(() => {
  if (!data.value?.result) return {}
  if (!searchQuery.value) return data.value.result

  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any> = {}
  
  Object.entries(data.value.result).forEach(([key, value]) => {
    if (key.toLowerCase().includes(query)) {
      result[key] = value
    }
  })

  return result
})

const getSessionId = (): string => {
  const cookies = document.cookie.split(';')
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='))
  return sessionCookie ? sessionCookie.split('=')[1].trim() : ''
}

const get_fields = async () => {
  const url = `http://localhost:8069/web/dataset/call_kw/${props.model}/fields_get`
  const sessionId = getSessionId()
  
  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${sessionId}`
    },
    credentials: 'include',
    body: JSON.stringify({
      id: 4,
      jsonrpc: "2.0", 
      method: "call",
      params: {
        model: props.model,
        method: "fields_get",
        args: [],
        kwargs: {}
      }
    })
  })
  data.value = await payload.json()
}

onMounted(async () => {
  await get_fields()
})
</script>

<style scoped>
.wk-misc-content {
  padding: 20px;
}

.wk-search-container {
  margin-bottom: 20px;
}

.wk-search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.wk-search-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

.wk-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.wk-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.wk-card-header {
  background: #f5f5f5;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.wk-card-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.1em;
}

.wk-card-content {
  padding: 16px;
}

.wk-field-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9em;
}

.wk-field-label {
  color: #666;
  font-weight: 500;
}

.wk-field-value {
  color: #333;
}
</style>