import { HandleSubmitType } from '../ui';

export function useHandlerWrapper(callback: (...args: unknown[]) => unknown) {
  return (handler: HandleSubmitType, submitEvent: Event) => handler(callback)(submitEvent);
}
