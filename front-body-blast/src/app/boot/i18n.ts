import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TFooterNavigationBarI18n } from 'widgets/WFooter';
import { TEBodyParamsSignUpFormI18n } from 'entities/auth/EBodyParamsSignUpForm';
import { TECredentialsSignUpFormI18n } from 'entities/auth/ECredentialsSignUpForm';
import { TEDiseasesSignUpFormI18n } from 'entities/auth/EDiseasesSignUpForm';
import { TEForbiddensSignUpFormI18n } from 'entities/auth/EForbiddensSignUpForm';
import { TELoginFormI18n } from 'entities/auth/ELoginForm';
import { TEMotivationsSignUpFormI18n } from 'entities/auth/EMotivationsSignUpForm';
import { TTrainingAdditionBlockI18n } from 'entities/trainings/EAdditionCard';
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
      TECredentialsSignUpFormI18n,
      TEBodyParamsSignUpFormI18n,
      TEDiseasesSignUpFormI18n,
      TEForbiddensSignUpFormI18n,
      TEMotivationsSignUpFormI18n,
      TELoginFormI18n,
    ),
    fallbackLocale: 'ru-RU',
  });

  // Set i18n instance on app
  app.use(i18n);
});
