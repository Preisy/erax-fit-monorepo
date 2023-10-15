import { RouteRecordRaw } from 'vue-router';
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
    component: () => import('processes/layouts/LMain.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('processes/layouts/LOther.vue'),
  },
];

export default routes;
