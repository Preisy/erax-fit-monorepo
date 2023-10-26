import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { TrainingsService } from './service';
import { Training } from './types';

export const useTrainingStore = defineStore('training-store', () => {
  const trainings = ref(useSingleState<Array<Training.Response>>());
  const getTrainingsByDate = (date?: Date) =>
    useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: TrainingsService.getTrainingsByDate(date ?? new Date()),
    });

  return { trainings, getTrainingsByDate };
});
