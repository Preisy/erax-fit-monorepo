import { Moment } from 'moment';

export interface IRes<T = unknown> {
  data: T;
  message: string;
  timestamp: Moment;
}

export namespace IRes {
  export function isRes(val: unknown): val is IRes {
    return !!val && typeof val === 'object' && 'data' in val && 'message' in val && typeof val.message === 'string';
  }
}
