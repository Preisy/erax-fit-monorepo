import { Me } from './types';

const key = 'meData';
export const localMeService = {
  getMe: () => {
    const localMe = localStorage.getItem(key);
    if (!localMe) return null;
    return JSON.parse(localMe) as Me;
  },
  setMe: (me: Me) => localStorage.setItem(key, JSON.stringify(me)),
};
