import { AppPagination } from 'shared/api/base';
import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminGetUsers } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data: AppPagination.BaseDto) =>
    api.get<AdminGetUsers.Response>(`/admin/users?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`),
  ),
};
