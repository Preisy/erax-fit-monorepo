import { defineStore } from 'pinia';
import { useListState } from 'shared/api/utils/state';
import { WTrainingProps } from 'widgets/trainings/WTraining';

export const useTrainingStore = defineStore('training', () => {
  const trainings = useListState<WTrainingProps>();

  const getTrainingsByDate = 

  return { trainings };
});
