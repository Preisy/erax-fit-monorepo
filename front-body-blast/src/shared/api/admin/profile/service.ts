import { AppPagination } from 'shared/api/base';
import { User } from 'shared/api/user';
import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { AdminGetUsers, AdminPatchUser } from './types';

export const adminProfileService = {
  getUsers: useServiceAction((data: AppPagination.BaseDto) =>
    api
      .get<AdminGetUsers.Response>(`/admin/users?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`)
      .then((response) => response.data),
  ),
  patchUser: useServiceAction((data: User) => api.patch<AdminPatchUser.Response>(`/admin/users/${data.id}`, data)),
};
