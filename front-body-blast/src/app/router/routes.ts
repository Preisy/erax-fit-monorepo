import { RouteRecordRaw } from 'vue-router';
import LAuthVue from 'processes/layouts/LAuth.vue';
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
    component: () => import('processes/layouts/LDashboard.vue'),
    children: [
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.TRAINING,
        component: PTraining,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.PROFILE,
        component: PProfileVue,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIARY,
        component: PDiaryVue,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.DIET,
        component: PDietVue,
      },
      {
        path: ENUMS.ROUTES.HOME.CHILDREN.LEARNING,
        component: PLearningVue,
      },
    ],
  },

  {
    path: ENUMS.ROUTES.AUTH.BASE,
    component: LAuthVue,
    children: [
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.REGISTER,
        component: PRegister,
        meta: { transition: 'slide-left' },
      },
      {
        path: ENUMS.ROUTES.AUTH.CHILDREN.LOGIN,
        component: PLogin,
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
