export namespace ENUMS {
  export const ROUTES = {
    HOME: {
      base: '/home/',
      children: {
        TRAINING: 'training',
        DIARY: 'diary',
        PROFILE: 'profile',
        DIET: 'diet',
        LEARNING: 'learning',
      },
    },
    LOGOUT: {
      base: '/',
      children: {
        LOGIN: 'login',
        REGISTER: 'register',
      },
    },
  };
}
