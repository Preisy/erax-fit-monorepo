<script setup lang="ts">
import { EAdditionCard } from 'entities/trainings/EAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';
import { useTrainingStore } from '..';

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainings);

onBeforeMount(async () => await trainingStore.getTrainingsByDate());
</script>
<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-for="training in trainings.data" :key="training.name">
        <ETrainingCard v-bind="training" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <EAdditionCard py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
