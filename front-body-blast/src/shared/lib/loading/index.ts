import { Loading } from 'quasar';
import { ISingleState, IState } from '../utils';

export function useLoading(state: IState): void;
export function useLoading(state: ISingleState): void;

export function useLoading(state: XOR<IState, ISingleState>) {
  watch(state, (changedState) => {
    let s;
    if ('state' in changedState) s = changedState.state;
    else s = changedState;

    if (!s) return;
    s.isLoading() ? Loading.show() : Loading.hide();
  });
}
