/* eslint-disable boundaries/element-types */
import { api } from 'app/boot/axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Addition, Training } from './types';

export namespace TrainingsService {
  function getTrainings<T extends Training.Response.Base>(data: Training.Dto) {
    return api.get<T>('/workouts', { params: data });
  }

  export const getBaseTrainings = useServiceAction((data: Omit<Training.Dto, 'expanded'>) =>
    getTrainings<Training.Response.Base>({ ...data, expanded: false }),
  );

  export const getExpandedTrainings = useServiceAction((data: Omit<Training.Dto, 'expanded'>) =>
    getTrainings<Training.Response.Expanded>({ ...data, expanded: true }),
  );

  export const postAddition = useServiceAction((data: Addition.Dto) =>
    // trainingApi.post<Addition.Response>('/addition', data),
    requestSimulator<Addition.Response>(data),
  );
}
