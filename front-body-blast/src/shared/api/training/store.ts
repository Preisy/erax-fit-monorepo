import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { TrainingsService } from './service';
import { Addition, Training } from './types';

export const useTrainingStore = defineStore('training-store', () => {
  const trainings = ref(useSingleState<Array<Training.Response>>());
  const getTrainingsByDate = (date?: Date) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: TrainingsService.getTrainingsByDate(date ?? new Date()),
    });

  const additionRequestState = ref(useSingleState<Addition.Response>());
  const sendAddition = (data: Addition.Dto) =>
    useSimpleStoreAction({
      stateWrapper: additionRequestState.value,
      serviceAction: TrainingsService.postAddition(data),
    });

  return { trainings, getTrainingsByDate, additionRequestState, sendAddition };
});
