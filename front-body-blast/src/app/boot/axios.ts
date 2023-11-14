import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';
import { boot } from 'quasar/wrappers';
import { TokenService, useAuthStore } from 'shared/api/auth';
import { localMeService, useMeStore } from 'shared/api/me';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const defaultApiConfig: CreateAxiosDefaults = { timeout: 10000 };
const api = axios.create({ baseURL: '/api/', ...defaultApiConfig });

const MAX_RETRIES = 3;
const RETRIES_COUNTER = ref(0);

//x-auth-token/Authorization header
api.interceptors.request.use((value) => {
  const { accessToken } = TokenService.getTokenPair();
  value.headers.setAuthorization(`Bearer ${accessToken}`);
  return value;
});

//refresh request if 'accessToken' is outdated/lost
api.interceptors.response.use(
  (value) => {
    // if request was succesful -> return value + flush retry counter
    RETRIES_COUNTER.value = 0;
    return value;
  },
  async (error: AxiosError) => {
    // if request fails
    // Take refresh fn
    const { refresh } = useAuthStore();
    // Take 'me' user data
    // TODO: security + personal data issue?
    const me = useMeStore().me.data?.data ?? localMeService.getMe();
    const refreshToken = TokenService.getRefreshToken();

    // If no token or personal data -> return error
    if (!refreshToken || !me) return error;
    // if auth(401, 403) error -> try to refresh access token for N times
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      RETRIES_COUNTER.value < MAX_RETRIES
    ) {
      RETRIES_COUNTER.value++; // for each retry increse counter

      // request to refresh
      const newAccess = await refresh({ refreshToken }, me.id);

      // if successfully refreshed -> flush counter + save new tokens
      if (newAccess.data) {
        RETRIES_COUNTER.value = 0;
        TokenService.setTokens(newAccess.data);
      }
    }
    return error;
  },
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
