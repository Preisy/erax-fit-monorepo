import { defineStore } from 'pinia';
import { IPagination, useListState, usePaginationStoreAction } from 'shared/lib/utils';
import { profileService } from './service';
import { Profile } from './types';

export const useProfileStore = defineStore('profile-store', () => {
  const anthropometry = ref(useListState<{ profile: Profile.Athropometrics; readonly: boolean }>());
  const getAnthropometry = (pagination: IPagination.Params) =>
    usePaginationStoreAction({
      stateWrapper: anthropometry.value,
      serviceAction: () => profileService.getAnthropometry(pagination),
    });

  return { anthropometry, getAnthropometry };
});
