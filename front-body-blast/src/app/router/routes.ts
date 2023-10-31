import { RouteRecordRaw } from 'vue-router';
import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import LAuthVue from 'processes/layouts/LAuth.vue';
import { PAdminDetailed } from 'pages/PAdminDetailed';
import { PAdminProfile } from 'pages/PAdminProfile';
import PDiaryVue from 'pages/PDiary.vue';
import PDietVue from 'pages/PDiet.vue';
import PLearningVue from 'pages/PLearning.vue';
import { PLogin } from 'pages/PLogin';
import PProfileVue from 'pages/PProfile.vue';
import { PRegister } from 'pages/PRegister';
import { PTraining } from 'pages/PTraining';
import { ENUMS } from 'shared/lib/enums';

const routes: RouteRecordRaw[] = [
  {
    path: ENUMS.ROUTES.HOME.BASE,
    name: ENUMS.ROUTES_NAMES.HOME,
    component: () => import('processes/layouts/LDashboard.vue'),
    children: [
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.TRAINING,
        component: PTraining,
        name: ENUMS.ROUTES_NAMES.TRAINING,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.PROFILE,
        component: PProfileVue,
        name: ENUMS.ROUTES_NAMES.PROFILE,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIARY,
        component: PDiaryVue,
        name: ENUMS.ROUTES_NAMES.DIARY,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIET,
        component: PDietVue,
        name: ENUMS.ROUTES_NAMES.DIET,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.LEARNING,
        component: PLearningVue,
        name: ENUMS.ROUTES_NAMES.LEARNING,
      },
    ],
  },

  {
    path: ENUMS.ROUTES.ADMIN.BASE,
    name: ENUMS.ROUTES_NAMES.ADMIN,
    component: LAdminDashboardVue,
    children: [
      {
        path: ENUMS.ROUTES.ADMIN.CHILDREN.PROFILE,
        name: ENUMS.ROUTES_NAMES.ADMIN_PROFILE,
        component: PAdminProfile,
      },
      {
        path: ENUMS.ROUTES.ADMIN.CHILDREN.PROMPT,
        name: ENUMS.ROUTES_NAMES.ADMIN_PROMPT,
        component: () => import('pages/PProfile.vue'),
      },
      {
        path: ENUMS.ROUTES.ADMIN.CHILDREN.LEARNING,
        name: ENUMS.ROUTES_NAMES.ADMIN_LEARNING,
        component: () => import('pages/PDiary.vue'),
      },
      {
        path: ENUMS.ROUTES.ADMIN.CHILDREN.DETAILED,
        children: [
          {
            path: '',
            name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED,
            component: PAdminDetailed,
          },
        ],
      },
    ],
    redirect: '/admin',
  },

  {
    path: ENUMS.ROUTES.AUTH.BASE,
    component: LAuthVue,
    name: ENUMS.ROUTES_NAMES.AUTH,
    children: [
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.REGISTER,
        component: PRegister,
        name: ENUMS.ROUTES_NAMES.REGISTER,
        meta: { transition: 'slide-left' },
      },
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.LOGIN,
        component: PLogin,
        name: ENUMS.ROUTES_NAMES.LOGIN,
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: ENUMS.ROUTES.AUTH.BASE + ENUMS.ROUTES.AUTH.CHILDREN.LOGIN,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: ENUMS.ROUTES.AUTH.BASE,
  },
];

export default routes;
