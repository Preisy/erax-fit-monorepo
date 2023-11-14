import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { useMeStore } from '../me';
import { loginService, signUpService } from './service';
import { TokenService } from './token';
import { Auth, BodyParams, Diseases, Forbiddens, Motivations, Credentials, SignUp, Refresh } from './types';

export const useAuthStore = defineStore('auth-store', () => {
  const isAuth = () => !!TokenService.getAccessToken();
  const signUpRequest = ref<Partial<SignUp.Dto>>({});

  const loginState = ref(useSingleState<Auth.Response>());
  const login = async (data: Auth.Dto) => {
    await useSimpleStoreAction({
      stateWrapper: loginState.value,
      serviceAction: loginService.login(data),
    });

    if (!loginState.value.state.isSuccess()) return;
    await useMeStore().getMe();
  };

  const signUpState = ref(useSingleState<SignUp.Response>());
  const signUp = (data?: SignUp.Dto) =>
    useSimpleStoreAction({
      stateWrapper: signUpState.value,
      serviceAction: signUpService.signUp(data ?? signUpRequest.value),
    });

  const refreshState = ref(useSingleState<Refresh.Response>());
  const refresh = (data: Refresh.Dto, id: string | number) =>
    useSimpleStoreAction({
      stateWrapper: refreshState.value,
      serviceAction: loginService.refresh(data, id),
    });

  const applyCredentials = (data: Credentials.Dto) => assign(signUpRequest.value, data);
  const applyBodyParams = (data: BodyParams.Dto) => assign(signUpRequest.value, data);
  const applyForbiddens = (data: Forbiddens.Dto) => assign(signUpRequest.value, data);
  const applyMotivations = (data: Motivations.Dto) => assign(signUpRequest.value, data);
  const applyDiseases = (data: Diseases.Dto) => assign(signUpRequest.value, data);

  return {
    isAuth,
    login,
    loginState,
    refresh,
    refreshState,
    signUp,
    signUpState,
    applyCredentials,
    applyBodyParams,
    applyDiseases,
    applyForbiddens,
    applyMotivations,
    signUpRequest,
  };
});
