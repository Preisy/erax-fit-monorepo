/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPagination, requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Profile } from './types';

export const profileService = {
  getAnthropometry: useServiceAction((params: IPagination.Params) =>
    requestSimulator<IPagination.Res<{ profile: Profile.Athropometrics; readonly: boolean }>>({
      content: new Array(params.size).fill(null).map((_, index) => ({
        profile: {
          hip: params.page ? params.page * params.size + index : index * 10,
          hipVolume: params.page ? params.page * params.size + index : index * 10,
          shoulder: params.page ? params.page * params.size + index : index * 10,
          underbelly: params.page ? params.page * params.size + index : index * 10,
          waist: params.page ? params.page * params.size + index : index * 10,
          weight: params.page ? params.page * params.size + index : index * 10,
        },
        readonly: true,
      })),
      page: params.page ?? 1,
      size: params.size ?? 3,
      totalPages: 100,
    }),
  ),
};
