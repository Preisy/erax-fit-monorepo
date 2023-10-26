import { defineStore } from 'pinia';
import { ETrainingCardProps } from 'entities/trainings/ETrainingCard';
import { TrainingsService } from 'shared/api/training';
import { useSimpleStoreAction, useSingleState } from 'shared/api/utils';

export const useTrainingStore = defineStore('training', () => {
  const trainings = ref(useSingleState<Array<ETrainingCardProps>>());

  const getTrainingsByDate = (date?: Date) => {
    return useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: TrainingsService.getTrainingsByDate(date ?? new Date()),
    });
  };

  return { trainings, getTrainingsByDate };
});
