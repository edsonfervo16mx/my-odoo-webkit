import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelpView from '../views/HelpView.vue'
import SettingsView from '../views/SettingsView.vue'
import DocumentationView from '../views/Documentation.vue'
import ModelManagerView from '../views/ModelManager.vue'
import ViewManagerView from '../views/ViewManager.vue'
import ScriptsView from '../views/Scripts.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: DocumentationView,
    },
    {
      path: '/model-manager',
      name: 'model-manager',
      component: ModelManagerView,
    },
    {
      path: '/view-manager',
      name: 'view-manager',
      component: ViewManagerView,
    },
    {
      path: '/scripts',
      name: 'scripts',
      component: ScriptsView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
    },
  ],
})

export default router
