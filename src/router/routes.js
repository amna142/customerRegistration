const routes = [{
  path: '/',
  component: () =>
    import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    component: () =>
      import('pages/Index.vue')
  }]
},

// Always leave this as last one,
// but you can also remove it
{
  // eslint-disable-next-line indent
        path: '/signup',
  // eslint-disable-next-line indent
        component: () =>
    import('pages/SignUp.vue')
},
// eslint-disable-next-line indent
    {
  path: '/signin',
  component: () =>
    import('pages/SignUp.vue')
},
{
  path: '*',
  component: () =>
    import('pages/Error404.vue')
}
]
export default routes
