import axios from 'axios';
import { useServiceAction } from 'shared/api/utils';

const loginApi = axios.create({ baseURL: '/api/login' });

export const login = {
  login: useServiceAction((data) => {
    console.log('login service');
    console.log(data);
    return loginApi.post('/', data);
  }),
  forgot: useServiceAction((data) => {
    console.log('forgot password service');
    console.log(data);
    return loginApi.post('/forgot', data);
  }),
};
