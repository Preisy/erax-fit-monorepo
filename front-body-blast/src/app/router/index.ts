import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAuthStore } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    const { isAuth } = useAuthStore();
    if (to.meta.auth && !isAuth()) {
      return {
        path: ENUMS.ROUTES_NAMES.LOGIN,
        // save the location we were at to come back later
        // query: { redirect: to.fullPath },
      };
    }
    return;
  });

  return Router;
});
