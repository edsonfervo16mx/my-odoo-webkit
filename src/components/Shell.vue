<template>
  <div class="wk-shell-container">
    <div class="header-container">
      <h1>Shell Commands</h1>
      <button class="toggle-button" @click="isExpanded = !isExpanded">
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>
    </div>
    <div class="wk-shell-commands" :class="{ 'collapsed': !isExpanded }">
      <div class="wk-command">
        <pre @click="copyToClipboard('odoo-bin shell')"><code>$ odoo-bin shell</code></pre>
        <span>Open an Odoo shell</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('odoo-update')"><code>$ odoo-update</code></pre>
        <span>Update modules in the database</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('odoosh-restart')"><code>$ odoosh-restart</code></pre>
        <span>Restart Odoo.sh services</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('odoosh-sql-access')"><code>$ odoosh-sql-access</code></pre>
        <span>Manage PostgreSQL External Access (dedicated hosting only)</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('odoosh-storage')"><code>$ odoosh-storage</code></pre>
        <span>Check the storage usage of your instance's container filesystem</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('psql')"><code>$ psql</code></pre>
        <span>Open a database shell</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('mutt')"><code>$ mutt</code></pre>
        <span>Check how mails look on text clients (staging and development instances)</span>
      </div>
      <div class="wk-command">
        <pre @click="copyToClipboard('lnav ~/logs/odoo.log')"><code>$ lnav ~/logs/odoo.log</code></pre>
        <span>Navigate in your instance's odoo.log file</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(true);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // alert('Command copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // alert('Failed to copy text to clipboard');
  }
};
</script>

<style scoped>
.wk-shell-container {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-container h1 {
  color: #2c3e50;
  font-size: 24px;
  margin: 0;
}

.toggle-button {
  padding: 8px 16px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-button:hover {
  background: #3c4e60;
}

.wk-shell-commands {
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  max-height: 2000px;
}

.wk-shell-commands.collapsed {
  max-height: 0;
}

.wk-command {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.wk-command pre {
  margin: 0;
  padding: 8px 12px;
  background: #2c3e50;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.wk-command pre:hover {
  background: #3c4e60;
}

.wk-command code {
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.wk-command span {
  color: #666;
  font-size: 14px;
  flex: 1;
}
</style>
