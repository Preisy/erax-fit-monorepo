import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

// Authentication
export namespace Auth {
  export interface Dto {
    email: string;
    password: string;
  }
  export interface Response {
    accessToken: string;
    refreshToken: string;
  }
  export const validation = () =>
    z.object({
      email: z.string().email(),
      password: z.string(),
    });
}

export namespace SignUp {
  export interface Dto extends Credentials.Dto, BodyParams.Dto, Forbiddens.Dto, Diseases.Dto, Motivations.Dto {}

  export interface Response {
    message: string;
  }
}

// Sign up (credentials)
export namespace Credentials {
  export interface Dto extends Auth.Dto {
    firstName: string;
    lastName: string;
    passwordRepeat: string;
  }

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

// Sign up (body params)
export namespace BodyParams {
  export interface Dto {
    age: string | number;
    weight: string | number;
    height: string | number;
    weightInYouth: string | number;
  }
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

// Sign up (Diseases)
export namespace Diseases {
  export interface Dto {
    gastroDeseases: string;
    insulinResistance: string;
    kidneyDesease: string;
    heartDesease: string;
    muscleDesease: string;
  }

  export const validation = () =>
    z.object({
      gastroDeseases: z.string().min(3).max(50),
      insulinResistance: z.coerce.boolean(),
      kidneyDesease: z.string().min(3).max(50),
      heartDesease: z.string().min(3).max(50),
      muscleDesease: z.string().min(3).max(50),
    });
}

// Sign up (Forbiddens)
export namespace Forbiddens {
  export interface Dto {
    nutritRestrict: string;
    allergy: string;
    mealIntolerance: string;
  }
  export const validation = () =>
    z.object({
      nutritRestrict: z.string().min(3).max(50),
      allergy: z.string().min(3).max(50),
      mealIntolerance: z.string().min(3).max(30),
    });
}

// Sign up (Motivations)
export namespace Motivations {
  export interface Dto {
    loadRestrictions: string;
    sportsExp: string;
    goals: string;
  }

  export const validation = () =>
    z.object({
      loadRestrictions: z.string().min(3).max(50),
      sportsExp: z.string().min(3).max(50),
      goals: z.string().min(3).max(50),
    });
}
