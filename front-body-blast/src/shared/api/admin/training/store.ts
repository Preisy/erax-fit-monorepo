import { defineStore } from 'pinia';
import { Training } from 'shared/api/training';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { AdminTrainingsService } from './service';
import { AdminTraining } from './types';

export const useAdminTrainingStore = defineStore('admin-training-store', () => {
  const setTrainingState = ref(useSingleState<AdminTraining.Response>());
  const sendTraining = (data: AdminTraining.Dto) =>
    useSimpleStoreAction({
      stateWrapper: setTrainingState.value,
      serviceAction: AdminTrainingsService.sendTrainings(data),
    });

  const userTraining = ref(useSingleState<Array<Training.Response>>());
  const getUserTraining = (id: number) =>
    useSimpleStoreAction({
      stateWrapper: userTraining.value,
      serviceAction: AdminTrainingsService.getUserTrainings(id),
    });

  return { setTrainingState, sendTraining, userTraining, getUserTraining };
});
