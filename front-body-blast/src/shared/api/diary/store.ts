import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { DiaryService } from './service';
import { Diary } from './types';

export const useDiaryStore = defineStore('diary-store', () => {
  const slides = ref(useSingleState<Array<Diary.Response.DiarySlide>>());
  const getSlides = () =>
    useSimpleStoreAction({
      stateWrapper: slides.value,
      serviceAction: DiaryService.getSlides(),
    });
  const summary = ref(useSingleState<Diary.Response.Summary>());
  const getSummary = () =>
    useSimpleStoreAction({
      stateWrapper: summary.value,
      serviceAction: DiaryService.getSummary(),
    });
  return { slides, getSlides, summary, getSummary };
});
