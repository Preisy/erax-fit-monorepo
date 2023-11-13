<script setup lang="ts">
import { WAdditionCard } from 'widgets/WAdditionCard';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useTrainingStore } from 'shared/api/training';
import { useLoading } from 'shared/lib/loading';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainings);
useLoading(trainings.value);
trainingStore.getTrainingsByDate();
</script>

<template>
  <SStructure>
    <SSplide :options="{ direction: 'ttb', height: '35rem' }">
      <SSplideSlide v-if="!trainings.state.isSuccess()">
        <SNoResultsScreen />
      </SSplideSlide>
      <SSplideSlide v-for="training in trainings.data" :key="training.name">
        <ETrainingCard :training="training" py-1.5rem />
      </SSplideSlide>
      <SSplideSlide>
        <WAdditionCard py-1.5rem />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
