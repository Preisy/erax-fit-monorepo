import { defineStore } from 'pinia';
import { AppPagination } from 'shared/api/base';
import { User } from 'shared/api/user';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { adminProfileService } from './service';
import { AdminPatchUser } from './types';

export const useAdminProfileStore = defineStore('admin-profile-store', () => {
  const clientProfiles = ref(useSingleState<Array<User>>());
  const getUserProfiles = (data: AppPagination.BaseDto) =>
    useSimpleStoreAction({
      stateWrapper: clientProfiles.value,
      serviceAction: adminProfileService.getUsers(data),
    });

  const patchUserResponse = ref(useSingleState<AdminPatchUser.Response>());
  const patchUserProfile = (data: User) =>
    useSimpleStoreAction({
      stateWrapper: patchUserResponse.value,
      serviceAction: adminProfileService.patchUser(data),
    });

  return {
    getUserProfiles,
    clientProfiles,
    patchUserProfile,
    patchUserResponse,
  };
});
