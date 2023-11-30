import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { useAdminFileStore } from '../file';
import { adminPromptsService } from './service';
import { PromptPage, Prompt } from './types';

export const useAdminPromptStore = defineStore('admin-prompt-store', () => {
  const fileStore = useAdminFileStore();

  const prompts = ref(useSingleState<PromptPage.Get.Response>());
  const getPrompts = async (data: PromptPage.Get.Dto) =>
    useSimpleStoreAction({
      stateWrapper: prompts.value,
      serviceAction: adminPromptsService.getPrompts(data),
    });

  const postPromptsState = ref(useSingleState<PromptPage.Post.Response>());
  const postPrompts = async (data: Array<Prompt.WithFiles>) => {
    for (const prompt of data) {
      const photoLink = await fileStore.postFile({ file: prompt.photo });
      if (!photoLink.data) {
        console.error(photoLink.error);
        return;
      }
      const videoLink = await fileStore.postFile({ file: prompt.video });
      if (!videoLink.data) {
        console.error(videoLink.error);
        return;
      }

      const promptDto = { type: prompt.type, photo: photoLink.data.link, video: videoLink.data.link };
      useSimpleStoreAction({
        stateWrapper: postPromptsState.value,
        serviceAction: adminPromptsService.postPrompt(promptDto),
      });
    }
  };

  return {
    prompts,
    getPrompts,
    postPrompts,
    postPromptsState,
  };
});
