import { z } from 'zod';
import { User } from 'shared/api/user';

// Sign up (Diseases)
export namespace Diseases {
  export interface Dto
    extends Pick<User, 'gastroDeseases' | 'insulinResistance' | 'kidneyDesease' | 'heartDesease' | 'muscleDesease'> {}

  export const validation = () =>
    z.object({
      gastroDeseases: z.string().min(1),
      insulinResistance: z.coerce.boolean(),
      kidneyDesease: z.string().min(1),
      heartDesease: z.string().min(1),
      muscleDesease: z.string().min(1),
    });
}
