import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home/',
    component: () => import('processes/layouts/LMain.vue'),
    children: [
      {
        path:'training',
        component: ()=>import('pages/PTraining.vue')
      },
      {
        path:'profile',
        component: ()=>import('pages/PProfile.vue')
      },
      {
        path:'diary',
        component: ()=>import('pages/PDiary.vue')
      },
      {
        path:'diet',
        component: ()=>import('pages/PDiet.vue')
      },
      {
        path:'learning',
        component: ()=>import('pages/PLearning.vue')
      },
    ]
  },

  {
    path: '/',
    component: () => import('processes/layouts/LUnauth.vue'),
    children: [
      {
        path:'/register',
        component: ()=>import('pages/PRegister.vue')
      },
      {
        path:'/register',
        component: ()=>import('pages/PRegister.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('processes/layouts/LOther.vue'),
  },
];

export default routes;
