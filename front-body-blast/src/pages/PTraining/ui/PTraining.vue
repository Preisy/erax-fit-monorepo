<script setup lang="ts">
import { FAdditionCard } from 'features/trainings/FAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useTrainingStore } from 'shared/api/training';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainings);

trainingStore.getTrainingsByDate();
</script>

<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-for="training in trainings.data" :key="training.name">
        <ETrainingCard :training="training" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <FAdditionCard py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
