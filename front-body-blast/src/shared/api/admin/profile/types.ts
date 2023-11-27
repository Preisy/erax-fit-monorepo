import { PaginationDto } from 'shared/api/base';
import { User } from 'shared/api/user';

export namespace AdminGetUsers {
  export interface Dto extends PaginationDto {}
  export interface Response {
    data: Array<User>;
    count: number;
  }
}
