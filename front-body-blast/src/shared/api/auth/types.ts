import { z } from 'zod';

// Authentication
export namespace Auth {
  export interface Dto {
    email: string;
    password: string;
  }
  export interface Response {
    message: string;
  }
  export const validation = () =>
    z.object({
      email: z.string().email(),
      password: z.string().min(6).max(30),
    });
}

// Sign up (credentials)
export namespace SignUp {
  export interface Dto extends Auth.Dto {
    username: string;
    passwordRepeat: string;
  }

  export interface Response {
    message: string;
  }
  export const validation = (errMsg: string) =>
    Auth.validation()
      .extend({
        username: z.string().min(3).max(50),
        passwordRepeat: z.string().min(6).max(50),
      })
      .superRefine(({ passwordRepeat, password }, ctx) => {
        if (passwordRepeat !== password) {
          ctx.addIssue({
            code: 'custom',
            message: errMsg,
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
    teenAgeWeight: string | number;
  }
  export interface Response {
    message: string;
  }
  export const validation = () =>
    z.object({
      age: z.string().max(3),
      weight: z.string().max(3),
      teenAgeWeight: z.string().max(3),
    });
}

// Sign up (Diseases)
export namespace Diseases {
  export interface Response {
    message: string;
  }
  export interface Dto {
    gastrointestinalDiseases: string;
    insulinResistance: string;
    kidneyDisease: string;
    diseasesCVD: string;
    diseasesODA: string;
  }

  export const validation = () =>
    z.object({
      gastrointestinalDiseases: z.string().min(3).max(50),
      insulinResistance: z.string().min(3).max(50),
      kidneyDisease: z.string().min(3).max(50),
      diseasesCVD: z.string().min(3).max(50),
      diseasesODA: z.string().min(3).max(50),
    });
}

// Sign up (Forbiddens)
export namespace Forbiddens {
  export interface Dto {
    diet: string;
    allergic: string;
    intolerance: string;
  }
  export interface Response {
    message: string;
  }
  export const validation = () =>
    z.object({
      diet: z.string().min(3).max(50),
      allergic: z.string().min(3).max(50),
      intolerance: z.string().min(3).max(30),
    });
}

// Sign up (Motivations)
export namespace Motivations {
  export interface Dto {
    loadRestrictions: string;
    sportExperience: string;
    targets: string;
  }
  export interface Response {
    message: string;
  }
  export const validation = () =>
    z.object({
      loadRestrictions: z.string().min(3).max(50),
      sportExperience: z.string().min(3).max(50),
      targets: z.string().min(3).max(50),
    });
}
