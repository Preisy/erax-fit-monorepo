/* eslint-disable @typescript-eslint/no-unused-vars */
import { Training } from 'shared/api/training';
import { IPagination, requestSimulator, useServiceAction } from 'shared/lib/utils';
import { AdminTraining } from './types';

export const AdminTrainingsService = {
  sendTrainings: useServiceAction((data: AdminTraining.Dto) =>
    // return api.post<AdminTraining.Response>('/admin/workouts', data);
    requestSimulator<AdminTraining.Response>({ message: 'Successfully created training' }),
  ),
  getUserTrainings: useServiceAction((id: number) =>
    // return api.get<Training.Response>(`/admin/workouts/${id}`);
    requestSimulator<Array<Training.Response>>([
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '10+10',
          rest: '120',
          sets: '3',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Брусья',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '15+15',
          rest: '90',
          sets: '2',
          temp: '2-0-2',
          weight: '10',
        },
        name: 'Отжимания',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '20+20',
          rest: '240',
          sets: '4',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Приседания',
      },
    ]),
  ),
  getAllUserTrainings: useServiceAction((data: IPagination.Base & { expanded: boolean }) =>
    // return api.post<AdminTraining.Response>('/admin/workouts', data);
    requestSimulator<Array<Training.Response>>([
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '10+10',
          rest: '120',
          sets: '3',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Брусья',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '15+15',
          rest: '90',
          sets: '2',
          temp: '2-0-2',
          weight: '10',
        },
        name: 'Отжимания',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '20+20',
          rest: '240',
          sets: '4',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Приседания',
      },
    ]),
  ),
  patchUserTrainings: useServiceAction((id: number, data: AdminTraining.Dto) =>
    // return api.get<Training.Response>(`/admin/workouts/${id}`);
    requestSimulator<Array<Training.Response>>([
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '20+10',
          rest: '1220',
          sets: '3',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Брусья',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '15+15',
          rest: '90',
          sets: '2',
          temp: '2-0-2',
          weight: '10',
        },
        name: 'Отжимания',
      },
      {
        animUrl: 'https://loremflickr.com/640/360',
        commentary: 'Комментарий от тренера',
        info: {
          repeats: '20+20',
          rest: '240',
          sets: '4',
          temp: '2-0-2',
          weight: '20',
        },
        name: 'Приседания',
      },
    ]),
  ),
  deleteUserTrainings: useServiceAction((id: number) =>
    // return api.get<Training.Response>(`/admin/workouts/${id}`);
    requestSimulator<AdminTraining.Delete.Response>({ data: { status: true } }),
  ),
};
