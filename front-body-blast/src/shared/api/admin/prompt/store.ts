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
    postPromptsState.value.state.loading();
    for (const prompt of data) {
      const photoLink = await fileStore.postFile({ file: prompt.photo });
      if (!photoLink.data) {
        console.error(photoLink.error);
        postPromptsState.value.state.error();
        return;
      }
      const videoLink = await fileStore.postFile({ file: prompt.video });
      if (!videoLink.data) {
        console.error(videoLink.error);
        postPromptsState.value.state.error();
        return;
      }

      const promptDto = { type: prompt.type, photoLink: photoLink.data.link, videoLink: videoLink.data.link };
      await useSimpleStoreAction({
        stateWrapper: postPromptsState.value,
        serviceAction: adminPromptsService.postPrompt(promptDto),
      });
    }
  };

  const deletePromptState = ref(useSingleState<PromptPage.Delete.Response>());
  const deletePrompt = async (data: PromptPage.Delete.Dto) =>
    useSimpleStoreAction({
      stateWrapper: deletePromptState.value,
      serviceAction: adminPromptsService.deletePrompt(data),
    });

  const patchPromptState = ref(useSingleState<PromptPage.Patch.Response>());
  const patchPrompt = async (data: PromptPage.Patch.Dto) =>
    useSimpleStoreAction({
      stateWrapper: patchPromptState.value,
      serviceAction: adminPromptsService.patchPrompt(data),
    });

  return {
    prompts,
    getPrompts,
    postPrompts,
    postPromptsState,
    deletePromptState,
    deletePrompt,
    patchPromptState,
    patchPrompt,
  };
});
