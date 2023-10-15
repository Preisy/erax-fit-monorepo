<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { WAddition } from 'widgets/trainings/WAddition';
import { WTraining } from 'widgets/trainings/WTraining';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { useTrainingStore } from '..';

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainings);

onBeforeMount(async () => {
  await trainingStore.getTrainingsByDate();
});
</script>
<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-for="training in trainings.data" :key="training.name">
        <WTraining v-bind="training" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <WAddition py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
