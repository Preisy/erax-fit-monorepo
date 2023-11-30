import { Loading } from 'quasar';
import { ISingleState, IState } from '../utils';

export function useLoading(state: IState): void;
export function useLoading(state: ISingleState): void;

/**
 *  Loading hook to detect is state isLoading.
 *  Displays SLogo as loading screen
 *  Global settings in 'App.vue'
 *
 *  !IMPORTANT: to proper work you should put useLoading BEFORE api request
 *  @example
 *    const { someState, someApiRequest } = useSomeStore();
 *    useLoading(someState); <----- useLoading before api
 *    someApiRequest();      <----- api request after useLoading
 *  @param state useSingleState() or use[Single/List]State().state
 */
export function useLoading(state: XOR<IState, ISingleState>) {
  watch(
    state,
    (changedState) => {
      let s;
      if ('state' in changedState) s = changedState.state;
      else s = changedState;

      if (!s) return;
      s.isLoading() ? Loading.show() : Loading.hide();
    },
    { immediate: true },
  );
}
