/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { useServiceAction } from 'shared/lib/utils';
import { UserProfiles } from './types';

const adminProfileApi = axios.create({ baseURL: '/api/admin/' });

function requestSimulator<R>(msg: string) {
  return new Promise<Pick<AxiosResponse<R>, 'data'>>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: { message: msg },
        }),
      1000,
    );
  });
}

function requestSimulatorObj<R>(response: R) {
  return new Promise<Pick<AxiosResponse<R>, 'data'>>((resolve) => {
    setTimeout(() => resolve({ data: response }), 1000);
  });
}

export const adminProfileService = {
  getUsers: useServiceAction(() =>
    // return loginApi.post<Auth.Response>('/', data);
    requestSimulatorObj<UserProfiles.Response>({
      data: [
        {
          id: 0,
          name: 'Дмитрий Прейс',
        },
        {
          id: 1,
          name: 'Иван Красавцев',
        },
        {
          id: 2,
          name: 'Алексей Лихачев',
        },
        {
          id: 3,
          name: 'Алексей Лихачев2',
        },
        {
          id: 4,
          name: 'Алексей Лихачев3',
        },
        {
          id: 5,
          name: 'Алексей Лихачев4',
        },
      ],
    }),
  ),
};
