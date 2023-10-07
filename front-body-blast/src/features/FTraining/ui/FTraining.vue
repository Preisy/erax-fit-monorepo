<script setup lang='ts'>
import TrainingAnim from './TrainingAnim.vue';
export interface FTrainingProps {
    name: string;           //Название тренировки
    commentary: string;     //Место для комментария от тренера
    animUrl: string;        //Ссылка на ролик с демонстрацией
    // info: Info;          //Подробности тренировки(вес, подходы)
}
defineProps<FTrainingProps>();
</script>
<template>
  <div
    flex
    flex-col
    gap-1rem
    p-1.5rem 
  >
    <h1>{{ name }}</h1>
    <p>{{ commentary }}</p>
    <TrainingAnim :url="animUrl" />
    <!-- <InfoBlock v-bind="info" /> -->
  </div>
</template>