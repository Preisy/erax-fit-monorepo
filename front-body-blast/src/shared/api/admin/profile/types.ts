import { BaseResponse } from 'shared/api/base';
import { User } from 'shared/api/user';

export namespace AdminGetUsers {
  export interface Response {
    data: Array<User>;
    count: number;
  }
}

export namespace AdminPatchUser {
  export interface Response extends BaseResponse<User> {}
}
