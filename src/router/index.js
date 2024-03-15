import { createRouter, createWebHistory } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: NavBar,
    children: [
      {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/ArticlesView.vue')
      },
      {
        path: '/comments',
        name: 'comments',
        component: () => import('../views/CommentsView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
