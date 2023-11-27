import { RouteRecordRaw } from 'vue-router';
import LAuthVue from 'processes/layouts/LAuth.vue';
import { PLogin } from 'pages/PLogin';
import { PRegister } from 'pages/PRegister';
import { ENUMS } from 'shared/lib/enums';
import { adminRoutes } from './admin';
import { dashboardRoutes } from './dashboard';

const routes: RouteRecordRaw[] = [
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

  adminRoutes,
  dashboardRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },
];

export default routes;
