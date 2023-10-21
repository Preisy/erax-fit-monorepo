import merge from 'lodash/merge';
import { I18nMessages } from './types';

export function mergeI18n(...i18ns: I18nMessages[]) {
  const merged: Partial<I18nMessages> = {};
  for (const i18n of i18ns) {
    merge(merged, i18n);
  }
  return merged;
}
