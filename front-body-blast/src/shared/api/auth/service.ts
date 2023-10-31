/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { useServiceAction } from 'shared/lib/utils';
import { Forbiddens, SignUp, Diseases, Motivations, BodyParams, Auth } from './types';

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
  login: useServiceAction((data: Auth.Dto) =>
    // return loginApi.post<Auth.Response>('/', data);
    requestSimulator<Auth.Response>('Successfully logged in'),
  ),
  forgot: useServiceAction((data) => loginApi.post('/forgot', data)),
};

export const signUpService = {
  signUp: useServiceAction((data: SignUp.Dto) =>
    // return signUpApi.post<SignUp.Response>('/', data);
    requestSimulator<SignUp.Response>('Successfully registered'),
  ),
  bodyParams: useServiceAction((data: BodyParams.Dto) =>
    // return signUpApi.post<BodyParams.Response>('/stats', data);
    requestSimulator<BodyParams.Response>('Body params was saved'),
  ),
  forbiddens: useServiceAction((data: Forbiddens.Dto) =>
    // return signUpApi.post<Forbiddens.Response>('/forbiddens', data);
    requestSimulator<Forbiddens.Response>('Forbiddens was saved'),
  ),
  diseases: useServiceAction((data: Diseases.Dto) =>
    // return signUpApi.post<Diseases.Response>('/diseases', data);
    requestSimulator<Diseases.Response>('Diseases was saved'),
  ),
  motivations: useServiceAction((data: Motivations.Dto) =>
    // return signUpApi.post<Motivations.Response>('/training-forbiddens', data);
    requestSimulator<Motivations.Response>('Motivations was saved'),
  ),
};
