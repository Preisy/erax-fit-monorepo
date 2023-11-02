import { z } from 'zod';

export namespace Profile {
  export interface Athropometrics {
    weight: number;
    waist: number;
    underbelly: number;
    shoulder: number;
    hip: number;
    hipVolume: number;
  }

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
