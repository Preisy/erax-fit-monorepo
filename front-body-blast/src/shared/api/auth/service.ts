import axios from 'axios';
import { useServiceAction } from 'shared/lib/utils';
import { Auth, SignUp } from './types';

// const signUpApi = axios.create({ baseURL: '/api/auth/signup' });
const authApi = axios.create({ baseURL: '/api/auth' });
// const loginApi = axios.create({ baseURL: '/api/auth/login' });

export const loginService = {
  login: useServiceAction(
    (data: Auth.Dto) => authApi.post<Auth.Response>('/login', data),
    // requestSimulator<Auth.Response>({ message: 'Successfully logged in' }),
  ),
  refresh: useServiceAction((data) => authApi.post('/refresh', data)),
};

export const signUpService = {
  signUp: useServiceAction(
    (data: Partial<SignUp.Dto>) => authApi.post<SignUp.Response>('/signup', data),
    // requestSimulator<SignUp.Response>({ message: 'Successfully registered' }),
  ),
};
