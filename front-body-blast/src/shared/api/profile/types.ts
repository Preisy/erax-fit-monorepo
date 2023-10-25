import { z } from 'zod';

export namespace Athropometrics {
  export const validation = () =>
    z.object({
      weight: z.string().max(5),
      waist: z.string().max(5),
      underbelly: z.string().max(5),
      shoulder: z.string().max(5),
      hip: z.string().max(5),
      hipVolume: z.string().max(5),
    });
}
