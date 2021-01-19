const routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    // eslint-disable-next-line indent
        path: '/',
    name: 'SignUp',
    // eslint-disable-next-line indent
        component: () =>
      import('pages/SignUp.vue'),
    meta: {
      guest: true,
      requiresAuth: false
    }
  },
  // eslint-disable-next-line indent
    {
    path: '/login',
    name: 'login',
    component: () =>
      import('pages/SignIn.vue'),
    meta: {
      guest: true,
      requiresAuth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () =>
        import('pages/Index.vue'),
      meta: {
        requiresAuth: true,
        guest: false
      }
    },
    {
      path: '/employees',
      component: () =>
        import('pages/Employees.vue'),
      meta: {
        requiresAuth: true,
        guest: false
      }
    },
    {
      path: '/docs',
      component: () =>
        import('pages/Docs.vue'),
      meta: {
        requiresAuth: true,
        guest: false
      }
    },
    {
      path: '/attendance',
      component: () =>
        import('pages/Attendance.vue'),
      meta: {
        requiresAuth: true,
        guest: false
      }
    }
    ]
  },
  {
    path: '*',
    component: () =>
      import('pages/Error404.vue')
  }
]
export default routes
