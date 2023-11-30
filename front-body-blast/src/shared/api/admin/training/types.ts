import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

export interface Exercise {
  name: string;
  weight: number;
  sets: number;
  repeats: string;
  restTime: number;
  pace: string;
  photoLink: string;
  videoLink: string;
  trainerComment: string;
}

export interface Training {
  name: string;
  date: string; //ISO string date type: 2023-12-31
  comment: string;
  loop: number;
  userId: number;
  exercises: Array<Exercise>;
}

export namespace Exercise {
  export const validation = (t: ComposerTranslation) =>
    z.object({
      type: z.string().min(1, t('todo.error')),
      date: z.string().min(1),
      weight: z.string().min(1),
      sets: z.string().min(1),
      repeats: z.string().min(1),
      restTime: z.string().min(1),
      pace: z.string().min(1),
      trainerComment: z.string().min(1),
    });
}

export namespace AdminTraining {
  export interface Dto extends Training {}

  export interface Response {
    message: string;
  }

  export const validation = (t: ComposerTranslation) =>
    z.object({
      cycle: z.string().min(1, t('todo.error')),
    });

  export namespace Delete {
    export interface Response {
      data: { status: boolean };
    }
  }
}
