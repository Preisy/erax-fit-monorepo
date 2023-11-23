/* eslint-disable boundaries/element-types */
import { api } from 'app/boot/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp, Refresh } from './types';

// const authApi = axios.create({ baseURL: '/api/auth', timeout: 10000 });

export const loginService = {
  login: useServiceAction((data: Auth.Dto) => api.post<Auth.Response>('/auth/login', data)),
  refresh: useServiceAction((data: Refresh.Dto) => api.post<Refresh.Response>(`/auth/refresh`, data)),
};

export const signUpService = {
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => api.post<SignUp.Response>('/signup', data)),
};
