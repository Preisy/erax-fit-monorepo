<script lang="ts" setup>
import { Diary } from 'shared/api/diary';
import { SBtnToggle } from 'shared/ui/btns';
const props = defineProps<Diary.SelfControl>();
const sleepRef = ref<number>(props.sleep || 0);
const performanceRef = ref<number>(props.performance || 0);
const nutritionRef = ref<number>(props.nutrition || 0);
const healthRef = ref<number>(props.health || 0);
const pnsvRef = ref<number>(props.pnsv || 0);

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];
</script>

<template>
  <h1 mb-4>{{ $t('home.diary.item.selfcontrol') }}</h1>
  <template v-if="sleep">
    <p mb-2 mt-4>{{ $t('home.diary.item.sleep') }}</p>
    <SBtnToggle v-model="sleepRef" :options="options" :readonly="readonly" />
  </template>
  <template v-if="performance">
    <p mb-2 mt-4>{{ $t('home.diary.item.performance') }}</p>
    <SBtnToggle v-model="performanceRef" :options="options" :readonly="readonly"
  /></template>
  <template v-if="nutrition">
    <p mb-2 mt-4>{{ $t('home.diary.item.nutrition') }}</p>
    <SBtnToggle v-model="nutritionRef" :options="options" :readonly="readonly"
  /></template>
  <template v-if="health">
    <p mb-2 mt-4>{{ $t('home.diary.item.health') }}</p>
    <SBtnToggle v-model="healthRef" :options="options" :readonly="readonly"
  /></template>
  <template v-if="pnsv"
    ><p mb-2 mt-4>{{ $t('home.diary.item.pnsv') }}</p>
    <SBtnToggle v-model="pnsvRef" :options="options" :readonly="readonly"
  /></template>
</template>
