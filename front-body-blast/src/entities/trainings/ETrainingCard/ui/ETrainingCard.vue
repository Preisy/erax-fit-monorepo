<script setup lang="ts">
import { Training } from 'shared/api/training';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps extends Training.Response {}
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
