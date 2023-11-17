<script setup lang="ts">
import { WSelfControl } from 'widgets/diary/WSelfControl';
import { EDiaryHeader } from 'entities/diary/EDiaryHeader';
import { useDiaryStore } from 'shared/api/diary';
const diaryStore = useDiaryStore();
diaryStore.getSummary();
diaryStore.getSlides();
const slides = computed(() => diaryStore.slides.data || []);
const summary = computed(() => diaryStore.summary.data || { goal: 0, week: '', done: 0 });
</script>

<template>
  <div h-full>
    <EDiaryHeader v-bind="summary" />
    <WSelfControl :slides="slides" />
  </div>
</template>
