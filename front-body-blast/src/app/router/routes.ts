import { RouteRecordRaw } from 'vue-router';
import LAuthVue from 'processes/layouts/LAuth.vue';
import LDashboardVue from 'processes/layouts/LDashboard.vue';
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
    meta: { auth: true },
    component: LDashboardVue,
    children: [
      {
        path: '',
        meta: { auth: true },
        component: PTraining,
        name: ENUMS.ROUTES_NAMES.TRAINING,
      },
      {
        path: 'profile',
        meta: { auth: true },
        component: PProfile,
        name: ENUMS.ROUTES_NAMES.PROFILE,
      },
      {
        path: 'diary',
        meta: { auth: true },
        component: PDiaryVue,
        name: ENUMS.ROUTES_NAMES.DIARY,
      },
      {
        path: 'diet',
        meta: { auth: true },
        component: PDietVue,
        name: ENUMS.ROUTES_NAMES.DIET,
      },
      {
        path: 'learning',
        meta: { auth: true },
        component: PLearningVue,
        name: ENUMS.ROUTES_NAMES.LEARNING,
      },
    ],
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
        path: '',
        component: PLogin,
        name: ENUMS.ROUTES_NAMES.LOGIN,
        meta: { transition: 'slide-right' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },
];

export default routes;
