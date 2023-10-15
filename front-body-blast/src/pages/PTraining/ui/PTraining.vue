<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { WAddition } from 'widgets/trainings/WAddition';
import { WTraining } from 'widgets/trainings/WTraining';
import { SStructure } from 'shared/ui/SStructure';
import { SSwiper } from 'shared/ui/SSwiper';
import { SSwiperSlide } from 'shared/ui/SSwiperSlide';
import { useTrainingStore } from '..';

const trainingStore = useTrainingStore();
const trainings = computed(() => trainingStore.trainings);

onBeforeMount(async () => {
  await trainingStore.getTrainingsByDate();
});
</script>
<template>
  <SStructure>
    <SSwiper :options="{ direction: 'ttb', height: '35rem' }">
      <SSwiperSlide v-for="training in trainings.data" :key="training.name">
        <WTraining v-bind="training" py-1.5rem />
      </SSwiperSlide>
      <SSwiperSlide>
        <WAddition py-1.5rem />
      </SSwiperSlide>
    </SSwiper>
  </SStructure>
</template>
