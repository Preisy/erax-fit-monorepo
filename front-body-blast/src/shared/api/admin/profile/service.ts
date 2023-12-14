import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminGetUsers } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data: AdminGetUsers.Dto) =>
    api.get<AdminGetUsers.Response>(`/admin/users?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`),
  ),
};
