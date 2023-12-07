import { User } from 'shared/api/user';

export namespace AdminGetUsers {
  export interface Response {
    data: Array<User>;
    count: number;
  }
}
