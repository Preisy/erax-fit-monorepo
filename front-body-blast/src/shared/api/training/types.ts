import { z } from 'zod';

export namespace Training {
  export interface Response {
    name: string;
    commentary: string;
    animUrl: string;
    info: {
      weight: string;
      sets: string;
      repeats: string;
      rest: string;
      temp: string;
    };
  }
}

export namespace Addition {
  export interface Dto {
    message: string;
  }

  export interface Response {
    message: string;
  }

  export const validation = () =>
    z.object({
      message: z.string().min(3).max(50),
    });
}
