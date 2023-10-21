import axios from 'axios';
import { useServiceAction } from 'shared/lib/utils';

const registerApi = axios.create({ baseURL: '/api/register' });

export const register = {
  register: useServiceAction((data) => {
    console.log('register service');
    console.log(data);
    return registerApi.post('/', data);
  }),
  stats: useServiceAction((data) => {
    console.log('stats service');
    console.log(data);
    return registerApi.post('/stats', data);
  }),
  forbiddens: useServiceAction((data) => {
    console.log('forbiddens service');
    console.log(data);
    return registerApi.post('/forbiddens', data);
  }),
  diseases: useServiceAction((data) => {
    console.log('diseases service');
    console.log(data);
    return registerApi.post('/diseases', data);
  }),
  trainingForbiddens: useServiceAction((data) => {
    console.log('trainingForbiddens service');
    console.log(data);
    return registerApi.post('/training-forbiddens', data);
  }),
};
