import { defineStore } from 'pinia';
import { useListState } from 'shared/api/utils';

export interface FFormSubmitEvent {
  id: string | number;
  event: Event;
}

export const useFormControl = defineStore('form-control', () => {
  const submitEvents = ref(useListState<FFormSubmitEvent>());

  return { submitEvents };
});
