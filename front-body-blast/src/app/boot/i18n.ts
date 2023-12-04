import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TPDietI18n } from 'pages/PDiet';
import { TFooterNavigationBarI18n } from 'widgets/WFooterNavBar';
import { TTrainingAdditionBlockI18n } from 'features/trainings/FAdditionCard';

import { TEAthropometricsItemI18n } from 'entities/profile/EAthropometricsItem';
import { TEProfileHeaderI18n } from 'entities/profile/EProfileHeader';
import { TClientFormsI18n } from 'entities/profile/form';
import { TTrainingI18n } from 'entities/trainings/ETrainingCard';
import { mergeI18n } from 'shared/lib/i18utils';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
      TFooterNavigationBarI18n,
      TTrainingI18n,
      TTrainingAdditionBlockI18n,
      TClientFormsI18n,
      TEProfileHeaderI18n,
      TEAthropometricsItemI18n,
      TPDietI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
