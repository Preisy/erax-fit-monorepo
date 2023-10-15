import { defineStore } from 'pinia';
import { WTrainingProps } from 'widgets/trainings/WTraining';
import { TrainingsService } from 'shared/api/services';
import { useSimpleStoreAction, useSingleState } from 'shared/api/utils';

export const useTrainingStore = defineStore('training', () => {
  const trainings = ref(useSingleState<Array<WTrainingProps>>());

  const getTrainingsByDate = (date?: Date) => {
    return useSimpleStoreAction({
      stateWrapper: trainings.value,
      serviceAction: TrainingsService.getTrainingsByDate(date ?? new Date()),
    });
  };

  return { trainings, getTrainingsByDate };
});
