<script setup lang="ts">
import { Training } from 'shared/api/training';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps {
  training: Training.Response;
}
defineProps<ETrainingCardProps>();
</script>

<template>
  <div>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ training.name }}</h1>
        <p>{{ training.commentary }}</p>
      </div>
      <TrainingAnim :url="training.animUrl" />
      <InfoBlock :info="training.info" />
    </div>
  </div>
</template>
