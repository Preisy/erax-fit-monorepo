import { RouteRecordRaw } from 'vue-router';
import { PLogin } from 'pages/PLogin';
import { PRegister } from 'pages/PRegister';
import { PTraining } from 'pages/PTraining';
import { ENUMS } from 'shared/lib/enums';

const routes: RouteRecordRaw[] = [
  {
    path: ENUMS.ROUTES.HOME.base,
    component: () => import('processes/layouts/LDashboard.vue'),
    children: [
      {
        path: ENUMS.ROUTES.HOME.children.TRAINING,
        component: () => PTraining,
      },
      {
        path: ENUMS.ROUTES.HOME.children.PROFILE,
        component: () => import('pages/PProfile.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.children.DIARY,
        component: () => import('pages/PDiary.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.children.DIET,
        component: () => import('pages/PDiet.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.children.LEARNING,
        component: () => import('pages/PLearning.vue'),
      },
    ],
  },

  {
    path: ENUMS.ROUTES.LOGOUT.base,
    component: () => import('processes/layouts/LLogout.vue'),
    children: [
      {
        path: ENUMS.ROUTES.LOGOUT.children.REGISTER,
        component: PRegister,
        meta: { transition: 'slide-left' },
      },
      {
        path: ENUMS.ROUTES.LOGOUT.children.LOGIN,
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
    redirect: ENUMS.ROUTES.LOGOUT.base,
  },
];

export default routes;
