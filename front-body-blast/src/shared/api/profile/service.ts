import { api } from 'shared/config';
import { useServiceAction } from 'shared/lib/utils';
import { AppPagination } from '../base';
import { Anthropometry } from './types';

export const profileService = {
  getAnthropometry: useServiceAction((params: Omit<AppPagination.DateDto, 'expanded'>) =>
    api.get<Anthropometry.Response>(`/admin/anthropometrics?from=${params.from}&to=${params.to}&expanded=false`),
  ),
};
