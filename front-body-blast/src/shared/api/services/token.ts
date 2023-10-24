import { Cookies } from 'quasar';

const Keys = {
  access: 'access_token',
  refresh: 'refresh_token',
};

export namespace TokenService {
  export const getAccessToken = () => Cookies.get(Keys.access);
  export const getRefreshToken = () => Cookies.get(Keys.refresh);
  export const getTokenPair = () => ({ access: getAccessToken(), refresh: getRefreshToken() });

  export const setAccessToken = (accessToken: string) => Cookies.set(Keys.access, accessToken, { sameSite: 'Strict' });
  export const setRefreshToken = (refreshToken: string) =>
    Cookies.set(Keys.access, refreshToken, { sameSite: 'Strict' });
  export const setTokens = (tokenPair: { accessToken: string; refreshToken: string }) => {
    setAccessToken(tokenPair.accessToken);
    setRefreshToken(tokenPair.refreshToken);
  };
}
