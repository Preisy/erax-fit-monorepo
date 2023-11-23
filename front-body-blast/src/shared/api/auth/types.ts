import { z } from 'zod';
import { User } from '../user';

// Authentication
export namespace Auth {
  export interface Dto extends Pick<User, 'email' | 'password'> {}
  export interface Response {
    accessToken: string;
    refreshToken: string;
  }
  export const validation = () =>
    z.object({
      email: z.string().email(),
      password: z.string(),
    });
}

export namespace Refresh {
  //accessToken: string, refreshToken: string, same as auth
  export interface Dto {
    refreshToken: string;
  }
  export interface Response extends Auth.Response {}
}

export namespace SignUp {
  export interface Dto extends User {}

  export interface Response {
    accessToken: string;
    refreshToken: string;
  }
}
