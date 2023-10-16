import { RouteRecordRaw } from 'vue-router';
import { PRegister } from 'pages/PRegister';
import { PTraining } from 'pages/PTraining';

const routes: RouteRecordRaw[] = [
  {
    path: '/home/',
    component: () => import('processes/layouts/LMain.vue'),
    children: [
      {
        path: 'training',
        component: PTraining,
      },
      {
        path: 'profile',
        component: () => import('pages/PProfile.vue'),
      },
      {
        path: 'diary',
        component: () => import('pages/PDiary.vue'),
      },
      {
        path: 'diet',
        component: () => import('pages/PDiet.vue'),
      },
      {
        path: 'learning',
        component: () => import('pages/PLearning.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('processes/layouts/LUnauth.vue'),
    children: [
      {
        path: '/register',
        component: PRegister,
      },
      {
        path: '/login',
        component: PRegister,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('processes/layouts/LOther.vue'),
  },
];

export default routes;
