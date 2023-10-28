import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';

const routes: RouteRecordRaw[] = [
  {
    path: ENUMS.ROUTES.HOME.BASE,
    component: () => import('processes/layouts/LDashboard.vue'),
    children: [
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.TRAINING,
        component: () => import('pages/PTraining'),
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.PROFILE,
        component: () => import('pages/PProfile.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIARY,
        component: () => import('pages/PDiary.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIET,
        component: () => import('pages/PDiet.vue'),
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.LEARNING,
        component: () => import('pages/PLearning.vue'),
      },
    ],
  },

  {
    path: ENUMS.ROUTES.AUTH.BASE,
    component: () => import('processes/layouts/LAuth.vue'),
    children: [
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.REGISTER,
        component: () => import('pages/PRegister'),
        meta: { transition: 'slide-left' },
      },
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.LOGIN,
        component: () => import('pages/PLogin'),
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: '/login',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: ENUMS.ROUTES.AUTH.BASE,
  },
];

export default routes;
