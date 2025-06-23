<template>
  <div class="wk-shell-container">
    <div class="header-container">
      <h1 class="wk-title">Shell Commands</h1>
      <button class="toggle-button" @click="isExpanded = !isExpanded">
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>
    </div>
    <div class="wk-shell-commands" :class="{ 'collapsed': !isExpanded }">
      <div class="wk-command" v-for="(item, index) in shellCommands" :key="index">
        <div class="wk-command-content">
          <div class="wk-command-header">
            <span class="wk-command-description">{{ item.description }}</span>
          </div>
          <pre @click="copyToClipboard(item.command)"><code>{{ item.command }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(true);

const shellCommands = [
  {
    command: '$ odoo-bin shell',
    description: 'Open an Odoo shell'
  },
  {
    command: '$ odoo-update',
    description: 'Update modules in the database'
  },
  {
    command: '$ odoosh-restart',
    description: 'Restart Odoo.sh services'
  },
  {
    command: '$ odoosh-restart cron',
    description: 'Restart Odoo.sh cron services'
  },
  {
    command: '$ odoosh-restart http',
    description: 'Restart Odoo.sh http services'
  },
  {
    command: '$ odoosh-sql-access',
    description: 'Manage PostgreSQL External Access (dedicated hosting only)'
  },
  {
    command: '$ odoosh-storage',
    description: 'Check the storage usage of your instance\'s container filesystem'
  },
  {
    command: '$ psql',
    description: 'Open a database shell'
  },
  {
    command: '$ mutt',
    description: 'Check how mails look on text clients (staging and development instances)'
  },
  {
    command: '$ lnav ~/logs/odoo.log',
    description: 'Navigate in your instance\'s odoo.log file'
  }
];

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
  max-width: 1200px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wk-title {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4a90e2;
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
  display: grid;
  gap: 20px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  max-height: 2000px;
}

.wk-shell-commands.collapsed {
  max-height: 0;
}

.wk-command {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.wk-command:hover {
  transform: translateY(-2px);
}

.wk-command-content {
  padding: 16px;
  width: 100%;
  overflow: hidden;
}

.wk-command-header {
  margin-bottom: 12px;
}

.wk-command-description {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 500;
  display: block;
}

.wk-command pre {
  margin: 0;
  padding: 16px;
  background: #1a2634;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #e6e6e6;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.wk-command pre code {
  display: block;
  width: 100%;
}

.wk-command pre:hover {
  background: #2c3e50;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

@media (min-width: 768px) {
  .wk-shell-commands {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
</style>
