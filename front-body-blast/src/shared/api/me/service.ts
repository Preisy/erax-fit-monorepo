/* eslint-disable boundaries/element-types */
import { api } from 'app/boot/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Me } from './types';

export const MeService = {
  getMe: useServiceAction(() => api.get<Me.Response>('/me')),
};
