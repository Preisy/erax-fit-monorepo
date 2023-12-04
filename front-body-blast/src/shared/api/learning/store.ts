import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { LearningService } from './service';
import { Learning } from './types';

export const useLearningStore = defineStore('learning-store', () => {
  const videos = ref(useSingleState<Array<Learning.Video>>());
  const getVideos = () =>
    useSimpleStoreAction({
      stateWrapper: videos.value,
      serviceAction: LearningService.getVideos(),
    });

  return { videos, getVideos };
});
