import { defineStore } from 'pinia';
import { AppPagination } from 'shared/api/base';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminGetUsers } from './types';

export const useAdminProfileStore = defineStore('admin-profile-store', () => {
  const clientProfiles = ref(useSingleState<AdminGetUsers.Response>());
  const getUserProfiles = (data: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: clientProfiles.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  return {
    getUserProfiles,
    clientProfiles,
  };
});
