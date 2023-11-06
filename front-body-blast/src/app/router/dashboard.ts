import PDiaryVue from 'pages/PDiary.vue';
import PDietVue from 'pages/PDiet.vue';
import PLearningVue from 'pages/PLearning.vue';
import { PProfile } from 'pages/PProfile';
import { PTraining } from 'pages/PTraining';
import { ENUMS } from 'shared/lib/enums';

export const dashboardRoutes = {
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
};
