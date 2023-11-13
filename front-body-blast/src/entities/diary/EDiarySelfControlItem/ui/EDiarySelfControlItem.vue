<script lang="ts" setup>
import { SBtnToggle } from 'shared/ui/btns';

const sleep = ref<number>(1);
const performance = ref<number>(1);
const nutrition = ref<number>(1);
const health = ref<number>(1);
const pnsv = ref<number>(1);
const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];
</script>

<template>
  <div>
    <h1 mb-4>{{ $t('home.diary.item.selfcontrol') }}</h1>
    <p mb-2 mt-4>{{ $t('home.diary.item.sleep') }}</p>
    <SBtnToggle v-model="sleep" :options="options" />
    <p mb-2 mt-4>{{ $t('home.diary.item.performance') }}</p>
    <SBtnToggle v-model="performance" :options="options" />
    <p mb-2 mt-4>{{ $t('home.diary.item.nutrition') }}</p>
    <SBtnToggle v-model="nutrition" :options="options" />
    <p mb-2 mt-4>{{ $t('home.diary.item.health') }}</p>
    <SBtnToggle v-model="health" :options="options" />
    <p mb-2 mt-4>{{ $t('home.diary.item.pnsv') }}</p>
    <SBtnToggle v-model="pnsv" :options="options" />
  </div>
</template>
