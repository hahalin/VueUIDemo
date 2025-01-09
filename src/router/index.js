import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      // 基礎元件
      {
        path: 'basic',
        children: [
          {
            path: 'text',
            name: 'basic-text',
            component: () => import('../views/basic/TextView.vue')
          },
          {
            path: 'button',
            name: 'basic-button',
            component: () => import('../views/basic/ButtonView.vue')
          },
          {
            path: 'icon',
            name: 'basic-icon',
            component: () => import('../views/basic/IconView.vue')
          },
          {
            path: 'layout',
            name: 'basic-layout',
            component: () => import('../views/basic/LayoutView.vue')
          }
        ]
      },
      // 表單元件
      {
        path: 'form',
        children: [
          {
            path: 'input',
            name: 'form-input',
            component: () => import('../views/form/InputView.vue')
          },
          {
            path: 'radio',
            name: 'form-radio',
            component: () => import('../views/form/RadioView.vue')
          },
          {
            path: 'checkbox',
            name: 'form-checkbox',
            component: () => import('../views/form/CheckboxView.vue')
          },
          {
            path: 'select',
            name: 'form-select',
            component: () => import('../views/form/SelectView.vue')
          },
          {
            path: 'date-picker',
            name: 'form-date-picker',
            component: () => import('../views/form/DatePickerView.vue')
          },
          {
            path: 'upload',
            name: 'form-upload',
            component: () => import('../views/examples/UploadView.vue')
          }
        ]
      },
      // 資料呈現
      {
        path: 'display',
        children: [
          {
            path: 'table',
            name: 'display-table',
            component: () => import('../views/display/TableView.vue')
          },
          {
            path: 'pagination',
            name: 'display-pagination',
            component: () => import('../views/display/PaginationView.vue')
          },
          {
            path: 'tag',
            name: 'display-tag',
            component: () => import('../views/display/TagView.vue')
          },
          {
            path: 'badge',
            name: 'display-badge',
            component: () => import('../views/display/BadgeView.vue')
          }
        ]
      },
      // 互動元件
      {
        path: 'interaction',
        children: [
          {
            path: 'alert',
            name: 'interaction-alert',
            component: () => import('../views/interaction/AlertView.vue')
          },
          {
            path: 'message',
            name: 'interaction-message',
            component: () => import('../views/interaction/MessageView.vue')
          },
          {
            path: 'dialog',
            name: 'interaction-dialog',
            component: () => import('../views/interaction/DialogView.vue')
          },
          {
            path: 'notification',
            name: 'interaction-notification',
            component: () => import('../views/interaction/NotificationView.vue')
          }
        ]
      },
      // 範例頁面
      {
        path: 'examples',
        children: [
          {
            path: 'list',
            name: 'examples-list',
            component: () => import('../views/examples/ListView.vue')
          },
          {
            path: 'detail',
            name: 'examples-detail',
            component: () => import('../views/examples/DetailView.vue')
          },
          {
            path: 'form',
            name: 'examples-form',
            component: () => import('../views/examples/FormView.vue')
          },
          {
            path: 'search',
            name: 'examples-search',
            component: () => import('../views/examples/SearchView.vue')
          },
          {
            path: 'upload',
            name: 'examples-upload',
            component: () => import('../views/examples/UploadView.vue')
          },
          {
            path: 'export',
            name: 'examples-export',
            component: () => import('../views/examples/ExportView.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router