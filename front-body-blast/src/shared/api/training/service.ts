/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Addition, Training } from './types';

const trainingApi = axios.create({ url: '/training' });

export namespace TrainingsService {
  export const getTrainingsByDate = useServiceAction(
    (date: Date) =>
      new Promise<Pick<AxiosResponse, 'data'>>((resolve) => {
        console.log(date);
        setTimeout(() => {
          const trainings: Training.Response[] = [
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
          ];
          const response: Pick<AxiosResponse<Training.Response[]>, 'data'> = {
            data: trainings,
          };
          resolve(response);
        }, 300);
      }),
  );

  export const postAddition = useServiceAction((data: Addition.Dto) =>
    // trainingApi.post<Addition.Response>('/addition', data),
    requestSimulator<Addition.Response>(data),
  );
}
