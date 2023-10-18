import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../modules/login/pages/LoginPage.vue')
  },
  {
    path: '/main',
    component: () => import('../modules/Home/pages/TablePage.vue'),
    meta: { requiresAuth: true },
    alias: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
