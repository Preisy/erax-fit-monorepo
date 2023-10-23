import axios from 'axios';
import { useServiceAction } from 'shared/lib/utils';

const signUpApi = axios.create({ baseURL: '/api/register' });

export const signUp = {
  register: useServiceAction((data) => {
    console.log('register service');
    console.log(data);
    return signUpApi.post('/', data);
  }),
  stats: useServiceAction((data) => {
    console.log('stats service');
    console.log(data);
    return signUpApi.post('/stats', data);
  }),
  forbiddens: useServiceAction((data) => {
    console.log('forbiddens service');
    console.log(data);
    return signUpApi.post('/forbiddens', data);
  }),
  diseases: useServiceAction((data) => {
    console.log('diseases service');
    console.log(data);
    return signUpApi.post('/diseases', data);
  }),
  trainingForbiddens: useServiceAction((data) => {
    console.log('trainingForbiddens service');
    console.log(data);
    return signUpApi.post('/training-forbiddens', data);
  }),
};
