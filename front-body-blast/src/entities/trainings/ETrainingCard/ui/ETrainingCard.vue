<script setup lang="ts">
import { Info } from '../model';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps {
  name: string; //Название тренировки
  commentary: string; //Место для комментария от тренера
  animUrl: string; //Ссылка на ролик с демонстрацией
  info: Info; //Подробности тренировки(вес, подходы)
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
