<script setup lang="ts">
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

interface Info {
  weight: string;
  sets: string;
  repeats: string;
  rest: string;
  temp: string;
}
export interface ETrainingCardProps {
  name: string;
  commentary: string;
  animUrl: string;
  info: Info;
}
defineProps<ETrainingCardProps>();
</script>

<template>
  <div>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ name }}</h1>
        <p>{{ commentary }}</p>
      </div>
      <TrainingAnim :url="animUrl" />
      <InfoBlock :info="info" />
    </div>
  </div>
</template>
