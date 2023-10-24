import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { TokenService } from '../services';
import { loginService, signUpService } from './service';
import { Auth, BodyParams, Diseases, Forbiddens, Motivations, SignUp } from './types';

export const useAuthStore = defineStore('auth-store', () => {
  const isAuth = () => !!TokenService.getAccessToken();

  const loginState = ref(useSingleState<Auth.Response>());
  const login = (data: Auth.Dto) =>
    useSimpleStoreAction({
      stateWrapper: loginState.value,
      serviceAction: loginService.login(data),
    });

  const signUpState = ref(useSingleState<SignUp.Response>());
  const signUp = (data: SignUp.Dto) =>
    useSimpleStoreAction({
      stateWrapper: signUpState.value,
      serviceAction: signUpService.signUp(data),
    });

  const bodyParamsState = ref(useSingleState<BodyParams.Response>());
  const sendBodyParams = (data: BodyParams.Dto) =>
    useSimpleStoreAction({
      stateWrapper: bodyParamsState.value,
      serviceAction: signUpService.bodyParams(data),
    });

  const forbiddensState = ref(useSingleState<Forbiddens.Response>());
  const sendForbiddens = (data: Forbiddens.Dto) =>
    useSimpleStoreAction({
      stateWrapper: forbiddensState.value,
      serviceAction: signUpService.forbiddens(data),
    });

  const motivationsState = ref(useSingleState<Motivations.Response>());
  const sendMotivations = (data: Motivations.Dto) =>
    useSimpleStoreAction({
      stateWrapper: motivationsState.value,
      serviceAction: signUpService.motivations(data),
    });

  const diseasesState = ref(useSingleState<Diseases.Response>());
  const sendDiseases = (data: Diseases.Dto) =>
    useSimpleStoreAction({
      stateWrapper: diseasesState.value,
      serviceAction: signUpService.diseases(data),
    });

  return {
    isAuth,
    login,
    loginState,
    signUp,
    signUpState,
    sendBodyParams,
    sendDiseases,
    sendForbiddens,
    sendMotivations,
    diseasesState,
    motivationsState,
    forbiddensState,
    bodyParamsState,
  };
});
