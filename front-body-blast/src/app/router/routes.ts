import { RouteRecordRaw } from 'vue-router';
import LAuthVue from 'processes/layouts/LAuth.vue';
import PDiaryVue from 'pages/PDiary.vue';
import PDietVue from 'pages/PDiet.vue';
import PLearningVue from 'pages/PLearning.vue';
import { PLogin } from 'pages/PLogin';
import { PProfile } from 'pages/PProfile';
import { PRegister } from 'pages/PRegister';
import { PTraining } from 'pages/PTraining';
import { TokenService } from 'shared/api/auth';
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
    redirect: () => {
      const token = TokenService.getAccessToken();
      console.log(token);
      return TokenService.getAccessToken() ? { name: ENUMS.ROUTES_NAMES.TRAINING } : { name: ENUMS.ROUTES_NAMES.LOGIN };
    },
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
    redirect: () => (TokenService.getAccessToken() ? '/home/training' : '/login'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
  },
];

export default routes;
