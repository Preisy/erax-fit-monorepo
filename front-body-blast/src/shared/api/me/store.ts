import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { localMeService } from './local';
import { MeService } from './service';
import { Me } from './types';

export const useMeStore = defineStore('me-store', () => {
  const me = ref(useSingleState<Me.Response>());
  const getMe = async () => {
    await useSimpleStoreAction({
      stateWrapper: me.value,
      serviceAction: MeService.getMe(),
    });

    if (!me.value.state.isSuccess() || !me.value.data) return;

    localMeService.setMe(me.value.data.data);
  };

  return { me, getMe };
});
