/* eslint-disable boundaries/element-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from 'app/boot/axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Prompt } from './types';

export const adminPromptsService = {
  postPrompt: useServiceAction(
    (data: Prompt.Post.Dto) => api.post<Prompt.Post.Response>('/admin/prompt', data),
    // requestSimulator<Prompt.Response>({ msg: 'Some response to ' }),
  ),
  getPrompts: useServiceAction(
    (data: Prompt.Get.Dto) =>
      api.get<Prompt.Get.Response>(
        `/admin/prompt?type=${data.type}&page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`,
      ),
    // requestSimulator<Array<Prompt>>([
    //   { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт1' },
    //   { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт2' },
    //   { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт3' },
    //   { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт4' },
    // ]),
  ),
};
