/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationDto } from 'shared/api/base';
import { Training } from 'shared/api/training';
import { api } from 'shared/config';
import { IPagination, requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Exercise, AdminTraining } from './types';

export const AdminTrainingsService = {
  postTrainings: useServiceAction((data: AdminTraining.Dto) =>
    api.post<AdminTraining.Response>('/admin/workouts', data),
  ),
  getTrainings: useServiceAction((data: PaginationDto) =>
    api.get<Training.Response.Expanded>(
      `/admin/workouts?page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`,
    ),
  ),
  getUserTrainings: useServiceAction((id: number) => api.get<Training.Response.Expanded>(`/admin/workouts/${id}`)),
  patchUserTrainings: useServiceAction((id: number, data: AdminTraining.Dto) =>
    api.patch<AdminTraining.Response>(`/admin/workouts/${id}`, data),
  ),
  deleteUserTrainings: useServiceAction((id: number) =>
    api.delete<AdminTraining.Delete.Response>(`/admin/workouts/${id}`),
  ),
};
