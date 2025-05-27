<template>
  <div>
    <h1>Table Fields</h1>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in firstLevelData" :key="key">
          <td>{{ key }}</td>
          <td>{{ formatValue(value) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const data: any = ref({})
const props = defineProps<{
  model: string | null
  id: string | null
}>()

const firstLevelData = computed(() => {
  if (!data.value?.result?.[0]) return {}
  return data.value.result[0]
})

const formatValue = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return JSON.stringify(value)
  if (typeof value === 'object') return JSON.stringify(value)
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
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
}

tr:hover {
  background-color: #f8f8f8;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>
