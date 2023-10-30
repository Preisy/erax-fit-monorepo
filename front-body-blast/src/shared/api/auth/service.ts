/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp } from './types';

const signUpApi = axios.create({ baseURL: '/api/register' });
const loginApi = axios.create({ baseURL: '/api/login' });

export const loginService = {
  login: useServiceAction((data: Auth.Dto) =>
    // return loginApi.post<Auth.Response>('/', data);
    requestSimulator<Auth.Response>({ message: 'Successfully logged in' }),
  ),
  forgot: useServiceAction((data) => loginApi.post('/forgot', data)),
};

export const signUpService = {
  signUp: useServiceAction((data: Partial<SignUp.Dto>) =>
    // return signUpApi.post<SignUp.Response>('/', data);
    requestSimulator<SignUp.Response>({ message: 'Successfully registered' }),
  ),
};
