<script setup lang="ts">
import { Training } from 'shared/api/training';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps {
  training: Training.Response;
}
defineProps<ETrainingCardProps>();
</script>

<template>
  <SComponentWrapper>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ training.name }}</h1>
        <p>{{ training.commentary }}</p>
      </div>
      <TrainingAnim :url="training.animUrl" />
      <InfoBlock :info="training.info" />
    </div>
  </SComponentWrapper>
</template>
