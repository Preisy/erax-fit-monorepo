import { defineStore } from 'pinia';
import { Addition, TrainingsService } from 'shared/api/training';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';

export const useLocalAdditionStore = defineStore('local-addition-store', () => {
  const requestState = ref(useSingleState<Addition.Response>());
  const sendRequest = (data: Addition.Dto) =>
    useSimpleStoreAction({
      stateWrapper: requestState.value,
      serviceAction: TrainingsService.postAddition(data),
    });
  return { requestState, sendRequest };
});
