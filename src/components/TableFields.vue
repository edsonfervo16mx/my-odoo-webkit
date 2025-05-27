<template>
  <div>
    <h1>Table Fields</h1>
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Search by field or value..."
        class="search-input"
      />
    </div>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in filteredData" :key="key">
            <td>{{ key }}</td>
            <td>
                <pre>{{ formatValue(value) }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const data: any = ref({})
const searchQuery = ref('')
const props = defineProps<{
  model: string | null
  id: string | null
}>()

const firstLevelData = computed(() => {
  if (!data.value?.result?.[0]) return {}
  return data.value.result[0]
})

const filteredData = computed(() => {
  if (!searchQuery.value) return firstLevelData.value
  
  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any> = {}
  
  Object.entries(firstLevelData.value).forEach(([key, value]) => {
    const formattedValue = formatValue(value).toLowerCase()
    if (
      key.toLowerCase().includes(query) || 
      formattedValue.includes(query)
    ) {
      result[key] = value
    }
  })
  
  return result
})

const formatValue = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return JSON.stringify(value, null, 2)
  if (typeof value === 'object') return JSON.stringify(value, null, 2) 
  return String(value)
}

const getSessionId = (): string => {
  const cookies = document.cookie.split(';')
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='))
  return sessionCookie ? sessionCookie.split('=')[1].trim() : ''
}

const web_read = async () => {
  const url = `http://localhost:8069/web/dataset/call_kw/${props.model}/read`
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
        method: "read",
        args: [[parseInt(props.id!)]],
        kwargs: {}
      }
    })
  })
  data.value = await payload.json()
}

onMounted(async () => {
  await web_read()
})
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  min-width: 500px; /* Ensures table doesn't get too squeezed */
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; /* Prevents cells from getting too wide */
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
}

tr:hover {
  background-color: #f8f8f8;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

@media screen and (max-width: 600px) {
  table {
    min-width: 100%;
  }
  
  th, td {
    padding: 8px 10px;
  }
}
</style>
