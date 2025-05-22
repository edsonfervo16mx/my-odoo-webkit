// Create container for Vue app
const container = document.createElement('div');
container.id = 'vue-odoo-extension';
document.body.appendChild(container);

// Add styles to prevent conflicts with Odoo
const style = document.createElement('style');
style.textContent = `
  #vue-odoo-extension {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    height: 100vh;
    pointer-events: none;
  }
  #vue-odoo-extension * {
    pointer-events: auto;
  }
  .wk-odoo-sidebar {
    height: 100vh;
    background: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;
document.head.appendChild(style);

// Create mount point for Vue app
const mountPoint = document.createElement('div');
mountPoint.id = 'app';
container.appendChild(mountPoint);

// Inject Vue app script
const script = document.createElement('script');
script.src = chrome.runtime.getURL('assets/main.js');
script.type = 'module';
document.body.appendChild(script);

// Add CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('assets/main.css');
document.head.appendChild(link);
