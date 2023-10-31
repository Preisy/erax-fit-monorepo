import { Cookies } from 'quasar';

const Keys = {
  access: 'access_token',
  refresh: 'refresh_token',
};

export const TokenService = {
  getAccessToken: () => Cookies.get(Keys.access),
  getRefreshToken: () => Cookies.get(Keys.refresh),
  getTokenPair: () => ({ access: TokenService.getAccessToken(), refresh: TokenService.getRefreshToken() }),
  setAccessToken: (accessToken: string) => Cookies.set(Keys.access, accessToken, { sameSite: 'Strict' }),
  setRefreshToken: (refreshToken: string) => Cookies.set(Keys.access, refreshToken, { sameSite: 'Strict' }),
  setTokens: (tokenPair: { accessToken: string; refreshToken: string }) => {
    TokenService.setAccessToken(tokenPair.accessToken);
    TokenService.setRefreshToken(tokenPair.refreshToken);
  },
};
