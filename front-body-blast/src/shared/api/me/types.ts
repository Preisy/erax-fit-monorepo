import { User } from '../user';

export interface Me extends User {}

export namespace Me {
  export interface Response {
    data: Me;
  }
}
