import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import { PAdminDetailed } from 'pages/PAdminDetailed';
import { PAdminDetailedBio } from 'pages/PAdminDetailedBio';
import { PAdminProfile } from 'pages/PAdminProfile';
import PDiaryVue from 'pages/PDiary.vue';
import { PProfile } from 'pages/PProfile';
import { ENUMS } from 'shared/lib/enums';

export const adminRoutes = {
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
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED,
          component: PAdminDetailed,
        },
        {
          path: 'bio',
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_BIO,
          component: PAdminDetailedBio,
        },
      ],
    },
  ],
  redirect: '/admin',
};
