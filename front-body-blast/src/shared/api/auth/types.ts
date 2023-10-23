import { z } from 'zod';

// Authentication
export interface AuthDto {
  email: string;
  password: string;
}

namespace AuthDto {
  export const validationSchema = () =>
    z.object({
      email: z.string().min(3).max(50),
      password: z.string().min(6).max(30),
    });
}

// Sign up (credentials)
export interface SignUpDto extends AuthDto {
  username: string;
  passwordRepeat: string;
}

export namespace SignUpDto {
  export const validationSchema = () =>
    AuthDto.validationSchema().extend({
      username: z.string().min(3).max(50),
      passwordRepeat: z.string().min(6).max(50),
    });

  export const validationSchemaRefined = (errMsg: string) =>
    validationSchema().superRefine(({ passwordRepeat, password }, ctx) => {
      if (passwordRepeat !== password) {
        ctx.addIssue({
          code: 'custom',
          message: errMsg,
        });
      }
    });
}

// Sign up (body params)
export interface BodyParamsDto {
  age: string | number;
  weight: string | number;
  teenAgeWeight: string | number;
}

export namespace BodyParamsDto {
  export const validation = () =>
    z.object({
      age: z.string().max(3),
      weight: z.string().max(3),
      teen_age_weight: z.string().max(3),
    });
}

// Sign up (Diseases)
export interface DiseasesDto {
  gastrointestinalDiseases: string;
  insulinResistance: string;
  kidneyDisease: string;
  diseasesCVD: string;
  diseasesODA: string;
}

export namespace DiseasesDto {
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
export interface ForbiddensDto {
  diet: string;
  allergic: string;
  intolerance: string;
}

export namespace ForbiddensDto {
  export const validation = () =>
    z.object({
      diet: z.string().min(3).max(50),
      allergic: z.string().min(3).max(50),
      intolerance: z.string().min(3).max(30),
    });
}

// Sign up (Motivations)
export interface MotivationsDto {
  loadRestrictions: string;
  sportExperience: string;
  targets: string;
}

export namespace MotivationsDto {
  export const validation = () =>
    z.object({
      loadRestrictions: z.string().min(3).max(50),
      sportExperience: z.string().min(3).max(50),
      targets: z.string().min(3).max(50),
    });
}