# 🧩 my-odoo-webkit

A Chrome extension built with Vue 3 and Vite that adds a developer sidebar to local Odoo instances (`http://localhost:8069`).  
Designed to boost productivity for Odoo developers by providing quick access to tools, links, and custom features.

---

## ⚙️ Project Setup

Install dependencies:

```sh
npm install
```

### 🔥 Compile and Hot-Reload for Development

```sh
npm run dev
```

### 🏗️ Type-Check, Compile and Minify for Production

```sh
npm run build
```

---

## 🚀 Load the Extension in Chrome

Once the extension is built, you can load it into Chrome for testing:

1. Run the build:

   ```sh
   npm run build
   ```

2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** (toggle at the top right).

4. Click **“Load unpacked”**.

5. Select the root directory of this project (where `manifest.json` is located).

6. Open `http://localhost:8069` in a new tab (your local Odoo instance).

7. You should see the Vue sidebar injected into the Odoo interface.

> ✅ Make sure your Odoo server is running and that you are logged in to avoid session issues.

---

## 🧠 Stack

- Vue 3 + Vite
- Chrome Extension (Manifest V3)
- Content Script Injection
- Designed for Odoo Developers

---

## 📄 License

MIT
