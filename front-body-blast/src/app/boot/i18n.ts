import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TPAdminDetailsI18n } from 'pages/PAdminDetailed';
import { TPAdminProfileI18n } from 'pages/PAdminProfile';
import { TTrainingAdditionBlockI18n } from 'widgets/WAdditionCard';
import { TWAdminFooterNavBarI18n } from 'widgets/WAdminFooterNavBar';
import { TFooterNavigationBarI18n } from 'widgets/WFooterNavBar';
import { TWPromptCreationI18n } from 'widgets/WPromptCreation';
import { TAuthFormsI18n } from 'entities/form/i18n';
import { TEAthropometricsItemI18n } from 'entities/profile/EAthropometricsItem';
import { TEProfileHeaderI18n } from 'entities/profile/EProfileHeader';
import { TEProfileCardI18n } from 'entities/profile/EUnitedProfileCard';
import { TTrainingI18n } from 'entities/trainings/ETrainingCard';
import { TGlobalI18n } from 'shared/config/i18n';
import { mergeI18n } from 'shared/lib/i18utils';
import { TSNoResultsScreenI18n } from 'shared/ui/SNoResultsScreen';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
      TPAdminProfileI18n,
      TFooterNavigationBarI18n,
      TPAdminDetailsI18n,
      TWAdminFooterNavBarI18n,
      TGlobalI18n,
      TFooterNavigationBarI18n,
      TTrainingI18n,
      TTrainingAdditionBlockI18n,
      TAuthFormsI18n,
      TEProfileHeaderI18n,
      TEAthropometricsItemI18n,
      TWPromptCreationI18n,
      TEProfileCardI18n,
      TSNoResultsScreenI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
