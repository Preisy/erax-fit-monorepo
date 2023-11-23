import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp, Refresh } from './types';

export const loginService = {
  login: useServiceAction((data: Auth.Dto) => api.post<Auth.Response>('/auth/login', data)),
  refresh: useServiceAction((data: Refresh.Dto) => api.post<Refresh.Response>(`/auth/refresh`, data)),
};

export const signUpService = {
  signUp: useServiceAction((data: Partial<SignUp.Dto>) => api.post<SignUp.Response>('/auth/signup', data)),
};
