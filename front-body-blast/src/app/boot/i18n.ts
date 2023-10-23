import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { TEBodyParamsSignUpFormI18n } from 'entities/logout/EBodyParamsSignUpForm';
import { TECredentialsSignUpFormI18n } from 'entities/logout/ECredentialsSignUpForm';
import { TEDiseasesSignUpFormI18n } from 'entities/logout/EDiseasesSignUpForm';
import { TEForbiddensSignUpFormI18n } from 'entities/logout/EForbiddensSignUpForm';
import { TELoginFormI18n } from 'entities/logout/ELoginForm';
import { TEMotivationsSignUpFormI18n } from 'entities/logout/EMotivationsSignUpForm';
import { mergeI18n } from 'shared/lib/i18utils';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'ru-RU',
    legacy: false,
    messages: mergeI18n(
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
