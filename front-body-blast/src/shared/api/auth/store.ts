import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { loginService, signUpService } from './service';
import { TokenService } from './token';
import { Auth, BodyParams, Diseases, Forbiddens, Motivations, Credentials, SignUp, Refresh } from './types';

export const useAuthStore = defineStore('auth-store', () => {
  const isAuth = () => !!TokenService.getAccessToken();
  const signUpRequest = ref<Partial<SignUp.Dto>>({});

  const loginState = ref(useSingleState<Auth.Response>());
  const login = (data: Auth.Dto) =>
    useSimpleStoreAction({
      stateWrapper: loginState.value,
      serviceAction: loginService.login(data),
    });

  const signUpState = ref(useSingleState<SignUp.Response>());
  const signUp = (data?: SignUp.Dto) =>
    useSimpleStoreAction({
      stateWrapper: signUpState.value,
      serviceAction: signUpService.signUp(data ?? signUpRequest.value),
    });

  const refreshState = ref(useSingleState<Refresh.Response>());
  const refresh = (data: Refresh.Dto) =>
    useSimpleStoreAction({
      stateWrapper: refreshState.value,
      serviceAction: loginService.refresh(data),
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
