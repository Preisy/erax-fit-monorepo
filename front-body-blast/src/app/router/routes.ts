import { RouteRecordRaw } from 'vue-router';
import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import LAuthVue from 'processes/layouts/LAuth.vue';
import { PAdminDetailed } from 'pages/PAdminDetailed';
import { PAdminProfile } from 'pages/PAdminProfile';
import PDiaryVue from 'pages/PDiary.vue';
import PDietVue from 'pages/PDiet.vue';
import PLearningVue from 'pages/PLearning.vue';
import { PLogin } from 'pages/PLogin';
import { PProfile } from 'pages/PProfile';
import { PRegister } from 'pages/PRegister';
import { PTraining } from 'pages/PTraining';
import { ENUMS } from 'shared/lib/enums';

const routes: RouteRecordRaw[] = [
  {
    path: '/home/',
    name: ENUMS.ROUTES_NAMES.HOME,
    component: () => import('processes/layouts/LDashboard.vue'),
    children: [
      {
        path: 'training',
        component: PTraining,
        name: ENUMS.ROUTES_NAMES.TRAINING,
      },
      {
        path: 'profile',
        component: PProfile,
        name: ENUMS.ROUTES_NAMES.PROFILE,
      },
      {
        path: 'diary',
        component: PDiaryVue,
        name: ENUMS.ROUTES_NAMES.DIARY,
      },
      {
        path: 'diet',
        component: PDietVue,
        name: ENUMS.ROUTES_NAMES.DIET,
      },
      {
        path: 'learning',
        component: PLearningVue,
        name: ENUMS.ROUTES_NAMES.LEARNING,
      },
    ],
  },

  {
    path: '/admin/',
    name: ENUMS.ROUTES_NAMES.ADMIN,
    component: LAdminDashboardVue,
    children: [
      {
        path: '',
        name: ENUMS.ROUTES_NAMES.ADMIN_PROFILE,
        component: PAdminProfile,
      },
      {
        path: 'prompt',
        name: ENUMS.ROUTES_NAMES.ADMIN_PROMPT,
        component: PProfile,
      },
      {
        path: 'learning',
        name: ENUMS.ROUTES_NAMES.ADMIN_LEARNING,
        component: PDiaryVue,
      },
      {
        path: 'detailed/:id',
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
    path: '/',
    component: LAuthVue,
    name: ENUMS.ROUTES_NAMES.AUTH,
    children: [
      {
        path: 'register',
        component: PRegister,
        name: ENUMS.ROUTES_NAMES.REGISTER,
        meta: { transition: 'slide-left' },
      },
      {
        path: 'login',
        component: PLogin,
        name: ENUMS.ROUTES_NAMES.LOGIN,
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
