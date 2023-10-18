import { defineStore } from 'pinia';

const q = useQuasar();
const cookies = q.cookies;

const Keys = {
  access: 'access_token',
  refresh: 'refresh_token',
};

export const useAuthStore = defineStore('auth-store', () => {
  const getAccessToken = () => cookies.get(Keys.access);
  const getRefreshToken = () => cookies.get(Keys.refresh);
  const getTokenPair = () => ({ access: getAccessToken(), refresh: getRefreshToken() });

  const setAccessToken = (accessToken: string) => cookies.set(Keys.access, accessToken, { sameSite: 'Strict' });
  const setRefreshToken = (refreshToken: string) => cookies.set(Keys.access, refreshToken, { sameSite: 'Strict' });
  const setTokens = (tokenPair: { accessToken: string; refreshToken: string }) => {
    setAccessToken(tokenPair.accessToken);
    setRefreshToken(tokenPair.refreshToken);
  };

  return { getAccessToken, getRefreshToken, getTokenPair, setAccessToken, setTokens };
});
