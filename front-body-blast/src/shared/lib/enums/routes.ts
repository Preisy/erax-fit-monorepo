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
  ADMIN: {
    BASE: '/admin/',
    CHILDREN: {
      PROMPT: 'prompt',
      PROFILE: '',
      DETAILED: 'detailed/:id',
      LEARNING: 'learning',
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
  ADMIN = 'admin',
  ADMIN_PROFILE = 'adminProfile',
  ADMIN_PROMPT = 'adminPrompt',
  ADMIN_LEARNING = 'adminLearning',
  ADMIN_DETAILED = 'adminDetailed',
}
