import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

export interface AdminTraining {
  type: string | number; //probably id of prompt
  date: string;
  weight: string;
  sets: string;
  repeats: string;
  restTime: string;
  pace: string;
  commentary: string;
}

export namespace AdminTraining {
  export interface Dto {
    data: Array<AdminTraining>;
  }

  export interface Response {
    message: string;
  }

  export const validation = (t: ComposerTranslation) =>
    z.object({
      type: z.string().min(1, t('todo.error')),
      date: z.string().min(1),
      weight: z.string().min(1),
      sets: z.string().min(1),
      repeats: z.string().min(1),
      restTime: z.string().min(1),
      pace: z.string().min(1),
      commentary: z.string().min(1),
    });
}
