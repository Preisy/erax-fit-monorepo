import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';
import { User } from 'shared/api/user';

// Sign up (body params)
export namespace BodyParams {
  export interface Dto extends Pick<User, 'age' | 'weight' | 'height' | 'weightInYouth'> {}
  export const validation = (t: ComposerTranslation) =>
    z.object({
      age: z.coerce.number().min(1).max(100),
      weightAndHeight: z.string().superRefine((val, ctx) => {
        const [weight, height] = val.split('/');
        const numWeight = parseFloat(weight);
        const numHeight = parseFloat(height);
        if (numWeight < 20 || numWeight > 600)
          ctx.addIssue({ code: 'custom', message: t('auth.signUp.bodyParams.errors.weight') });
        if (numHeight < 100 || numHeight > 250)
          ctx.addIssue({ code: 'custom', message: t('auth.signUp.bodyParams.errors.height') });
      }),
      weightInYouth: z.coerce.number().min(20).max(600),
    });
}
