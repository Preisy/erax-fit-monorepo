import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import { PAdminDetailed } from 'pages/PAdminDetailed';
import { PAdminDetailedBio } from 'pages/PAdminDetailedBio';
import { PAdminDetailedTrainings } from 'pages/PAdminDetailedTrainings';
import { PAdminProfile } from 'pages/PAdminProfile';
import { PAdminPrompt } from 'pages/PAdminPrompt';
import PDiaryVue from 'pages/PDiary.vue';
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
      component: PAdminPrompt,
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
        {
          path: 'trainings',
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_TRAININGS,
          component: PAdminDetailedTrainings,
        },
      ],
    },
  ],
  redirect: '/admin',
};
