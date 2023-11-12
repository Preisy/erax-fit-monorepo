<script setup lang="ts">
export interface EDiaryHeaderProps {
  week: string;
  goal: number;
  done: number;
}
defineProps<EDiaryHeaderProps>();
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <p>{{ $t('home.diary.header.goalWeek') }} {{ week }}</p>
    <h1 mb-4>{{ goal }} шагов</h1>
    <p>{{ $t('home.diary.header.done') }}</p>
    <h1 mb-0 text-secondary>{{ done }} шагов</h1>
  </div>
</template>
