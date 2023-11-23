import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';
import { Auth } from 'shared/api/auth';

// Sign up (credentials)
export namespace Credentials {
  export interface Dto extends Auth.Dto {}

  export const validation = (t: ComposerTranslation) =>
    Auth.validation()
      .extend({
        username: z
          .string()
          .min(3)
          .max(50)
          .refine((val) => !!val.split(' ')[1], t('auth.signUp.credentials.errors.secondName')),
        password: z
          .string()
          .min(8)
          .regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9a-z]*$/, t('auth.signUp.credentials.errors.strongPassword'))
          .max(30),
        passwordRepeat: z.string().min(6).max(50),
      })
      .superRefine(({ passwordRepeat, password }, ctx) => {
        if (passwordRepeat !== password) {
          ctx.addIssue({
            code: 'custom',
            message: t('auth.signUp.credentials.errors.passwordMismatch'),
            path: ['passwordRepeat'],
          });
        }
      });
}
