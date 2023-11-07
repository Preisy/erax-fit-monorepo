import axios from 'axios';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp } from './types';

const authApi = axios.create({ baseURL: '/api/auth', timeout: 10000 });

export const loginService = {
  login: useServiceAction((data: Auth.Dto) => authApi.post<Auth.Response>('/login', data)),
  refresh: useServiceAction((data) => authApi.post('/refresh', data)),
};

export const signUpService = {
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => authApi.post<SignUp.Response>('/signup', data)),
};
