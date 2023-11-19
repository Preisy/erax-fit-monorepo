<script lang="ts" setup>
import { Diary } from 'shared/api/diary';
import { SInput } from 'shared/ui/SInput';
defineProps<Diary.Activity>();
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.activity.activity') }}</h1>
    <SInput
      mb-2
      name="field"
      :label="$t('home.diary.activity.physical')"
      :readonly="readonly"
      :model-value="String(physical)"
    />
    <SInput name="field" :label="$t('home.diary.activity.steps')" :readonly="readonly" :model-value="String(steps)" />
  </div>
</template>
