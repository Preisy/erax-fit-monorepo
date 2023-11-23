import { z } from 'zod';
import { User } from 'shared/api/user';

// Sign up (Motivations)
export namespace Motivations {
  export interface Dto extends Pick<User, 'loadRestrictions' | 'sportsExp' | 'goals'> {}

  export const validation = () =>
    z.object({
      loadRestrictions: z.string().min(3).max(50),
      sportsExp: z.string().min(3).max(50),
      goals: z.string().min(3).max(50),
    });
}
