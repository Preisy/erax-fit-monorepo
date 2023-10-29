export const ROUTES = {
  HOME: {
    BASE: '/home/',
    CHILDREN: {
      TRAINING: 'training',
      DIARY: 'diary',
      PROFILE: 'profile',
      DIET: 'diet',
      LEARNING: 'learning',
    },
  },
  AUTH: {
    BASE: '/',
    CHILDREN: {
      LOGIN: 'login',
      REGISTER: 'register',
    },
  },
};

export enum ROUTES_NAMES {
  HOME = 'home',
  TRAINING = 'training',
  DIARY = 'diary',
  PROFILE = 'profile',
  DIET = 'diet',
  LEARNING = 'learning',
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
}
