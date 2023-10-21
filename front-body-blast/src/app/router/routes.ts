import { RouteRecordRaw } from 'vue-router';
import { PLogin } from 'pages/PLogin';
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
    component: () => import('processes/layouts/LLogout.vue'),
    children: [
      {
        path: '/register',
        component: PRegister,
        meta: { transition: 'slide-left' },
      },
      {
        path: '/login',
        component: PLogin,
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: '/login',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
  },
];

export default routes;
