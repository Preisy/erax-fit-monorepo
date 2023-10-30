/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp } from './types';

const signUpApi = axios.create({ baseURL: '/api/register' });
const loginApi = axios.create({ baseURL: '/api/login' });

function requestSimulator<T>(msg: string) {
  return new Promise<Pick<AxiosResponse<T>, 'data'>>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: { message: msg },
        }),
      1000,
    );
  });
}

export const loginService = {
  login: useServiceAction((data: Auth.Dto) => {
    // return loginApi.post<Auth.Response>('/', data);
    return requestSimulator<Auth.Response>('Successfully logged in');
  }),
  forgot: useServiceAction((data) => {
    return loginApi.post('/forgot', data);
  }),
};

export const signUpService = {
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => {
    // return signUpApi.post<SignUp.Response>('/', data);
    return requestSimulator<SignUp.Response>('Successfully registered');
  }),
};
