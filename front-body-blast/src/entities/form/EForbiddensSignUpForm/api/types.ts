import { z } from 'zod';
import { User } from 'shared/api/user';

// Sign up (Forbiddens)
export namespace Forbiddens {
  export interface Dto extends Pick<User, 'nutritRestrict' | 'allergy' | 'mealIntolerance'> {}
  export const validation = () =>
    z.object({
      nutritRestrict: z.string().min(1),
      allergy: z.string().min(1),
      mealIntolerance: z.string().min(1),
    });
}
