import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { UserProfiles } from './types';

export const useAdminProfileStore = defineStore('admin-profile-store', () => {
  const clientProfiles = ref(useSingleState<UserProfiles.Response>());
  const getUserProfiles = () =>
    useSimpleStoreAction({
      stateWrapper: clientProfiles.value,
      serviceAction: adminProfileService.getUsers(),
    });

  return {
    getUserProfiles,
    clientProfiles,
  };
});
